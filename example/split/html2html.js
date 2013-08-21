(function(outside){
	var html2data=function(html,mapping_rules){
		mapping_rules=JSON.parse(mapping_rules);
		var version=mapping_rules.version||1;
		if(version>2){
			throw "no support version:"+version;
		}
		switch(version){
			case 1:return parseMappingRulesV1(html,mapping_rules);
			case 2:return parseMappingRulesV2(html,mapping_rules);
		}
	};
	var data2html=function(data,template,adapter){
		return adapter(data,template);
	};

	var parseMappingRulesV1=function(html,mapping_rules){
		var mapping=mapping_rules.mapping||{};
		var data={};
		var $html=$("<div/>").append(html);
		for(var selector in mapping){
			var name=mapping[selector];
			fillDataBySimpleSelector($html,selector,name,data);
		} 
		return data;
	};
	var fillDataBySimpleSelector=function($html,selector,name,data){
		if(!data[name]){
				data[name]=[];
			};
		$html.find(selector).each(function(){
			data[name].push($(this).html());
		})
	};
	var parseMappingRulesV2=function(html,mapping_rules){
		var mapping=mapping_rules.mapping||{};
		var data={};
		var $html=$("<div/>").append(html);
		for(var selector in mapping){
			var nameOrSubSelector=mapping[selector];
			var name;
			if(nameOrSubSelector.constructor == String){
				// name:html pair
				name=nameOrSubSelector;
			}else{
				//sub selector
				name=nameOrSubSelector.name;
			}
			if(!data[name]){
					data[name]=[];
				};
			$html.find(selector).each(function(){
				var $this=$(this);
				var sub_data=getNodeData($this,nameOrSubSelector);
				data[name].push(sub_data);
			})
		} 
		 return data;
	};
	var getNodeData =function($part,nameOrSubSelector,data){
		if(nameOrSubSelector.constructor == String){
			// name:html pair
			return $part.html();
		}else{
			//sub selector
			return getDataBySelector($part,nameOrSubSelector);
		}
	};
	/**
	 *$part=$('a')[0]
	 *subSelector={
				"name":"link",
				"@href":"href",
				"html":"html",
				"mapping":{}
			}
	 *return {"href":"http://www.google.com","html":"Google"}
	 */
	var getDataBySelector=function($part,subSelector){
		var data={};
		for(var key in subSelector){
			if("name"==key)continue;
			else if("html"==key){
				data["html"]=$part.html();
			}else if("@"==key[0]){//attribute
				var aName=subSelector[key];
				var attr=key.substr(1);
				data[aName]=$part.attr(attr);
			}
		}
		return data;
	}

	h2h={
		html2data:html2data,
		data2html:data2html
	};
	outside.h2h=h2h;
})(this);