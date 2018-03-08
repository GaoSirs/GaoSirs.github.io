$(function() {

    var mySwiper;

    /**
     * 初始化函数
     * 
     */

    function init() {

        InitSwiper();

        // DisabledKey(); // 禁止查看源码

        Events(); // 事件函数

    }

    /**
     * 初始化swiper
     */
    function InitSwiper() {
        mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            direction: 'vertical',
            slidesPerView: 1,
            paginationClickable: true,
            mousewheelControl: true,
            speed: 1000,
            onSlideChangeStart: function(swiper) {
                if (swiper.activeIndex != 0) {
                    $('header').css({ 'color': '#000', 'background': '#FFF', 'border-bottom': '2px solid #DDD' })
                    $('.nav_item').css({ 'color': '#000' })
                } else {
                    $('header').css({ 'color': '#FFF', 'background': 'transparent', 'border-bottom': '0' })
                    $('.nav_item').css({ 'color': '#FFF' })
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
        $('.header_left h1').on('click',function(){
        	mySwiper.slideTo(0, 1000, false);
        	$('header').css({ 'color': '#FFF', 'background': 'transparent', 'border-bottom': '0' })
        	$('.nav_item').eq(0).addClass('active').siblings().removeClass('active');
            $('.nav_item').css({ 'color': '#FFF' })
        })
        $('.nav_item').hover(function() {
            $(this).find('span').css('width', '100%');
        }, function() {
            $(this).find('span').css('width', '0');
        })

        $('.nav_item').click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            if (index != 0) {
                $('header').css({ 'color': '#000', 'background': '#FFF', 'border-bottom': '2px solid #DDD' })
                $('.nav_item').css({ 'color': '#000' })

            } else {
                $('header').css({ 'color': '#FFF', 'background': 'transparent', 'border-bottom': '0' })
                $('.nav_item').css({ 'color': '#FFF' })
            }
            mySwiper.slideTo(index, 1000, false);
        })


        // 分頁條
        $('.swiper-pagination-bullet').on('click', function() {
            var index = $(this).index()
            $('.nav_item').eq(index).addClass('active').siblings().removeClass('active');
        })

    };


   	/**
   	 * 禁止查看源码
   	 */
    function DisabledKey() {
	    document.onkeydown = function() {  
	        var e = window.event || arguments[0];  
	        //屏蔽F12  
	        if(e.keyCode == 123) {  
	            return false;  
	            //屏蔽Ctrl+Shift+I  
	        } else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)) {  
	            return false;  
	            //屏蔽Shift+F10  
	        } else if((e.shiftKey) && (e.keyCode == 121)){  
	            return false;  
	        }  
	    };

	    //屏蔽右键单击  
	    document.oncontextmenu = function() {  
	        return false;  
	    }  
    };


    // 初始化
    init();

})