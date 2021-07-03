import * as moduleAlias from 'module-alias';
import * as path from 'path';

moduleAlias.addAliases({
    '@src': __dirname,
    '@controllers': path.join(__dirname, '../src/controllers'),
    '@infrastructure': path.join(__dirname, '../src/infrastructure'),
    '@services': path.join(__dirname, '../src/services'),
    '@middlewares': path.join(__dirname, '../src/middlewares'),
});
