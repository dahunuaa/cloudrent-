
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    var myEditor;
    var myCalendar;//声明时间插件

    var img1='';
    var img2='';
    var img3='';
    var img4='';
    var img5='';

    $scope.m1="";
    $scope.m2="";
    $scope.m3="";
    $scope.m4="";
    $scope.m5="";
    $scope.images = [$scope.m1,$scope.m2,$scope.m3,$scope.m4,$scope.m5];


    $scope.cartype = {};
    init();
    function init(){
        myEditor = new dhtmlXEditor({
            parent: "editorObj",
            toolbar: true, // force dhtmlxToolbar using
            iconsPath: "../dhtmlxSuite/codebase/imgs/", // path for toolbar icons
            content:""
        });
        myCalendar = new dhtmlXCalendarObject(["youxiao_star","youxiao_end"]);//时间插件绑定
        dhtmlXCalendarObject.prototype.langData["chinese"] = {
            dateformat: "%Y-%m-%d %H:%i:%s",
            enableTime: true,
            monthesFNames: [
                "一月", "二月", "三月", "四月", "五月", "六月", "七月",
                "八月", "九月", "十月", "十一月", "十二月"
            ],
            monthesSNames: [
                "一月", "二月", "三月", "四月", "五月", "六月", "七月",
                "八月", "九月", "十月", "十一月", "十二月"
            ],
            daysFNames: [
                "周一", "周二", "周三", "周四", "周五", "周六", "周日"
            ],
            daysSNames: ["一", "二", "三", "四", "五", "六", "日"],
            weekstart: 7,
            weekname: "周"
        };
        myCalendar.loadUserLanguage('chinese');//定义语言
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

        if( myfile.size > 5*1024*1024 ){  //用size属性判断文件大小不能超过5M
            dhx_alert( "你上传的文件太大了！" )
        }else {
            var reader = new FileReader();
            reader.readAsDataURL(myfile);
            reader.onload = function (e) {
                var res = this.result;

                res = res.split(',')[1];
                console.log(res.split(','));
                if (selectimgindex == 0) {
                    img1 = res;
                    $scope.m1 =img1;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3,$scope.m4,$scope.m5];
                } else if (selectimgindex == 1) {
                    img2 = res;
                    $scope.m2 =img2;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3,$scope.m4,$scope.m5];
                } else if(selectimgindex == 2){
                    img3 = res;
                    $scope.m3 =img3;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3,$scope.m4,$scope.m5];
                }else if(selectimgindex == 3){
                    img4 = res;
                    $scope.m4 =img4;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3,$scope.m4,$scope.m5];
                }else {
                    img5 = res;
                    $scope.m5 =img5;
                    $scope.images = [$scope.m1,$scope.m2,$scope.m3,$scope.m4,$scope.m5];
                }
            }
        }
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
    //转时间戳
    function strDateToInt(date){
        return new Date(date).getTime();
    }

    $scope.to_creat= function(){

        //$scope.start_time = document.getElementById("youxiao_star").value;
        //$scope.end_time = document.getElementById("youxiao_end").value;

        if($scope.cartype.goodsname == ""||$scope.cartype.goodsname == undefined||$scope.cartype.goodsname == null){
            dhx_alert("请输入商品名称")
        }else if($scope.cartype.goodstype == ""||$scope.cartype.goodstype == undefined||$scope.cartype.goodstype == null){
            dhx_alert("请输入商品型号")
        }else if($scope.cartype.goodscode == ""||$scope.cartype.goodscode == undefined||$scope.cartype.goodscode == null){
            dhx_alert("请输入商品条码")
        }else if($scope.cartype.goodspinpai == ""||$scope.cartype.goodspinpai == undefined||$scope.cartype.goodspinpai == null){
            dhx_alert("请输入品牌")
        }
        //else if($scope.start_time == undefined ||$scope.start_time == null||$scope.start_time == ""){
        //    dhx_alert("请选择开始时间")
        //}else if($scope.end_time == undefined || $scope.end_time == null||$scope.end_time == ""){
        //    dhx_alert("请选择结束时间")
        //}else if(strDateToInt($scope.start_time > $scope.end_time)){
        //    dhx_alert("请输入正确的起始时间")
        //}else if(strDateToInt($scope.start_time == $scope.end_time)){
        //    dhx_alert("起始时间不能相同")
        //}
        else if($scope.cartype.goodsstyle == ""||$scope.cartype.goodsstyle == undefined||$scope.cartype.goodsstyle == null){
            dhx_alert("请输入材质")
        }else if($scope.cartype.warning == ""||$scope.cartype.warning == undefined||$scope.cartype.warning == null){
            dhx_alert("请输入报警方式")
        }else if($scope.cartype.memory == ""||$scope.cartype.memory == undefined||$scope.cartype.memory == null){
            dhx_alert("请输入内存")
        }else if($scope.cartype.gpslength == ""||$scope.cartype.gpslength == undefined||$scope.cartype.gpslength == null){
            dhx_alert("请输入GPS精度")
        }else if($scope.cartype.shopprice == ""||$scope.cartype.shopprice == undefined||$scope.cartype.shopprice == null){
            dhx_alert("请输入价格")
        }else if($scope.cartype.kucun == ""||$scope.cartype.kucun == undefined||$scope.cartype.kucun == null){
            dhx_alert("请输入库存")
        }else if($scope.cartype.goodstitle == ""||$scope.cartype.goodstitle == undefined||$scope.cartype.goodstitle == null){
            dhx_alert("请输入商品标题")
        }else if($scope.m1 == "" || $scope.m2=="" || $scope.m3=="" || $scope.m4=="" || $scope.m5=="" ){
            dhx_alert("请上传图片")
        }else if($scope.result == undefined){
            dhx_alert("请选择状态")
        }else if(myEditor.getContent() == undefined || myEditor.getContent() ==""){
            dhx_alert("请输入商品说明")
        }else{
            $http({
                method:'post',
                url:basePath+"api/v1.0/admin/products/hardware",
                params:{
                    "access_token":localStorage.getItem("token"),
                    "box_name":$scope.cartype.name,
                    "brand":$scope.cartype.pinpai,
                    "goods_name":$scope.cartype.goodsname,
                    "sku":$scope.cartype.goodstype,
                    "barcode":$scope.cartype.goodscode,
                    "material":$scope.cartype.goodsstyle,
                    "alarmway":$scope.cartype.warning,
                    "gps_accuracy":$scope.cartype.gpslength,
                    "salescode":$scope.cartype.sales_code,
                    "shop_price":$scope.cartype.shopprice,
                    "stock":$scope.cartype.kucun,
                    "status":$scope.result,
                    "images":JSON.stringify($scope.images),
                    "goods_desc":myEditor.getContent()
                }
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("创建成功",function(){
                        window.location.href = "hardware_manager.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
    }
});