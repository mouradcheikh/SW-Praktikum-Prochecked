import PersonBO from './PersonBO';

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 */
export default class AppAPI {

    // Singelton instance
    static #api = null;
  
  
    // Local Python backend
    #AppServerBaseURL = '/prochecked';
  
    // Person related
    #getPersonURL = (google_id) => `${this.#AppServerBaseURL}/persons/${google_id}`;
    #createPersonURL = () => `${this.#AppServerBaseURL}/persons`;

      /** 
   * Get the Singelton instance 
   * 
   * @public
   */
  static getAPI() {
    if (this.#api == null) {
      this.#api = new BankAPI();
    }
    return this.#api;
  }

  /**
   *  Returns a Promise which resolves to a json object. 
   *  The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
   *  fetchAdvanced throws an Error also an server status errors
   */
#fetchAdvanced = (url, init) => fetch(url, init)
    .then(res => {
      // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. 
      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }
      return res.json();
    }
    )

getPersonByGoogleId(googleId) {
        return this.#fetchAdvanced(this.#getPersonURL(googleId)).then((responseJSON) => {
          // We always get an array of PersonBOs.fromJSON, but only need one object
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // console.info(responsePersonBO);
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
      }

createPerson(PersonBO) {
        return this.#fetchAdvanced(this.#createPersonURL(), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(PersonBO)
        }).then((responseJSON) => {
          // We always get an array of PersonBOs.fromJSON, but only need one object
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // console.info(accountBOs);
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
      }
    }