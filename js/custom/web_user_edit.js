var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    init();

    function init(){
       if(localStorage.getItem("token") == undefined || localStorage.getItem("token") == null){
       }else{
           var url=window.location.href;
           if(url.split('?').length==2){
               var back=url.split('?')[1];
               $scope._id = back;
           }

           $http.get(basePath+"api/v1.0/city/"+$scope._id+"?"+"&access_token="+localStorage.getItem("token"))
               .success(function(res){
                   if(res.response.success == 1){
                       $scope.data = res.response.data;
                       $scope.src_email = $scope.data.email;
                       $scope.src_mobile = $scope.data.mobile;
                       $scope.src_status = $scope.data.status;
                   }else{
                       dhx_alert(res.response.return_code)
                   }
               })
       }
    }
//返回
    $scope.back = function(){
        window.location.href = "web_user.html"
    };
//确认修改
    $scope.do_edit = function(){

        $http({
            method:'put',
            url:basePath+"api/v1.0/city/"+$scope._id,
            params:{"access_token":localStorage.getItem("token"),
                "email":$scope.src_email,
                "status":$scope.src_status,
                "mobile":$scope.src_mobile}
        }).success(function(res){
            if(res.response.success == 1){
                dhx_alert("修改成功",function(){
                    window.location.href = "web_user.html"
                })

            }else{
                dhx_alert(res.response.return_code)
            }
        })
    }

});

