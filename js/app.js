var myApp = angular.module('myApp', ['firebase']);

myApp.controller('ReportsCtrl', ['$scope', '$firebaseArray', function($scope, $firebaseArray) {

    var myReports = new Firebase('https://dev-ocorrencias-app.firebaseio.com/reports');

    $scope.reports = $firebaseArray(myReports);
    
    $scope.showForm=function(){
        $scope.addFormShow = true;
        $scope.editFormShow = false;
        clearForm();
    }

    $scope.hideForm = function(){
        $scope.addFormShow = false;
    }
    
    function clearForm(){
        $scope.title = '';
        $scope.category = '';
        $scope.state = '';
        $scope.region = '';
        $scope.description = '';
        $scope.user = '';
        $scope.approved = '';
    }
    
    $scope.addFormSubmit = function(){
        $scope.reports.$add({
            title:$scope.title,
            category:$scope.category,
            state:$scope.state,
            region:$scope.region,
            description:$scope.description,
            user:$scope.user,
            approved:$scope.approved
        });
        
        clearForm();
    }
 
    $scope.showReport = function(report){
        $scope.editFormShow=true;
        $scope.addFormShow=false;
        $scope.title = report.title;
        $scope.category = report.category;
        $scope.state = report.state;
        $scope.region = report.region;
        $scope.description = report.description;
        $scope.user = report.user;
        $scope.approved = report.approved
    }
    
    $scope.editFormSubmit = function(){
        var uid = $scope.uid;
        var record = $scope.reports.$getRecord(uid);
        record.title = $scope.title;
        record.category = $scope.category;
        record.state = $scope.state;
        record.region = $scope.region;
        record.description = $scope.description;
        record.user = $scope.user;
        record.approved = $scope.approved;
        
        $scope.reports.$save(record);
    }
    
    $scope.deleteReport = function(report){
        $scope.reports.$remove(report);
    }
    
}]);
