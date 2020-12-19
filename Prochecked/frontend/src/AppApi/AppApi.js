import PersonBO from './PersonBO';
import StudentBO from './StudentBO';
import ParticipationBO from './ParticipationBO'
import ProjectBO from './ProjectBO'
import GradingBO from './GradingBO'

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
    #getProfsURL = (id) => `${this.#AppServerBaseURL}/person-by-role/${id}`;



    // Student related

    #getStudentURL = (id) => `${this.#AppServerBaseURL}/students/${id}`;
    #getStudentByMatrikelNummerURL = (matr_nr) => `${this.#AppServerBaseURL}/students/${matr_nr}`; //leer lasen???

   

    // Participation related
    #getParticipationsByProjectURL = (project_id) => `${this.#AppServerBaseURL}/projects/${project_id}/participations`;
    #addParticipationsForProjectURL = (project_id) => `${this.#AppServerBaseURL}/projects/${project_id}/participations`;
    #deleteParticipationURL = (id) => `${this.#AppServerBaseURL}/participation/${id}`;
    #updateParticipationURL = (participation) => `${this.#AppServerBaseURL}/participation/${participation}`;//leer lassen???!oder mitParticipationBO
    // Project related
    #getProjectsByDozentURL = (person_id) => `${this.#AppServerBaseURL}/dozents/${person_id}/projects`;

    //Grading related 

    #addGradingStudentURL = () => `${this.#AppServerBaseURL}/studentsGrading`;

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
          // console.info(participationBOs);
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
    // console.info(participationBOs);
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
    return this.#fetchAdvanced(this.#getParticipationsByProjectURL(project_id))
      .then((responseJSON) => {
        let participationBOs = ParticipationBO.fromJSON(responseJSON);
        console.log(participationBOs);
        return new Promise(function (resolve) {
          resolve(participationBOs);
        })
      })
  }


  /**
   * Returns a Promise, which resolves to an ParticipationBOs
   * 
   * @param {Number} project_id for which the the participations should be added to
   * @public
   */
  addParticipationForProject(project_id) {
    return this.#fetchAdvanced(this.#addParticipationsForProjectURL(project_id), {
      method: 'POST'
    })
      .then((responseJSON) => {
        // We always get an array of ParticipationBO.fromJSON, but only need one object
        let participationBO = ParticipationBO.fromJSON(responseJSON)[0];
        // console.info(participationBO);
        return new Promise(function (resolve) {
          // We expect only one new participation
          resolve(participationBO);
        })
      })
  }
  

  /**
   * Deletes the given participation and returns a Promise, which resolves to an ParticipationBO
   * 
   * @param id to be deleted
   * @public
   */
  deleteParticipation(id) {
    return this.#fetchAdvanced(this.#deleteParticipationURL(id), {
      method: 'DELETE'
    })
      .then((responseJSON) => {
        // We always get an array of ParticipationBO.fromJSON, but only need one object
        let participationBOs = ParticipationBO.fromJSON(responseJSON)[0];
        // console.info(participationBOs);
        return new Promise(function (resolve) {
          resolve(participationBOs);
        })
      })
  }

  updateParticipation(participationBo){
    // console.log(participationBo)
    return this.#fetchAdvanced(this.#updateParticipationURL(), { //URL LEER LASSEN ???! oder ParticipationBO?? 
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(participationBo)
      }).then((responseJSON) => {
      // We always get an array of ParticipationBOs.fromJSON, but only need one object 
        let responseParticipationBo = ParticipationBO.fromJSON(responseJSON)[0];
        return new Promise(function (resolve) {
        resolve(responseParticipationBo);
      })
    })
  }


//Project related
  /**
   * Returns a Promise, which resolves to an Array of ProjectBOs
   * 
   * @param {Number} person_id for which the the participations should be retrieved
   * @public
   */
  getProjectsByDozent(person_id) {
    // console.log(person_id)
    // console.log("vor fetch in appapi")
    return this.#fetchAdvanced(this.#getProjectsByDozentURL(person_id))
      .then((responseJSON) => {
        // console.log(responseJSON)
        // console.log("gefetched")
        let projectBOs = ProjectBO.fromJSON(responseJSON);
        console.log(projectBOs);
        return new Promise(function (resolve) {
          resolve(projectBOs);
        })
      })
  }


  //Student Relation
  getStudent(id) {
    return this.#fetchAdvanced(this.#getStudentURL(id))
    .then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON, but only need one object
      let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
      console.log(responseStudentBO);
      return new Promise(function (resolve) {
        resolve(responseStudentBO);
      })
    })
  }


  getStudentByMatrikelNummer(matr_nr) {
    return this.#fetchAdvanced(this.#getStudentByMatrikelNummerURL(matr_nr)).then((responseJSON) => { //URL LEER LASSEN????
      // We always get an array of StudentBOs.fromJSON, but only need one object
      let responseStudentBO = StudentBO.fromJSON(responseJSON)[0];
      console.info(responseStudentBO);
      return new Promise(function (resolve) {
        resolve(responseStudentBO);
      })
    })
  }

  getPersonByRole(role_id){
    return this.#fetchAdvanced(this.#getProfsURL(role_id)).then((responseJSON) => {
      // We always get an array of PersonBOs.fromJSON, but only need one object
      let responseDozentBOs = PersonBO.fromJSON(responseJSON);
      console.info(responseDozentBOs);
      return new Promise(function (resolve) {
        resolve(responseDozentBOs);
      })
    })
  }




//Grading Related 


  gradingStudent(grade, participation_id) {

    let g = new GradingBO();
    g.setGrade(grade)
    g.setParticipation(participation_id)
    console.log(g)

    return this.#fetchAdvanced(this.#addGradingStudentURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(g)
      }).then((responseJSON) => {
      // We always get an array of GradingBO.fromJSON, but only need one object
        let responseGradingBO = GradingBO.fromJSON(responseJSON)[0];
      // console.info(accountBOs);
        return new Promise(function (resolve) {
        resolve(responseGradingBO);
      })
    })
  }










}






