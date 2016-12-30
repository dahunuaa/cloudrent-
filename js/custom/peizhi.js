
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    var get_url = "api/v1.0/admin/car/carparameter?";//get数据接口
    var del_url  = "api/v1.0/city";//删除接口
    var url=window.location.href;
    if(url.split('?').length==2){
        var back=url.split('?')[1];
        $scope._id = back;
    }

    var myGrid;// 声明表格

    init();//初始化


    function init(){
        $scope.param = [];
        if(localStorage.getItem("token") == undefined ||localStorage.getItem("token") == null){
            window.location.href = "../login.html"
        }else{
            //建页
            myGrid = new dhtmlXGridObject('gridbox');
            myGrid.setImagePath("../dhtmlxSuite/sources/dhtmlxGrid/codebase/imgs/");//表格图标路径
            myGrid.setHeader("参数分类名称,基础参数,参数值");//设置表头
            myGrid.setInitWidths("300,300,*");//设置表格初始宽度
            myGrid.setColAlign("left,left,left");//数据显示位置
            myGrid.setColTypes("ro,ro,ro");//数据呈现类型
            //myGrid.setColSorting("str,str,str");//设置各列排序类型
            myGrid.enableAutoWidth(true);
            myGrid.init();
            myGridjiazai();//加载数据
        }
    }

    $scope.a= "1";
    var location_data = new Array();
    function myGridjiazai(){
        $http.get(basePath+get_url+"access_token="+ localStorage.getItem("token"))
            .success(function(res){
                if(res.response.success == 1){
                    myGrid.clearAll();
                    //location_data = res.response.data;
                    for(var i=0;i<res.response.data.length;i++){
                        res.response.data[i].myvalue = "";
                        location_data.push(res.response.data[i]);

                    }
                    $scope.location_data = location_data;

                    //添加数据
                    get_data = $scope.location_data;
                    //console.log($scope.location_data);
                    var str;
                    for(var i=0; i < get_data.length;i++){

                        str = get_data[i]._id;

                        get_data[i].index = i+1;

                        myGrid.addRow(str,[
                            get_data[i].name,
                            get_data[i].parameter_list.name,
                            "<input class='mymodel' 'type='text' style='width: 100px'>"
                        ],i);
                    }

                }else{
                    dhx_alert(res.response.return_code);
                }
            })
    }

//gengxin
    $scope.gengxin = function(){

    };
    //
    $scope.sure_pull = function(){
        $('.mymodel').each(function(i){
            //console.log($(this).val());
            $scope.location_data[i].myvalue = $(this).val();
        });
        console.log($scope.location_data);
        $http({
            method:'put',
            url:basePath+"api/v1.0/admin/car/"+$scope._id,
            params:{
                "access_token":localStorage.getItem("token"),
                "parameter_list":JSON.stringify($scope.location_data)
                }
        }).success(function(res){
            if(res.response.success == 1){
                dhx_alert("配置成功",function(){
                    window.location.href = "cartype_manager.html"
                })
            }else{
                dhx_alert(res.response.return_code)
            }
        })

    };
//点击事件-删除
    $("table").on('click','#peizhi',function(){
        dhtmlx.confirm({
            type:"confirm",
            ok:"确定",
            cancel:"取消",
            text: "确认删除选中数据？",
            callback: function(result){
                if(result == true){
                    $http.delete(basePath+del_url+"/"+$scope.this_row_id+"?"+"&access_token="+localStorage.getItem("token"))
                        .success(function(res){
                            if(res.response.success == 1){
                                dhx_alert("删除成功",function(){
                                    myGrid.clearAll();
                                    myGridjiazai(1);
                                    page_change(1);
                                    $scope.this_row_id = undefined
                                });
                            }else{
                                dhx_alert(res.response.return_code)
                            }
                        }
                    )
                }else{
                }
            }
        });
    });
    //增 数据
    $scope.add_data = function(){
        window.location.href= add_url;
    };
    //选中任何row列表

    myGrid._doClick=function(ev){
        var selMethod = 0;
        var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target, "TD");
        $scope.this_row_id = el.parentNode.idd;

        if (!el || !el.parentNode || !el.parentNode.idd) return;
        var fl = true;

        //markers start
        if (this.markedCells){
            var markMethod = 0;

            if (ev.shiftKey||ev.metaKey){
                markMethod=1;
            }

            if (ev.ctrlKey){
                markMethod=2;
            }
            this.doMark(el, markMethod);
            return true;
        }
        if (this.selMultiRows != false){
            if (ev.shiftKey && this.row != null && this.selectedRows.length){
                selMethod=1;
            }

            if (ev.ctrlKey||ev.metaKey){
                selMethod=2;
            }
        }
        return this.doClick(el, fl, selMethod, false)
    };
    //删
    $scope.del_data = function(){

        for(var i=0;i<get_data.length;i++){
            var id = get_data[i]._id;
            if(myGrid.cellById(id,0).getValue() == 1){
                $scope.selected.push(id);
            }
        }



        if($scope.selected == ""){
            if($scope.this_row_id == undefined){
                dhx_alert("未选择任何数据")
            }else{
                dhtmlx.confirm({
                    type:"confirm",
                    ok:"确定",
                    cancel:"取消",
                    text: "确认删除选中数据？",
                    callback: function(result){
                        if(result == true){
                            $http.delete(basePath+del_url+"/"+$scope.this_row_id+"?"+"&access_token="+localStorage.getItem("token"))
                                .success(function(res){
                                    if(res.response.success == 1){
                                        dhx_alert("删除成功",function(){
                                            myGrid.clearAll();
                                            myGridjiazai(1);
                                            page_change(1);
                                            $scope.this_row_id = undefined

                                        });

                                    }else{
                                        dhx_alert(res.response)
                                    }
                                }
                            )
                        }else{
                        }
                    }
                });
            }
        }else{
            dhtmlx.confirm({
                type:"confirm",
                ok:"确定",
                cancel:"取消",
                text: "确认删除选中数据？",
                callback: function(result){
                    if(result == true){
                        $http.delete(basePath+del_url+"?"+"access_token="+localStorage.getItem("token")+"&_ids="+JSON.stringify($scope.selected))
                            .success(function(res){
                                if(res.response.success == 1){
                                    myGrid.clearAll();
                                    myGridjiazai(1);
                                    page_change(1);
                                    $scope.selected =[]
                                }else{
                                    dhx_alert(res.response)
                                }
                            }
                        )
                    }else{
                        $scope.selected =[]
                    }
                }
            });

        }


    };
    //改
    $scope.edit_data = function(){
        if($scope.this_row_id == undefined){
            dhx_alert("未选择任何数据")
        }else{
            window.location.href = edit_url+$scope.this_row_id
        }
    };
    //查
    $("input:text").bind("input propertychange",function(){

        $scope.mobile=document.getElementById("mobile").value;
        $scope.email=document.getElementById("email").value;
        $scope.status=document.getElementById("status").value;
        $scope.start_time=document.getElementById("web_user_dim_star").value;
        $scope.end_time=document.getElementById("web_user_dim_end").value;


        myGrid.clearAll();
        myGridjiazai(1);
        page_change(1);

    });
    //开始时间查询@>=
    $("#web_user_dim_star").blur(function(){
        $scope.mobile=document.getElementById("mobile").value;
        $scope.email=document.getElementById("email").value;
        $scope.status=document.getElementById("status").value;
        $scope.start_time=document.getElementById("web_user_dim_star").value;
        $scope.end_time=document.getElementById("web_user_dim_end").value;
        myGrid.clearAll();
        myGridjiazai(1);
        page_change(1)
    });
    //结束时间查询@<=
    $("#web_user_dim_end").blur(function(){
        $scope.mobile=document.getElementById("mobile").value;
        $scope.email=document.getElementById("email").value;
        $scope.status=document.getElementById("status").value;
        $scope.start_time=document.getElementById("web_user_dim_star").value;
        $scope.end_time=document.getElementById("web_user_dim_end").value;
        myGrid.clearAll();
        myGridjiazai(1);
        page_change(1)
    });

});