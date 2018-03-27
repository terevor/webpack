var pkg = require('./package.json');

module.exports = {
    name: pkg.name,
    version: pkg.version,
    remoteDir: '/usr/share/nginx/html/web/' + pkg.name,
    ssh: {
        host: '192.168.6.81',
        port: 22,
        username: 'root',
        password: 'sigma5t'
    },
    commands: [
        'rm -rf /usr/share/nginx/html/web/' + pkg.name + '/static/',
        'rm -f /usr/share/nginx/html/web/' + pkg.name + '/index.html'
    ]
};