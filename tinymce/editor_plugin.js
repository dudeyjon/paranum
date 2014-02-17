(function() {
	
	//tinymce.PluginManager.requireLangPack('paranum');
	
	tinymce.create('tinymce.plugins.paranum', {
		
		init : function(ed, url) {
			
			var t = this;
			t.url = url;
			t.count = '1';
			
			ed.addCommand('paranum', function() {
				ed.windowManager.open({
					file : ajaxurl + '?action=paranum_tinymce_window',
					width : 325,
					height : 265,
					inline : 1
				}, {
					plugin_url : url
				});
			});
			
			ed.addButton('paranum', {
				title : 'Add paragraph numbering',
				cmd : 'paranum',
				image : url + '/paranum-button.gif'
			});
			
			ed.onBeforeSetContent.add(function(ed, o) {
				o.content = t.addImages(o.content);
			});
  
			ed.onPostProcess.add(function(ed, o) {
				if (o.get) {
					o.content = t.removeImages(o.content);
				}
			});
			
			
		},
		
		createControl : function(n, cm) {
			return null;
		},
		
		getInfo : function() {
			return {
				longname : 'Paragraph Numbering',
				author : 'Jon Elliott',
				authorurl : 'http://www.dudeyjon.com',
				infourl : 'http://www.dudeyjon.com/paranum',
				version : "2.0"
			};
		},
		
		addImages : function(content) {
			
			var temp = document.createElement('div');
			temp.innerHTML = content;
			
			var numbers = temp.getElementsByTagName('span');
			
			for (j=0; j<numbers.length; j++) {
				if (numbers[j].className.indexOf("paranum") !== -1) {
					var input = document.createElement("input");
					input.className = 'paranum';
					input.value = numbers[j].innerHTML;
					input.type = 'button';
					input.disabled = 'disabled';
					numbers[j].parentNode.replaceChild(input, numbers[j]);
					j--;
				}
			}
			
			content = temp.innerHTML;
			return content;
			
		},
	  
		removeImages : function(content) {
			
			var temp = document.createElement('div');
			temp.innerHTML = content;
			
			var numbers = temp.getElementsByTagName('input');

			for (j=0; j<numbers.length; j++) {
				if (numbers[j].className.indexOf("paranum") !== -1) {
					var span = document.createElement("span");
					span.className = 'paranum';
					span.appendChild(document.createTextNode(numbers[j].value));
					numbers[j].parentNode.replaceChild(span, numbers[j]);
					j--;
				}
			}
			
			content = temp.innerHTML;
			return content;
			
		  }
			
		
	});

	tinymce.PluginManager.add('paranum', tinymce.plugins.paranum);
	
})();