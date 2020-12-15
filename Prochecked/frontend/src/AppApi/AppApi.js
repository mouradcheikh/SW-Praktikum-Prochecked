import PersonBO from './PersonBO';
import StudentBO from './StudentBO';
import ParticipationBO from './ParticipationBO'
import ProjectBO from './ProjectBO'

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
    #getPersonURL = (google_id) => `${this.#AppServerBaseURL}/persons/${google_id}`;
    #updatePersonURL = (google_id) => `${this.#AppServerBaseURL}/persons/${google_id}`;
    #deletePersonURL = (id) => `${this.#AppServerBaseURL}/persons/${id}`;
    #searchPersonURL = (name) => `${this.#AppServerBaseURL}/person-by-name/${name}`;



    // Student related

    #getStudentURL = (id) => `${this.#AppServerBaseURL}/students/${id}`;

    // Participation related
    #getParticipationsByProjectURL = (project_id) => `${this.#AppServerBaseURL}/projects/${project_id}/participations`;
    

    // Project related
    #getProjectsByDozentURL = (person_id) => `${this.#AppServerBaseURL}/dozents/${person_id}/projects`;


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


//Person related
getPersons() {
console.log("vorFetch in getPersons")
      return this.#fetchAdvanced(this.#getPersonsURL()).then((responseJSON) => {
        // console.log(responseJSON)
        // console.log("gefetched")
        let PersonBOs = PersonBO.fromJSON(responseJSON);
        // console.info(personBOs);
        console.log(PersonBOs)
        return new Promise(function (resolve) {
          
          resolve(PersonBOs);
        })
      })
    }

    /**
     * Returns a Promise, which resolves to a PersonBO
     * 
     * @param {Number} personID to be retrieved
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
        //console.log(google_id)
        return this.#fetchAdvanced(this.#getPersonURL(google_id)).then((responseJSON) => {
          // console.log(responseJSON)
          
          // We always get an array of PersonBOs.fromJSON, but only need one object
          let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // console.info(responsePersonBO);
          return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
      }

      

createPerson(name, email, google_id) {


        
        let p = new PersonBO();
        p.setName(name)
        p.setEmail(email)
        p.setGoogleId(google_id)
        console.log(p)
        

        return this.#fetchAdvanced(this.#addPersonURL(), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(p)
          }).then((responseJSON) => {
          // We always get an array of PersonBOs.fromJSON, but only need one object
            let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
          // console.info(accountBOs);
            return new Promise(function (resolve) {
            resolve(responsePersonBO);
          })
        })
      }
    

updatePerson(personBO){
  // personBO.setGoogleId("fiwhoafi") //nur zum Test, muss weg!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // console.log(personBO)
  return this.#fetchAdvanced(this.#updatePersonURL(personBO.getGoogleId()), {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain',
      'Content-type': 'application/json',
    },
    body: JSON.stringify(personBO)
    }).then((responseJSON) => {
      // console.log(responseJSON)
    // We always get an array of PersonBOs.fromJSON, but only need one object 
    // kommt bei put überhaupt ein PersonenBO zurück??????????????
      let responsePersonBO = PersonBO.fromJSON(responseJSON)[0];
    // console.info(accountBOs);
      return new Promise(function (resolve) {
      resolve(responsePersonBO);
    })
  })
}




//Participation related

 /**
   * Returns a Promise, which resolves to an Array of ParticipationBOs
   * 
   * @param {Number} project_id for which the the Participations should be retrieved
   * @public
   */
  getParticipationsByProject(project_id){
    console.log("vor fetch der participations")
    console.log("pojektID:", project_id)
    return this.#fetchAdvanced(this.#getParticipationsByProjectURL(project_id))
      .then((responseJSON) => {
        let participationBOs = ParticipationBO.fromJSON(responseJSON);
        console.log(responseJSON);
        // console.info(participationBOs);
        // console.log(participationBOs);
        return new Promise(function (resolve) {
          resolve(participationBOs);
          console.log(participationBOs);
        })
      })
  }



//Project related
  /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   * 
   * @param {Number} person_id for which the the accounts should be retrieved
   * @public
   */
  getProjectsByDozent(person_id) {
    // console.log(person_id)
    // console.log("vor fetch in appapi")
    return this.#fetchAdvanced(this.#getProjectsByDozentURL(person_id))
      .then((responseJSON) => { 
        console.log(responseJSON)
        // console.log("gefetched")
        let projectBOs = ProjectBO.fromJSON(responseJSON);
        console.info(projectBOs);
        console.info(projectBOs);

        return new Promise(function (resolve) {
          resolve(projectBOs);
        })
      })
  }


  //Student Relation
  getStudent(id) {
    return this.#fetchAdvanced(this.#getStudentURL(id)).then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON, but only need one object
      let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
      console.info(responseStudentBO);
      return new Promise(function (resolve) {
        resolve(responseStudentBO);
      })
    })
  }
  
}



