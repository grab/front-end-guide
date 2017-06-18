const pkg = require('./package.json');

console.log('These are the dependencies that we use:');
console.log('  ' + Object.keys(pkg.dependencies).join('\n  '));
console.log();
console.log('These are the devDependencies that we use:');
console.log('  ' + Object.keys(pkg.devDependencies).join('\n  '));
