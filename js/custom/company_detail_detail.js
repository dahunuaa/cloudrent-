
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    var url =window.location.href;
    $scope.this_id = url.split("?")[1];


    $http.get(basePath+"api/v1.0/admin/aboutus/"+$scope.this_id+"?access_token="+localStorage.getItem("token"))
        .success(function(res){
            if(res.response.success == 1){
                $scope.now_data = res.response.data;


                var target = document.getElementById('company_text');
                target.innerHTML = decodeURIComponent($scope.now_data.content);
            }else{
                dhx_alert(res.response.return_code)
            }
        })

});