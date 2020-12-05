import PersonBO from './PersonBO';

/**
 * Abstracts the REST interface of the Python backend with convenient access methods.
 * The class is implemented as a singleton.
 */
export default class AppAPI {

    // Singelton instance
    static #api = null;
  
  
    // Local Python backend
    #AppServerBaseURL ='/app';


  // Local http-fake-backend 
    // #AppServerBaseURL = '/AppApi/app';
    
    // Person related
    #getPersonsURL = () => `${this.#AppServerBaseURL}/persons`;
    #addPersonURL = () => `${this.#AppServerBaseURL}/persons`;
    #getPersonURL = (id) => `${this.#AppServerBaseURL}/persons`; //${/id} id muss reingemacht werden, nur zu testzwecken!!!!!!!!!!!!!
    #updatePersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;
    #deletePersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;
    #searchCustomerURL = (name) => `${this.#AppServerBaseURL}/person-by-name/${name}`;

      /** 
   * Get the Singelton instance 
   * 
   * @public
   */
  static getAPI() {
    if (this.#api == null) {
      this.#api = new AppAPI();
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

    getPersons() {
      return this.#fetchAdvanced(this.#getPersonURL()).then((responseJSON) => {
        let PersonBOs = PersonBO.fromJSON(responseJSON);
        // console.info(customerBOs);
        console.info(PersonBOs)
        console.log("AppApi_getPersons")
        return new Promise(function (resolve) {
          
          resolve(PersonBOs);
        })
      })
    }
  
    /**
     * Returns a Promise, which resolves to a CustomerBO
     * 
     * @param {Number} customerID to be retrieved
     * @public
     */
    getPerson(id) {
      return this.#fetchAdvanced(this.#getPersonURL(id)).then((responseJSON) => {
        // We always get an array of PersonBOs.fromJSON, but only need one object
        let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
        console.info(responsePersonBO);
        return new Promise(function (resolve) {
          resolve(responsePersonBO);
        })
      })
    }

getPersonByGoogleId(google_id) {
        console.log(google_id)
        
        return this.#fetchAdvanced(this.#getPersonURL()).then((responseJSON) => {
          console.log(responseJSON)
          //googleId in person url wieder eintragen!!!!!!!!!!!
          // We always get an array of PersonBOs.fromJSON, but only need one object
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // console.info(responsePersonBO);
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
      }

// createPerson(personBO) {
//         return this.#fetchAdvanced(this.#createPersonURL(), {
//           method: 'POST',
//           headers: {
//             'Accept': 'application/json, text/plain',
//             'Content-type': 'application/json',
//           },
//           body: JSON.stringify(personBO)
//           }).then((responseJSON) => {
//           // We always get an array of PersonBOs.fromJSON, but only need one object
//             let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
//           // console.info(accountBOs);
//             return new Promise(function (resolve) {
//             resolve(responsePersonBO);
//           })
//         })
//       }
    

updatePerson(personBO){
  personBO.setGoogleId("fiwhoafi") //nur zum Test, muss weg!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  console.log(personBO)
  return this.#fetchAdvanced(this.#updatePersonURL(personBO.getGoogleId()), {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      console.log(responseJSON)
    // We always get an array of PersonBOs.fromJSON, but only need one object 
    // kommt bei put überhaupt ein PersonenBO zurück??????????????
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
    // console.info(accountBOs);
      return new Promise(function (resolve) {
      resolve(responsePersonBO);
    })
  })
}


}