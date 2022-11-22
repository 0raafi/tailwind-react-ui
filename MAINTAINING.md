# Maintaining react-ui

## Create New Release

For a multi packages repo (We currently use this one)
```bash
npm run test
npm version patch
git commit -a -m "Bump to version $(node -e "console.log(require('./package.json').version)")"
npm publish --access=public
git push origin main
```


For a single package repo
```bash
npm run test
npm version patch -m "Bump version up to %s"
npm publish --access=public
git push origin main
git push --tags
```


