import { configureActions } from '@storybook/addon-actions';

import '../src/styles/index.scss';

configureActions({
  depth: 3,
  limit: 10,
});

export const parameters = {
  actions: { argTypesRegex: "^onChange" }
}

