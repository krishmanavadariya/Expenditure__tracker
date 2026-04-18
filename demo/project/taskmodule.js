var app = angular.module("myapp",[])

app.controller('myctrl', function($scope, $http) {

    // ✅ GET ID FROM URL
    const params = new URLSearchParams(window.location.search);
    $scope.id = params.get("id");

    // Load data
    $http.get('http://localhost:3000/tasks')
        .then(function(response) {
            $scope.tasks = response.data;
        });

    // Add task
    $scope.addTask = function() {

        var newTask = {
            name: $scope.name
        };

        $http.post('http://localhost:3000/tasks', newTask)
            .then(function(response) {
                $scope.tasks = response.data;
                $scope.name = "";
            });
    };

    // ✅ UPDATE (FIXED)
$scope.updateTask = function() {

    var data = {
        name: $scope.name
    };

    $http.put('http://localhost:3000/tasks/' + $scope.id, data)
    .then(function() {

        alert("Updated Successfully");

        window.location = "index.html";
    });
};
    // Delete task
    $scope.deleteTask = function(id) {
        $http.delete('http://localhost:3000/tasks/' + id)
            .then(function() {
                $scope.tasks = $scope.tasks.filter(t => t.id != id);
            });
    };

});