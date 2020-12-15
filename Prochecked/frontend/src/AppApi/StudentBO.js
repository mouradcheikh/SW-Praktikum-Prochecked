import BusinessObject from './BusinessObject';
import PersonBO from './PersonBO';

/**
 * Represents a Role of the system
 */
export default class StudentBO extends BusinessObject {

  /**
   * Constructs a RoleBO object with a given name
   * 
   * @param {String} aname - the name of this RoleBO.
   */
  constructor(aname, astudiengang, amatr_nr) {
    super();
    this.name = aname
    this.studiengang = astudiengang;
    this.matr_nr = amatr_nr;
  }

  setName(aname) {
    this.name = aname
  }

  getName() {
    return this.name
  }

  setStudiengang(astudiengang){
      this.studiengang = astudiengang
  }

  getStudiengang(){
      return this.studiengang
  }

  setMatrNr(amatr_nr){
      this.matr_nr = amatr_nr
  }

  getMatrNr(){
      return this.matr_nr
  }

    /** 
   * Returns an Array of ParticipationBOs from a given JSON structure.
   */
  static fromJSON(student) {
    let result = [];

    if (Array.isArray(student)) {
      student.forEach((p) => {
        Object.setPrototypeOf(p, StudentBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = student;
      Object.setPrototypeOf(p, StudentBO.prototype);
      result.push(p);
    }

    return result;
  }
}