import BusinessObject from './BusinessObject';

/**
 * Represents a Role of the system
 */
export default class RoleBO extends BusinessObject {

  /**
   * Constructs a RoleBO object with a given name
   * 
   * @param {String} aname - the name of this RoleBO.
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
}