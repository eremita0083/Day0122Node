/**
 * @author Dai
 */
var http = require('http');
var path = require('path');

var pages = [{
	route : '',
	output : 'hello'
}, {
	route : 'jp',
	output : 'こんにちははjpです'
}, {
	route : 'ch',
	output : function(){return 'ニーハオは'+ this.route;}
}];

http.createServer(function(req,res){
	var lookup = path.basename(decodeURI(req.url));
	console.log('pathは「'　+　lookup　+　'」');
	pages.forEach(function(page){
		if(page.route === lookup){
			res.writeHead(200,{'Content-Type':'text/html; charset = utf-8'});
			res.end(typeof page.output === 'function' ? page.output() : page.output);
		}
		if(!res.finished){
			res.writeHead(404);
			res.end('file not found');
		}
	});
}).listen(8000);

//ポート待ち受け番号表示
console.log('server is runnging on 8000');
