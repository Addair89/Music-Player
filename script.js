 const music = document.querySelector('audio');
 const prevBtn = document.getElementById('prev');
 const playBtn = document.getElementById('play');
 const forwardBtn = document.getElementById('forward');
 const image = document.querySelector('img');
 const title = document.getElementById('title');
 const artist = document.getElementById('artist');
 const body = document.querySelector('body');
 const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

 //Music
 const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill',
        artist: 'jacinto design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army',
        artist: 'jacinto design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Other Song',
        artist: 'jacinto design'
    },
    {
        name: 'metric-1',
        displayName: 'Last Song',
        artist: 'jacinto design'
    }
 ]


//check if playing
let isplaying = false;


 //Play
 const playSong = () => {
    isplaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
 }

 //pause
 const pauseSong = () => {
    isplaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title', 'Play')
    music.pause();
 }


 //Event listeners
 playBtn.addEventListener('click',() => (isplaying ? pauseSong() : playSong()));

 //Update DOM
 function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
    body.style.background = `url('img/${song.name}.jpg')`;
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundSize = 'cover';
 }

 //Current song
 let songIndex = 0;

//Prev Song
function prevSong() {
    songIndex--;
    if (songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next Song
function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

 //Onload - select first song

 loadSong(songs[songIndex]);

 //Update Progress Bar and time
 function updateProgressbar(e){
    if (isplaying){
        const { duration, currentTime } = e.srcElement;
        //Update Progress Bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        //Calc Display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        //delay switching element to avoid NaN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
 }

 //Set Progress bar

 function setProgressBar(e){
    
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
 }

 //event Listener for buttons
 prevBtn.addEventListener('click', prevSong);
 forwardBtn.addEventListener('click', nextSong);
 music.addEventListener('ended', nextSong);
 music.addEventListener('timeupdate', updateProgressbar);
 progressContainer.addEventListener('click', setProgressBar);