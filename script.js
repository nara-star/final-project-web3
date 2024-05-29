const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEle = document.getElementById("current-time");
const durationEle = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const songs = [
    {
        name: "m-1",
        displayName: "Bade man",
        artist: "Aahvan",
    },
    {
        name: "m-2",
        displayName: "Fekre man nabash",
        artist: "Ashvan",
    },
    {
        name: "m-3",
        displayName: "Parvaneh",
        artist: "Ashvan",
    },
    {
        name: "m-4",
        displayName: "Cheghad Khoobe",
        artist: "Armin 2afm",
    },
    {
        name: "m-5",
        displayName: "Chi shod seda ghat shod",
        artist: "Armin",
    },
    {
        name: "m-6",
        displayName: "Eshghet ke bashe ",
        artist: "mehdi jahani",
    },
    {
        name: "m-7",
        displayName: "madyoonam be to",
        artist: "Alishmas",
    },
    {
        name: "m-9",
        displayName: "Cheghad Tanham",
        artist: "Alishmas ft mehdi jahani",
    },
    {
        name: "m-10",
        displayName: "Delkhor bood azam",
        artist: "Alishmas ft mehdi jahani",
    },

    {
        name: "m-11",
        displayName: "ye jaye taze",
        artist: "Rezaya",
    },
    {
        name: "m-12",
        displayName: "Parvaz",
        artist: "Rezaya",
    },



];

let isPlaying = false;

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

let songIndex = Math.floor(Math.random() * songs.length);
loadSong(songs[songIndex]);

function setSongDuration(e) {
    const totalSeconds = Math.floor(e.target.duration);
    const durationMinutes = Math.floor(totalSeconds / 60);
    let durationSeconds = totalSeconds % 60;
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }
    durationEle.textContent = `${durationMinutes}:${durationSeconds}`;
}

function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    progress.style.width = `0%`;
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    progress.style.width = `0%`;
    playSong();
}

function barWidthAndCurrentTime() {
    const { duration, currentTime } = music;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEle.textContent = `${currentMinutes}:${currentSeconds}`;
}

function updateProgressBar() {
    if (isPlaying) {
        barWidthAndCurrentTime();
    }
}

function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
    if (!isPlaying) {
        barWidthAndCurrentTime();
    }
}

music.addEventListener("canplay", setSongDuration);
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
