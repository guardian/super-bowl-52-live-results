var fs = require('fs-extra');
var sass = require('node-sass');
var handlebars = require('handlebars');

module.exports = {
    css: function(absolutePath) {
        var css = sass.renderSync({
            file: './src/style.scss'
        }).css.toString('utf8');

        return css.replace(/@@assetPath@@/g, absolutePath);
    },

    js: function() {
        return fs.readFileSync('src/script.js', 'utf8');
    },

    html: function(path, absolutePath, version) {
        var html = fs.readFileSync('src/index.html', 'utf8');
        var template = handlebars.compile(html);

        console.log(this.js());

        fs.writeFileSync(path + '/index.html', template({
            style: this.css(absolutePath),
            javascript: this.js()
        }).replace(/@@assetPath@@/g, absolutePath));

        console.log('updated html!');
    }
} 