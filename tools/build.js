const { green, cyan, red } = require('chalk');
const webpack = require('webpack');

const cpy = require('recursive-copy');
const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');
const cherryPick = require('./cherryPick');
const getConfig = require('./dist.webpack.config');

const targets = process.argv.slice(2);

const srcRoot = path.join(__dirname, '..', 'src');
const typesRoot = path.join(__dirname, '..', 'types');

const libRoot = path.join(__dirname, '..', 'lib');
const distRoot = path.join(libRoot, 'dist');
const cjsRoot = path.join(libRoot, 'cjs');
const esRoot = path.join(libRoot, 'esm');

const clean = () => fse.existsSync(libRoot) && fse.removeSync(libRoot);

const step = (name, fn) => async () => {
  console.log(cyan('Building: ') + green(name));
  await fn();
  console.log(cyan('Built: ') + green(name));
};

const shell = (cmd) =>
  execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const has = (t) => !targets.length || targets.includes(t);

const buildTypes = step('generating .d.ts', () => shell(`npm run build-types`));

const copyTypes = (dest) => cpy(typesRoot, dest);
const copyExtra = (dest) => cpy(srcRoot, dest, {
  filter: [
    '**/*',
    '!__tests__',
    '!*.ts',
    '!*.tsx',
    '!*.stories.tsx',
    '!*.spec.tsx',
    '!**/__tests__',
    '!**/*.ts',
    '!**/*.tsx',
    '!**/*.stories.tsx',
    '!**/*.spec.tsx'
  ],
  overwrite: true
});
const copyStyles = (dest) => shell(`node-sass src -o ${dest} --output-style compressed --include-path src --importer node_modules/node-sass-package-importer/dist/cli.js`);

const babel = (outDir, envName) =>
  shell(
    `babel ${srcRoot} -x .es6,.js,.es,.jsx,.mjs,.ts,.tsx --out-dir ${outDir} --env-name "${envName}" --ignore '**/*.stories.tsx'  --ignore '**/*.specs.tsx'`,
  );

/**
 * Run babel over the src directory and output
 * compiled common js files to ./lib.
 */
const buildLib = step('commonjs modules', async () => {
  await babel(cjsRoot, 'cjs');
  await copyTypes(cjsRoot);
  await copyStyles(cjsRoot);
  await copyExtra(cjsRoot);
});

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', async () => {
  await babel(esRoot, 'esm');
  await copyTypes(esRoot);
  await copyStyles(esRoot);
  await copyExtra(esRoot);
});

/**
 * Bundles a minified and unminified version of react-bootstrap including
 * all it's immediate dependencies (excluding React, ReactDOM, etc)
 */
const buildDist = step(
  'browser distributable',
  () =>
    new Promise((resolve, reject) => {
      webpack(
        [getConfig(distRoot, false), getConfig(distRoot, true)],
        async (err, stats) => {
          if (err || stats.hasErrors()) {
            reject(err || stats.toJson().errors);
            return;
          }

          resolve();
        },
      );
    }),
);

const buildDirectories = step('Linking directories', () =>
  cherryPick({
    inputDir: `..${path.sep}src`,
    cjsDir: 'cjs',
    esmDir: 'esm',
    cwd: libRoot,
  }),
);

console.log(
  green(`Building targets: ${targets.length ? targets.join(', ') : 'all'}\n`),
);

clean();

Promise.resolve(true)
  .then(buildTypes)
  .then(() =>
    Promise.all([
      has('lib') && buildLib(),
      has('es') && buildEsm(),
      has('dist') && buildDist(),
    ]),
  )
  .then(buildDirectories)
  .catch((err) => {
    if (err) console.error(err);
    process.exit(1);
  });