var pkg = require('./package.json');

module.exports = {
    name: pkg.name,
    version: pkg.version,
    remoteDir: '/home/publisher/pkg-pub/app/public/' + pkg.name,
    ssh: {
        host: '192.168.6.75',
        port: 22,
        username: 'publisher',
        password: 'sigma5tdev777'
    }
};