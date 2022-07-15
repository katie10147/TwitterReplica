

const express = require('express');

const Users = require('../models/Users');
const userMW = require('./userMiddleware');
const freetMW = require('./freetMiddleware');

const router = express.Router();

/**
 * Gets all freets
 * User does not need to be signed in
 * 
 * @name GET /freets
 */
router.get('/allFreets', (req, res) => {
    const allFreets = Users.findAllFreets();
    res.status(200).json(allFreets).end();
});

/**
 * gets all freets by author
 * user does not need to be signed in
 * 
 * @name GET /freets
 */
router.get('/:author', [userMW.authorExists], (req, res) => {
    const authorFreets = Users.getFreetsByAuthor(req.params.author);
    res.status(200).json(authorFreets).end();
});

/**
 * creates a freet
 * user must be signed in
 * 
 * @name POST /freets
 */
router.post('/create', [userMW.userIsSignedIn, freetMW.freetValid], (req, res) => {
    const username = req.body.username;
    const refreeter = req.body.refreeter;
    const message = req.body.content;
    const upvotes = req.body.upvotes;
    const freetId = req.body.freetId;
    const newFreet = Users.addFreet(username, message, upvotes, refreeter, freetId);
    res.status(200).json(newFreet).end();
});

/**
 * Edits a freet by id
 * user must be signed in
 * freet must belong to user
 * 
 * @name PATCH /freets
 */
router.patch('/edit', [userMW.userIsSignedIn, freetMW.freetBelongsToUser, freetMW.freetValid], (req, res) => {
    const freetId = req.body.id
    const message = req.body.content
    const newFreet = Users.editFreet(freetId, message);
    res.status(200).json(newFreet).end();
});


/**
 * Adds an upvote to a Freet
 * user must be signed in
 * freet can belong to user
 * 
 * @name PATCH /freets
 */
 router.patch('/upvote/:id?', [userMW.userIsSignedIn, userMW.notUserUpvotedFreet], (req, res) => {
    const freetId = parseInt(req.params.id);
    const username = req.body.data.username;
    Users.upvoteFreet(freetId, username);
    res.status(200).json({message: `freet ${freetId} upvoted`}).end();
});

/**
 * Adds an downvote to a Freet
 * user must be signed in
 * freet can belong to user
 * 
 * @name PATCH /freets
 */
 router.patch('/downvote/:id?', [userMW.userIsSignedIn, userMW.userUpvotedFreet], (req, res) => {
    const freetId = parseInt(req.params.id);
    const username = req.body.data.username;
    Users.downvoteFreet(freetId, username);
    res.status(200).json({message: `freet ${freetId} downvoted`}).end();
});

/**
 * Deletes a freet by id
 * User must be signed in
 * freet must belong to user
 * 
 * @name DELETE /freets
 */
router.delete('/:id?', [userMW.userIsSignedIn, freetMW.freetBelongsToUser], (req, res) => {
    const freetId = req.params.id;
    Users.deleteFreet(freetId);
    res.status(200).json({message: `freet ${freetId} deleted`}).end();
});

module.exports = router;