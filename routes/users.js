const express = require("express");

const router = express.Router();

const Users = require("../models/Users");
const { usernameValid, passwordValid } = require("./userMiddleware");
const userMW = require("./userMiddleware");

/**
 * Set username and password of active user.
 *
 * @name POST /users
 * [userMW.userNotSignedIn, userMW.usernameDoesNotAlreadyExist, userMW.usernameValid, userMW.passwordValid]
 */
router.post(
  "",
  [
    userMW.usernameDoesNotAlreadyExist,
    userMW.usernameValid,
    userMW.passwordValid,
  ],
  (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    req.session.username = username;
    req.session.password = password;
    const user = Users.addUser(username, password);
    res
      .status(200)
      .json({
        newUser: user,
        message: `user ${user.username} signed in.`,
      })
      .end();
  }
);

/**
 * Delete current user.
 *
 * @name DELETE /users
 */
router.delete(
  "/:username?",
  [userMW.userIsSignedIn, userMW.sameUser],
  (req, res) => {
    const username = req.params.username;
    Users.deleteUser(username);
    req.session.username = undefined;
    req.session.password = undefined;
    res
      .status(200)
      .json({ message: `User ${username} deleted` })
      .end();
  }
);

/**
 * Sign in user with username and password.
 *
 * @name POST /users
 */
router.post(
  "/signIn",
  [userMW.userNotSignedIn, userMW.signInValid],
  (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    req.session.username = username;
    req.session.password = password;
    res
      .status(200)
      .json({
        message: `User ${username} signed in`,
      })
      .end();
  }
);

/**
 * Sign out user
 *
 * @name PATCH /users
 */
router.patch("/signOut", [userMW.userIsSignedIn], (req, res) => {
  req.session.username = undefined;
  req.session.password = undefined;
  res
    .status(200)
    .json({
      message: "You have signed out",
    })
    .end();
});

/**
 * get signedInUser
 * do not need to be signed in
 *
 * @name GET /users
 */
router.get("/signedIn", (req, res) => {
  res
    .status(200)
    .json({
      username: req.session.username,
    })
    .end();
});

/**
 * gets all users that the current user is following
 * user must be signed in
 *
 * @name get /users
 */
router.get("/following", [userMW.userIsSignedIn], (req, res) => {
  const user = Users.findUser(req.session.username);
  const following = user.following.map((u) => u.username);
  res
    .status(200)
    .json(following)
    .end();
});

/**
 * Change the username of current user
 *
 * @name PATCH /users
 */
router.patch(
  "/:username?",
  [
    userMW.userIsSignedIn,
    userMW.sameUser,
    userMW.usernameValid,
    userMW.usernameDoesNotAlreadyExist,
    userMW.passwordValid,
    userMW.usernameOrPasswordDefined,
  ],
  (req, res, next) => {
    const username = req.params.username;
    let updatedUser;
    if (req.body.username) {
      updatedUser = Users.changeUsername(username, req.body.username);
      req.session.username = req.body.username;
    }
    if (req.body.password) {
      updatedUser = Users.changePassword(username, req.body.password);
      req.session.password = req.body.password;
    }
    res
      .status(200)
      .json({ updatedUser, message: "you have changed your credentials" })
      .end();
  }
);

/**
 * Current user follows the inputted user
 *
 * @name POST /follow/username
 */
router.post(
  "/follow/:username",
  [
    userMW.userIsSignedIn,
    userMW.differentUser,
    userMW.userExists,
    userMW.userDoesNotFollow,
  ],
  (req, res) => {
    const user = Users.follow(req.session.username, req.params.username);
    res
      .status(200)
      .json(user)
      .end();
  }
);

/**
 *
 */
router.post(
  "/unfollow/:username",
  [
    userMW.userIsSignedIn,
    userMW.differentUser,
    userMW.userExists,
    userMW.userFollows,
  ],
  (req, res) => {
    const user = Users.unfollow(req.session.username, req.params.username);
    res
      .status(200)
      .json(user)
      .end();
  }
);

/**
 * Gets a list of all the freets from users currently following
 *
 * @name Get /following
 */
router.get("/following/freets", [userMW.userIsSignedIn], (req, res) => {
  const following = Users.getFollowing(req.session.username);
  res
    .status(200)
    .json(following)
    .end();
});

/**
 * gets refreets by user
 * user needs to be signed in
 *
 * @name GET /users
 */
router.get("/refreets/user=:user?", [userMW.userIsSignedIn], (req, res) => {
  const refreetedFreets = Users.getRefreetedFreets(req.params.user);
  console.log(refreetedFreets);
  res
    .status(200)
    .json(refreetedFreets)
    .end();
});

/**
 * gets all upvoted freets by user
 * user needs to be signed in
 *
 * @name GET /users
 */
router.get("/upvotes/user=:user?", [userMW.userIsSignedIn], (req, res) => {
  const upvotedFreets = Users.getUpvotedFreets(req.params.user);
  res
    .status(200)
    .json(upvotedFreets)
    .end();
});

module.exports = router;
