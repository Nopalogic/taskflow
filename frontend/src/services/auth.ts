import api, { handleApiError } from './api';

interface RegisterProps {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	password_confirmation: string;
}

export const registerUser = async (userData: RegisterProps) => {
	try {
		const response = await api.post('/auth/register', userData);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

interface LoginProps {
	email: string;
	password: string;
}

export const loginUser = async (userData: LoginProps) => {
	try {
		const response = await api.post('/auth/login', userData);
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const verifyToken = async (token: string) => {
	try {
		const response = await api.get('/auth/verify-token', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};

export const logoutUser = async () => {
	try {
		const response = await api.delete('/auth/logout');
		return response.data;
	} catch (error) {
		throw handleApiError(error);
	}
};