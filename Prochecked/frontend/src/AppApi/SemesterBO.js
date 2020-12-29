import BusinessObject from './BusinessObject';

/**
 * Represents a Role of the system
 */
export default class SemesterBO extends BusinessObject {

  /**
   * Constructs a SemesterBO object with a given name
   * 
   * @param {String} aname - the name of this SemesterBO.
   */
  constructor(aname) {
    super();
    this.name = aname;
  }

  setName(aname){
      this.name = aname
  }

  getName(aname){
      this.name = aname
  }

  static fromJSON(sems) {
    let result = [];

    if (Array.isArray(sems)) {
        sems.forEach((p) => {
        Object.setPrototypeOf(p, SemesterBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = sems;
      Object.setPrototypeOf(p, SemesterBO.prototype);
      result.push(p);
    }

    return result;
  }
}