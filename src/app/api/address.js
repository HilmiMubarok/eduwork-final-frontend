import { config } from '../../config'
import { get, post } from './request-manager'

export const getAddress = async () => {
  return await get(`${config.api_host}/api/shipping-address`)
}

export const getLocation = async (location, code) => {
  return await get(`https://regions-indoneisa.herokuapp.com/api/${location}?kode_induk=${code}`);
}

export const createAddress = async data => {
  return await post(`${config.api_host}/api/shipping-address`, data)
}