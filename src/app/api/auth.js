import { post } from './request-manager';
import { config } from '../../config';

export const registerUser = async (data) => {
	return await post(`${config.api_host}/auth/register`, data);
};

export const loginUser = async (data) => {
	return await post(`${config.api_host}/auth/login`, data);
};

export const logoutUser = async () => {
	return await post(`${config.api_host}/auth/logout`, null).then((res) => {
		localStorage.removeItem('auth');
		return res;
	});
};
