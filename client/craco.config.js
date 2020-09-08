const CracoLessPlugin = require('craco-less');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: {
                            '@primary-color': '#fb7299',
                            '@success-color': '#fb7299'
                        },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
