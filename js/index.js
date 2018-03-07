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
	        onSlideChangeStart: function(swiper){
		      if(swiper.activeIndex != 0){
		      	$('header').css({'color':'#000','background':'#FFF','border-bottom':'2px solid #DDD'})
		      	$('.nav_item').css({'color':'#000'})
		      }else{
		      	$('header').css({'color':'#FFF','background':'transparent','border-bottom':'0'})
		      	$('.nav_item').css({'color':'#FFF'})
		      }
		      $('.nav_item').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active');
		    }
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
			if(index != 0){
				$('header').css({'color':'#000','background':'#FFF','border-bottom':'2px solid #DDD'})
		      	$('.nav_item').css({'color':'#000'})

			}else{
				$('header').css({'color':'#FFF','background':'transparent','border-bottom':'0'})
				$('.nav_item').css({'color':'#FFF'})
			}
			mySwiper.slideTo(index, 1000, false);//切换到第一个slide，速度为1秒
		})
		$('.swiper-pagination-bullet').on('click',function(){
			var index = $(this).index()
			$('.nav_item').eq(index).addClass('active').siblings().removeClass('active');
		})

	};


	// 初始化
	init();

})