(function(outside){
	var html2data=function(html,mapping_rules){
		 var context = {title: "My New Post", body: "This is my first post!"}
		 return context;
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