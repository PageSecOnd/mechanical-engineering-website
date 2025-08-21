$(document).ready(function(){
    // 点击缩略图播放视频
    $('.video-thumb').click(function(){
        var video = $(this).siblings('.video-player').get(0);
        if(video.paused){
            video.play();
        }else{
            video.pause();
        }
    });
});
