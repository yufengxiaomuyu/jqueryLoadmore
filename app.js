var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

http.createServer(function(req,res){
	var pathObj = url.parse(req.url,true);
	if (pathObj.pathname === "/") pathObj.pathname += "index.html";
	console.log(pathObj);
	
	switch (pathObj.pathname) {
        case "/loadMore":
            setTimeout(function(){
            	console.log(pathObj);
            	console.log(pathObj.query);
            	var index = pathObj.query.index;
			    var len = pathObj.query.len;
			    var news = [];
			    for (i = 0;i < len;i++) {
			    	news.push("新闻" + (parseInt(index) + i));
			    }
                var data = {"status": 1,"news": news};
			    res.end(JSON.stringify(data));
            },1500);
		    
        	break;
        default:
            fs.readFile(path.join(__dirname,"static",pathObj.pathname),function(err,data){
                if (err) {
                	res.statusCode = 404;
                	res.end("Not found");
                } else {
                	res.end(data);
                }
            });
	};
}).listen(8080);
