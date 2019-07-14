import axiosInstance from "./instance";

export const room1Api = {
	openBox: () => {
		return axiosInstance.post('/room1/box/open');
	},
	reest: () => {
		return axiosInstance.post('/room1/reset');
	},
};
