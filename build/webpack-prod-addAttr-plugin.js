 /* 
 **设置标签自定义属性 (cj)
 */

function AddAttrPlugin(options) {
    // Setup the plugin instance with options...
    this.options = options;
}

AddAttrPlugin.prototype.apply = function(compiler) {
    var attrs = this.options.attrs;
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
            // console.log(attrs)
            var _html = htmlPluginData.html;
            for(var key in attrs){
                if(key.indexOf('js')){
                    var jsName = key.split('.')[0];
                    var reg = new RegExp('<script\\b\\s?\\S*\\ssrc=\\S*'+jsName+'\\S[^>]*></script>', 'ig')
                    var _script = _html.match(reg);
                    // console.log(jsName,_script)
                    _script && _script.map(item => {
                        var str = item;
                        item = item.replace('<script', '<script '+attrs[key]);
                        _html = _html.replace(str, item);
                    })
                }
            }
            htmlPluginData.html = _html;
            callback(null, htmlPluginData);
        });
    });
}

module.exports = AddAttrPlugin;