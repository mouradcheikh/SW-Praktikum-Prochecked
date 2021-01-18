import BusinessObject from './BusinessObject';

/**
 * Represents a ProjectType of the system
 */
export default class ProjectTypeBO extends BusinessObject {

  /**
   * Constructs a RoleBO object with a given name
   * 
   * @param {String} aname - the name of this RoleBO.
   */
  constructor(aname) {
    super();
    this.name = aname;
    this.number_ects = null;
    this.number_sws = null
    }

  setName(aname){
      this.name = aname
    }

  getName(){
      return this.name
    }

  setEcts(ects){
      this.number_ects = ects
    }

  setSws(sws){
    this.number_sws = sws
    }

static fromJSON(projecttypes) {
    let result = [];

    if (Array.isArray(projecttypes)) {
      projecttypes.forEach((p) => {
        Object.setPrototypeOf(p, ProjectTypeBO.prototype);
        result.push(p);
      })
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = projecttypes;
      Object.setPrototypeOf(p, ProjectTypeBO.prototype);
      result.push(p);
    }

    return result;
  }

}
