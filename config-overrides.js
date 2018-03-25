/* config-overrides.js */
//GenerateSW version of Workbox for easy pre-caching functionality
// const {rewireWorkboxGenerate} = require('react-app-rewire-workbox');

// module.exports = function override(config, env) {
//     if (env === "production") {
//         console.log("Production build - Adding Workbox for PWAs");
//         config = rewireWorkboxGenerate()(config, env);
//     }

//     return config;
// };

const {rewireWorkboxInject, defaultInjectConfig} = require('react-app-rewire-workbox');
const path = require('path');

module.exports = function override(config, env) {
    if (env === "production") {
        console.log("Production build - Adding Workbox for PWAs");
        // Extend the default injection config with required swSrc
        const workboxConfig = {
        ...defaultInjectConfig,
        swSrc: path.join(__dirname, 'src', 'custom-sw.js'),
        swDest: path.join(__dirname, 'build', 'custom-sw.js'),
        };
        config = rewireWorkboxInject(workboxConfig)(config, env);
    }

    return config;
};

// var config = {
//     globDirectory: './',
//     globPatterns: ['**\/*.{html,js,css}'],
//     globIgnores: ['admin.html', 'node_modules/**', 'service-worker.js',
//       'webpack.config.js', 'src/**', 'build/**'],
//     swSrc: './src/service-worker.js',
//     swDest: './service-worker.js',
//   };