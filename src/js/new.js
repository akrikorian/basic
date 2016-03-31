require(['fabric'], function (Fabric) {
	var canvas = new Fabric.Canvas('foo');
	var imageInstance = new Fabric.Image(document.getElementById('frame'), {
		selectable: false,
		evented: false	
	});
	var text = new Fabric.IText( '', {
	 	fontFamily: 'arial black',
	 	fontSize: 100,
	  	left: 192, 
	 	top: 290,
	 	lockMovementX: true,
	 	lockMovementY: true,
	 	hoverCursor: 'text',
	 	cursorColor: 'red',
	 	stroke: 'white',
	 	fill: 'white',
	 	hasBorders: false			 	
	});

	text.on('editing:entered', function () {
		$(document).on('keyup', function (e) {
			
			if (text.width > canvas.width - 20) {
				text.setScaleX((canvas.width -20) / text.width);
				text.setScaleY(131 / text.height);

				// canvas.renderAll.bind(canvas);
			}
			text.centerH();
		});
	});
	text.on('text:changed', function () {
		console.log('text changed');
	});
	// text.on('editLLL', function (e) {
		
	// 	console.log('event listener off');
	// 	$(document).off('keydown');
	// });

	imageInstance.scaleToHeight(canvas.height);			
	canvas.add(imageInstance);
	canvas.add(text);
	canvas.setActiveObject(text);
	text.enterEditing();
	canvas.renderAll.bind(canvas);


	// file upload

	$(':file').on('change', function (e) {
		console.log('file uploaded');

		// handle files
		if (this.files.length) {
			var reader = new FileReader();
			var group = new Fabric.Group([imageInstance, text]);
		
			group.scaleToHeight(canvas.height / 2);
		
			group.top = 200;
			group.left = ((canvas.width / 2) - (group.getWidth() / 2));
			reader.onload = function () {
				return function (e) {
					var backgroundImg; 
					var img = new Image();
					var brightness = new Fabric.Image.filters.Brightness();
					var grayscale = new Fabric.Image.filters.Grayscale();

					function renderOptions () {
						var imageOption = document.createElement('input'),
							contrastOption = document.createElement('input'),
							imageLabel = document.createElement('label'),
							contrastLabel = document.createElement('label'),
							divEl = document.createElement('div');

						divEl.className = 'options';

						imageLabel.setAttribute('for', 'zoom-option');
						contrastLabel.setAttribute('for', 'contrast-option');
						imageLabel.innerHTML = 'Image';
						contrastLabel.innerHTML = 'Contrast';

						imageOption.type = 'radio';
						imageOption.name = 'control';
						imageOption.id = 'zoom-option';
						imageOption.setAttribute('checked', 'checked');

						contrastOption.type = 'radio';
						contrastOption.name = 'control';
						contrastOption.id = 'contrast-option';

						divEl.appendChild(imageOption);
						divEl.appendChild(imageLabel);
						divEl.appendChild(contrastOption);
						divEl.appendChild(contrastLabel);
						$('.wrapper').append(divEl);
						

						// click handler to show/hide an option's slider

						$('#zoom-option').on('click', function () {
							$('input[type=range]').removeClass('active');
							$('#zoom-control').addClass('active');
						});
						$('#contrast-option').on('click', function () {
							$('input[type=range]').removeClass('active');
							$('#contrast-control').addClass('active');
						});
					}							
					function renderSliderControls () {
						// add controls

						var divEl = document.createElement('div'),
							zoomSlider = document.createElement('input'),
							contrastSlider = document.createElement('input');

						divEl.className = 'sliders';

						zoomSlider.type = 'range';
						zoomSlider.id = 'zoom-control';
						// set as active first
						zoomSlider.className = 'active';
						zoomSlider.defaultValue = 0;

						contrastSlider.type = 'range';
						contrastSlider.id = 'contrast-control';
						contrastSlider.defaultValue = 0;

						divEl.appendChild(zoomSlider);
						divEl.appendChild(contrastSlider);
						$('.wrapper').append(divEl);

						// control handlers

						$('#zoom-control').on('change', function () {		
							// scaling starts a the minimum scale limit set earlier, then adds a percentage of itself to the minimum scale
							// limit depending on the slider value (0-100). i.e. 100 is double the original size
							backgroundImg.scale(backgroundImg.minScaleLimit + (backgroundImg.minScaleLimit * (parseInt(this.value, 10) / 100)));								
							canvas.renderAll();																						
						});

						$('#contrast-control').on('change', function () {
							// set new brightness based on slider position
							brightness.setOptions({brightness: parseInt(this.value, 10)});
							backgroundImg.applyFilters(canvas.renderAll.bind(canvas));																											
						});
					}
					function scaleByWidth(image, canvas) { 
						if (image.getWidth() > image.getHeight()) {
							return true;
						}
						return false;
					}
					function renderDownloadButton() {
						var downloadButton = document.createElement('a');
						
						downloadButton.innerHTML = 'Download';
						$('.wrapper').append(downloadButton);

						// download canvas 
						$(downloadButton).on('click', function (e) {
							var anchor = document.createElement('a');
							
							e.stopPropagation(); 
							anchor.href = canvas.toDataURL();
							anchor.download = 'file.jpg';
							anchor.click();																	
						});
					}
					img.src = e.target.result;
					backgroundImg = new Fabric.Image(img);
					backgroundImg.setOptions({
						centeredScaling: true,
						hasBorders: false,
                    	hasControls: false
					});
					// add initial filter
					backgroundImg.filters.push(brightness);
					backgroundImg.filters.push(grayscale);
					backgroundImg.applyFilters(canvas.renderAll.bind(canvas));
					canvas.clear();

					// scale by width or height
					if (scaleByWidth(backgroundImg, canvas)) {
						backgroundImg.scaleToWidth(canvas.getWidth());
						backgroundImg.minScaleLimit = backgroundImg.scaleX;
					} else {
						backgroundImg.scaleToHeight(canvas.getHeight());
						backgroundImg.minScaleLimit = backgroundImg.scaleY;
					}
					
					// add images to canvas
					canvas.add(backgroundImg);
					canvas.add(group);
					backgroundImg.on("moving", function () {
						var imageBoundaries;
						// prevents whitespace between the image's boundaries and the viewable area's boundaries
						this.setCoords();
						imageBoundaries = this.getBoundingRect();
						if (imageBoundaries.left > 0) {
							this.setLeft(0);
						}
						if (imageBoundaries.left + imageBoundaries.width < canvas.width) {
							// this.setLeft(Math.min(0, Math.max(canvas.width - imageBoundaries.width, imageBoundaries.left)) + imageBoundaries.width / 2);								
							this.setLeft((imageBoundaries.width - canvas.width) * -1);
						}
						if (imageBoundaries.top > 0) {
							this.setTop(0);
						}
						if (imageBoundaries.top + imageBoundaries.height < canvas.height) {
							// this.setLeft(Math.min(0, Math.max(canvas.width - imageBoundaries.width, imageBoundaries.left)) + imageBoundaries.width / 2);								
							this.setTop((imageBoundaries.height - canvas.height) * -1);
						}

					});
					// render radio buttons for contrast or image scaling 
					// render sliders
					renderOptions();
					renderSliderControls();
					renderDownloadButton();	
				};
			}();

			reader.readAsDataURL(this.files[0]);		
						
		}
	});
});

// require(['fabric'], function(Fabric) {
// 	var canvas = new Fabric.Canvas('foo');

// 	// load canvas					
// 	function load() {
// 		var textBox;

// 		// apply background image to canvas
// 		canvas.setBackgroundImage('../images/logo-frame-2x.png', function(){
// 			canvas.backgroundImage.width = canvas.width;
// 			canvas.backgroundImage.height = canvas.height;
// 			canvas.renderAll();
// 		});

// 		textBox = new Fabric.IText( '', {
// 		 	fontFamily: 'arial black',
// 		 	fontSize: 100,
// 		  	left: 192, 
// 		 	top: 290,
// 		 	lockMovementX: true,
// 		 	lockMovementY: true,
// 		 	hoverCursor: 'text',
// 		 	cursorColor: 'red',
// 		 	stroke: 'white',
// 		 	fill: 'white',
// 		 	hasBorders: false			 	
// 		});
// 		canvas.add(textBox);
// 		textBox.on({
// 			'editing:entered': function() {
// 				var that = this;
// 				console.log('keyup centering event on');
// 				// centers text after typing
// 				$(document).on('keyup', function (e) {							
// 					if (that.width > canvas.width - 20) {
// 						that.setScaleX((canvas.width -20) / that.width);
// 						that.setScaleY(131 / that.height);

// 						// canvas.renderAll.bind(canvas);
// 					}
// 					that.centerH();
// 				});
// 			},
// 			'editing:exited': function() {
// 				console.log('keyup centering event off');
// 				// removes event when not editing
// 				$(document).off('keyup');
// 			}
// 		});

// 		canvas.renderAll.bind(canvas);
// 		canvas.setActiveObject(textBox);
// 		textBox.enterEditing();
// 	}
// 	function renderOptions() {
// 		var imageOption = document.createElement('input'),
// 			brightnessOption = document.createElement('input'),
// 			imageLabel = document.createElement('label'),
// 			brightnessLabel = document.createElement('label'),
// 			divEl = document.createElement('div');

// 		divEl.className = 'options';

// 		imageLabel.setAttribute('for', 'zoom-option');
// 		brightnessLabel.setAttribute('for', 'brightness-option');
// 		imageLabel.innerHTML = 'Image';
// 		brightnessLabel.innerHTML = 'brightness';

// 		imageOption.type = 'radio';
// 		imageOption.name = 'control';
// 		imageOption.id = 'zoom-option';
// 		imageOption.setAttribute('checked', 'checked');

// 		brightnessOption.type = 'radio';
// 		brightnessOption.name = 'control';
// 		brightnessOption.id = 'brightness-option';

// 		divEl.appendChild(imageOption);
// 		divEl.appendChild(imageLabel);
// 		divEl.appendChild(brightnessOption);
// 		divEl.appendChild(brightnessLabel);
// 		$('.wrapper').append(divEl);
		

// 		// click handler to show/hide an option's slider

// 		$('#zoom-option').on('click', function() {
// 			$('input[type=range]').removeClass('active');
// 			$('#zoom-control').addClass('active');
// 		});
// 		$('#brightness-option').on('click', function() {
// 			$('input[type=range]').removeClass('active');
// 			$('#brightness-control').addClass('active');
// 		});
// 	}
// 	function renderSliderControls() {
// 		// add controls

// 		var divEl = document.createElement('div'),
// 			zoomSlider = document.createElement('input'),
// 			brightnessSlider = document.createElement('input');

// 		divEl.className = 'sliders';

// 		zoomSlider.type = 'range';
// 		zoomSlider.id = 'zoom-control';
// 		// set as active first
// 		zoomSlider.className = 'active';
// 		zoomSlider.defaultValue = 0;

// 		brightnessSlider.type = 'range';
// 		brightnessSlider.id = 'brightness-control';
// 		brightnessSlider.defaultValue = 0;

// 		divEl.appendChild(zoomSlider);
// 		divEl.appendChild(brightnessSlider);
// 		$('.wrapper').append(divEl);

// 		// control handlers

// 		$('#zoom-control').on('change', function() {		
// 			// scaling starts a the minimum scale limit set earlier, then adds a percentage of itself to the minimum scale
// 			// limit depending on the slider value (0-100). i.e. 100 is double the original size
// 			// backgroundImg.scale(backgroundImg.minScaleLimit + (backgroundImg.minScaleLimit * (parseInt(this.value, 10) / 100)));								
// 			// canvas.renderAll();																						
// 		});

// 		$('#brightness-control').on('change', function() {
// 			// set new brightness based on slider position
// 			// brightness.setOptions({brightness: parseInt(this.value, 10)});
// 			// backgroundImg.applyFilters(canvas.renderAll.bind(canvas));																											
// 		});
// 	}
// 	function afterUpload(imgURL) {
// 		var img = new Image();

// 		// copy canvas
// 		// clear canvas
// 		// load uploaded image and canvas before upload
// 		img.src = imgURL;
// 	}
// 	load();		

// 	$(':file').on('change', function(e) {
// 		var reader = new FileReader(),
// 			file = e.target.files[0];
			

// 		reader.onload = function(e) {
// 			console.log(e);
// 		};
		
// 		reader.readAsDataURL(file);
// 	});		
// });