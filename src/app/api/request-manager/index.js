import axios from 'axios'

const getHeader = () => {
  const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

  if (token) {
		return {
	    headers: {
	      authorization: `Bearer ${token}`
	    }
	  }
  }
  
  return null
}

export const get = async (url, params) => {
	if (params) {
		return await axios.get(url, params, getHeader())
	}

	return await axios.get(url, getHeader())
}

export const post = async (url, data) => {
	return await axios.post(url, data, getHeader())
}

export const put = async (url, data) => {
	return await axios.put(url, data, getHeader())
}