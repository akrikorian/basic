/*global define, requirejs */

requirejs.config({
	enforceDefine: true,
	paths: {
		jquery: [
			'//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min',
			'jquery-2.1.3.min'
		]
	}
});

define(['jquery', 'sleepy'], function($, SM) {
	'use strict';

	$(function() {
		$('body').addClass((SM.isTouchDevice()) ? 'touchable': '');
		
		require(['fabric'], function (Fabric) {
			var canvas = new Fabric.Canvas('foo');
			var frameImage;
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

			Fabric.Image.fromURL('../images/logo-frame-2x.png', function (img) {
				img.scaleToHeight(canvas.height);			
				canvas.add(img);
				frameImage = img;
				frameImage.setOptions({
					selectable: false,
					evented: false
				});
			});
			canvas.add(text);
			canvas.setActiveObject(text);
			text.enterEditing();
			canvas.renderAll.bind(canvas);

			console.dir(canvas);
			// file upload

			$(':file').on('change', function (e) {
				console.log('file uploaded');

				// handle files
				if (this.files.length) {
					var reader = new FileReader();
					var group = new Fabric.Group([frameImage, text]);
				
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
							function scaleByWidth(image) { 
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
							if (scaleByWidth(backgroundImg)) {								
								backgroundImg.scaleToHeight(canvas.height);
								backgroundImg.minScaleLimit = backgroundImg.scaleY;
							} else {
								backgroundImg.scaleToWidth(canvas.width);
								backgroundImg.minScaleLimit = backgroundImg.scaleX;
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
	});
});