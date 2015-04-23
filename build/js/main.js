(function ($) {
  Drupal.behaviors.uww = {
    attach: function (context, settings) {
    	var xhr = null;

    	$( document ).ready(function() {

    		//$('.infield').inFieldLabels();
				
			// Toggle active class in language drop
			$('.languageSelect li', context).click(function(){
				$('.languageSelect li').removeClass('active');
				$(this).addClass('active');
			});
			
			// Toggle hamburger function and add height for sidebar
			$('#hamburger', context).click(function(){
				if(!$('body').hasClass('mobOpen')){
					$('#mobSidebar').css({'height':$(document).height()});
					$('body').addClass('mobOpen');
				}else{
					$('#mobSidebar').css({'height':'auto'});
					$('body').removeClass('mobOpen');
				}
			});
			
			// Sidebar menu toggle
			$('.sidebarMenu li', context).click(function(){
				if( $(this).hasClass('hasSubMenu') ){
					$('.sidebarMenu li').removeClass('active');
					$(this).addClass('active');
					return false;
				}
			});
			
			// Schedule
			$('.schedule li:first-child', context).addClass('active');
			$('.schedule .title', context).click(function(){
				$('.schedule .title').closest('ul').find('.active').removeClass('active');
				$(this).closest('li').addClass('active');
			});

			if($('.media-gallery-media.media-gallery-view-full', context).length > 0){
	    		var $containerDetail = $('.media-gallery-media.media-gallery-view-full').packery({
					itemSelector: '.field-item',
	  				gutter: 0
				});
				$containerDetail.imagesLoaded( function() {
					$containerDetail.packery();
				});
			}

			if($('.node-type-article .media-gallery-media, .node-type-event .media-gallery-media', context).length > 0){
				var $containerBlock = $('.node-type-article .media-gallery-media, .node-type-event .media-gallery-media').packery({
					itemSelector: '.field-item',
	  				gutter: 0,
	  				isHorizontal: true,
	  				containerStyle: null
				});
				$containerBlock.imagesLoaded( function() {
					$containerBlock.packery();
				});

				$containerBlock.packery( 'on', 'layoutComplete', function() {
					$('.media-gallery-media').wrap('<div class="swiper-slide"></div>');
					$('.swiper-slide').wrap('<div class="swiper-wrapper"></div>');
					$('.swiper-wrapper').wrap('<div class="swiper-container"></div>');

					$('.swiper-container').prepend('<div class="swiper-scrollbar"></div>');
					
					var i=0;
					$('.media-gallery-media .field-items').each(function(){
						i++;
						$(this).closest('.swiper-slide').css('width', $(this).width() + 'px');
						$(this).closest('.swiper-container').find('.swiper-scrollbar').attr('id', 'swiper-scrollbar-' + i)
						var mySwiper = $(this).closest('.swiper-container').swiper({
							scrollContainer: true,
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
						        container : '#swiper-scrollbar-' + i,
						        draggable : true,
						        hide: false,
						        snapOnRelease: true
						    }
						});
					});
				});
			}

			$('.media-wysiwyg', context).each(function(){
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

			$('#nav-event li.active a[data-toggle="tab"]', context).each(function(){
				var tabPane = $(this).attr('rel');
				$(tabPane).addClass('active');
			});

			$('a.ajax-link', context).click(function(e){
				e.preventDefault();

				var url = $(this).attr("href");
				var id = $(this).attr("rel");
				var selector = $(this).attr("rel");
				var callback = $(this).attr('data-callback');
				ajaxBefore(selector);
				ajaxLink(selector, url, callback, context);
			});

			$('a.video-close', context).click(function() {
				$('#video-player-inner').html('');
				$('.hero.feature').css('height', '435px');
  				$('.video-section').css('height', '435px');
  				$('a.video-close').hide();
				return false;
			});
		});
    }
  };

  function ajaxBefore(selector){
  	var styleLoading = '';
    $(selector).css({
    	//'height': $(selector).height() + 'px'
    	'height': '20px'
    });
    if($(selector).attr('id') == 'video-player-inner'){
    	$(selector).css({
	    	'background': 'black'
	    });
	    styleLoading = " style='background-color: black;'";
    }
    $(selector).html("<div class='ajax-loading'"+  styleLoading + "></div>");
  }

  function  ajaxLink(selector, url, callback, context) {
    var xhr = $.ajax({
      url: url,
      type: "GET",
      data: "ajax=1",

      success: function (data) {  
        ajaxAfter(context, selector, url, data, window, document);
        Drupal.attachBehaviors(selector, context);
        if(callback != ''){
	        var callbacks = $.Callbacks();
			callbacks.add(eval(callback));
			callbacks.fire(selector);
		}
      },
      error: function (xhr) {
      	console.log(xhr);
        //var data = xhr.response.replace("?ajax=1", "");
        ajaxAfter(context, selector, url, data, window, document);
      },
      cache: false
    });
  }

  function ajaxAfter(context, selector, url, data, window, document){
    $(selector).css({
    	'height': '',
    });
    $(selector).html(data);

    $('.video-section a.active').removeClass('active').parents('li').removeClass('active-trail');
    $('.video-section a').filter(function() {
      return $(this).attr('href')== url
    }).addClass('active').parents('li').addClass('active-trail'); 
  }

  function videoCallback(selector){
  	var height = $('#video-player iframe').height();
  	$('.hero.feature').css('height', height + 'px');
  	$('.video-section').css('height', height + 'px');
  	
  	$('a.video-close').show();
  }

})(jQuery);