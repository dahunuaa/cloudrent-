
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    var get_url  ="api/v1.0/order?";//get数据接口
    var del_url  ="api/v1.0/city";//删除接口
    var add_url  ="order_add.html";//点击新增跳转地址
    var edit_url ="web_user_edit.html?";//点击修改跳转地址






    var myGrid;// 声明表格
    var myCalendar;//声明时间插件
    $scope.selected = [];//定义一个数组（用于批量删除）
    init();//初始化

    var get_data = new Array();



    function init(){
        if(localStorage.getItem("token") == undefined ||localStorage.getItem("token") == null){
            window.location.href = "../login.html"
        }else{
            //建页
            myGrid = new dhtmlXGridObject('gridbox');
            myGrid.setImagePath("../dhtmlxSuite/sources/dhtmlxGrid/codebase/imgs/");//表格图标路径
            myGrid.setHeader("选择,序号,订单编号,订单状态,车型,联系人,手机号,预约时间,下单时间,价格,操作");//设置表头
            myGrid.attachHeader(
                "#master_checkbox," +
                "&nbsp;,"+
                "<input type='text' id='parame_a'  class='search'>," +
                "<input class='search' type='text' id='parame_b'>," +
                "<input  class='search' type='text' id='parame_c'>," +
                "<input  class='search' type='text' id='parame_d'>," +
                "<input  class='search' type='text' id='parame_e'>," +
                "<input  class='search_time'  type='text' id='web_user_dim_star'>&nbsp;<input  class='search_time'  type='text' id='web_user_dim_end'>," +
                "<input  class='search_time'  type='text' id='web_user_dim_star_1'>&nbsp;<input  class='search_time'  type='text' id='web_user_dim_end_2'>," +
                "<input  class='search' type='text' id='parame_f'>," +
                "&nbsp;");
            myGrid.setInitWidths("45,45,100,100,100,100,100,280,280,100,*");//设置表格初始宽度
            myGrid.setColAlign("left,center,left,left,left,left,left,left,left,left,left");//数据显示位置
            myGrid.setColTypes("ch,ro,ro,ro,ro,ro,ro,ro,ro,ro,ro");//数据呈现类型
            //myGrid.setColSorting("price,str,int,price,date,int");//设置各列排序类型
            myGrid.enableAutoWidth(true);
            myGrid.init();

            myGridjiazai(1);//加载数据
            myCalendar = new dhtmlXCalendarObject(["web_user_dim_star_1","web_user_dim_end_2","web_user_dim_star","web_user_dim_end"]);//时间插件绑定
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
        if($scope.start_time == undefined){
            $scope.start_time = ""
        }if($scope.end_time == undefined){
            $scope.end_time = ""
        }
        $http.get(basePath+get_url+"access_token="+"e725f783-9095-4be6-808e-b06b64a639b2"+
            "&origin_code=HDW"+
            "&add_time@>="+ $scope.start_time+
            "&add_time@<="+ $scope.end_time+
            "&page_size=20"+
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
                            get_data[i].contact_name,
                            get_data[i].contact_mobile,
                            get_data[i].origin_code,
                            get_data[i].goods_amount,
                            get_data[i].add_time.substring(0,19),
                            get_data[i].shipping_status.desc,
                            "<button>详情</button><button>点赞</button>"
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


        $http.get(basePath+get_url+"access_token="+ "e725f783-9095-4be6-808e-b06b64a639b2"+
            "&origin_code=HDW"+
            "&add_time@>="+ $scope.start_time+
            "&add_time@<="+ $scope.end_time+
            "&page_size=20"+
            "&page="+p)
            .success(function(res){
                if(res.response.success == 1){
                    myGrid.clearAll();
                    $scope.pager = res.response.pager;
                    $scope.location_data = res.response.data;
                    $scope.max_page = res.response.pager.max_page;


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
                            get_data[i].contact_name,
                            get_data[i].contact_mobile,
                            get_data[i].origin_code,
                            get_data[i].goods_amount,
                            get_data[i].add_time.substring(0,19),
                            get_data[i].shipping_status.desc,
                            "<button>详情</button><button>点赞</button>"
                        ],i);

                    }
                }else{

                    dhx_alert(res.response.return_code);
                }
            })
    }


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