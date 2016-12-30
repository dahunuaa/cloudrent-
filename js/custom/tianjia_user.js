
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    $scope.user = {};
    var  reg = /^(([a-zA-Z0-9_-])+|([a-zA-Z0-9_-])+.([a-zA-Z0-9_-])+)((@qq.com)|(@163.com)|(@126.com)|(@189.cn)|(@sina.com)|(@hotmail.com)|(@gmail.com)|(@139.com)|(@([a-zA-Z0-9_-]+.[a-zA-Z0-9_-]+)))$/;;




    $scope.to_tianjia= function(){
        if($scope.user.mobile == ""||$scope.user.mobile == undefined||$scope.user.mobile == null){
            dhx_alert("手机号不能为空")
        }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(document.getElementById('tianjia_mobile').value))){
            dhx_alert("手机号格式不正确")
        }else if($scope.user.password == ""||$scope.user.password == undefined||$scope.user.password == null){
            dhx_alert("密码不能为空")
        }else if($scope.user.repassword == ""||$scope.user.repassword == undefined||$scope.user.repassword == null){
            dhx_alert("请再次确认密码")
        }else if($scope.user.email == ""||$scope.user.email == undefined||$scope.user.email == null){
            dhx_alert("邮箱不能为空")
        }else if($scope.user.password != $scope.user.repassword){
            dhx_alert("两次密码不同")
        }else if(!reg.test(document.getElementById("email").value)){
            dhx_alert("邮箱格式不正确");
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/user/register",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "mobile":$scope.user.mobile,
                    "password":$scope.user.password,
                    "email":$scope.user.email,
                    "scope":"cloudrent_normal",
                    "vcode":"888888"
                }
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("添加成功",function(){
                        window.location.href = "web_user.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    };







});