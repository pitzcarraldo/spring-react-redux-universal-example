var babelConfig = require('../webpack/babel.config');
require('babel-core/register')(babelConfig);
require('../webpack/dev.server.app');