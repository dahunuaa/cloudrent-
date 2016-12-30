/**
 * Created by hs on 16/10/27.
 */
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {

    var url =window.location.href;
    if(url.split('?').length==2){

    }else{
        init();
        var myTabbar;

        var mySidebar_1;
        var mySidebar_2;
        var mySidebar_3;
        var mySidebar_4;
        var mySidebar_5;
        var mySidebar_6;
        var mySidebar_7;

        function init(){
            $scope.logname = localStorage.getItem("login_name");
           if(localStorage.getItem("token") == undefined||localStorage.getItem("token")== null||localStorage.getItem("token")==""){
               window.location.href = "login.html"
           }else{
               creat();
           }

            function creat(){
                //声明 导航栏
                myTabbar = new dhtmlXTabBar({
                    parent: "tabbarObj",
                    tabs: [
                        {id: "a1", text: '<img src="imgs/icon_18.png">',width:160},
                        {id: "a2", text: "用户管理", active: 1,width:160},
                        {id: "a3", text: "订单管理",width:160},
                        {id: "a4", text: "商品管理",width:160},
                        {id: "a5", text: "认证管理",width:160},
                        {id: "a6", text: "服务监控",width:160},
                        {id: "a7", text: "关于我们",width:160},
                    ]
                });

                //导航栏的分区
                mySidebar_1 = myTabbar.tabs("a1").attachSidebar({
                    width: 160,
                    icons_path: "dhtmlxSuite/samples/dhtmlxSidebar/common/icons_material/",
                    json: "dhtmlxSuite/samples/dhtmlxSidebar/common/user_sidebar.json",
                    onload: function() {
                        mySidebar_1.cells("recent").attachURL("usermanager/web_user.html");
                    }
                });
                mySidebar_2 = myTabbar.tabs("a2").attachSidebar({
                    width: 160,
                    icons_path: "dhtmlxSuite/samples/dhtmlxSidebar/common/icons_material/",
                    json: "dhtmlxSuite/samples/dhtmlxSidebar/common/user_sidebar.json",
                    onload: function() {
                        mySidebar_2.cells("recent").attachURL("usermanager/web_user.html");
                    }
                });
                mySidebar_3 = myTabbar.tabs("a3").attachSidebar({
                    width: 160,
                    icons_path: "dhtmlxSuite/samples/dhtmlxSidebar/common/icons_material/",
                    json: "dhtmlxSuite/samples/dhtmlxSidebar/common/order_manager.json",
                    onload: function() {
                        mySidebar_3.cells("car_order").attachURL("order_manager/car_order.html");
                        mySidebar_3.cells("ins_order").attachURL("order_manager/ins_order.html");
                        mySidebar_3.cells("hdw_order").attachURL("order_manager/hdw_order.html");
                        mySidebar_3.cells("foundpullcar_order").attachURL("order_manager/foundcar_order.html");
                    }
                });

                mySidebar_4 = myTabbar.tabs("a4").attachSidebar({
                    width: 160,
                    icons_path: "dhtmlxSuite/samples/dhtmlxSidebar/common/icons_material/",
                    json: "dhtmlxSuite/samples/dhtmlxSidebar/common/car_type.json",
                    onload: function() {
                        mySidebar_4.cells("car_manager").attachURL("goods_manager/car_manager.html");
                        mySidebar_4.cells("insurance_manager").attachURL("goods_manager/insurance_manager.html");
                        mySidebar_4.cells("hardware_manager").attachURL("goods_manager/hardware_manager.html");
                    }
                });
                mySidebar_5 = myTabbar.tabs("a5").attachSidebar({
                    width: 160,
                    icons_path: "dhtmlxSuite/samples/dhtmlxSidebar/common/icons_material/",
                    json: "dhtmlxSuite/samples/dhtmlxSidebar/common/check_manger.json",
                    onload: function() {
                        mySidebar_5.cells("check_supplier_car").attachURL("check_manager/check_supplier_car.html");
                        mySidebar_5.cells("check_supplier_insurance").attachURL("check_manager/check_supplier_insurance.html");
                        mySidebar_5.cells("check_supplier_rentcar").attachURL("check_manager/check_supplier_rentcar.html");
                        mySidebar_5.cells("check_supplier_hardware").attachURL("check_manager/check_supplier_hardware.html");
                        mySidebar_5.cells("check_supplier_searchcar").attachURL("check_manager/check_supplier_searchcar.html");
                    }
                });
                mySidebar_6 = myTabbar.tabs("a6").attachSidebar({
                    width: 160,
                    icons_path: "dhtmlxSuite/samples/dhtmlxSidebar/common/icons_material/",
                    json: "dhtmlxSuite/samples/dhtmlxSidebar/common/system_monitored.json",
                    onload: function() {
                        mySidebar_6.cells("company").attachURL("system_monitored/system_detail.html");
                    }
                });
                mySidebar_7 = myTabbar.tabs("a7").attachSidebar({
                    width: 160,
                    icons_path: "dhtmlxSuite/samples/dhtmlxSidebar/common/icons_material/",
                    json: "dhtmlxSuite/samples/dhtmlxSidebar/common/about_sidebar.json",
                    onload: function() {
                        mySidebar_7.cells("company").attachURL("aboutmanager/company_detail.html");
                        //mySidebar_5.cells("service").attachURL("aboutmanager/service_project.html");
                        //mySidebar_5.cells("culture").attachURL("aboutmanager/company_culture.html");
                        //mySidebar_5.cells("recruit").attachURL("aboutmanager/recruit.html");
                        //mySidebar_5.cells("contact").attachURL("aboutmanager/contact.html");
                    }
                });

            }
        }

    }
$scope.out_login = function(){
    setCookie("token","");
  window.location.href = "login.html"
}


});

