/**
 * Created by hafizbilalraza on 9/26/2014.
 */
app.controller('PostsCtrl', function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function(){
        if($scope.body === '') { return; }
        posts.addComment(post._id, {
            body: $scope.body,
            author: 'user'
        }).success(function(comment) {
            $scope.post.comments.push(comment);
        });
        $scope.body = '';
    };
    $scope.incrementUpvotes = function(comment){
        posts.upvoteComment(post, comment);
    };
});