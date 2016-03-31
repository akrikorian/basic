<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/app/core/sleepy.php');

	$page = new \Sleepy\Template('page');

	$page->bindStart('content');
	?>
		<h2>test</h2>
		<canvas id="foo" width="384" height="412"></canvas>
		<input type="file" multiple/>
	<?php
	$page->bindStop('content');
	$page->show();