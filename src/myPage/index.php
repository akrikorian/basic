<?php
	require_once($_SERVER['DOCUMENT_ROOT'] . '/app/core/sleepy.php');

	$page = new \Sleepy\Template('page');

	$page->bindStart('content');
	?>
		<h2>test</h2>
		<div class="canvas-outer">
			<canvas id="foo" width="384" height="412"></canvas>
			<img id="frame" src="/images/logo-frame-2x.png" />
		</div>
		<input type="file" multiple/>
	<?php
	$page->bindStop('content');
	$page->show();