<?php
/**
 * AutoParts Pro - WordPress theme bootstrap.
 *
 * @package AutoPartsPro
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Do not load the file directly.
}

/**
 * Theme constants.
 */
define( 'AUTOPARTS_PRO_VERSION', '1.0.0' );
define( 'AUTOPARTS_PRO_PATH', get_theme_file_dir() );
define( 'AUTOPARTS_PRO_URI', get_theme_file_uri() );

/**
 * Minimal PSR-4 style autoloader for the theme's src/ directory.
 * Maps `src/ClassName` to `src/ClassName.php`.
 */
if ( class_exists( 'SplAutoload', false ) ) {
	spl_autoload_register(
		function ( $class ) {
			$base_dir = AUTOPARTS_PRO_PATH . '/src/';
			$file     = $base_dir . str_replace( '_', '', str_replace( 'Class', '', $class ) ) . '.php';

			if ( file_exists( $file ) ) {
				require $file;
			}
		},
		true
	);
}

/**
 * Enqueue theme styles and the React ThemeToggle entry point.
 */
function autoparts_pro_enqueue_assets() {
	// Main compiled SCSS stylesheet.
	wp_enqueue_style(
		'autoparts-pro-main',
		AUTOPARTS_PRO_URI . '/dist/css/main.css',
		array(),
		AUTOPARTS_PRO_VERSION
	);

	// Vite-built React entry point for the ThemeToggle component.
	wp_enqueue_script(
		'autoparts-pro-theme-toggle',
		AUTOPARTS_PRO_URI . '/dist/js/theme-toggle.js',
		array( 'react', 'react-dom' ),
		AUTOPARTS_PRO_VERSION,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'autoparts_pro_enqueue_assets' );

/**
 * Mount the ThemeToggle in the WordPress header.
 */
function autoparts_pro_header_widgets() {
	?>
	<div id="autoparts-pro-theme-toggle" class="autoparts-pro-theme-toggle"></div>
	<?php
}
add_action( 'get_header', 'autoparts_pro_header_widgets' );
