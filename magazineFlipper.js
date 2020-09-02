var vid = document.getElementById('video');
var intervalRewind;
var elapsed = 0;

// Modified from https://jsfiddle.net/r4zamgeo/
$("#backward").click(function() {
  // Disable moving forwards or backwards while animating
  $('#backward').prop('disabled', true);
  $('#forward').prop('disabled', true);
  clearInterval(intervalRewind);
  var startSystemTime = new Date().getTime();
  var startVideoTime = video.currentTime;
   
  intervalRewind = setInterval(function(){
    if(video.currentTime == 0 || elapsed >= 2000){
      clearInterval(intervalRewind);
      video.pause();
      elapsed = 0;
     // Re-enable moving forwards or backwards after animating
      $('#backward').prop('disabled', false);
      $('#forward').prop('disabled', false);
    } else {
      elapsed = new Date().getTime()-startSystemTime;
      video.currentTime = Math.max(startVideoTime - elapsed/1000.0, 0);
    }
  }, 40);
});

$("#forward").click(function() {
  // Disable moving forwards or backwards while animating
  $('#forward').prop('disabled', true);
  $('#backward').prop('disabled', true);

  var playpromise  = video.play();
  
  if (playpromise !== undefined){
    playpromise.then(_ => {
      setTimeout(function(){
        // Re-enable moving forwards or backwards after animating
        $('#forward').prop('disabled', false);
        $('#backward').prop('disabled', false);
        video.pause();
      }, 2000)
    })
    .catch(error => {
      // uh oh
    })
  }

});
