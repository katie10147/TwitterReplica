const Users = require('../models/Users');

// Checks that the username in the request body does not already exist
const usernameDoesNotAlreadyExist = (req, res, next) => {
  if (req.body.username) {
    if (Users.findUser(req.body.username) !== undefined) {
      res.status(400).json({
        error: `Username ${req.body.username} already exists.`,
      }).end();
      return;
    } 
  }
  next();
};

// Checks that the user with username exists
const authorExists = (req, res, next) => {
  if (Users.findUser(req.params.author) === undefined) {
    res.status(400).json({
      error: `Username ${req.params.author} does not exist.`,
    }).end();
    return;
  }
  next();
};

// checks that the username is defined and at least one character
const usernameValid = (req, res, next) => {
  if (req.body.username) {
    if (req.body.username.length === 0) {
      res.status(404).json({
        error: `Username must be at least one character`,
      }).end();
      return;
    }
  }
  next();
};

// checks that the password is defined and at least one character
const passwordValid = (req, res, next) => {
  if (req.body.password) {
    if (req.body.password.length === 0) {
      res.status(404).json({
        error: `password must be at least one character`,
      }).end();
      return;
    }
  }
  next();
};

// Checks that the user is not already signed in
const userNotSignedIn = (req, res, next) => {
    if (req.session.username !== undefined || req.session.password !== undefined) {
      res.status(403).json({
        error: 'You are already signed in! Please sign out first to perform this action!'
      }).end();
      return;
    }
    next();
};

// Checks that the username and password is set in session
const userIsSignedIn = (req, res, next) => {
    if (req.session.username === undefined || req.session.password === undefined) {
      res.status(403).json({
        error: 'No user signed in!'
      }).end();
      return;
    } else if (Users.findUser(req.session.username) === undefined) {
      console.log('Error: session username not found in Users!')
      return;
    }
    next();
};

// Checks that the username and password credentials for a user are correct
const signInValid = (req, res, next) => {
  const user = Users.findUser(req.body.username);
  if (user === undefined) {
    res.status(403).json({
      error: 'Username invalid!'
    }).end();
    return;
  }
  if (!(req.body.password === user.password)) {
    res.status(403).json({
      error: 'Password invalid!'
    }).end();
    return;
  }
  next();
};

const userExists = (req, res, next) => {
  const user = Users.findUser(req.params.username);
  if (user === undefined) {
    res.status(400).json({
      error: `Username ${req.params.username} does not exist.`,
    }).end();
    return;
  }
  next();
};

const sameUser = (req, res, next) => {
  if(req.params.username !== req.session.username){
    res.status(400).json({
      error: 'The username requested does not match the signed in user',
    }).end();
    return;
  }
  next();
};

const differentUser = (req, res, next) => {
  if(req.params.username === req.session.username){
    res.status(400).json({
      error: 'You cannot follow yourself',
    }).end();
    return;
  }
  next();
};

const userDoesNotFollow = (req, res, next) => {
  const user = Users.findUser(req.session.username);
  if ( user.following.includes(Users.findUser(req.params.username)) ) {
    res.status(400).json({
      error: `You already follow ${req.params.username}`,
    }).end();
    return;
  }
  next();
};

const userFollows = (req, res, next) => {
  const user = Users.findUser(req.session.username);
  if(!user.following.includes(Users.findUser(req.params.username))) {
    res.status(400).json({
      error: `You do not follow ${req.params.username}`,
    }).end();
    return;
  }
  next();
}

// checks the freet in user.upvotedFreets
const userUpvotedFreet = (req, res, next) => {
  const user = Users.findUser(req.session.username);
  const upvotedFreets = user.upvotedFreets;
  if (!(req.params.id in upvotedFreets)) {
      res.status(404).json({
          error: `User cannot downvote a freet before upvoting`,
      }).end();
      return;
  }
  next();
};

// checks the freet in user.upvotedFreets
const notUserUpvotedFreet = (req, res, next) => {
  const user = Users.findUser(req.session.username);
  const upvotedFreets = user.upvotedFreets;
  if (parseInt(req.params.id) in upvotedFreets) {
      res.status(404).json({
          error: `User cannot upvote a freet before twice`,
      }).end();
      return;
  }
  next();
};

const usernameOrPasswordDefined = (req, res, next) => { 
  if (! req.body.password && ! req.body.username) {
    res.status(404).json({
      error: `must change a username or password`,
  }).end();
  return;
  }
  next();
};


module.exports = Object.freeze({
    userNotSignedIn,
    usernameDoesNotAlreadyExist,
    usernameValid,
    passwordValid,
    userIsSignedIn,
    signInValid,
    authorExists,
    userExists,
    userDoesNotFollow,
    differentUser,
    userFollows,
    userUpvotedFreet,
    notUserUpvotedFreet,
    sameUser,
    usernameOrPasswordDefined
});