Zepto(function ($) {

				var startposition = 0;

				var endposition = 0;

				var slidecontainer = null;

				var triangle = null;

				var slidercurrentposition = 0;

				var trianglecurrentposition = 0;

				var distance = 0;

				var moved = false;

				var slidewidth = 0;

				var slideindex = 0;

				var numslides = 0;

				var swipedistance = 0;

				var optionwidth = 0;

				var interval;
				var text;


				function beginSlide (e) {

					clearInterval(interval);

					text.removeClass('out').addClass('in');

					slidecontainer.css('-webkit-transition', '0');

					triangle.css('-webkit-transition', '0');

					startposition = e.touches[0].pageX;

					moved = false;

				}

				function moveSlide (e) {

					e.preventDefault();
					swipedistance = e.touches[0].pageX - startposition;

					var position = slidercurrentposition + swipedistance;


					var tposition = trianglecurrentposition + swipedistance/3;

					slidecontainer.css('-webkit-transform', 'translateX(' + position + 'px)');

					triangle.css('-webkit-transform', 'translateX(' + tposition + 'px)');

					moved = true;

				}


				function finishSlide (e) {

					if (moved) {

						if (Math.abs(swipedistance) > slidewidth/3.3) {

							if (swipedistance > 0) {

								if (slideindex > 0) {

									slideindex -= 1;

								}
							} else {

								if (slideindex < numslides - 1) {

									slideindex += 1;

								}
							}

						}
						slide();
					}

				}

				function getTrianglePosition () {

					trianglewidth = 28;

					var distance = (numslides - 1 - slideindex) * optionwidth + 24;

					return distance;
				}


				function slide() {

					newposition = slidewidth * (slideindex) * -1;

					slidecontainer.css('-webkit-transition', '.2s ease-in-out');

					triangle.css('-webkit-transition', '.2s ease-in-out');

					slidecontainer.css('-webkit-transform', 'translateX(' + newposition + 'px)');

					trianglecurrentposition = getTrianglePosition();

					triangle.css('-webkit-transform', 'translateX(' + trianglecurrentposition + 'px)');

					slidercurrentposition = newposition;

					setTimeout(function () {
						slidecontainer.css('-webkit-transition', '0');

						triangle.css('-webkit-transition', '0');

					})
				}


				function initSwipe (slidecontainer, options, startingindex) {

					slidecontainer.on('touchstart', beginSlide);

					slidecontainer.on('touchmove', moveSlide);

					slidecontainer.on('touchend', finishSlide);

					slidewidth = $(slidecontainer.children()[0]).width(); /*Can't see why it would not be the screen width but just in case*/

					slideindex = startingindex - 1;

					optionwidth = $(options.children()[0]).width();

					slide();
				}


				function animate() {

					text = $('#slide2');

					var fadedin = true;

					interval = setInterval(function () {

						if (fadedin) {

							text.removeClass('in').addClass('out');

							fadedin = false;

						} else {
							text.removeClass('out').addClass('in');

							fadedin = true;

						}
					}, 350);

				}

				$(document).ready( function () {

					slidecontainer = $('.slidecontainer');

					numslides = slidecontainer.children().length;

					scheight = window.innerHeight - slidecontainer.offset().top + 'px';

					slidecontainer.css('height', scheight);

					triangle = $('#triangle');

					initSwipe(slidecontainer, $('.options'), 2);

					animate();
				});

			});
