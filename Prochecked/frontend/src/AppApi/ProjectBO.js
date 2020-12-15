import BusinessObject from './BusinessObject';

export default class ProjectBO extends BusinessObject {

    /**
     * Constructs a RoleBO object with a given name
     * 
     * @param {String} aname - the name of this RoleBO.
     */
    constructor(aname) {
      super();
       this.name = aname;
       this.capacity = null
       this.room = null
       this.ext_partner_list = null
       this.short_description = null
       this.weekly_flag = null
       this.number_bd_per_week = null
       this.number_bd_b_lecturetime = null //blocktage vor beginn der vorlesungszeit
       this.number_bd_examtime = null
       this.number_bd_lecturetime = null //blocktage vorlesungszeit
       this.preffered_bd = null //Gibt es Vorlesungen am Wochenende? wenn ja welches datum?
       this.special_room = null
       this.module = null
       this.dozent = []
       this.semester = null 
       this.project_state = null
       this.projecttype = null
    }
  
    setName(aname){
        this.name = aname
    }
  
    getName(){
        return this.name
    }

    setCapacity(aCapacity){
        this.capacity = aCapacity
    }

    getCapacity(){
        return this.capacity
    }

    setRoom(aRoom){
        this.room = aRoom
    }

    getRoom(){
        return this.room
    }

    setExtPartnerList(aExtPartnerList){
        this.ext_partner_list = aExtPartnerList
    }

    getExtPartnerList(){
        return this.ext_partner_list
    }

    setShortDescription(aShortDespription){
        this.short_description = aShortDespription
    }

    getShortDescription(){
        return this.short_description
    }
/** 
   * Returns an Array of PersonBOs from a given JSON structure.
   */
    static fromJSON(projects) {
    let result = [];

    if (Array.isArray(projects)) {
      projects.forEach((p) => {
        Object.setPrototypeOf(p, ProjectBO.prototype);
        result.push(p);
        // console.log(p)
      })
      
    } else {
      // Es handelt sich offenbar um ein singuläres Objekt
      let p = projects;
      Object.setPrototypeOf(p, ProjectBO.prototype);
      result.push(p);
    }

    return result;
  }
}
    