angular.module('homeApp', []).controller('homeController', function ($scope, $http) {
    $scope.userData = [];
    $scope.email = "";
    $scope.password = "";

    // Check session status on page load
    $scope.checkSession = () => {
        $http.get('/api/session').then((response) => {
            if (response.data.isAuthenticated) {
                console.log(`Welcome back, ${response.data.email}!`);
            } else {
                console.log("Not logged in. Redirecting to login page...");
                window.location.href = 'login.html'; // Redirect to login page
            }
        }).catch((error) => {
            console.error('Error checking session:', error);
            window.location.href = 'login.html'; // Redirect to login page on error
        });
    };

    // Login user and create session
    $scope.login = () => {
        const loginData = {
            email: $scope.email,
            password: $scope.password,
        };

        $http.post('/api/login', loginData).then((response) => {
            alert(response.data.message);
            window.location.href = 'HomePage.html'; // Redirect to home page after login
        }).catch((error) => {
            console.error('Error logging in:', error);
            alert(error.data.message || "Login failed. Please try again.");
        });
    };

    // Logout user
    $scope.logout = () => {
        $http.post('/api/logout').then((response) => {
            alert(response.data.message);
            $scope.email = ""; // Clear email data
            $scope.password = ""; // Clear password data
            window.location.href = 'login.html'; // Redirect to login page after logout
        }).catch((error) => {
            console.error('Error logging out:', error);
            alert("Error logging out. Please try again.");
        });
    };
});