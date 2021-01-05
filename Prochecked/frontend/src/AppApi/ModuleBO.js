import BusinessObject from './BusinessObject';


/**
 * Represents a person of the system
 */
export default class ModuleBO extends BusinessObject {

  /**
   * Constructs a moduleBO object with a given creation_date, grade, passed
   * 
   * @param {String} aname - the name of this moduleBO.
   */
  constructor() {
    super();
    this.creation_date = null
    this.edv_nr = null
    this.name = null
  }

  /**
   * Sets a new name
   * 
   * @param {String} aname - the new name of this PersonBO.
   */
  setCreationDate(acreation_date) {
    this.creation_date = acreation_date
  }

  getCreationDate() {
    return this.getCreationDate
  }

  setName(aname) {
    this.name = aname
  }

  getName() {
    return this.name
  }

  setedv(edv){
      this.edv_nr = edv
  }

  getedv(){
      return this.edv_nr
  }


  static fromJSON(module) {
    let result = [];

    if (Array.isArray(module)) {
      module.forEach((p) => {
        Object.setPrototypeOf(p, ModuleBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = module;
      Object.setPrototypeOf(p, ModuleBO.prototype);
      result.push(p);
    }

    return result;
  }
}