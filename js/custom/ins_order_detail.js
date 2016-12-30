
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    var url=window.location.href;
    if(url.split('?').length==2){
        var back=url.split('?')[1];
        $scope._id = back;

    }
    init();

    function init(){

        if(localStorage.getItem("token") == undefined ||localStorage.getItem("token") == null){
            window.location.href = "../login.html"
        }else{
            $http.get(basePath+"api/v1.0/admin/order/"+$scope._id+"?"+"&access_token="+localStorage.getItem("token"))
                .success(function(res){
                    if(res.response.success == 1){
                        $scope.data = res.response.data;
                    }else{
                        dhx_alert(res.response.return_code)
                    }
                })
        }

    }



});