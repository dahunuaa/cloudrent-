
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    init();
    function init(){
        $scope.car = {};
        get_order();


    }

    //获取订单信息
    function get_order(){
        $http.get(basePath+"api/v1.0/order/"+getCookie("this_id")+
            "?access_token="+localStorage.getItem("token")+
            "&origin_code=CAR")
            .success(function(res){
                if(res.response.success == 1){
                    $scope.data = res.response.data;
                    $scope.car.price = $scope.data.goods_amount;
                    $scope.car.remark = $scope.data.remark;
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
    }






    //确认修改价格
    $scope.do_modify_price = function(){
        $http({
            method:'put',
            url:basePath+'api/v1.0/admin/order/'+getCookie("this_id"),
            params:{"access_token":localStorage.getItem("token"),
                "goods_amount":$scope.car.price,
                "remark":$scope.car.remark,
                "order_status":'complete'}
        }).success(function(res){
            if(res.response.success == 1){
                dhx_alert("修改成功",function(){
                    window.location.href = "car_order.html"
                })
            }else{
                dhx_alert(res.response.return_code)
            }
        })

    };


    //返回
    $scope.back = function(){
        window.location.href = "car_order.html"
    };

});
