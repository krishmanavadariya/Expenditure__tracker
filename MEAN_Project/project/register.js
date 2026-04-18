angular.module('registerApp',[]).controller('registerCtrl', function($scope, $http) 
{
    $scope.userData=[];
    $scope.newuser={};
    $scope.message="";

    $scope.register = (event) => {
        //event.preventDefault(); // Prevent form submission behavior
        $http.post('/api/register', $scope.newuser)
            .then((response) => {
                $scope.message = response.data.message;
                //$scope.viewuser();
                $scope.newuser = {}; // Clear the form after submission
                window.location.href = 'login.html'; // Redirect to home page after registration
            })
            .catch((error) => {
                console.log('Error registering user:', error);
            });
    };
});