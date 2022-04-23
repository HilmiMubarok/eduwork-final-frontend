import { get } from "./request-manager"
import { config } from "../../config"

export const getProduct = async (params) => {
  return await get(`${config.api_host}/api/product`, { params })
}

export const getCategories = async () => {
  return await get(`${config.api_host}/api/category`);
}

export const getTagsByCategory = async (category) => {
  return await get(`${config.api_host}/api/tag/${category}`);
}