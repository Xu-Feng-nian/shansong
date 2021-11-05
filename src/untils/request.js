import axios from "axios";
const instance = axios.create({
  baseURL:'https://www.fastmock.site/mock/c91ac754963a8bb34cbf10f321bc91b9/login',
  timeout:10000
})
export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, {params}).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
      instance.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
    })
  }