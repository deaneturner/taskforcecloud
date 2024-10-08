const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPlugin = require('./html-elements-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

/*
 * Webpack Constants
 */
// const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
    title: 'Task Force Cloud',
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
    // isProd = options.env === 'production';
    var isProd = options.env === 'production';
    return {

        /*
         * Static metadata for index.html
         *
         * See: (custom attribute)
         */
        metadata: METADATA,

        /*
         * Cache generated modules and chunks to improve performance for multiple incremental builds.
         * This is enabled by default in watch mode.
         * You can pass false to disable it.
         *
         * See: http://webpack.github.io/docs/configuration.html#cache
         */
        // cache: false,

        /*
         * The entry point for the bundle
         * Our Angular.js app
         *
         * See: http://webpack.github.io/docs/configuration.html#entry
         */
        entry: {

            'polyfills': './public/polyfills.browser.ts',
            'vendor': './public/vendor.browser.ts',
            'main': './public/main.browser.ts'

        },

        /*
         * Options affecting the resolving of modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#resolve
         */
        resolve: {

            /*
             * An array of extensions that should be used to resolve modules.
             *
             * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
             */
            extensions: ['', '.ts', '.js', '.json'],

            // An array of directory names to be resolved to the current directory
            modules: [helpers.root('public'), 'node_modules']

        },

        /*
         * Options affecting the normal modules.
         *
         * See: http://webpack.github.io/docs/configuration.html#module
         */
        module: {

            /*
             * An array of applied pre and post loaders.
             *
             * See: http://webpack.github.io/docs/configuration.html#module-preloaders-module-postloaders
             */
            preLoaders: [
                {
                    test: /\.ts$/,
                    loader: 'string-replace-loader',
                    query: {
                        search: '(System|SystemJS)(.*[\\n\\r]\\s*\\.|\\.)import\\((.+)\\)',
                        replace: '$1.import($3).then(mod => (mod.__esModule && mod.default) ? mod.default : mod)',
                        flags: 'g'
                    },
                    include: [helpers.root('public')]
                },
                {
                    test: /\.ts$/,
                    include: [helpers.root('public/app')],
                    loader: 'tslint-loader'
                }

            ],

            /*
             * An array of automatically applied loaders.
             *
             * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
             * This means they are not resolved relative to the configuration file.
             *
             * See: http://webpack.github.io/docs/configuration.html#module-loaders
             */
            loaders: [

                /*
                 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
                 * Replace templateUrl and stylesUrl with require()
                 *
                 * See: https://github.com/s-panferov/awesome-typescript-loader
                 * See: https://github.com/TheLarkInn/angular2-template-loader
                 */
                {
                    test: /\.ts$/,
                    loaders: [
                        '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
                        'awesome-typescript-loader',
                        'angular2-template-loader'
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },

                /*
                 * Json loader support for *.json files.
                 *
                 * See: https://github.com/webpack/json-loader
                 */
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },

                {test: /\.scss$/, loaders: ['raw-loader', 'sass-loader']},

                {test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000&name=[name].[ext]'},

                // Bootstrap 4
                {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery'},

                /*
                 * to string and css loader support for *.css files
                 * Returns file content as string
                 *
                 */
                {
                    test: /\.css$/,
                    loaders: ['to-string-loader', 'css-loader']
                },

                /* Raw loader support for *.html
                 * Returns file content as string
                 *
                 * See: https://github.com/webpack/raw-loader
                 */
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: [helpers.root('public/index.html')]
                },

                /* File loader for supporting images, for example, in CSS files.
                 */
                {
                    test: /\.(jpg|png|gif)$/,
                    loader: 'file'
                }
            ],

            postLoaders: [
                {
                    test: /\.js$/,
                    loader: 'string-replace-loader',
                    query: {
                        search: 'var sourceMappingUrl = extractSourceMappingUrl\\(cssText\\);',
                        replace: 'var sourceMappingUrl = "";',
                        flags: 'g'
                    }
                }
            ]
        },

        /*
         * Add additional plugins to the compiler.
         *
         * See: http://webpack.github.io/docs/configuration.html#plugins
         */
        plugins: [
            new AssetsPlugin({
                path: helpers.root('dist'),
                filename: 'webpack-assets.json',
                prettyPrint: true
            }),

            /*
             * Plugin: ForkCheckerPlugin
             * Description: Do type checking in a separate process, so webpack don't need to wait.
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
             */
            // new ForkCheckerPlugin(),
            /*
             * Plugin: CommonsChunkPlugin
             * Description: Shares common code between the pages.
             * It identifies common modules and put them into a commons chunk.
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
             * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
             */
            new webpack.optimize.CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),

            /**
             * Plugin: ContextReplacementPlugin
             * Description: Provides context to Angular's use of System.import
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
             * See: https://github.com/angular/angular/issues/11580
             */
            new ContextReplacementPlugin(
                // The (\\|\/) piece accounts for path separators in *nix and Windows
                /angular(\\|\/)core(\\|\/)(esm(\\|\/)public|public)(\\|\/)linker/,
                helpers.root('public') // location of your src
            ),

            /*
             * Plugin: CopyWebpackPlugin
             * Description: Copy files and directories in webpack.
             *
             * Copies project static assets.
             *
             * See: https://www.npmjs.com/package/copy-webpack-plugin
             */
            new CopyWebpackPlugin([{
                from: 'public/assets',
                to: 'assets'
            }]),

            /*
             * Plugin: HtmlWebpackPlugin
             * Description: Simplifies creation of HTML files to serve your webpack bundles.
             * This is especially useful for webpack bundles that include a hash in the filename
             * which changes every compilation.
             *
             * See: https://github.com/ampedandwired/html-webpack-plugin
             */
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                chunksSortMode: 'dependency'
            }),

            /*
             * Plugin: ProvidePlugin
             * Description: Automatically loaded modules. Module (value) is loaded when the identifier (key)
             * is used as free variable in a module. The identifier is filled with the exports of the loaded module.
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#provideplugin
             */
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                'Tether': 'tether',
                'window.Tether': 'tether',
                Hammer: 'hammerjs/hammer',
                moment: 'moment'
            }),

            /*
             * Plugin: HtmlHeadConfigPlugin
             * Description: Generate html tags based on javascript maps.
             *
             * If a publicPath is set in the webpack output configuration, it will be automatically added to
             * href attributes, you can disable that by adding a "=href": false property.
             * You can also enable it to other attribute by settings "=attName": true.
             *
             * The configuration supplied is map between a location (key) and an element definition object (value)
             * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
             *
             * Example:
             *  Adding this plugin configuration
             *  new HtmlElementsPlugin({
             *    headTags: { ... }
             *  })
             *
             *  Means we can use it in the template like this:
             *  <%= webpackConfig.htmlElements.headTags %>
             *
             * Dependencies: HtmlWebpackPlugin
             */
            new HtmlElementsPlugin({
                headTags: require('./head-config.common')
            })

        ],

        /*
         * Include polyfills or mocks for various node stuff
         * Description: Node configuration
         *
         * See: https://webpack.github.io/docs/configuration.html#node
         */
        node: {
            global: 'window',
            crypto: 'empty',
            process: true,
            module: true,
            clearImmediate: false,
            setImmediate: false
        }

    };
};

