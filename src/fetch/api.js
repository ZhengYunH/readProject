import axios from '../http'

export function get(url, data) {
  if(!data.limit) data.limit = 10;
  let dataStr = ''; 
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&';
  })

  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    url = url + '?' + dataStr;
  }

  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        if(error.response){
          resolve(error.response.data);
        }else{
          resolve({message: 'failed'})
        }
       
    })
  })
}

export function post(url, data)
{
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        if(error.response){
          if(error.response.data){
            resolve(error.response.data)
          }
          resolve(error.response)
        }
        resolve(error)
    })
  })
}

export function patch(url, data)
{
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        if(error.response){
          if(error.response.data){
            resolve(error.response.data)
          }
          resolve(error.response)
        }
        resolve(error)
    })
  })
}

export function del(url)
{
  return new Promise((resolve, reject) => {
    axios.delete(url)
      .then(response => {
        resolve(response.data);
      })
      .catch((error) => {
        if(error.response){
          if(error.response.data){
            resolve(error.response.data)
          }
          resolve(error.response)
        }
        resolve(error)
    })
  })
}

export default {
  get(url, data) {
    return get(url, data)
  },
  post(url, data)
  {
    return post(url, data)
  },
  patch(url, data)
  {
    return patch(url, data)
  },
  delete(url)
  {
    return del(url)
  }
}