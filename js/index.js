$(function(){

	var mySwiper;

	/**
	 * 初始化函数
	 * 
	 */

	function init () {

		InitSwiper();

		Events();		// 事件函数
	}

	/**
	 * 初始化swiper
	 */
	function InitSwiper(){
		mySwiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        direction: 'vertical',
	        slidesPerView: 1,
	        paginationClickable: true,
	        mousewheelControl: true,
	        speed:1000,
	    });
	}


	/**
	 * 事件函数
	 */
	function Events() {
		// 导航
		$('.nav_item').hover(function(){
	    	$(this).find('span').css('width','100%');
	    },function(){
	    	$(this).find('span').css('width','0');
	    })

		$('.nav_item').click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			var index = $(this).index();
			mySwiper.slideTo(index, 1000, false);//切换到第一个slide，速度为1秒
		})

	};


	// 初始化
	init();

})