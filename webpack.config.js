/* 
why webpack?

Webpack is a popular tool among developers for several reasons:


Modularity: Webpack lets you write modular code by supporting various module formats. This means you can organize your code into multiple files and directories, making it easier to manage and maintain.



Optimization: Webpack can significantly optimize your application by bundling all your files into one (or a few, depending on your configuration). It also supports features like minification, tree shaking (removing unused code), and lazy loading, which can improve your application's performance.



Transpilation: Webpack can transpile ES6 and JSX syntax into ES5, which is widely supported by all browsers. This means you can write modern JavaScript code without worrying about browser compatibility.



Development Server: Webpack provides a development server that supports hot module replacement. This means you can see the changes you make in real-time without refreshing the page, making development faster and more efficient.



Loaders and Plugins: Webpack supports loaders and plugins, which allow you to preprocess and transform your files before they are bundled. This means you can use TypeScript, SASS, PostCSS, Babel, ESLint, and many other tools in your project.



Code Splitting: Webpack allows you to split your code into various bundles, which can be loaded on demand or in parallel. This can significantly improve the load time of your application.
*/

/*------------------------------------------------------------------------------------------------------------------------------------*/

/*
What if, we dont use webpack?

Browser Compatibility: Browsers don't fully support all ES6+ features yet, including modules. Without a tool like Webpack to transpile your code, you might encounter compatibility issues.



Performance: Without Webpack's optimization features like minification and tree shaking, your application might load slower. This is because all scripts would need to be loaded separately, creating more HTTP requests, and unused code wouldn't be eliminated.



Code Organization: Webpack allows you to write modular code and bundle it into a single file. Without it, you would need to manually manage script tags in your HTML and deal with global scope issues.



Development Experience: Webpack provides a development server with features like hot module replacement, which makes the development process smoother.
*/

/*------------------------------------------------------------------------------------------------------------------------------------*/


/*
why development mode?


Setting mode to development in Webpack configures it to enable features that are useful for development purposes. Here are some reasons why you would set mode to development:


Improved Debugging: In development mode, Webpack generates source maps and does not minimize the code. This makes debugging easier because you can see the original code and line numbers in case of errors.



Faster Build Time: Development mode skips certain steps in the build process that are time-consuming, such as code minification. This results in faster build times which is beneficial during development when you're making frequent changes.



Hot Module Replacement (HMR): In development mode, Webpack's dev server enables Hot Module Replacement by default. This feature allows modules to be updated at runtime without a full refresh, providing a smoother development experience.



Detailed Error Messages: Development mode provides more detailed error messages and warnings, which can help you identify and fix issues more quickly.



Remember, while development mode is great for developing your application, it's not optimized for performance and should not be used for production builds. For production, you should set mode to production, which enables different optimizations like minification and tree shaking to improve the performance of your application.
*/

/*------------------------------------------------------------------------------------------------------------------------------------*/
/*
If you want to do code-splitting?


*/

/*
If you want to use code-splitting, then you can use below webpack snippet

module.exports={
    mode:'development',
    entry:{//entry point to get our initial js file for building, since all files are linked from here
        bundle:path.resolve(__dirname,'src/index.js'),
    }
    output:{
        path:path.resolve(__dirname,'dist'), //this will be the folder, where the single bundled script will be placed
        filename:'[name].js'  //name of our bundled script
    }
}
*/


/*------------------------------------------------------------------------------------------------------------------------------------*/
/*
What are loaders in webpack?


Loaders in Webpack are used to transform or convert files from one format to another before they are added to your dependency graph. They allow you to preprocess files as you import or "load" them. 

For example, a loader might transform a TypeScript file into JavaScript, or a SASS file into CSS. This means you can write your source code in any language or syntax you want, and Webpack will convert it into something the browser understands.

Loaders can be chained together, which means each loader in the chain applies transformations to the processed result of the previous loader. They are executed from right to left (or bottom to top).

Here are some examples of popular Webpack loaders:


babel-loader: Transpiles JavaScript files using Babel and webpack.

css-loader: Interprets @import and url() like import/require() and resolves them.

style-loader: Injects CSS into the DOM.

sass-loader: Loads a SASS/SCSS file and compiles it to CSS.

file-loader: Instructs webpack to emit the required object as a file and to return its public URL.

url-loader: Works like the file-loader, but can return a DataURL if the file is smaller than a limit.

ts-loader: Transpiles TypeScript files to JavaScript.

You can specify loaders in your Webpack configuration file (webpack.config.js) in the module.rules array. Each rule specifies what kind of files the loader should be used for, and which loader (or loaders) should be use

*/

/*------------------------------------------------------------------------------------------------------------------------------------*/

/*


/*
What is html-webpack-plugin?
   The html-webpack-plugin automatically injects the correct script tags for your application's JavaScript files into the HTML file. This means you don't have to manually update the script tags in your index.html file every time you rebuild your application, even if the file names of your JavaScript bundles change. This can be particularly useful when using hashing, where file names change with every build. The plugin will generate a new index.html file in the output directory (like dist) and will always reference the latest
*/


const path=require('path')
const HTMLWebpackPlugin=require('html-webpack-plugin')
module.exports={
    mode:'development',
    entry:path.resolve(__dirname,'src/index.js'), //entry point to get our initial js file for building, since all files are linked from here
    output:{
        path:path.resolve(__dirname,'dist'), //this will be the folder, where the single bundled script will be placed
        filename:'[name][contenthash].js' , //name of our bundled script
        clean:true,   //clean up the previous unused bundles that was generated during multiple builds
        assetModuleFilename:'[name][ext]'
    },
    devtool:"source-map", //helps in debugging
    devServer:{
        static:{
            directory:path.resolve(__dirname,'dist')

        },
        port:3000,
        open:true,
        hot:true,
        compress:true,
        historyApiFallback:true
    },
    /*

        static: { directory: path.resolve(__dirname,'dist') }: This tells the server where to serve static files from. In this case, it's serving files from the 'dist' directory in your project root.



        port: 3000: This sets the port on which the server will run. In this case, it's port 3000.



        open: true: This tells the server to automatically open the application in your default web browser when you start the server.



        hot: true: This enables Hot Module Replacement (HMR). With HMR, the server will automatically update your running application in the browser when you make changes to your source code, without requiring a full page refresh.



        compress: true: This enables gzip compression for everything served by the server. This can help to speed up the loading of your application in the browser.



        historyApiFallback: true: This is a setting for Single Page Applications (SPA). It redirects all server requests to index.html. This allows the routing to be handled by your JavaScript code, which is necessary for SPAs that use the HTML5 History API for routing.
    */
    module:{
        rules:[
            {
                test:/\.scss$/, //any file that ends with this extension
                use:[//use these loaders
                    'style-loader',
                    'css-loader',
                    'sass-loader'

                ]  
            },

            /*
            
            test: /\.js$/: This tells webpack to apply this rule to files that end in .js. The /\.js$/ is a regular expression that matches any filename that ends with .js.



            exclude: /node_modules/: This tells webpack to ignore any files within the node_modules directory. This is typically done for performance reasons, as you usually don't want to apply your loaders to the libraries you're using.



            use: { loader: 'babel-loader', options: { presets: ['@babel/preset-env'] } }: This tells webpack to use babel-loader to process the JavaScript files. babel-loader is a webpack loader that uses Babel to transpile your JavaScript code. The options object is passed to Babel. The presets option tells Babel to use the @babel/preset-env preset, which is a smart preset that allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s). This preset includes the features of ECMAScript 2015+ (ES6+) and will automatically determine the Babel plugins you need based on your supported environments.

 */
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/i,  //loader for using images
                type:'asset/resource'
            }
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            title:'Webpack App', //This sets the title of the HTML file that will be created.
            filename:"index.html",//: This is the name of the HTML file that will be created in your output directory
            template:"src/template.html"//This is the path to a template HTML file that the plugin will use as a base for creating the new HTML file. The plugin will automatically inject script tags for your webpack bundles into this template.


            /*
            So, in summary, this configuration will create a new HTML file named 'index.html' in your output directory, using 'src/template.html' as a template and setting the title of the HTML file to 'Webpack'. The new HTML file will include script tags that reference your webpack bundles.
            */
        })
    ]
}

/* 
 "dev": "webpack serve" ---->In package.json,
 The webpack serve command is used to start the webpack's development server. This server automatically updates and refreshes your application in the browser whenever you make changes to your source code files. This feature is known as "hot reloading".

If you don't use webpack serve (or a similar tool), you would indeed need to manually rebuild your application and refresh your browser every time you make a change to your code, which can be time-consuming and inefficient during development.
*/

/*
 Babel is a popular JavaScript transpiler that allows developers to write code using the latest JavaScript features, even those not yet fully supported by all browsers. Babel then transforms this code into a backwards-compatible version that can be run by older browsers. 
*/