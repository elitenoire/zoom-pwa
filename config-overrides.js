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
        dontCacheBustUrlsMatching: /\.\w{8}\./
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
// new WorkboxWebpackPlugin({
// const BUILD_DIR = path.join(__dirname, './build');

//     globDirectory: BUILD_DIR,

//     globPatterns: ['**/*.{html,js,css}'],

//     globIgnores: ['**/service-worker.js'],

//     swSrc: path.join(ROOT_DIR, 'service-worker.js'),

//     swDest: path.join(BUILD_DIR, 'sw.js'),

//   })