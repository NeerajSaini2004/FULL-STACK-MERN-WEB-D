const os=require('os');

// console.log("cpu architecture:", os.arch()); // Outputs the CPU architecture (e.g., 'x64', 'arm64')
 
// console.log("free memory:", os.freemem()); // Outputs the amount of free system memory in bytes
// console.log("total memory:", os.totalmem()); // Outputs the total system memory in bytes

// console.log("neteork interfaces:", os.networkInterfaces()); // Outputs network interfaces information

// console.log("os default temp dir:", os.tmpdir()); // Outputs the default temporary directory for the OS


console.log("endianness:", os.endianness()); // Outputs the endianness of the CPU ('BE' for big-endian, 'LE' for little-endian
console.log("hostname:", os.hostname()); // Outputs the hostname of the operating system
console.log("platform:", os.platform()); // Outputs the platform of the operating system (e.g., 'linux', 'darwin', 'win32')
console.log("release:", os.release()); // Outputs the OS release version
console.log("type:", os.type()); // Outputs the OS type (e.g., 'Linux', 'Darwin', 'Windows_NT')
