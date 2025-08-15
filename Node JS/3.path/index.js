const path = require('path'); // Importing the path module
console.log(path.sep); // Outputs the platform-specific path segment separator (e.g., '/' on Unix, '\' on Windows)
// console.log(process.env.PATH); // Outputs the system PATH environment variable
// conosole.log(path.delimiter); // Outputs the platform-specific path delimiter (e.g., ':' on Unix, ';' on Windows)

const filepath1 ='/public_html/index.html';

const currentfilepath=__filename;
console.log(currentfilepath); // Outputs the absolute path of the current file

console.log(__dirname); // Outputs the absolute path of the directory containing the current file

// let result=Path.basename(currentfilepath);
// console.log(result); // Outputs the base name of the current file (e.g., 'index.js')

// let basenamewithoutextension = Path.basename(currentfilepath, '.js');
// console.log(basenamewithoutextension); // Outputs the base name without the extension (e.g., 'index')

let dirname=path.dirname(currentfilepath);
console.log(dirname); // Outputs the directory name of the current file (e.g., '/path

let pathtofile=path.format({
    dir: '/public_html/index.html',
    base: 'index.html'  
});
console.log('pathtofile >' ,pathtofile); // Outputs the formatted path to the file (e.g.,


console.log('IsAbsolute >', path.isAbsolute(filepath1)); // Checks if the path is absolute (e.g., true for '/public_html/index.html')
console.log('IsAbsolute >', path.isAbsolute('/index.js')); // Checks if the current file path is absolute (e.g., true for the absolute path of the current file)



//joining paths
let joinedPath = path.join('/public_html', 'index.html');
console.log('joinedPath >', joinedPath); // Outputs the joined path (e.g.,

console.log('parse >', path.parse(currentfilepath)); // Outputs an object with properties like root, dir, base, ext, and name for the current file path
// e.g., { root: '/', dir: '/public_html', base: 'index.html

console.log('relative >', path.relative('/public_html', currentfilepath)); // Outputs the relative path from '/public_html' to the current file path
// e.g., 'index.js' if the current file is in the same directory

console.log('resolve >', path.resolve('/public_html', 'index.html')); // Outputs the absolute path resolved from the given segments
// e.g., '/public_html/index.html' if the current working directory is the root

//normalize
let normalizedPath = path.normalize('/public_html/../index.html');

console.log('normalizedPath >', normalizedPath); // Outputs the normalized path, resolving '..' segments (e.g., '/index.html' if the current working directory is '/public_html')



