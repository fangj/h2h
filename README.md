Html2Html
===
a javascript library to extract content from html and build new html.

HTML --(Css Selector)--> JSON --(Javascript Template) -->HTML

My purpose is to adapt the web page for mobile device screen without change Server's content. Because mobile device offen has a smaller screen than PC, the full size page is not suit for mobile device. Although many website has responsive design. There still some website not. Besides, for people has limit bandwidth, limit power, limit memory and limit CPU on mobile device, some extra resources like image and javascript are not supposed to load. With H2H and [WebViewJavascriptBridge](https://github.com/fangj/WebViewJavascriptBridge), you could build the page on client without pains.

USAGE
-----------

Include JQuery and Html2Html

	<script src="jquery-1.10.2.js"></script>
	<script src="html2html.js"></script>

Include your Javascript Template Engine

	<script src="template_engine/handlebars.js" ></script>

Prepare the *Mapping Rules* , *Javascript Template*

For Example, if you have a HTML like this:

#### Original HTML

	html_old="
	<h3>boy</h3>
	<code>hello world</code>
	"

#### Mapping Rules

	mapping_rules={
		"version":1,
		"mapping":{
			"h3":"title",
			"code":"body"
		}
	}

Run 

	var data=h2h.html2data(html_old,mapping_rules);

Got 

	data={"title":["boy"],"body":["hello world"]}

#### Javascript Template

If you use Handlebars Template

	template="
	<h1>{{title}}</h1>
	<div class="body">
		{{body}}
	</div>
	"

H2H do not depends on specific Javascript Template Engie, So you need supply a *Template Adapter*, like this:

	var handlebars_adapter=function(data,template){
		var compiled_template = Handlebars.compile(template);
		var html    = compiled_template(data);
		return html;
	}

Run 

	var html_new=h2h.data2html(data,template,handlebars_adapter);

Got 

	html_new="
	<h1>boy</h1>
	<div class="body">
		hello world
	</div>
	"

More Examples
-----------
[change-html-on-the-fly](https://github.com/fangj/h2h/tree/master/example/change-html-on-the-fly) show how to extract content from [BBC News](http://www.bbc.co.uk/news/) and show in grid.

API
-----------
h2h.html2data(html,mapping_rules)

h2h.data2html(data,template,adapter)

h2h.html2html(html,mapping_rules,template,adapter)

h2h.links2html(html,mapping_rules,template,adapter,onFinish)
