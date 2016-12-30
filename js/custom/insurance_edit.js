
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    var myEditor;
    $scope.cartype = {};
    init();
    function init(){
        myEditor = new dhtmlXEditor({
            parent: "editorObj",
            toolbar: true, // force dhtmlxToolbar using
            iconsPath: "../dhtmlxSuite/codebase/imgs/", // path for toolbar icons
            content:""
        });
    }



    $(".uploaddiv").click(function(){
        selectimgindex = $(".uploaddiv").index(this);
        $(".uploadimg")[selectimgindex].click();
    });

    $(".uploadimg").change(function(){
        console.log(this.files[0]);
        var myfile = this.files[0];
        $(".uploaddiv").each(function(index){
            if(index==selectimgindex){
                $(this).find('img').attr("src",getURL(myfile));
                return false;
            }
        });

        //if( myfile.size > 5*1024*1024 ){  //用size属性判断文件大小不能超过5M
        //    alert( "你上传的文件太大了！" )
        //}else {
        var reader = new FileReader();
        reader.readAsDataURL(myfile);
        reader.onload = function (e) {
            var res = this.result;

            res = res.split(',')[1];
            console.log(res.split(','));
            if (selectimgindex == 0) {
                $scope.images = res;

            }
        };
        //}

    });
    //get img url
    function getURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
    }

    //选择状态
    $scope.yes_no = function(res){
        $scope.result = res
    };

    $scope.to_creat= function(){
        if($scope.cartype.company == ""||$scope.cartype.company == undefined||$scope.cartype.company == null){
            dhx_alert("请输入保险公司")
        }else if($scope.cartype.jiaoqiang == ""||$scope.cartype.jiaoqiang == undefined||$scope.cartype.jiaoqiang == null){
            dhx_alert("请输入交强险")
        }else if($scope.cartype.jidongche ==  undefined) {
            $scope.cartype.jidongche = ""
        }else if($scope.cartype.disanzhe ==  undefined) {
            $scope.cartype.disanzhe = ""
        }else if($scope.cartype.quanchedao ==  undefined) {
            $scope.cartype.quanchedao = ""
        }else if($scope.cartype.zhujiawei ==  undefined) {
            $scope.cartype.zhujiawei = ""
        }else if($scope.cartype.chengkewei ==  undefined) {
            $scope.cartype.chengkewei = ""
        }else if($scope.cartype.bolisui ==  undefined) {
            $scope.cartype.bolisui = ""
        }else if($scope.cartype.ziransun ==  undefined) {
            $scope.cartype.ziransun = ""
        }else if($scope.cartype.cheshenhen ==  undefined) {
            $scope.cartype.cheshenhen = ""
        }else if($scope.cartype.fadongjisheshui ==  fadongjisheshui) {
            $scope.cartype.fadongjisheshui = ""
        }else if($scope.cartype.bujimianpei ==  fadongjisheshui) {
            $scope.cartype.bujimianpei = ""
        }
        //else if($scope.cartype.youxiao == ""||$scope.cartype.youxiao == undefined||$scope.cartype.youxiao == null){
        //    dhx_alert("请输入有效期")
        //}
        else if($scope.result == undefined){
            dhx_alert("请选择状态")
        }else if(myEditor.getContent() == undefined || myEditor.getContent() ==""){
            dhx_alert("请输入商品说明")
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/admin/products/insurance  ",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "box_name":$scope.cartype.mingcheng,
                    "goods_name":$scope.cartype.mingcheng,
                    "city_list":"["+JSON.stringify($scope.cartype.city)+"]",
                    "car_type":$scope.cartype.chexing,
                    "sku":"car_act01_0010",
                    "color":"{'value':'#000000','desc':'"+$scope.cartype.color+"'}",
                    "stock":$scope.cartype.kucun,
                    "info":$scope.cartype.shuoming,
                    "shop_price":$scope.cartype.price,
                    "images":"['"+$scope.images+"']",
                    //"status":$scope.result,
                    "goods_desc":myEditor.getContent()
                }
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("创建成功",function(){
                        window.location.href = "insurance_manager.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }
});