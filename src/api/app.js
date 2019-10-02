import axiosInstance from "./instance";

export class AppApi {
	static getConfig() {
		return axiosInstance.get('/config');
	}
	
	static getPortsList() {
		return axiosInstance.get('/ports');
	}
}
