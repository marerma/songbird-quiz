function controlSliderPlayer() {
  let isMuted = false;

  const playIcons = [...document.querySelectorAll('.player-icon')];
  const volumeBtn = [...document.querySelectorAll('.volume-icon')];
  const volumeRange = [...document.querySelectorAll('.volume-range')];
  const tracks =  [...document.querySelectorAll('.item__audio')];
  const progressBar = [...document.querySelectorAll('.track')];

  tracks.forEach(el => {
    el.onloadedmetadata = progressUpdate;
  })

  if(playIcons) {
    playIcons.forEach((el, i)=> {
      el.addEventListener('click', ()=> {
        tracks[i].ontimeupdate = progressUpdate;
              if(tracks[i].paused) {
                tracks[i].play();
                el.classList.add('pause');
          } else {
            tracks[i].pause();
            el.classList.remove('pause');
          };
      });
    });
  };

  if(volumeBtn) {
    volumeRange.forEach((el, ind) => 
      el.addEventListener('input', ()=> {
        let v = el.value;
        tracks[ind].volume = v / 100;
      }
    ));
  };
  
  volumeBtn.forEach((el, ind) => 
    el.addEventListener('click', ()=> {
      if(isMuted) {
        el.classList.remove('volume-icon-mute');
        tracks[ind].muted = false;
        volumeRange[ind].value = 50;
        isMuted = false;
      } else {
        el.classList.add('volume-icon-mute');
        isMuted = true;
        volumeRange[ind].value = 0;
        tracks[ind].muted = true;
      };
  }
));

progressBar.forEach((el, ind) => {
  el.addEventListener('click', ()=> {
    audioControl(el, tracks[ind]);
  })
})

};

function audioControl (progressBar, audio) {
  let width = progressBar.offsetWidth;
  let pointer = event.offsetX;
  progressBar.value = pointer / width * 100;
  audio.currentTime = audio.duration * (pointer / width);
}


function progressUpdate () {
  const progressBar = [...document.querySelectorAll('.track')];
  const currentTrackTime = [...document.querySelectorAll('.current-time')];
  const allAudio = [...document.querySelectorAll('.item__audio')];
  const trackTimeArr = [...document.querySelectorAll('.track-time')];

  trackTimeArr.forEach((el, ind) => {
     const trackDuration = new Date(allAudio[ind].duration*1000);
     let currentTimeOfTrack = new Date(allAudio[ind].currentTime*1000);
     let currentSec = currentTimeOfTrack.getSeconds().toString().padStart(2, '0');
     currentTrackTime[ind].textContent = `${currentTimeOfTrack.getMinutes()<10? '0' + currentTimeOfTrack.getMinutes(): currentTimeOfTrack.getMinutes() }:${currentSec}`;
     el.textContent = `${trackDuration.getMinutes()<10? '0'+ trackDuration.getMinutes() : trackDuration.getMinutes() }:${trackDuration.getSeconds() < 10? '0' + trackDuration.getSeconds() : trackDuration.getSeconds()}`;
     if (isNaN(allAudio[ind].currentTime / allAudio[ind].duration * 100)) {
       progressBar[ind].value = 0.0001;
     } else {
       progressBar[ind].value = allAudio[ind].currentTime / allAudio[ind].duration * 100;
    }
  })
}


export {controlSliderPlayer, progressUpdate}