import BusinessObject from './BusinessObject';


/**
 * Represents a person of the system
 */
export default class PersonBO extends BusinessObject {

  /**
   * Constructs a PersonBO object with a given name, email, google id and role
   * 
//    * @param {String} aname - the name of this PersonBO.
   */
  constructor(aname) {
    super();
    this.name = aname
   
  }

  /**
   * Sets a new name
   * 
   * @param {String} aname - the new name of this PersonBO.
   */
  setName(aname) {
    this.name = aname
  }
  getName() {
    return this.name
  }

 
  /** 
   * Returns an Array of PersonBOs from a given JSON structure.
   */
  static fromJSON(semesters) {
    let result = [];

    if (Array.isArray(semesters)) {
      semesters.forEach((p) => {
        Object.setPrototypeOf(s, SemesterBO.prototype);
        result.push(s);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let s = semesters;
      Object.setPrototypeOf(p, PersonBO.prototype);
      result.push(s);
    }

    return result;
  }
}