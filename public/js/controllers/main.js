/**
 * Created by hafizbilalraza on 9/26/2014.
 */
app.controller('MainCtrl', function($scope, posts, post){
    $scope.test = 'Hello world!';
    $scope.post = post;
    $scope.addPost = function(){
        if($scope.title === '') { return; }
        posts.create({
            title: $scope.title,
            link: $scope.link
        });
        $scope.title = '';
        $scope.link = '';
    };
    $scope.incrementUpvotes = function(post) {
        posts.upvote(post);
    };
});