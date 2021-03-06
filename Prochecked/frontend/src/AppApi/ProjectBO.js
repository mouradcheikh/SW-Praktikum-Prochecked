import BusinessObject from './BusinessObject';

export default class ProjectBO extends BusinessObject {

    /**
     * Constructs a ProjectBO object with a given name
     * 
     * @param {String} aname - the name of this ProjectBO.
     */
    constructor(aname) {
      super();
       this.name = aname;
       this.capacity = null
       this.room = null
       this.ext_partner_list = null
       this.short_description = null
       this.weekly_flag = null
       this.number_bd_b_lecturetime = null 
       this.number_bd_examtime = null
       this.number_bd_lecturetime = null 
       this.preffered_bd = null 
       this.special_room = null
       this.dozent = null
       this.dozent2 = null
       this.semester = null 
       this.project_state = null
       this.project_type = null
       this.semester = null
       this.module = null 
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

    setProjectType(aprojecttype){
        this.project_type = aprojecttype
    }

    setDozent(aDozent){
        this.dozent = aDozent
    }

    getDozent(){
        return this.dozent
    }

    setDozent2(aDozent){
        this.dozent2 = aDozent
    }

    setWeeklyFlag(aweeklyflag){
        this.weekly_flag = aweeklyflag
    }

    setNumberBdBLecturetime(NumberBdBLecturetime){
        this.number_bd_b_lecturetime = NumberBdBLecturetime
    }

    setNumberBdExamtime(NumberBdExamtime){
        this.number_bd_examtime = NumberBdExamtime
    }

    setNumberBdLecturetime(NumberBdLecturetime){
        this.number_bd_lecturetime = NumberBdLecturetime
    }

    setSpecialRoom(SpecialRoom){
        this.special_room = SpecialRoom
    }

    setProjectState(ProjectState){
        this.project_state = ProjectState
    }

    getProjectState(){
        return this.project_state
    }

    setSemester(semester){
        this.semester = semester
    }

    getSemester(){
        return this.semester
    }

    setprefferedbd(bd){
        this.preffered_bd = bd
    }

    getProjectState(){
        return this.project_state
    }

    setModule(moduleid){
        this.module = moduleid
    }

    getModule(){
        return this.module
    }

    getProjectType(){
        return this.project_type
    }

/** 
   * Returns an Array of ProjectBO from a given JSON structure.
   */
    static fromJSON(projects) {
    let result = [];

    if (Array.isArray(projects)) {
      projects.forEach((p) => {
        Object.setPrototypeOf(p, ProjectBO.prototype);
        result.push(p);
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
    