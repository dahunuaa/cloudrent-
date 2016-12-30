
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {


    $scope.user={};
    var url=window.location.href;
    if(url.split('?').length==2){
        var back = url.split('?')[1];
        var back_a=back.split('&')[0];
        $scope.back_b = back.split('&')[1];
        $scope._id = back_a;

    }
    init();

    function init(){

        if(localStorage.getItem("token") == undefined ||localStorage.getItem("token") == null){
            window.location.href = "../login.html"
        }else{
            $http.get(basePath+"api/v1.0/admin/auth/"+$scope._id+"?"+"&access_token="+localStorage.getItem("token"))
                .success(function(res){
                    if(res.response.success == 1){
                        $scope.data = res.response.data;
                    }else{
                        dhx_alert(res.response.return_code)
                    }
                })
        }

    }


//pass
    $scope.pass = function(){
        if($scope.user.advice == undefined ||$scope.user.advice ==""||$scope.user.advice ==null){
            dhx_alert("请输入审核意见")
        }else{
            $http({
                method:'put',
                url:basePath+"api/v1.0/admin/auth/check/"+$scope._id,
                params:{
                    "access_token":localStorage.getItem("token"),
                    "status":"pass",
                    "audit_opinion":$scope.user.advice}
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("审核为通过",function(){
                      window.location.href = "check_supplier_"+$scope.back_b+".html"
                    })

                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }

    //nopass
    $scope.nopass = function(){
        if($scope.user.advice == undefined ||$scope.user.advice ==""||$scope.user.advice ==null){
            dhx_alert("请输入审核意见")
        }else{
            $http({
                method:'put',
                url:basePath+"api/v1.0/admin/auth/check/"+$scope._id,
                params:{
                    "access_token":localStorage.getItem("token"),
                    "status":"nopass",
                    "audit_opinion":$scope.user.advice}
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("审核为不通过",function(){
                        window.location.href = "check_supplier_"+$scope.back_b+".html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }
});