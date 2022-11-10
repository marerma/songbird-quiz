function controlSliderPlayer() {
  const playIcons = [...document.querySelectorAll('.player-icon')];

  if(playIcons) {
    const tracks =  [...document.querySelectorAll('.item__audio')];
    playIcons.forEach((el, i)=> {
      el.addEventListener('click', ()=> {
        tracks[i].ontimeupdate = progressUpdate;
              if(tracks[i].paused) {
                tracks[i].play();
                el.classList.add('pause');
          } else {
            tracks[i].pause();
            el.classList.remove('pause');
          }
      })
    })
  }
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
     el.textContent = `${trackDuration.getMinutes()<10? '0'+ trackDuration.getMinutes() : trackDuration.getMinutes() }:${trackDuration.getSeconds()}`
     if (isNaN(allAudio[ind].currentTime / allAudio[ind].duration * 100)) {
       progressBar[ind].value = 0.0001;
     } else {
       progressBar[ind].value = allAudio[ind].currentTime / allAudio[ind].duration * 100;
    }
  })
}


export {controlSliderPlayer, progressUpdate}