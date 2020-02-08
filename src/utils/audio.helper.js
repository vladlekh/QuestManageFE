import { SoundApi } from '../api/sound';

export class AudioHelper {
  static STOP_TIME = 5;

  constructor() {
    this.context = new (window.AudioContext = window.AudioContext || window.webkitAudioContext);
    this.sourceMap = new Map();
  }

  async playSound({ name, endpoint }, gainValue = 1, loop = false) {
    const res = await SoundApi.loadAudioFile(endpoint);
    const buffer = await this.context.decodeAudioData(res);
    const source = this.context.createBufferSource();
    const gainNode = this.context.createGain();
    gainNode.gain.value = gainValue;
    source.buffer = buffer;
    source.connect(gainNode);
    console.log('LOOP', loop);
    source.loop = loop;
    source.start(0);
    gainNode.connect(this.context.destination);
    this.sourceMap.set(name, {source, gainNode});
  }

  stopSmoothly({ name }) {
    if(this.sourceMap.has(name)){
      const { source, gainNode} = this.sourceMap.get(name);
      let currentTime = this.context.currentTime;
      let currentVolume = gainNode.gain.value;
      gainNode.gain.cancelScheduledValues(0.0);
      gainNode.gain.setValueAtTime(currentVolume, currentTime);
      gainNode.gain.linearRampToValueAtTime(0.0, currentTime + AudioHelper.STOP_TIME);
      source.stop(currentTime + AudioHelper.STOP_TIME);
      this.sourceMap.delete(name);
    }
  }

  stop({ name }) {
    const { source} = this.sourceMap.get(name);
    source.stop();
    this.sourceMap.delete(name);
  }
}
