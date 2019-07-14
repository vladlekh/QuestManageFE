import * as axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:8080/api/v1",
});

axiosInstance.interceptors.response.use(
	response => response.data,
	error => {
		alert(error)
	},
);

export default axiosInstance;
