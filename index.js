var dss     = require('dss')
var gutil   = require('gulp-util')
var through = require('through2')

/*dss.parser('section', function(i,line,block,file){
    return line
})*/

var PLUGIN_NAME = 'gulp-dss'

module.exports = function(opts){
    // extend parsers if parsers is {'name':fn(i,line,block,file)}
    if (opts && opts.parsers && (Object.prototype.toString.call(opts.parsers) === '[object Object]')) {
        var parsers = opts.parsers
        for (var key in parsers) {
            dss.parser(key, parsers[key])
        }
    }

    function plugin(file, enc, cb) {
        var _this = this

        if (file.isNull()) return;
        if (file.isStream()) return this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Not supporting streams'))

        // process
            //console.log(file.contents.toString())
        dss.parse(file.contents.toString(), {}, function(dssString) {
            //console.log(dssString)
            file.contents = new Buffer(JSON.stringify(dssString))
            return cb(null, file)
        })
    }

    return through.obj(plugin)
}

