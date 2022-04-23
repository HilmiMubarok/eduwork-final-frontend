import { put } from './request-manager'
import { config } from '../../config'

export const saveCart = async (token, cart) => {
  return await put(`${config.api_host}/api/cart`, {items: cart})
}