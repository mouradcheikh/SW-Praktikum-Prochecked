import BusinessObject from "./BusinessObject";

export default class ProjectTypeBO extends BusinessObject {
  /**
   * Constructs a ProjectTypeBO object with a given name
   *
   * @param {String} aname - the name of this RoleBO.
   */
  constructor(aname) {
    super();
    this.name = aname;
    this.number_ects = null;
    this.number_sws = null;
  }

  setName(aname) {
    this.name = aname;
  }

  getName() {
    return this.name;
  }

  setNumberECTS(aECTS) {
    this.number_ects = aECTS;
  }

  getNumberECTS() {
    return this.number_ects;
  }

  setNumberSWS(aSWS) {
    this.number_sws = aSWS;
  }

  getNumberECTS() {
    return this.number_sws;
  }
}
