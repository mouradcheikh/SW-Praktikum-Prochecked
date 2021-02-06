import BusinessObject from './BusinessObject';



/**
 * Represents a Module of the system
 */
export default class ModuleBO extends BusinessObject {

  /**
   * Constructs a moduleBO object with a given creation_date, grade, passed
   * 
   * @param {String} aname - the name of this ModuleBO.
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
   * @param {String} aname - the new name of this ModuleBO.
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
      module.forEach((m) => {
        Object.setPrototypeOf(m, ModuleBO.prototype);
        result.push(m);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let m = module;
      Object.setPrototypeOf(m, ModuleBO.prototype);
      result.push(m);
    }

    return result;
  }
}