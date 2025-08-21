/*产品目录 begin*/
/*产品目录第一个默认展开*/
//$(function(){ $(".cp_type .bd ul li").first().children('div').show();$(".cp_type .bd ul li").first().addClass('on');});

$(".cp_type .bd ul li p span").click(function () {
	if($(this).parents('li').hasClass('on')){
		$(this).parents('li').removeClass('on').find('div').stop().slideUp(0);
	}else{
		$(this).parents('li').find('div').removeAttr("style");
		$(this).parents('li').addClass('on').find('div').stop().slideDown(0);
	}
});
if(document.body.clientWidth <= 1079){  
	$(".cp_type .hd").click(function () {
		if($(this).hasClass('on')){
			$(this).next('div').removeAttr("style");
			$(this).removeClass('on').next('div').stop().slideUp(0);
		}else{
			$(this).next('div').removeAttr("style");
			$(this).addClass('on').next('div').stop().slideDown(0);
		}
	});
}
/*产品目录 end*/

$('.cp_type .bd ul li div a').each(function () {
	if ($(this).hasClass('active')) {
		$(this).parent().css('display','block');
		$(this).parent().parent().addClass('on');
	}
});

$('.cp_type .bd ul li').each(function () {
	if ($(this).hasClass('on')) {
		$(this).find('div').css('display','block');
	}
});