angular.module('ControllerModule', []).
        controller('UserController', ['$scope', '$http', function($scope, $http)
            {
                $scope.user = {};

                $scope.fetchData = function()
                {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8080/Slotmachine/IOServlet'
                    }).success(function(data)
                    {
                        $scope.result = data;
                    });
                };
            }]);

