<?php
/*
Plugin Name: Paragraph Numbering
Plugin URI: http://www.dudeyjon.com/paranum
Description: Adds customisable element numbering to Wordpress with TinyMCE integration.
Author: Jon Elliott
Version: 2.0
Author URI: http://www.dudeyjon.com
*/

class paranum {
 
	private $count;
	private $prefix;
	private $suffix;
 
	public function __construct() {
	
		global $wp_version;
		
		$this->count = 1;
		$this->prefix = '';
		$this->suffix = '. ';

		add_action('init', array ( $this, 'add_button' ) );
		add_shortcode('paranum', array($this, 'number_shortcode'));
		add_shortcode('paralist', array($this, 'list_shortcode'));
		add_action('wp_enqueue_scripts', array($this, 'add_styles'));
		
	}
	
	public function add_styles() {
		wp_register_style('paranum-style', plugins_url('paranum.css', __FILE__));
		wp_enqueue_style('paranum-style');
	}
	
	public function add_button() {
	
		define('PARANUM_URLPATH', plugin_dir_url( __FILE__ ));
		define('PARANUM_ABSPATH', plugin_dir_path( __FILE__ ));

		if ( !current_user_can( 'edit_posts' ) && !current_user_can( 'edit_pages' ) ) {
			return;
		}
		
		if ( get_user_option('rich_editing') == 'true') {
			add_filter("mce_external_plugins", array ( $this, "tinymce_plugin" ));
			add_filter('mce_buttons', array ( $this, 'register_button' ));
		}
		
		add_action('wp_ajax_paranum_tinymce_window', array($this, 'tinymce_window'));
		
	}
	
	public function register_button($buttons) {
		
		array_push( $buttons, 'separator', 'paranum' );
		return $buttons;
		
	}
	
	public function tinymce_plugin($plugin_array) {    
		
		$plugin_array['paranum'] =  PARANUM_URLPATH.'tinymce/editor_plugin.js';
		return $plugin_array;
		
	}

	public function number_shortcode( $atts , $content = null ) {

		$span = '<span class="paranum">' . $this->prefix . $this->count . $this->suffix . '</span>';
		$this->count++;
		return $span;
		
	}
	
	public function list_shortcode( $atts , $content = null ) {
	
		extract( shortcode_atts( array(
			'start' => 1,
			'prefix' => '',
			'suffix' => ''
		), $atts ) );
		
		$this->count = $start;
		$this->prefix = $prefix;
		$this->suffix = $suffix;

		$content = $this->trim_replace('</p>', '', $content);
		$content = $this->trim_replace('<p>', '', $content, true);
		
		$content =  '<div class="paralist">' . do_shortcode($content) . '</div>';

		return $content;

	}
	
	public function tinymce_window() {
	
		require_once( PARANUM_ABSPATH . '/tinymce/window.php' );
		exit;
		
	}
	
	public function trim_replace($search, $replace, $subject, $end = false) {
		
		if ($end) {
			$pos = strrpos($subject, $search);
			if ($pos == (strlen($subject) - strlen($search))) {
				$subject = substr_replace($subject, $replace, $pos, strlen($search));
			}
		}
		else {
			$pos = strpos($subject, $search);
			if ($pos == 0) {
				$subject = substr_replace($subject, $replace, $pos, strlen($search));
			}
		
		}

		return $subject;
		
	}

}

$para_num = new paranum();

?>