import axiosInstance from './instance';

export class SoundApi {

  static getAudioList() {
    return axiosInstance.get('/sound');
  }

  static loadAudioFile(url) {
    return axiosInstance.get(`/sound/${url}`, {
      responseType: 'arraybuffer',
      transformResponse: null,
    });
  }
}
