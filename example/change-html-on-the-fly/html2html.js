(function(outside){
	var html2data=function(html,mapping_rules){
		mapping_rules=JSON.parse(mapping_rules);
		var version=mapping_rules.version||1;
		if(version>1){
			throw "no support version:"+version;
		}
		var mapping=mapping_rules.mapping||{};
		var data={};
		var $html=$("<div/>").append(html);
		for(selector in mapping){
			var tag=mapping[selector];
			if(!data[tag]){
				data[tag]=[];
			};
			$html.find(selector).each(function(){
				data[tag].push($(this).html());
			})
		} 
		 return data;
	};
	var data2html=function(data,template,adapter){
		return adapter(data,template);
	};
	var wait = function(callbacks, done) {
	   var counter = callbacks.length;
	   var next = function() {
	      if(--counter == 0) {
	         done();
	      }
	   };
	   for(var i = 0; i < callbacks.length; i++) {
	      callbacks[i](next);
	   }
	};
	var download=function(link,results){
		var a = function (next) {
		   jQuery.get(link, function(res){
		   		if(res.responseText){
		   			results[link]=res.responseText;	
		   		}else{
		   			results[link]=res;
		   		}
	        	next();
	    	});
	  	};
	  	return a;
  	};
  	var downloadLinks=function(links,results,done){
  		var downloaders=[];
  		for (var i = 0; i < links.length; i++) {
  			var downloader=download(links[i],results);
  			downloaders.push(downloader);
  		};
  		wait(downloaders,done);
  	};
	h2h={
		html2data:html2data,
		data2html:data2html,
		downloadLinks:downloadLinks
	};
	outside.h2h=h2h;
})(this);