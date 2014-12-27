/**
 * Created by hafizbilalraza on 9/26/2014.
 */
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/Posts');
var Comment = require('../models/Comments');

//get all posts
exports.getPosts=function(req, res, next) {
    Post.find(function(err, posts){
        if(err){ return next(err); }

        res.json(posts);
    });
};

//add new post
exports.addPosts=function(req, res, next) {
    var post = new Post(req.body);
    post.save(function(err, post){
        if(err){ return next(err); }
        res.json(post);
    });
};

//post param pipe
exports.param=function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function (err, post){
        if (err) return next(err);
        if (!post) return res.status(404).json({msg:"post not found"});

        req.post = post;
        return next();
    });
};

//get post by post id
exports.getPostsById=function(req, res, next) {
    req.post.populate('comments', function(err, post) {
        if(err) return next(err);
        res.json(post);
    });
};

//update post by post id
exports.updatePostsById=function(req, res, next) {
    Post.findOneAndUpdate({_id: req.post._id}, {title: req.body.title}, function(err, doc){
        if(err) return next(err);
        res.status(200).json(doc);
    })
};

//remove post by post id
exports.removePostsById=function(req, res, next) {
    Post.findOneAndRemove({_id: req.post._id}, function(err, doc){
        if(err) return next(err);
        res.status(200).json({msg:'post has deleted'});
    })
};

//upVoting post by post id
exports.upVotePostById=function(req, res, next) {
    req.post.upvote(function(err, post){
        if (err) { return next(err); }

        res.json(post);
    });
};

//post comments by post id
exports.postCommentByPostId=function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment){
        if(err){ return next(err); }

        req.post.comments.push(comment);
        req.post.save(function(err, post) {
            if(err){ return next(err); }

            res.json(comment);
        });
    });
};