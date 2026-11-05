const {override, addWebpackAlias} = require('customize-cra');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        '@app': path.resolve(__dirname, 'src/app'),
        '@processes': path.resolve(__dirname, 'src/processes'),
        '@features': path.resolve(__dirname, 'src/features'),
        '@shared': path.resolve(__dirname, 'src/shared'),
        '@entities': path.resolve(__dirname, 'src/entities'),
        '@widgets': path.resolve(__dirname, 'src/widgets/index.ts'),
        '@api': path.resolve(__dirname, 'src/shared/api/index.ts'),
        '@ui': path.resolve(__dirname, 'src/shared/ui/index.ts'),
        '@type': path.resolve(__dirname, 'src/shared/types/index.ts'),
        '@hooks': path.resolve(__dirname, 'src/shared/hooks/index.ts'),
        '@utils': path.resolve(__dirname, 'src/shared/utils/index.ts'),
        '@config': path.resolve(__dirname, 'src/shared/config/index.ts'),
        '@styles': path.resolve(__dirname, 'src/shared/styles/index.ts'),
    })
);