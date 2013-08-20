(function(outside){
	var html2data=function(html,mapping_rules){
		mapping_rules=JSON.parse(mapping_rules);
		var version=mapping_rules.version||1;
		if(version>2){
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
	h2h={
		html2data:html2data,
		data2html:data2html
	};
	outside.h2h=h2h;
})(this);