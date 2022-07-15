
/**
 * @class Freet
 * 
 * Stores the id and content of a Freet
 * Wherever you import this class, you will be accessing the same data.
 */

class Freet {
  /**
   * Create a Freet.
   * 
   * @param {string} id - The unique id associated with a freet
   * @param {string} content - The message that the freet represents
   * @param {int} upvotes - the number of upvotes of the freet
   * @param {stirng} refreeter - the user who refreeted the freet or null if an original freet
   */
  constructor(id, content, author, upvotes, refreeter) {
    this.id = id;
    this.content = content;
    this.author = author;
    this.upvotes = upvotes;
    this.refreeter = refreeter;
  }
}

module.exports = Freet;