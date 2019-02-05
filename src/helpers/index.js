const axios = require('axios')
import { API_URL_AUTH } from '../constants'

export const axiosAuth = axios.create({
  baseURL: API_URL_AUTH
})