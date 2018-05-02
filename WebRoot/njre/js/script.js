$(function(){
    $(".totop").click(function() {
        $('body,html').animate({scrollTop: 0}, 1000);
    });
    $(window).scroll(function(){
        var  h= $(window).scrollTop();
        if( h <= 115 ){
            $(".head").removeClass("fix")
        }else{
            $(".head").addClass("fix")
        }
    })

    /*取色*/
    $(".partner").hover(function(){
        $(this).children().find("img").toggleClass("gray");
    });
    /*菜单*/
    var navh = $(".nav-line").height();
    $(".nav-line li").hover(function () {
        $(".subbox").stop(false, false).animate({ top: navh, opacity: "show" }, 400);
    });
    $(".navbox").bind("mouseleave", function () {
        $(".nav-line li").removeClass("hov");
        $(".subbox").stop(false, false).animate({ top: navh, opacity: "hide" }, 400);
    });
    $(window).resize(function() {
        $(".nav-line li").hover(function () {
            $(".subbox").stop(false, false).animate({ top: navh, opacity: "show" }, 400);
        });
        $(".navbox").bind("mouseleave", function () {
            $(".nav-line li").removeClass("hov");
            $(".subbox").stop(false, false).animate({ top: navh, opacity: "hide" }, 400);
        });
    });
    /*展开弹框*/
    $("#data_list").on("click",'.honor-list',function(){
        var s= $(this).children(".img").attr("src");

        $(".cover").show();
        $(".cover .cover-bd").children("img").attr("src",s);
    })
    $(".closed").click(function(){
        $(".cover").hide();
    });
    var O_tab = $("#tab-book");
    var O_holder = O_tab.find(".tab-book-head");
    var O_panel = O_tab.find(".tab-book-main");
    O_holder.find("li").eq(0).addClass("active");
    O_panel.eq(0).addClass("show").siblings().hide();
    O_holder.find("li").each(function(index){
        $(this).click(function(){
            $(this).addClass("active").siblings().removeClass("active");
            O_panel.eq(index).siblings().removeClass("show").hide();
            O_panel.eq(index).addClass("show").show() ;
        });
    });
});
jQuery.extend({
    tab:function(id){
        var O_tab = $("#" + id);
        var O_holder = O_tab.find(".div-head");
        var O_panel = O_tab.find(".div-main");
        O_holder.find("li").eq(0).addClass("active");
        O_panel.eq(0).addClass("show").siblings().hide();
        O_holder.find("li").each(function(index){
            $(this).click(function(){
                $(this)
                    .addClass("active")
                    .siblings().removeClass("active");
                O_panel.eq(index).siblings().removeClass("show").hide();
                O_panel.eq(index).addClass("show").show() ;
            });
        });
    }



});
jQuery.tab("tab-panel");