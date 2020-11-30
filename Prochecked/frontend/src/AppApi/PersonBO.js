import BusinessObject from './BusinessObject';

/**
 * Represents a person of the system
 */
export default class PersonBO extends BusinessObject {

  /**
   * Constructs a PersonBO object with a given name, email, google id and role
   * 
   * @param {String} aname - the name of this PersonBO.
   */
  constructor(aname, aemail, agoogleid, aberechtigung) {
    super();
    this.name = aname;
    this.email = aemail
    this.google_id = agoogleid
    this.berechtigung = aberechtigung
  }

  /**
   * Sets a new name
   * 
   * @param {String} aname - the new name of this PersonBO.
   */
  setName(aname) {
    this.name = aname;
  }

  /**
   * Gets the name.
   */
  getName() {
    return this.name;
  }

  setEmail(aemail){
    this.email = aemail
  }

  getEmail(){
    return this.email
  }

  setGoogleId(agoogleid){
    this.google_id = agoogleid
  }

  getGoogleId(){
    return this.google_id
  }

  setBerechtigung(aberechtigung){
    this.berechtigung = aberechtigung
  }

  getBerechtigung(){
    return this.berechtigung
  }

  /** 
   * Returns an Array of PersonBOs from a given JSON structure.
   */
  static fromJSON(persons) {
    let result = [];

    if (Array.isArray(persons)) {
      persons.forEach((p) => {
        Object.setPrototypeOf(p, PersonBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = persons;
      Object.setPrototypeOf(p, PersonBO.prototype);
      result.push(p);
    }

    return result;
  }
}