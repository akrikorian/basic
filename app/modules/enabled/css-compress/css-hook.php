<?php
namespace CSS;

require_once('class.css.php');

/**
 * Automatically compresses CSS files when the environment is live
 * @return string The CSS tags to embed in the head
 */
function render() {
	$args = func_get_args();
	$args = \Sleepy\Hook::addFilter("csscompress_files", array($args));

	if (ENV === "LIVE") {
		$c = new \CSS\Compress();

		$files = "";

		foreach ($args as $file) {
			if (empty($file)) {
				continue;
			}

			if (strlen($files) < 1) {
				$files = $file;
			} else {
				$files .= "&" . $file;
			}
		}

		$files = urlencode($files);
		return "<link rel=\"stylesheet\" type=\"text/css\" href=\"" . URLBASE . "modules/enabled/css-compress/?c={$files}\">";
	} else {
		foreach ($args as $file) {
			if (empty($file)) {
				continue;
			}
			$buffer .= "<link rel=\"stylesheet\" type=\"text/css\" href=\"" . URLBASE . "css/{$file}.css\">\n\t";
		}

		return $buffer;
	}
}

\Sleepy\Hook::applyFilter('render_placeholder_css', '\CSS\render');