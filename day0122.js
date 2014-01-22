/**
 * @author Dai
 */
var http = require('http');
var path = require('path');

var pages = [{
	route : '',
	output : 'こんにちは'
}, {
	route : 'jp',
	output : 'こんにちははjpです'
}, {
	route : 'ch',
	output : function(){return 'ニーハオは'+ this.route;}
}];

//pathによって異なるoutputを行うサーバ
http.createServer(function(req,res){
	var lookup = path.basename(decodeURI(req.url));
	console.log('pathは「'　+　lookup　+ '」');
	pages.forEach(function(page){
		console.log('pageは「'　+　page.route　+ '」');
		if(lookup === page.route){
			res.writeHead(200,{'Content-Type':'text/html; charset = utf-8'});
			res.end(typeof page.output === 'function' ? page.output() : page.output);
		}
	});
	if(!res.finished){
			res.writeHead(404);
			res.end('file not found');
	}
}).listen(8000);

console.log('server is runnging on 8000');
