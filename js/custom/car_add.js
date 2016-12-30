
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
                var tips = $("#img");
                GeneralTips($("#img"));
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
        if($scope.cartype.city == ""||$scope.cartype.city == undefined||$scope.cartype.city == null){
            dhx_alert("请输入城市")
        }else if($scope.cartype.mingcheng == ""||$scope.cartype.mingcheng == undefined||$scope.cartype.mingcheng == null){
            dhx_alert("请输入名称")
        }else if($scope.cartype.chexing == ""||$scope.cartype.chexing == undefined||$scope.cartype.chexing == null){
            dhx_alert("请输入车型")
        }else if($scope.cartype.color == ""||$scope.cartype.color == undefined||$scope.cartype.color == null){
            dhx_alert("请输入颜色")
        }else if($scope.cartype.kucun == ""||$scope.cartype.kucun == undefined||$scope.cartype.kucun == null){
            dhx_alert("请输入库存")
        }else if($scope.cartype.price == ""||$scope.cartype.price == undefined||$scope.cartype.price == null){
            dhx_alert("请输入价格")
        }else if($scope.cartype.goods_code == ""||$scope.cartype.goods_code == undefined||$scope.cartype.goods_code == null){
            dhx_alert("请输入商品编码")
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
                url:basePath+"api/v1.0/admin/products/car",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "box_name":$scope.cartype.mingcheng,
                    "goods_name":$scope.cartype.mingcheng,
                    "city_list":"["+JSON.stringify($scope.cartype.city)+"]",
                    "car_type":$scope.cartype.chexing,
                    "sku":$scope.cartype.goods_code,
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
                        window.location.href = "car_manager.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }
});