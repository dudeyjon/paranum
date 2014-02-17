<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Paragraph Numbering Options</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<script language="javascript" type="text/javascript" src="<?php echo includes_url(); ?>js/jquery/jquery.js"></script>
	<script language="javascript" type="text/javascript" src="<?php echo includes_url(); ?>js/tinymce/tiny_mce_popup.js"></script>
	<script language="javascript" type="text/javascript" src="<?php echo PARANUM_URLPATH; ?>tinymce/paranum.js"></script>
	<style>
	input { 
		padding: 3px; 
	}
	.paranum_label {
		width: 75px;
		float: left;
		line-height: 20px;
	}
	.paranum_panel {
		background: white;
		border: 1px solid silver;
		padding: 5px 10px;
	}
	</style>
	<base target="_self" />
</head>
<body id="link">

<form name="paranum_form" action="" onsubmit="return false;">

	<div class="paranum_panel">
	
		<h4>List Attributes</h4>
		
		<p><label for="paranum_start" style="clear: both;"><strong class="paranum_label">Start at:</strong></label>
		<input type="text" id="paranum_start" name="paranum_start"> e.g. 1 or a</p>
			   
		<p><label for="paranum_prefix" style="clear: both;"><strong class="paranum_label">Prefix:</strong></label>
		<input type="text" id="paranum_prefix" name="paranum_prefix"> e.g. (</p>

		<p><label for="paranum_suffix" style="clear: both;"><strong class="paranum_label">Suffix:</strong></label>
		<input type="text" id="paranum_suffix" name="paranum_suffix"> e.g. : or )</p>

		<p><label for="paranum_elements" style="clear: both;"><strong class="paranum_label">Elements:</strong></label>
		<input type="text" id="paranum_elements" name="paranum_elements"> e.g. p, ul</p>
	
		<p><strong class="paranum_label">Output:</strong> <input type="radio" name="output" id="paranum_shortcode" value="shortcode" checked="checked"><label for="paranum_shortcode">Shortcodes</label>
		<input type="radio" name="output" id="paranum_xhtml" value="xhtml"><label for="paranum_xhtml">HTML</label></p>
			
		<p><strong class="paranum_label">Apply to:</strong> <input type="radio" name="applyto" id="paranum_document" value="document" checked="checked"><label for="paranum_document">Whole document</label>
		<input type="radio" name="applyto" id="paranum_selection" value="selection"><label for="paranum_selection">Selection</label></p>
		
	</div>
	
	<div class="mceActionPanel" style="text-align: right;">
	
		<input class="mceButton" type="button" id="cancel" name="cancel" value="Close" style="float: left;"/>
		<input class="mceButton" type="button" id="remove" name="remove" value="Remove" />
		<input class="mceButton" type="submit" id="insert" name="insert" value="Insert" />

	</div>

</form>
</body>
</html>