import BusinessObject from './BusinessObject';


/**
 * Represents a person of the system
/**
 * Represents a Role of the system
 */
export default class ModuleBO extends BusinessObject {

  /**
   * Constructs a PersonBO object with a given name, email, google id and role
   * 
//    * @param {String} aname - the name of this PersonBO. ????
   */
  constructor(aname, aedv_nr) {
    super();
    this.name = aname
    this.edv_nr = aedv_nr
   
  }

//   /**
//    * Sets a new name
//    * 
//    * @param {String} aname - the new name of this PersonBO.  ??????
//    */
  setName(aname) {
    this.name = aname
  }
  getName() {
    return this.name
  }
  setEdv_nr(aedv_nr) {
    this.edv_nr = aedv_nr
  }
  getEdv_nr() {
    return this.edv_nr
  }

 
  /** 
   * Returns an Array of PersonBOs from a given JSON structure.
   */
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