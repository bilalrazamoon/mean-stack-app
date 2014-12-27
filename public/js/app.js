angular.module('mean-stack', ['ui.router','app.controllers','app.factory'])
    .value('baseUrl','http://localhost:8080/api')
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('posts', {
                url: '/posts',
                templateUrl: 'partials/posts.html',
                controller: 'postsCtrl',
                resolve: {
                    postsPromise: ['postsFactory', function(postsFactory){
                        return postsFactory.getAll();
                    }]
                }
            })
            .state('post', {
                url: '/post/{id}',
                templateUrl: 'partials/post.html',
                controller: 'postCtrl',
                resolve: {
                    postPromise: ['$stateParams', 'postsFactory', function($stateParams, postsFactory) {
                        return postsFactory.get($stateParams.id);
                    }]
                }
            })
            .state('create', {
                url: '/create',
                templateUrl: 'partials/create.html',
                controller: 'createCtrl'
            });
        $urlRouterProvider.otherwise('/posts');
    });

angular.module('app.controllers',[]);
angular.module('app.factory',[]);