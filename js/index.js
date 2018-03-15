$(function() {

    var mySwiper;
    var ExperSwiper;

    /**
     * 初始化函数
     * 
     */

    function init() {

        InitSwiper();

        // DisabledKey(); // 禁止查看源码
        
        LoadCanvas(); // 加载 Canvas

        Events(); // 事件函数

    }

    /**
     * 初始化swiper
     */
    function InitSwiper() {
        mySwiper = new Swiper('.swiper-container', {
            pagination: '.swiper_pagination',
            direction: 'vertical',
            slidesPerView: 1,
            paginationClickable: true,
            mousewheelControl: true,
            speed: 1000,
            onInit: function(swiper){
			    swiperAnimateCache(swiper); 
			    swiperAnimate(swiper); 
			}, 
            onSlideChangeStart: function(swiper) {
                if (swiper.activeIndex != 0) {
                    $('header').css({ 'color': '#000', 'background': '#FFF', 'border-bottom': '1px solid #DDD' })
                    $('.nav_item').css({ 'color': '#000' })
                    if(swiper.activeIndex == 2){
                    	$('.swiper-pagination-bullet').css({'background':'#333'});
                    	$('.swiper-pagination-bullet-active').css({'background':'#333'});
                    }else{
                    	$('.swiper-pagination-bullet').css({'background':'#FFF'});
                    	$('.swiper-pagination-bullet-active').css({'background':'#FFF'});
                    }
                } else {
                    $('header').css({ 'color': '#FFF', 'background': 'transparent', 'border-bottom': '0' })
                    $('.nav_item').css({ 'color': '#FFF' })
                    $('.swiper-pagination-bullet,.swiper-pagination-bullet-active').css({'background':'#FFF'});
                }
                $('.nav_item').eq(swiper.activeIndex).addClass('active').siblings().removeClass('active');
            },
			onSlideChangeEnd: function(swiper){ 
				swiperAnimate(swiper); 
			} 
        });

        ExperSwiper = new Swiper('.experience_slider',{
        	pagination: '.slide_pagination',
            slidesPerView: 1,
            paginationClickable: true,
            speed: 500,
            effect : 'fade',
			fade: {
			  crossFade: false,
			}
        })
    }

    /**
     * 加载canvas
     */
    function LoadCanvas(){
    	var canvas3 = document.querySelector('#canvas3');
        ctx = canvas3.getContext('2d');
        canvas3.width = window.innerWidth;
        canvas3.height = window.innerHeight;
        canvas3.style.background = "#000";
        ctx.lineWidth = .5;
        ctx.strokeStyle = (new Color(150)).style;

        var mousePosition = {
            x: 30 * canvas3.width / 100,
            y: 30 * canvas3.height / 100
        };

        var dots = {
            nb: 200,
            distance: 100,
            d_radius: 50,
            array: []
        };

        function colorValue(min) {
            return Math.floor(Math.random() * 255 + min);
        }

        function createColorStyle(r, g, b) {
            return 'rgba(' + r + ',' + g + ',' + b + ', 0.8)';
        }

        function mixComponents(comp1, weight1, comp2, weight2) {
            return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
        }

        function averageColorStyles(dot1, dot2) {
            var color1 = dot1.color,
                color2 = dot2.color;

            var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
                g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
                b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
            return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
        }

        function Color(min) {
            min = min || 0;
            this.r = colorValue(min);
            this.g = colorValue(min);
            this.b = colorValue(min);
            this.style = createColorStyle(this.r, this.g, this.b);
        }

        function Dot() {
            this.x = Math.random() * canvas3.width;
            this.y = Math.random() * canvas3.height;

            this.vx = -.5 + Math.random();
            this.vy = -.5 + Math.random();

            this.radius = Math.random() * 2;

            this.color = new Color();
        }

        Dot.prototype = {
            draw: function() {
                ctx.beginPath();
                ctx.fillStyle = this.color.style;
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.fill();
            }
        };

        function createDots() {
            for (i = 0; i < dots.nb; i++) {
                dots.array.push(new Dot());
            }
        }

        function moveDots() {
            for (i = 0; i < dots.nb; i++) {

                var dot = dots.array[i];

                if (dot.y < 0 || dot.y > canvas3.height) {
                    dot.vx = dot.vx;
                    dot.vy = -dot.vy;
                } else if (dot.x < 0 || dot.x > canvas3.width) {
                    dot.vx = -dot.vx;
                    dot.vy = dot.vy;
                }
                dot.x += dot.vx;
                dot.y += dot.vy;
            }
        }

        function connectDots() {
            for (i = 0; i < dots.nb; i++) {
                for (j = 0; j < dots.nb; j++) {
                    i_dot = dots.array[i];
                    j_dot = dots.array[j];

                    if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
                        if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                            ctx.beginPath();
                            ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                            ctx.moveTo(i_dot.x, i_dot.y);
                            ctx.lineTo(j_dot.x, j_dot.y);
                            ctx.stroke();
                            ctx.closePath();
                        }
                    }
                }
            }
        }

        function drawDots() {
            for (i = 0; i < dots.nb; i++) {
                var dot = dots.array[i];
                dot.draw();
            }
        }

        function animateDots() {
            ctx.clearRect(0, 0, canvas3.width, canvas3.height);
            moveDots();
            connectDots();
            drawDots();

            requestAnimationFrame(animateDots);
        }

        $('#canvas3').on('mousemove', function(e) {
            mousePosition.x = e.pageX;
            mousePosition.y = e.pageY;
        });

        $('#canvas3').on('mouseleave', function(e) {
            mousePosition.x = canvas3.width / 2;
            mousePosition.y = canvas3.height / 2;
        });

        createDots();
        requestAnimationFrame(animateDots);
    }

    /**
     * 事件函数
     */
    function Events() {
        // 导航
        $('.header_left h1').on('click',function(){
        	mySwiper.slideTo(0, 1000, true);
        	/*$('header').css({ 'color': '#FFF', 'background': 'transparent', 'border-bottom': '0' })
        	$('.nav_item').eq(0).addClass('active').siblings().removeClass('active');
            $('.nav_item').css({ 'color': '#FFF' })*/
        })
        $('.nav_item').hover(function() {
            $(this).find('span').css('width', '100%');
        }, function() {
            $(this).find('span').css('width', '0');
        })

        $('.nav_item').click(function() {
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            /*if (index != 0) {
                $('header').css({ 'color': '#000', 'background': '#FFF', 'border-bottom': '2px solid #DDD' })
                $('.nav_item').css({ 'color': '#000' })

            } else {
                $('header').css({ 'color': '#FFF', 'background': 'transparent', 'border-bottom': '0' })
                $('.nav_item').css({ 'color': '#FFF' })
            }*/
            mySwiper.slideTo(index, 1000, true);
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