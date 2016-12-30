
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    var myEditor;
    init();
    $scope.window = {};
    function init(){
        myEditor = new dhtmlXEditor({
                parent: "editorObj",
                toolbar: true, // force dhtmlxToolbar using
                iconsPath: "../dhtmlxSuite/codebase/imgs/", // path for toolbar icons
                content:""
            });
    }
    $scope.do_add = function(){
        if($scope.window.title == undefined||$scope.window.title == "" ||$scope.window.title == null){
            dhx_alert("请输入标题")
        }else if(myEditor.getContent() == undefined||myEditor.getContent() == null ||myEditor.getContent()==""){
            dhx_alert("请输入内容")
        }else{
            $http({
                method:'POST',
                url:basePath+'api/v1.0/admin/aboutus',
                data:
                "access_token="+localStorage.getItem("token")+
                "&type=0"+
                "&title="+encodeURIComponent($scope.window.title)+
                "&content="+encodeURIComponent(myEditor.getContent()),
                headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("添加成功",function(){
                        window.location.href = "company_detail.html"
                    })
                }else{
                    dhx_alert(res.response.return_code)
                }
            });
        }

    };
    $scope.back = function(){
        window.location.href = "company_detail.html"
    };






    function add(fun,url){
        $http({

            method:fun,
            url:basePath+url,
            params:{
                "access_token":localStorage.getItem("token"),
                "type":0,
                "content":encodeURIComponent(myEditor.getContent())
            },
            headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
        }).success(function(res){
            if(res.response.success == 1){
                dhx_alert("添加成功",function(){
                    window.location.href = "company_detail.html"
                })
            }else{
                dhx_alert(res.response.return_code)
            }
        })
    }
});