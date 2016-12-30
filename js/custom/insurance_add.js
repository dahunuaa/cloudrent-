
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {



    $scope.cartype = {};




    $http.get(basePath+"api/v1.0/store/self?access_token="+localStorage.getItem("token"))
        .success(function(res){

            if(res.response.success == 1){

                $scope.ins_companys = res.response.data[0].insurer;
                $scope.selectidea = $scope.ins_companys[0]
            }else{

                showMsg(res.response.return_code)
            }
        });


    //点击改变select选项
    $scope.changeidea = function(id){

        $scope.inscompany = id;
    };
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

        if($scope.cartype.jidongche ==  undefined) {
            $scope.cartype.jidongche = ""
        } if($scope.cartype.disanzhe ==  undefined) {
            $scope.cartype.disanzhe = ""
        } if($scope.cartype.quanchedao ==  undefined) {
            $scope.cartype.quanchedao = ""
        } if($scope.cartype.zhujiawei ==  undefined) {
            $scope.cartype.zhujiawei = ""
        } if($scope.cartype.chengkewei ==  undefined) {
            $scope.cartype.chengkewei = ""
        } if($scope.cartype.bolisui ==  undefined) {
            $scope.cartype.bolisui = ""
        } if($scope.cartype.ziransun ==  undefined) {
            $scope.cartype.ziransun = ""
        } if($scope.cartype.cheshenhen ==  undefined) {
            $scope.cartype.cheshenhen = ""
        } if($scope.cartype.fadongjisheshui ==  undefined) {
            $scope.cartype.fadongjisheshui = ""
        } if($scope.cartype.bujimianpei ==  undefined) {
            $scope.cartype.bujimianpei = ""
        }if($scope.cartype.miaoshu == undefined){
            $scope.cartype.miaoshu = ""
        }

        if($scope.inscompany.name == ""||$scope.inscompany.name == undefined||$scope.inscompany.name == null){
            dhx_alert("请选择保险公司")
        }else if($scope.cartype.chanpinname == undefined ||$scope.cartype.chanpinname == ""||$scope.cartype.chanpinname ==null){
            dhx_alert("请输入产品名称")
        }else if($scope.result == undefined){
            dhx_alert("请选择状态")
        }else if($scope.images == undefined ||$scope.images == "" ||$scope.images == null){
            dhx_alert("请上传图片")
        }else{
        $http({
            method:'post',
            url:basePath+"api/v1.0/admin/products/insurance",
            params:{
                "access_token":localStorage.getItem("token"),
                "insurance_company":$scope.inscompany.name,
                "compulsory_ins":$scope.cartype.jiaoqiang,
                "goods_desc":$scope.cartype.miaoshu,
                "goods_name":$scope.cartype.chanpinname,
                "moto_ins":$scope.cartype.jidongche,
                "third_ins":$scope.cartype.disanzhe,
                "allcar_ins":$scope.cartype.quanchedao,
                "maind_ins":$scope.cartype.zhujiawei,
                "otherd_ins":$scope.cartype.chengkewei,
                "glass_ins":$scope.cartype.bolisui,
                "myselffire_ins":$scope.cartype.ziransun,
                "brokencar_ins":$scope.cartype.cheshenhen,
                "madawarter_ins":$scope.cartype.fadongjisheshui,
                "bujimianpei":$scope.cartype.bujimianpei,
                "images":"['"+$scope.images+"']",
                "status":$scope.result
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