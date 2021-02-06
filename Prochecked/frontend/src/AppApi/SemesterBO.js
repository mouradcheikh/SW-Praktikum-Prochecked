import BusinessObject from './BusinessObject';


/**
 * Represents a Semester of the system
/**
 */
export default class SemesterBO extends BusinessObject {

  /**
   * Constructs a SemesterBO object with a given name, email, google id and role
   * 
//    * @param {String} aname - the name of this SemesterBO.
   */
  constructor(aname) {
    super();
    this.name = aname
   
  }

  /**
   * Sets a new name
   * 
   * @param {String} aname - the new name of this SemesterBO.
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
      semesters.forEach((s) => {
        Object.setPrototypeOf(s, SemesterBO.prototype);
        result.push(s);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let s = semesters;
      Object.setPrototypeOf(s, SemesterBO.prototype);
      result.push(s);
    }

    return result;
  }
}