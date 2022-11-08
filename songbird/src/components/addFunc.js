function controlSliderPlayer() {
  const playIcons = [...document.querySelectorAll('.player-icon')]

  if(playIcons) {
    const tracks =  [...document.querySelectorAll('.item__audio')]
    playIcons.forEach((el, i)=> {
      el.addEventListener('click', ()=> {
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

export {controlSliderPlayer}

// progressUpdate () {
//   const progressBar = [...document.querySelectorAll('.track')];
//   const currentTrackTime = [...document.querySelectorAll('.current-time')];

//     // const trackTimeArr = [...document.querySelectorAll('.track-time')];
//     // trackTimeArr.forEach(el => {
//     //   el.textContent = `${trackDuration.getMinutes()<10? '0'+ trackDuration.getMinutes() : trackDuration.getMinutes() }:${trackDuration.getSeconds()}`
  
//     // })
    

//   if (isNaN(this.currentTime / this.duration * 100)) {
//     progressBar.value = 0.0001;
//   } else {
//     progressBar.value = this.currentTime / this.duration * 100;
//   }
  
//   const trackDuration = new Date( this.duration*1000);
//   let currentTime = new Date(this.currentTime*1000);
//   trackTime.textContent = `${trackDuration.getMinutes()}:${trackDuration.getSeconds()}`;
//   let currentSec = currentTime.getSeconds().toString().padStart(2, '0');
//   currentTrackTime.textContent = `${currentTime.getMinutes()}:${currentSec}`;
// }


// updateAudio() {
//   this.audio.ontimeupdate = this.progressUpdate;
// }
