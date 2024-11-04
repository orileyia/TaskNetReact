// requestUtils.js

/**
 * Generic GET request
 * @param {object} api - Axios instance
 * @param {string} url - Endpoint URL
 */
export const getRequest = (api, url) => {
    return api.get(url)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  };
  
  /**
   * Generic POST request
   * @param {object} api - Axios instance
   * @param {string} url - Endpoint URL
   * @param {object} data - Data to send
   */
  export const postRequest = (api, url, data) => {
    return api.post(url, data)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  };
  
  /**
   * Generic PUT request
   * @param {object} api - Axios instance
   * @param {string} url - Endpoint URL
   * @param {object} data - Data to update
   */
  export const putRequest = (api, url, data) => {
    return api.put(url, data)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  };
  
  /**
   * Generic DELETE request
   * @param {object} api - Axios instance
   * @param {string} url - Endpoint URL
   */
  export const deleteRequest = (api, url) => {
    return api.delete(url)
      .then(response => response.data)
      .catch(error => Promise.reject(error));
  };
  