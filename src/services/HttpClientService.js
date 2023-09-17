/**
 * Path: /src/services/httpClientService.js
 * Author: Misha
 * Date Create: 15-Oct-2022
 * Purpose of this component: CRUD from to API end point
 */

const HttpClient = class {
  constructor(token) {
    const port = process.env.REACT_APP_ENV === 'dev' ? `:${process.env.REACT_APP_API_PORT}` : '';
    this.apiUrl = `${process.env.REACT_APP_API_URL}${port}/`;
    this.token = token;
  }

  /** Read data as an array from database, and store the array into `data` variable
   * @returns JSON serialized version of response body.
   */
  get = async (endpoint) => {
    // Set up config for request
    const config = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };

    // Fetch the request, return json response.
    try {
      const response = await fetch(this.apiUrl + endpoint, config);
      return await response.json();
    } catch (err) {
      console.error(`Unable to call GET: ${err}`);
    }
  };

  /** Read data from database as an array.
   * @param endpoint
   * @param id uuid of object that is wanted
   * @returns JSON serialized version of response body.
   */
  getById = async (endpoint, id) => {
    // Set up config for request
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };

    // Fetch the request, return json response.
    try {
      const response = await fetch(this.apiUrl + endpoint + '/' + id, config);
      return await response.json();
    } catch (err) {
      console.error(`Unable to call GETBYID: ${err}`);
    }
  };

  /** Handles all post requests asyncronously.
   * @param endpoint
   * @param inputs is the body, must be formatted with the correct attribute names.
   * @returns JSON serialized version of response body.
   */
  post = async (endpoint, inputs) => {
    // Set up config for request
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(inputs),
    };

    // Fetch the request, return json response.
    try {
      const response = await fetch(this.apiUrl + endpoint, config);
      if (response.ok) {
        return await response.json();
      }
      return false;
    } catch (err) {
      console.error(`Unable to call POST: ${err}`);
    }
  };

  /** Handles all PUT requests asyncronously.
   * @param endpoint
   * @param inputs is the body, must be formatted with the correct attribute names.
   * @param id uuid of the object that is to be updated.
   * @returns JSON serialized version of response body.
   */
  put = async (endpoint, inputs, id) => {
    // Set up config for request
    const config = {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(inputs),
    };

    // Fetch the request, return json response.
    try {
      const response = await fetch(this.apiUrl + endpoint + '/' + id, config);
      return await response.json();
    } catch (err) {
      console.error(`Unable to call PUT: ${err}`);
    }
  };

  /** Handles DELETE requests with multiple parameters asyncronously.
   * @returns JSON serialized version of response body.
   * @param endpoint
   * @param inputs
   */
  delete = async (endpoint, inputs) => {
    // Set up config for request
    const config = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(inputs),
    };

    // Fetch the request, return json response.
    try {
      const response = await fetch(this.apiUrl + endpoint, config);
      return await response.json();
    } catch (err) {
      console.error(`Unable to call DELETE: ${err}`);
    }
  };

  /** Handles DELETE requests asyncronously.
   * @param endpoint
   * @param id uuid of the object that is to be deleted.
   * @returns JSON serialized version of response body.
   */
  deleteById = async (endpoint, id) => {
    // Set up config for request
    const config = {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${this.token}`,
      },
    };

    // Fetch the request, return json response.
    try {
      const response = await fetch(this.apiUrl + endpoint + '/' + id, config);
      return await response.json();
    } catch (err) {
      console.error(`Unable to call DELETE: ${err}`);
    }
  };
};

export default HttpClient;
