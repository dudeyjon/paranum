// Paragraph Numbering V2.0
// dudeyjon.com/paranum

// paranum class
function paranum() {

	this.elements = 'p';
	this.numclass = 'paranum';
	this.listclass = 'paralist';
	this.start = 1;
	this.prefix = '';
	this.suffix = '';
	this.output = 'shortcode';
	this.target = 'document';

}

// Remove paragraph numbering
paranum.prototype.remove = function() {

	this.setAttributes();
	var content = this.getContent();
	
	if (this.output == 'xhtml') {
		content = this.removeHtmlNum(content);
		content = this.removeHtmlList(content);
	}
	else {
		content = this.removeShortcodeNum(content);
		content = this.removeShortcodeList(content);
	}
	
	this.setContent(content);
	
	return true;
	
}

// Add paragraph numbering
paranum.prototype.add = function() {
	
	this.setAttributes();
	var content = this.getContent();
	
	content = this.removeShortcodeList(content);
	content = this.removeHtmlList(content);
	
	if (this.output == 'xhtml') {
		content = this.addHtmlNum(content);
		content = this.addHtmlList(content);
	}
	else {
		content = this.addShortcodeNum(content);
		content = this.addShortcodeList(content);
	}
	
	this.setContent(content);
	
}

// Add a paragraph list shortcode
paranum.prototype.addShortcodeList = function(content) {
	
	var attributes = '';
	
	if (this.start != '' && this.start != 1) { 
		attributes += ' start="'+ this.start +'"';
	}
	if (this.suffix != '') { 
		attributes += ' suffix="'+ this.suffix +'"';
	}
	if (this.prefix != '') { 
		attributes += ' prefix="'+ this.prefix +'"';
	}

	return '[paralist' + attributes + ']' + content + '[/paralist]';
	
}

// Add paragraph number shortcodes to elements
paranum.prototype.addShortcodeNum = function(content) {

	var temp = document.createElement('div');
	temp.innerHTML = content;
	
	var paragraphs = jQuery(temp).find(this.elements);
	for (var i=0; i<paragraphs.length; i++) {
		if ((jQuery(paragraphs[i]).text()).substr(0, 9) != '[paranum]') { 
			if (!this.isEmpty(paragraphs[i])) {
				jQuery(paragraphs[i]).prepend(document.createTextNode('[paranum]'));
			}
		}
	}
	
	return temp.innerHTML;
	
}

// Remove paragraph list shortcodes
paranum.prototype.removeShortcodeList = function(content) {
	
	var wrappedlists = /<p>\[\/?paralist[^\]]*?\]<\/p>/g;
	var lists = /\[\/?paralist[^\]]*?\]/g;
	
	content = (content).replace(wrappedlists, '');
	content = (content).replace(lists, '');
	
	return content;
	
}

// Remove paragraph number shortcodes
paranum.prototype.removeShortcodeNum = function(content) {
	
	var numbers = /\[\/?paranum[^\]]*?\]/g;
	content = (content).replace(numbers, '');
	
	return content;
	
}

// Add a html paragraph list element
paranum.prototype.addHtmlList = function(content) {
	
	var list = document.createElement('div');
	list.className = this.listclass;
	list.innerHTML = content;
	
	var temp = document.createElement('div');
	temp.appendChild(list);
 
	return temp.innerHTML;
	
}

// Add html paragraph numbers to elements
paranum.prototype.addHtmlNum = function(content) {

	var temp = document.createElement('div');
	temp.innerHTML = content;
	var paragraphs = jQuery(temp).find(this.elements);
	var letter = '';
	
	for (var i=0; i<paragraphs.length; i++) {
		if (jQuery(paragraphs[i]).find('span.paranum').length < 1) { 
			if (!this.isEmpty(paragraphs[i])) {
				var number = document.createTextNode(this.prefix+(letter+this.count)+this.suffix);
				var span = document.createElement('span');
				span.appendChild(number);				
				span.className = this.numclass;
				jQuery(paragraphs[i]).prepend(span);
	
				if (isNaN(this.count)) {
					if (this.count == 'z') {
						this.count = 'a';
						if (letter == '') {
							var letter = this.count;
						}
						else {
							letter++;
						}
					}
					else {
						this.count = String.fromCharCode(this.count.charCodeAt() + 1);
					}
				}
				else {
					this.count++;
				}
			}
		}
	}
	
	return temp.innerHTML;
	
}

// Remove html paragraph list elements
paranum.prototype.removeHtmlList = function(content) {

	var temp = document.createElement('div');
	temp.innerHTML = content;
	
	var lists = jQuery(temp).find('div.'+this.listclass);
	for (i=0; i<lists.length; i++) {
		var parent = lists[i].parentNode;
		while( lists[i].firstChild ) {
			parent.insertBefore( lists[i].firstChild, lists[i] );
		}
		parent.removeChild( lists[i] );
	}

	return temp.innerHTML;
	
}

// Remove html paragraph number elements
paranum.prototype.removeHtmlNum = function(content) {

	var temp = document.createElement('div');
	temp.innerHTML = content;
	
	var numbers = jQuery(temp).find('span.'+this.numclass);
	for (i=0; i<numbers.length; i++) {
		var parent = numbers[i].parentNode;
		parent.removeChild( numbers[i] );
	}
	
	return temp.innerHTML;
	
}

// Gets some existing attributes
paranum.prototype.getAttributes = function(content) {

	if (window.tinyMCE.activeEditor.paranumPrefix) {
		this.prefix = window.tinyMCE.activeEditor.paranumPrefix;
	}
	if (window.tinyMCE.activeEditor.paranumSuffix) {
		this.suffix = window.tinyMCE.activeEditor.paranumSuffix;
	}
	if (window.tinyMCE.activeEditor.paranumStart) {
		this.start = window.tinyMCE.activeEditor.paranumStart;
	}
	
	var shortcode = (content).match(/\[paralist[^\]]*?\]/g);
	
	if (shortcode && shortcode.length > 0) {
		var params = shortcode[0].match(/[\w-]+="[^"]*"/g);        
		if (params && params.length > 0) {
			for (var j=0; j<params.length; j++) {
				var attribute = (params[j].replace(/"|'/g,'')).split('=');
				this[attribute[0]] = attribute[1];
			}
		
		}
	}
	
	document.getElementById('paranum_prefix').value = this.prefix;
	document.getElementById('paranum_suffix').value = this.suffix;
	document.getElementById('paranum_start').value = this.start;
	
	if (window.tinyMCE.activeEditor.paranumElements && window.tinyMCE.activeEditor.paranumElements.toString() != '') {
		this.elements = window.tinyMCE.activeEditor.paranumElements;
	}
	document.getElementById('paranum_elements').value = this.elements;
	
	if (!window.tinyMCE.activeEditor.selection.isCollapsed()){
		var selection = window.tinyMCE.activeEditor.selection.getContent();
		if (selection.replace(/&nbsp;/g,'').length > 0) {
			document.getElementById('paranum_selection').checked = 'checked';
		}
	}
	
	if (window.tinyMCE.activeEditor.paranumOutput == 'xhtml') {
		document.getElementById('paranum_xhtml').checked = 'checked';
	}
	
	return true;
	
}

// Set paragraph numbering attributes
paranum.prototype.setAttributes = function(content)  {

	this.start = document.getElementById('paranum_start').value;
	if (this.start == '') {
		this.start = 1;
	}
	this.count = this.start;
	window.tinyMCE.activeEditor.paranumStart = this.start;
	
	this.prefix = document.getElementById('paranum_prefix').value.toString();
	window.tinyMCE.activeEditor.paranumPrefix = this.prefix;
	
	this.suffix = document.getElementById('paranum_suffix').value.toString();
	window.tinyMCE.activeEditor.paranumSuffix = this.suffix;
	
	if (document.getElementById('paranum_selection').checked) {
		this.target = 'selection';
	}
	else {
		this.target = 'document';
	}	

	if (document.getElementById('paranum_xhtml').checked) {
		this.output = 'xhtml';
	}
	else {
		this.output = 'shortcode';
		
	}
	window.tinyMCE.activeEditor.paranumOutput = this.output;
	
	if (document.getElementById('paranum_elements').value.toString() != '') {
		this.elements = document.getElementById('paranum_elements').value.toString();
	}
	else {
		this.elements = 'p';
	}
	window.tinyMCE.activeEditor.paranumElements = this.elements;

	return true;

}

// Gets the current content
paranum.prototype.getContent = function() {

    	if (this.target == 'selection') {
		var content = window.tinyMCE.activeEditor.selection.getContent({format : 'html'});
	}
	else {
		var content = window.tinyMCE.activeEditor.getContent({format : 'html'});
	}

	return content;
	
}

// Sets the content
paranum.prototype.setContent = function(content) {

	window.tinyMCE.activeEditor.focus();
	
	if (this.target == 'selection') {
	
		var bookmark = window.tinyMCE.activeEditor.selection.getBookmark(1);
		
		var start = window.tinyMCE.activeEditor.selection.getStart();
		var end = window.tinyMCE.activeEditor.selection.getEnd();
		
		window.tinyMCE.activeEditor.selection.setContent(content);
	window.tinyMCE.activeEditor.selection.moveToBookmark(bookmark);
		if (this.isEmpty(start)) {
			jQuery(start).remove();
		}
		if (this.isEmpty(end)) {
			jQuery(end).remove();
		}
		
		
		
	}
	else {
		window.tinyMCE.activeEditor.setContent(content);
	}
	
	var refresh = window.tinyMCE.activeEditor.getContent();
	window.tinyMCE.activeEditor.setContent(refresh);
	
	window.tinyMCE.activeEditor.undoManager.add();
	window.tinyMCE.activeEditor.execCommand('mceRepaint');
	
	return true;
	
}

// Checks for emptyness
paranum.prototype.isEmpty = function(paragraph) {

	var empty = ['', ' ', '<br>', '<br class="spacer_">', '<br class="spacer_" />'];
	
	paragraph = jQuery.trim(paragraph.innerHTML.replace(/&nbsp;/g,''));
		
	for (i=0; i<empty.length; i++) {
		if (paragraph == empty[i]) {
			return true;
		}
	}

	return false;
	
}

// Initialise
function paranum_init () {
	
	var numbering = new paranum();
	var content = numbering.getContent();
	numbering.getAttributes(content);
		
	tinyMCEPopup.executeOnLoad(function(){tinyMCEPopup.resizeToInnerSize()});
	
	jQuery('#cancel').click( function () { tinyMCEPopup.close(); } );
	jQuery('#insert').click( function() { numbering.add(); } );
	jQuery('#remove').click( function() { numbering.remove(); });
		
}
//tinyMCEPopup.executeOnLoad(paranum_init);
jQuery(document).ready(paranum_init);
