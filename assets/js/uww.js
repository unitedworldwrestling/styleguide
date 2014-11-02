(function ($) {
  Drupal.behaviors.uww = {
    attach: function (context, settings) {
    	$( document ).ready(function() {

    		//$('.infield').inFieldLabels();
				
				// Toggle active class in language drop
				$('.languageSelect li').click(function(){
					$('.languageSelect li').removeClass('active');
					$(this).addClass('active');
				});
				
				// Toggle hamburger function and add height for sidebar
				$('#hamburger').click(function(){
					if(!$('body').hasClass('mobOpen')){
						$('#mobSidebar').css({'height':$(document).height()});
						$('body').addClass('mobOpen');
					}else{
						$('#mobSidebar').css({'height':'auto'});
						$('body').removeClass('mobOpen');
					}
				});
				
				// Sidebar menu toggle
				$('.sidebarMenu li').click(function(){
					if( $(this).hasClass('hasSubMenu') ){
						$('.sidebarMenu li').removeClass('active');
						$(this).addClass('active');
						return false;
					}
				});
				
				// Schedule
				$('.schedule .title').click(function(){
					if(!$(this).parent().hasClass('active')){
						$(this).parent().addClass('active');
					}else{
						$(this).parent().removeClass('active');
					}
				});
    		var $containerDetail = $('.media-gallery-media.media-gallery-view-full').packery({
				itemSelector: '.field-item',
  				gutter: 0
			});
			$containerDetail.imagesLoaded( function() {
				$containerDetail.packery();
			});

			var $containerBlock = $('.node-type-article .media-gallery-media').packery({
				itemSelector: '.field-item',
  				gutter: 0,
  				isHorizontal: true,
  				containerStyle: null
			});
			$containerBlock.imagesLoaded( function() {
				$containerBlock.packery();
			});

			$containerBlock.packery( 'on', 'layoutComplete', function() {
				var galleryWidth = $('.media-gallery-media .field-items').width();

				$('.media-gallery-media').wrap('<div class="swiper-slide"></div>');
				$('.swiper-slide').wrap('<div class="swiper-wrapper"></div>');
				$('.swiper-wrapper').wrap('<div class="swiper-container"></div>');

				$('.swiper-container').prepend('<div class="swiper-scrollbar"></div>');
				//$('.swiper-container').prepend('<span class="icn gallery-prev"><span>Prev</span></span><span class="icn gallery-next"><span>Next</span></span>');

				$('.swiper-slide').css('width', galleryWidth + 'px');

				var mySwiper = $('.swiper-container').swiper({
					scrollContainer: true,
					/*freeMode: true,
					freeModeFluid: true,*/
					preventLinks: true,
					preventLinksPropagation: true,
					grabCursor: true,
					mousewheelControl: true,
					mousewheelControlForceToAxis: true,
					centeredSlides: false,
					momentumBounce: false,
					resistance: '100%',
					mode:'horizontal',
					scrollbar: {
				        container : '.swiper-scrollbar',
				        draggable : true,
				        hide: false,
				        snapOnRelease: true
				    }
				});
			});

			$('.media-wysiwyg').each(function(){
				var img = $(this).find('img');
				var caption = $(this).find('figcaption');

				img.css({
					'width': '100%',
					'height': 'auto',
					'marginTop': '0',
					'marginBottom': '0',
					'marginLeft': '0',
					'marginRight': '0',
				});
				if(img.css('float') == 'left') {
					$(this).css({
						'width': '50%',
						'marginRight': '20px',
					});
				}else if(img.css('float') == 'right') {
					$(this).css({
						'float': 'right',
						'width': '50%',
						'marginLeft': '20px',
					});
				}else {
					$(this).css({
						'width': '100%',
						'marginLeft': '0px',
						'marginRight': '0px',
					});
				}
			});
		});
    }
  };
})(jQuery);