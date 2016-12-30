
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {




    $scope.do_add = function(){
      add('POST','api/v1.0/city')

    };
    $scope.back = function(){
        window.location.href = "web_user.html"
    };


    function add(fun,url){
        $http({
            method:fun,
            url:basePath+url,
            data: "access_token="+localStorage.getItem("token")+
            "&email="+$scope.add_email+
            "&status="+$scope.add_status+
            "&mobile="+$scope.add_mobile,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function(res){
            if(res.response.success == 1){
                dhx_alert("增加成功",function(){
                    window.location.href = "web_user.html"
                })
            }else{
                dhx_alert(res.response.return_code)
            }
        })
    }
});