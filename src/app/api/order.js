import { get, post } from "./request-manager"
import { config } from "../../config"

export const createOrder = async payload => {
  return await post(`${config.api_host}/api/order`, payload)
}

export async function getInvoiceByOrderId(order_id) {
  return await get(`${config.api_host}/api/invoice/${order_id}`);
}

export async function getOrders(){
  return await get(`${config.api_host}/api/order`);
}