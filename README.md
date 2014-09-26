#REST API

    GET /posts - return a list of posts and associated metadata
    POST /posts - create a new post
    GET /posts/:id - return an individual post with associated comments
    PUT /posts/:id/upvote - upvote a post, notice we use the post ID in the URL
    POST /posts/:id/comments - add a new comment to a post by ID
    PUT /posts/:id/comments/:id/upvote - upvote a comment