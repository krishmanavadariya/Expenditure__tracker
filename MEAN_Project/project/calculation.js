angular.module('expenditureApp', []).controller('expenditureController', function ($scope, $http) {
    $scope.income = 0;
    $scope.expense = 0;
    $scope.totalExpenditure = 0;
    $scope.balance = 0;
    $scope.description = "";
    $scope.history = [];
    $scope.email = "";

    // Fetch logged-in user's email and session info
    $http.get('/api/session')
        .then((response) => {
            if (response.data.isAuthenticated) {
                $scope.email = response.data.email;
                console.log(`Session active for ${$scope.email}`);
                $scope.fetchHistory(); // Fetch history once session is verified
            } else {
                window.location.href = 'login.html';
            }
        })
        .catch((error) => {
            console.error('Session check failed:', error);
            window.location.href = 'login.html';
        });

    // Function to fetch expenditure history
    $scope.fetchHistory = function () {
        $http.get('/api/viewexpenditure')
            .then(response => {
                $scope.history = response.data.map(item => ({
                    date: new Date(item.date).toLocaleDateString(),
                    time: new Date(item.date).toLocaleTimeString(),
                    description: item.description,
                    amount: item.expense
                }));
            })
            .catch(error => {
                console.error("Error fetching expenditure history:", error);
                alert("Error fetching history. Please log in again.");
                window.location.href = 'login.html';
            });
    };

    // Existing function to add expenditure (unchanged)
    $scope.insert = function () {
        if (!$scope.email) {
            alert("Session expired. Please log in again.");
            window.location.href = 'login.html';
            return;
        }

        $scope.totalExpenditure += $scope.expense;
        $scope.balance = $scope.income - $scope.totalExpenditure;

        const expenditureData = {
            email: $scope.email,
            income: $scope.income,
            expense: $scope.expense,
            totalExpenditure: $scope.totalExpenditure,
            balance: $scope.balance,
            description: $scope.description,
            date: new Date()
        };

        $http.post('/api/addexpenditure', expenditureData)
            .then((response) => {
                console.log('Expenditure added successfully:', response.data);

                $scope.history.push({
                    ...expenditureData,
                    time: new Date().toLocaleTimeString(),
                    date: new Date().toLocaleDateString()
                });
                $scope.income = 0;
                $scope.expense = 0;
                $scope.description = "";
                alert('Expenditure added successfully!');
            })
            .catch((error) => {
                console.error('Error adding expenditure:', error);
                alert('Error adding expenditure. Please try again.');
            });
    };
});