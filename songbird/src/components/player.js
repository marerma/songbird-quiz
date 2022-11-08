class Player {
  constructor(src) {
    this.src = src;
    this.track = new Audio(src);
  };

  drawPlayer () {
    const itemAudio = this.track;
    itemAudio.className = 'item__audio';
    itemAudio.setAttribute('preload', 'metadata');
    const itemPlayer = document.createElement('div');
    itemPlayer.className = 'item__player';
    itemPlayer.innerHTML = `
      <button class="player-icon"></button>
      <button class="volume-icon"></button>
      <input type="range" class="volume-range" min="0" max="100">
      <div class="item-progress-container">
      <div class="track__time">
      <span class="current-time">00:00</span><span class="track-time"></span></div> 
      <progress class="track" value="0" max="100"></progress></div>`
    itemPlayer.append(itemAudio);
    return itemPlayer;
  };

  play() {
    this.track.play();
    this.track.volume = 0.3;
  }

  pause() {
    this.track.pause();
  }
}




export {Player}

