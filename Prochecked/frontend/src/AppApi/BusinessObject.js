/**
 * Base class for all BusinessObjects, which has an ID field by default.
 */
export default class BusinessObject {

    /**
     * The null constructor.
     */
    constructor() {
      this.id = 0;
      this.creation_date = null
      this.last_updated = null
    }
  
    /**
     * Sets the ID of this BusinessObject.
     * 
     * @param {*} aId - the new ID of this BusinessObject
     */
    setID(aId) {
      this.id = aId;
    }
  
    /**
     * Returns the ID of this BusinessObject.
     */
    getID() {
      return this.id;
    }
  

    setCreationDate(aCreationDate){
      this.creation_date = aCreationDate
    }

    getCreationDate(){
      return this.creation_date
    }

    setLastUpdated(aLastUpdated){
      this.last_updated = aLastUpdated
    }

    getLastUpdated(){
      return this.last_updated
    }
    /**
     * Returns a string representation of this Object. This is useful for debugging purposes.
     */
    toString() {
      let result = '';
      for (var prop in this) {
        result += prop + ': ' + this[prop] + ' ';
      }
      return result;
    }
  }