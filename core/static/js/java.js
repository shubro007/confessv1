
var day = document.getElementById('date')
var timedis = document.getElementById('time')
function updateDateTime(){
    var currentdate = new Date(); 
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];    
    day.textContent = currentdate.getDate() + " " + months[currentdate.getMonth()]+ " "+  currentdate.getFullYear();
    timedis.textContent = (currentdate.getHours())+":"+ currentdate.getMinutes() + ":"+currentdate.getSeconds();
}
setInterval(updateDateTime, 1000);
updateDateTime();

var audioPlayer = document.getElementById('audioPlayer');
    var volumeSlider = document.getElementById('volumeSlider');
    var playButton = document.getElementById('playButton');

    // Set initial volume
    audioPlayer.volume = volumeSlider.value;

    volumeSlider.addEventListener('input', function() {
      audioPlayer.volume = volumeSlider.value;
    });

    // Play audio on button click
    playButton.addEventListener('click', function() {
      audioPlayer.play();
      console.log("hello")
      //playButton.style.display = 'none'; // Hide the play button after clicking
    });


