$(document).ready(function(){
    function revealTimeline(){
        $('.timeline li').each(function(){
            var top_of_element=$(this).offset().top;
            var bottom_of_window=$(window).scrollTop()+$(window).height();
            if(bottom_of_window>top_of_element+50){
                $(this).addClass('timeline-visible');
            }
        });
    }
    revealTimeline();
    $(window).scroll(function(){ revealTimeline(); });
});
