var express = require('express');
var router = express.Router();

var postsApi = require('../controllers/posts');

//get all posts
router.get('/posts', postsApi.getPosts);
//add new post
router.post('/posts', postsApi.addPosts);
//post param pipe
router.param('post', postsApi.param);
//get post by post id
router.get('/posts/:post', postsApi.getPostsById);
//update post by post id
router.put('/posts/:post', postsApi.updatePostsById);
//remove post by post id
router.delete('/posts/:post', postsApi.removePostsById);

//upVoting post by post id
router.put('/posts/:post/upvote', postsApi.upVotePostById);

//post comments by post id
router.post('/posts/:post/comments',postsApi.postCommentByPostId);

/**
 * API for wrong request.
 */

router.all('*',function(req,res){
    res.status(400).json({msg:'invalid api'})
});

module.exports = router;
