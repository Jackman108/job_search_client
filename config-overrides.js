const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        '@app': path.resolve(__dirname, 'src/app'),
        '@processes': path.resolve(__dirname, 'src/processes'),
        '@features': path.resolve(__dirname, 'src/features'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@widgets': path.resolve(__dirname, 'src/widgets'),
        '@api': path.resolve(__dirname, 'src/shared/api'),
        '@ui': path.resolve(__dirname, 'src/shared/ui'),
        '@hooks': path.resolve(__dirname, 'src/shared/hooks'),
        '@utils': path.resolve(__dirname, 'src/shared/utils'),
        '@config': path.resolve(__dirname, 'src/shared/config'),
    })
);