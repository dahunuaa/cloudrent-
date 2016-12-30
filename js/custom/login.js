var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    init();
    function init(){
        $scope.user={}
    }

$scope.to_login = function(){
    //var reg = /^1[3|4|5|7|8][0-9]{9}$/;
 if($scope.user.name == undefined ||$scope.user.name ==null){
     dhx_alert("请输入账号")
 }
 //else if(!reg.test($("#phone").val())){
 //    dhx_alert("请输入正确的手机号")
 //}
 else if($scope.user.password == undefined ||$scope.user.password == null){
     dhx_alert("请输入密码")
 }else{
     $http({
         method:'post',
         url:basePath+"api/v1.0/user/login",
         params:{
             "mobile":$scope.user.name,
             "password":$scope.user.password,
             "role":"['superuser']",
             "system":"cloudrent"}
     }).success(function(res){
         if(res.response.success == 1){
             setCookie("token",res.response.data.token);
             localStorage.setItem("login_name",res.response.data.login_name);
             localStorage.setItem("token",res.response.data.token);
             setCookie("user_id",res.response.data._id);
             dhx_alert("登录成功");
             window.location.href = "index.html"
         }else{
             dhx_alert(res.response.return_code)
         }
     });

 }
}


});

