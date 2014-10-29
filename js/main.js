$(document).ready(function(){
	$('.infield').inFieldLabels();
	
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
});