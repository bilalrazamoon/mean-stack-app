angular.module('app.controllers')
    .controller('createCtrl', function ($scope, postsFactory, $timeout) {
        $scope.post={};
        $scope.done=false;
        $scope.create = function () {
            postsFactory.create($scope.post).then(function(res){
                console.log(res);
                $scope.done=true;
                $timeout(function(){
                    $scope.done=false;
                },3000)
            });
            $scope.post={};
        };
    })
    .controller('postsCtrl', function ($scope, postsFactory, postsPromise) {
        $scope.test = 'Hello world!';
        $scope.posts = postsPromise;
    })
    .controller('postCtrl', function ($scope, $stateParams, postPromise, postsFactory) {
        $scope.comment={author:'Anonymously'};
        $scope.post = postPromise;
        $scope.addComment = function () {
            postsFactory.addComment($scope.post._id, $scope.comment).success(function (comment) {
                $scope.post.comments.push(comment);
                $scope.comment={author:'Anonymously'};
            });
        };
        $scope.incrementUpvotes = function (comment) {
            postsFactory.upvoteComment(posts, comment);
        };
    });
