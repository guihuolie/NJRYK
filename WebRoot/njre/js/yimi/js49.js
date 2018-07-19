$(document).ready(function() {
        //picFocus_1(".picFocus1",14,11000);
        //picFocus_1(".picFocus2",14,4000);
    });
function picFocus_1(picFocus,bt_li_pl_w,speed){
    var mum_li=$(picFocus+" .bd ul li").length;
    var flag=0;//浠庡乏渚у畾涔変釜寮€濮�
    //鍒濆鍖栨牱寮�
    fun1();
	//鎵ц鏁堟灉
	function fun1(){
		$(picFocus+" .bd ul li").eq(flag).stop().animate({"opacity":"1","z-index":"1000"},"fast").siblings().stop().animate({"opacity":"0","z-index":"1"},"fast");
    	$(picFocus+" .bt ul li").eq(flag).addClass("on_li").siblings().removeClass("on_li");
	};
    //鑷姩婊氬姩
    var timer =setInterval(fcpic,speed);
    function fcpic(){
        flag++;
        if(flag<mum_li){
           fun1();
        }else{
            flag=0;
            fun1();
        }
    }

    $(picFocus).hover(function(){
        clearInterval(timer);
    },function(){
        timer=setInterval(fcpic,speed);
    });
    //宸�
    $(picFocus+" .left").click(function(){
        if(flag<=0){
            flag=mum_li-1;
            fun1();
        }else{
            flag--;
            fun1();
        };

    });
    //鍙�
    $(picFocus+" .right").click(function(){
        if(flag<mum_li-1){
            flag++;
            fun1();
        }else{
            flag=0;
            fun1();
        }
    })
    //鎸夐挳
    $(picFocus+" .bt ul li").click(function(){
        var bt_li_on=$(this).index();
        flag=bt_li_on;
       	fun1();
    })
}

$(function(){
    $("div.con_user_list").myScroll({
		speed:30, //鏁板€艰秺澶э紝閫熷害瓒婃參
		rowHeight:33 //li鐨勯珮搴�
	});

})


/*瀹㈡埛璇佽█鍒囨崲js*/
$(document).ready(function(){
		  $('.client_point em:first').addClass('emon');
		  $('.client_ul:first').css('display','block');
		  autoroll();
		  hookThumb();
		})
		var i=-1; //绗琲+1涓猼ab寮€濮�
		var offset = 10000; //杞崲鏃堕棿
		var timer = null;
		function autoroll(){
		  n = $('.client_point em').length-1;
		  i++;
		  if(i > n){
			  i = 0;
		  }
		  slide(i);
		  timer = window.setTimeout(autoroll, offset);
		}

		function slide(i){
			$('.client_point em').eq(i).addClass('emon').siblings().removeClass('emon');
			$('.client_ul').eq(i).css('display','block').siblings('.client_ul').css('display','none');
		}

		function hookThumb(){    
			$('.client_point em').hover(
			  function(){
				if(timer){
				clearTimeout(timer);
				i = $(this).prevAll().length;
				slide(i); 
				}
			  },function(){
			    timer = window.setTimeout(autoroll, offset);  
			    this.blur();            
			    return false;
			    }
		    ); 
}


/*瀹㈡埛妗堜緥鍒囨崲js*/
$(document).ready(function(){
		  $('.case_point em:first').addClass('emon');
		  $('.case_dl:first').css('display','block');
		  // autoroll1();
		  hookThumb1();
		})
		var i1=-1; //绗琲+1涓猼ab寮€濮�
		var offset1 = 10000; //杞崲鏃堕棿
		var timer1 = null;
		function autoroll1(){
		  n = $('.case_point em').length-1;
		  i1++;
		  if(i1 > n){
			  i1 = 0;
		  }
		  slide1(i1);
		  timer1 = window.setTimeout(autoroll1, offset1);
		}

		function slide1(i1){
			$('.case_point em').eq(i1).addClass('emon').siblings().removeClass('emon');
			$('.case_dl').eq(i1).css('display','block').siblings('.case_dl').css('display','none');
		}

		function hookThumb1(){    
			$('.case_point em').hover(
			  function(){
				if(timer1){
				clearTimeout(timer1);
				i1 = $(this).prevAll().length;
				slide1(i1); 
				}
			  },function(){
			    timer1 = window.setTimeout(autoroll1, offset1);  
			    this.blur();            
			    return false;
			    }
		    ); 
}




