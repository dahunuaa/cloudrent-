
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    var get_url  ="api/v1.0/admin/auth?";//get数据接口
    var del_url  ="api/v1.0/admin/auth";//删除接口
    var add_url  ="car_type_add.html";//点击新增跳转地址
    var edit_url ="car_type_edit.html?";//点击修改跳转地址
    var detail_url = "car_type_detail.html";//点击查看详情




    var myGrid;// 声明表格
    var myCalendar;//声明时间插件
    $scope.selected = [];//定义一个数组（用于批量删除）
    init();//初始化

    var get_data = new Array();



    function init(){
        if(localStorage.getItem("token") == undefined ||localStorage.getItem("token") == null||localStorage.getItem("token") == ""){
            window.location.href = "../login.html"
        }else{
            //建页
            myGrid = new dhtmlXGridObject('gridbox');
            myGrid.setImagePath("../dhtmlxSuite/sources/dhtmlxGrid/codebase/imgs/");//表格图标路径
            myGrid.setHeader("选择,序号,登录名称,提交内容,状态,处理人,操作");//设置表头
            myGrid.attachHeader("#master_checkbox," +
                "," +
                "<input class='search' type='text' id='parame_a'>," +
                "," +
                "<input class='search' type='text' id='parame_b'>," +
                "<input class='search' type='text' id='parame_c'>," +
                "," );
            myGrid.setInitWidths("60,60,*,*,*,*,*");//设置表格初始宽度
            myGrid.setColAlign("left,left,left,left,left,left,left");//数据显示位置
            myGrid.setColTypes("ch,ro,ro,ro,ro,ro,ro");//数据呈现类型
            //myGrid.setColSorting("price,str,int,price,date,int");//设置各列排序类型
            myGrid.enableAutoWidth(true);
            myGrid.init();

            myGridjiazai(1);//加载数据

            myCalendar = new dhtmlXCalendarObject(["web_user_clear_star","web_user_clear_end","web_user_dim_star","web_user_dim_end"]);//时间插件绑定
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
            //$("table").find('tr').find("input").each(function(index){
            //    if(index == 1){
            //        $(this).attr('id','heshan');
            //        return false;
            //    }
            //})


        }
    }

    function myGridjiazai(p){
        if($scope.so_logname == undefined){
            $scope.so_logname = ""
        }if($scope.so_status == undefined){
            $scope.so_status = ""
        }if($scope.so_chuliname == undefined){
            $scope.so_chuliname = ""
        }if($scope.so_logname == undefined){
            $scope.so_logname = ""
        }
        $http.get(basePath+get_url+"access_token="+localStorage.getItem("token")+
            "&type.value=3"+
            "&status.desc^="+$scope.so_status+
            "&checker^="+$scope.so_chuliname+
            "&login_name^="+$scope.so_logname+
            "&page_size=10"+
            "&page="+p)
            .success(function(res){
                if(res.response.success == 1){
                    myGrid.clearAll();

                    $scope.pager = res.response.pager;
                    $scope.location_data = res.response.data;
                    $scope.max_page = res.response.pager.max_page;
                    $scope.enable = res.response.pager.enable;



                    var kk = document.getElementById("kk_page");

                    if($scope.enable == true){
                        kk.style.display = 'block';
                    }else{
                        kk.style.display = 'none'
                    }
                    //添加数据
                    get_data = $scope.location_data;

                    var str;
                    for(var i=0; i < get_data.length;i++){
                        str = get_data[i]._id;
                        get_data[i].index = i+1;
                        myGrid.addRow(str,[
                            0,
                            get_data[i].index,
                            get_data[i].login_name,
                            "<button id='see_detail' style='color:#39c;cursor: pointer;'>查看详情</button>",
                            get_data[i].status.desc,
                            get_data[i].checker,
                            "<button id='check' style='color:#39c;cursor: pointer'>审核</button>"
                        ],i);


                    }

                    //分页  init
                    var totalPage =  $scope.max_page;
                    var totalRecords = $scope.max_page*20;
                    var pageNo = 1;


                    //生成分页
                    //有些参数是可选的，比如lang，若不传有默认值
                    kkpager.generPageHtml({
                        pno : pageNo,
                        //总页码
                        total : totalPage,
                        //总数据条数
                        totalRecords : totalRecords,
                        //链接前部
                        hrefFormer : 'pager_test',
                        //链接尾部
                        hrefLatter : '.html',
                        //getLink : function(n){
                        //	return this.hrefFormer + this.hrefLatter + "?pno="+n;
                        //}
                        mode : 'click',//默认值是link，可选link或者click
                        click : function(n){
                            this.selectPage(n);
                            myGridjiazai2(n);
                            return false;
                        }
                    });

                }else{
                    dhx_alert(res.response.return_code);
                }
            })
    }
    //刷新分页数据
    function page_change(p){
        if($scope.enable == true){
            kkpager.total = $scope.max_page;
            kkpager.pno = p
        }else{
            $scope.$apply();
        }



    }



    function myGridjiazai2(p){
        if($scope.so_logname == undefined){
            $scope.so_logname = ""
        }if($scope.so_status == undefined){
            $scope.so_status = ""
        }if($scope.so_chuliname == undefined){
            $scope.so_chuliname = ""
        }if($scope.so_logname == undefined){
            $scope.so_logname = ""
        }
        $http.get(basePath+get_url+"access_token="+localStorage.getItem("token")+
            "&type.value=3"+
            "&status.desc^="+$scope.so_status+
            "&checker^="+$scope.so_chuliname+
            "&login_name^="+$scope.so_logname+
            "&page_size=10"+
            "&page="+p)
            .success(function(res){
                if(res.response.success == 1){
                    myGrid.clearAll();

                    $scope.pager = res.response.pager;
                    $scope.location_data = res.response.data;
                    $scope.max_page = res.response.pager.max_page;
                    $scope.enable = res.response.pager.enable;


                    var kk = document.getElementById("kk_page");

                    if($scope.enable == true){
                        kk.style.display = 'block';
                    }else{
                        kk.style.display = 'none'
                    }
                    //添加数据
                    get_data = $scope.location_data;

                    $scope.imgs = [];
                    var str;
                    for(var i=0; i < get_data.length;i++){
                        str = get_data[i]._id;
                        get_data[i].index = i+1;
                        myGrid.addRow(str,[
                            0,
                            get_data[i].index,
                            get_data[i].login_name,
                            "<button id='see_detail' style='color:#39c;cursor: pointer;'>查看详情</button>",
                            get_data[i].status.desc,
                            get_data[i].checker,
                            "<button id='check' style='color:#39c;cursor: pointer'>审核</button>"
                        ],i);


                    }
                }else{

                    dhx_alert(res.response.return_code);
                }
            })
    }

//点击事件-详情
    $("table").on('click','#see_detail',function(){
        window.location.href = "see_detail_page.html?"+$scope.this_row_id
    });



//点击事件-审核
    $("table").on('click','#check',function(){
        window.location.href = "check_page.html?"+$scope.this_row_id+"&hardware"
    });


    //增 数据
    //$scope.add_data = function(){
    //    window.location.href= add_url;
    //};
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
                                        dhx_alert(res.response.return_code)
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
                                    dhx_alert(res.response.return_code)
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

        $scope.so_logname=document.getElementById("parame_a").value;
        $scope.so_status=document.getElementById("parame_b").value;
        $scope.so_chuliname=document.getElementById("parame_c").value;




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