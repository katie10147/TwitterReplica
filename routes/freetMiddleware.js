const Users = require('../models/Users');

// checks that a freet is 140 or fewer characters
const freetValid = (req, res, next) => {
    const content = req.body.content;
    if (content === undefined) {
        res.status(404).json({
            error: `freet content must be defined.`,
        }).end();
        return;
    }
    if (content.length === 0) {
        res.status(404).json({
            error: `freet content must be at least one character.`,
        }).end();
        return;
    }
    if (content.length > 140) {
        res.status(404).json({
            error: `freet content must 140 characters or less.`,
        }).end();
        return;
    }
    next();
};

// checks that the freet id belongs to user signed in
const freetBelongsToUser = (req, res, next) => {
    console.log(req.session.username)
    const user = Users.findUser(req.session.username);
    const userFreets = user.freets;
    let id = null;
    if (req.params.id != undefined) {
        id = req.params.id;
    }
    if (req.body.id != undefined) {
        id = req.body.id
    }
    if (!(id in userFreets)) {
        res.status(404).json({
            error: `Current user does not have any freets with that id.`,
        }).end();
        return;
    }
    next();
};



module.exports = Object.freeze({
    freetValid,
    freetBelongsToUser,
});