angular.module('app.factory')
    .factory('postsFactory', function ($http, baseUrl) {
        var o = {
            posts: []
        };
        o.getAll = function (id) {
            return $http.get(baseUrl + '/posts').then(function (res) {
                return res.data;
            });
        };

        o.create = function (post) {
            return $http.post(baseUrl + '/posts', post);
        };

        o.get = function(id) {
            return $http.get(baseUrl + '/posts/' + id).then(function(res){
                return res.data;
            });
        };

        o.upvote = function (post) {
            return $http.put(baseUrl + '/posts/' + post._id + '/upvote')
                .success(function (data) {
                    post.upvotes += 1;
                })
        };

        o.addComment = function (id, comment) {
            return $http.post(baseUrl + '/posts/' + id + '/comments', comment);
        };

        o.upvoteComment = function (post, comment) {
            return $http.put(baseUrl + '/posts/' + post._id + '/comments/' + comment._id + '/upvote')
                .success(function (data) {
                    comment.upvotes += 1;
                });
        };
        return o;
    });