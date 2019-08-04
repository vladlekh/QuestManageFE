import axiosInstance from "./instance";

export class AppApi {
	static getConfig() {
		return axiosInstance.get('/config');
	}
}
