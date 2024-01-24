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

*/


const path=require('path')
module.exports={
    mode:'development',
    entry:path.resolve(__dirname,'src/index.js'), //entry point to get our initial js file for building, since all files are linked from here
    output:{
        path:path.resolve(__dirname,'dist'), //this will be the folder, where the single bundled script will be placed
        filename:'bundle.js'  //name of our bundled script
    },
    module:{
        rules:[
            {
                test:/\.scss$/, //any file that ends with this extension
                use:[//use this loaders
                    'style-loader',
                    'css-loader',
                    'sass-loader'

                ]  
            }
        ]
    }
}