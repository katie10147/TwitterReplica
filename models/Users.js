const Freet = require("./Freet");

let users = {};
let masterFreetId = 0;

/**
 * @class User
 *
 * Stores all Users. Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */

class User {
  /**
   * Add a User to the collection.
   *
   * @param {string} username - The unique id of a user
   * @param {string} password - The password of a user
   * @prop {{freetId: Freet}} freets - object mapping freetId to Freet
   * @prop {{freedId: Freet}} upvotedFreets - object mapping freetId to Freet
   * @prop {{freedId: Freet}} refreetedFreets - object mapping freetId to Freet
   * @prop {Users} following - list of users who current user follows
   */
  constructor(username, password) {
    this.username = username;
    this.password = password;
    this.freets = {};
    this.upvotedFreets = {};
    this.refreetedFreets = {};
    this.following = [];
  }
}

/**
 * @class Users
 *
 * Stores all Users. Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Users {
  /**
   * Add a User to the collection.
   *
   * @param {string} username - The name of the user
   * @param {string} password - The password for user
   * @return {User} - the newly created user
   */
  static addUser(username, password) {
    const user = new User(username, password);
    users[username] = user;
    return user;
  }

  /**
   * Find a User by username.
   *
   * @param {string} username - The name of the user to find
   * @return {User | undefined} - the found short with above name
   */
  static findUser(username) {
    if (username in users) {
      return users[username];
    }
    return undefined;
  }

  /**
   * @return {{username: User}} an object of all of the Users with mapping username : User
   */
  static findAllUsers() {
    return users;
  }

  /**
   * Update a User's username.
   *
   * @param {string} curUsername - The current username of the user to update
   * @param {string} newUsername - The new username of the user being updated
   * @return {User | undefined} - The updated user
   */
  static changeUsername(curUsername, newUsername) {
    const user = users[curUsername];
    user.username = newUsername;
    for (const [id, freet] of Object.entries(user.freets)) {
      freet.author = newUsername;
    }
    if (!(curUsername === newUsername)) {
      users[newUsername] = user;
      delete users[curUsername];
    }
    return user;
  }

  /**
   * Update a User's password.
   *
   * @param {string} username - The current username of the user
   * @param {string} newPassword - The new password of the user being updated
   * @return {User | undefined} - The updated user
   */
  static changePassword(username, newPassword) {
    const user = users[username];
    user.password = newPassword;
    return user;
  }

  /**
   * Delete a User from the collection.
   *
   * @param {string} username - name of User to delete
   * @return {Boolean} - true if user deleted
   */
  static deleteUser(username) {
    return delete users[username];
  }

  /**
   * Find a specific Freet.
   *
   * @param {string} freetId - id of the Freet to find
   * @return {Freet | undefined} - the Freet that was meant to be found
   */
  static findFreet(freetId) {
    for (const [username, user] of Object.entries(users)) {
      const freets = user.freets;
      if (freetId in freets) {
        return freets[freetId];
      }
    }
  }

  /**
   * Find all freets
   *
   * @return {Freet[]} - list of all freets
   *
   */
  static findAllFreets(freetId) {
    let allFreets = [];
    for (const [username, user] of Object.entries(users)) {
      const freets = user.freets;
      for (const [id, freet] of Object.entries(freets)) {
        allFreets.push(freet);
      }
    }
    return allFreets;

    // for (const [username, user] of Object.entries(users)) {
    //   const freets = user.freets;
    //   let obj = {};
    //   obj[username] = [];
    //   allFreets.push(obj);
    //   for (const [id, freet] of Object.entries(freets)) {
    //     allFreets.push(freet);
    //   }
    // }
    // return allFreets;
  }

  /**
   * Find all freets with a user signed in
   *
   * @return {Freet: boolean} - Object of all freets with boolean indicating if the freet
   * has been upvoted by signed in user
   */
  static userFindAllFreets() {
    let allFreets = {};
    for (const [username, user] of Object.entries(users)) {
      const freets = user.freets;
      for (const [id, freet] of Object.entries(freets)) {
        allFreets[freet] = freet in this.upvotedFreets;
      }
    }
    return allFreets;
  }

  /**
   * Find all freets
   *
   * @return {Freet[]} - list of all freets
   */
  static getFreetsByAuthor(authorName) {
    let authorFreets = [];
    const author = Users.findUser(authorName);
    for (const [id, freet] of Object.entries(author.freets)) {
      authorFreets.push(freet);
    }
    return authorFreets;

    // let freetObj = {};
    // freetObj[authorName] = [];
    // let authorFreets = freetObj[authorName];
    // const author = Users.findUser(authorName);
    // for (const [id, freet] of Object.entries(author.freets)) {
    //   authorFreets.push(freet);
    // }
    // return freetObj;
  }
  /**
   * Get all upvoted freets by user
   *
   * @return {Freet[]} - list of all freets
   */
  static getUpvotedFreets(userName) {
    const user = Users.findUser(userName);
    if (user) {
      return user.upvotedFreets;
    }
  }

  /**
   * Get all upvoted freets by user
   *
   * @return {Freet[]} - list of all freets
   */
  static getRefreetedFreets(userName) {
    const user = Users.findUser(userName);
    if (user) {
      return user.refreetedFreets;
    }
  }

  /**
   * Add a freet to a specific user.
   *
   * @param {string} username - username of user
   * @param {string} freetId - id of the Freet to be added
   * @param {string} content - content of freet
   * @return {Freet | undefined} - Freet that was added
   */
  static addFreet(author, content, upvotes = 0, refreeter = null, freetId = null) {
    const freet = new Freet(masterFreetId, content, author, upvotes, refreeter);

    if (refreeter) {
      let user = Users.findUser(refreeter);
      let freets = user.freets;
      user.refreetedFreets[freetId] = freet;
      freets[masterFreetId] = freet;
    }
    else {
      let user = Users.findUser(author);
      let freets = user.freets;
      freets[masterFreetId] = freet;
    }
    
    masterFreetId++;
    return freet;
  }

  /**
   * Edit a specific Freet
   *
   * @param {string} freetId - id of the Freet to be edited
   * @param {string} content - new content of freet
   * @return {Freet | undefined} - Freet that was edited
   */
  static editFreet(freetId, content) {
    const freet = Users.findFreet(freetId);
    freet.content = content;
    return freet;
  }

  /**
   * Delete a Freet of a specific user.
   *
   * @param {string} freetId - id of the Freet to be deleted
   * @return {Boolean} - true if freet was deleted
   */
  static deleteFreet(freetId) {
    const freet = Users.findFreet(freetId);
    for (const [usename, user] of Object.entries(users)) {
      if (freetId in user.freets) {
        return delete user.freets[freetId];
      }
      for (freet in user.refreetedFreets){
        if (freetId in user.refreetedFreets[freet]){
          return delete user.refreetedFreets[freetId];
        }
      }
    }
  }
  /**
   * Upvote a Freet by id.
   *
   * @param {string} freetId - id of the Freet to be upvoted
   * @return {Boolean} - true if freet was upvoted
   */
  static upvoteFreet(freetId, username) {
    console.log(freetId);
    const freet = Users.findFreet(freetId);
    console.log(freet);
    const user = users[username];
    user.upvotedFreets[freetId] = freet;
    freet.upvotes += 1;
    return true;
  }

  /**
   * Downvote a Freet by id.
   *
   * @param {string} freetId - id of the Freet to be downvoting
   * @param {string} username - the username of the user downvoting the freet
   * @return {Boolean} - true if freet was downvoted
   */
  static downvoteFreet(freetId, username) {
    const freet = Users.findFreet(freetId);
    const user = users[username];
    delete user.upvotedFreets[freetId];
    if (freet.upvotes > 0) {
      freet.upvotes -= 1;
    } else {
      freet.upvotes = 0;
    }
    return true;
  }

  /**
   * Find a Freet by id.
   *
   * @param {string} freetId - id of the Freet to be upvoted
   * @return {Freet}
   */
  static findFreet(freetId) {
    const freets = Users.findAllFreets();
    return freets.filter((freet) => freet.id === freetId)[0];
  }

  /**
   * Follow a specified user
   *
   * @param {string} username - username of current user
   * @param {string} follow - username of user to follow
   */
  static follow(username, follow) {
    const user = Users.findUser(username);
    const toFollow = Users.findUser(follow);
    user.following.push(toFollow);
    return user;
  }

  /**
   * Unfollow a specified user
   *
   * @param {string} username - username of current user
   * @param {string} unfollow - username of user to unfollow
   */
  static unfollow(username, unfollow) {
    const user = Users.findUser(username);
    const toUnfollow = Users.findUser(unfollow);
    user.following = user.following.filter((u) => u !== toUnfollow);
    return user;
  }

  /**
   * Gets all freets that the following users have created
   *
   * @param {string} username - username of current user
   */
  static getFollowing(username) {
    const user = Users.findUser(username);
    // const freets = user.following.map(user => user.freets).map(entry => entry.value).flat();
    const all = user.following.map((user) => user.freets);
    const freets = [];
    for (const freet of all) {
      freets.push(Object.values(freet));
    }
    return freets.flat();
  }
}

module.exports = Users;
