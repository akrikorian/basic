<?php
@require_once(dirname(__FILE__) . '/../../../include/global.php');

/**
 * This is where the <link> tag points to. It should be in the format of:
 *
 * @code
 * <link rel="stylesheet" href="/modules/enabled/css-compress/?css=reset&main" >
 * @endcode
 */

// Do nothing if the get string is empty
if (!empty($_GET['c'])) {
	require_once('class.css.php');

	$c = new \CSS\Compress();
	$files = explode("&", $_GET['c']);
	foreach ($files as $file) {
		$c->add(DIRBASE . "/css/" . $file . ".css");
	}

	$c->show();
}