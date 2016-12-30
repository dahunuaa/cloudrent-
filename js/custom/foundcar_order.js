/**
 * Created by hs on 16/12/13.
 */

var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http) {
    var get_url  ="api/v1.0/admin/order?";//get数据接口
    var del_url  ="api/v1.0/admin/order";//删除接口

    var edit_url =".html?";//点击修改跳转地址
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
            myGrid.setHeader("选择,订单编号,姓名,联系电话,支付状态,订单状态,操作");//设置表头
            myGrid.attachHeader("#master_checkbox," +
                "<input class='search' type='text' id='parame_a'>," +
                //"<input class='search' type='text' id='parame_b'>," +
                //"<input class='search' type='text' id='parame_c'>," +
                "<input class='search' type='text' id='parame_d'>," +
                "<input class='search' type='text' id='parame_e'>," +
                "," +
                "," +
                "," );
            myGrid.setInitWidths("60,130,100,100,100,100,*");//设置表格初始宽度
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

        if($scope.so_orderno == undefined){
            $scope.so_orderno = ""
        }if($scope.so_goodsname == undefined){
            $scope.so_goodsname = ""
        }if($scope.so_getcarcity == undefined){
            $scope.so_getcarcity = ""
        }if($scope.so_name == undefined){
            $scope.so_name = ""
        }if($scope.so_mobile == undefined){
            $scope.so_mobile = ""
        }
        $http.get(basePath+get_url+"access_token="+localStorage.getItem("token")+
            "&order_sn^="+$scope.so_orderno+
            "&goods_name^="+$scope.so_goodsname+
            "&city_name^="+$scope.so_getcarcity+
            "&contact_name^="+$scope.so_name+
            "&contact_mobile^="+$scope.so_mobile+
            "&origin_code=D01"+
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

                    $scope.imgs = [];
                    var str;
                    for(var i=0; i < get_data.length;i++){
                        str = get_data[i]._id;
                        get_data[i].index = i+1;
                        myGrid.addRow(str,[
                            0,
                            get_data[i].order_sn,
                            //get_data[i].order_goods[0],
                            //get_data[i].city_name,
                            get_data[i].contact_name,
                            get_data[i].contact_mobile,
                            get_data[i].pay_status.desc,
                            get_data[i].order_status.desc,
                            "<button id='see_detail' style='color:#39c;cursor: pointer;'>查看详情</button>"+
                            "<button id='modify_status' style='color:#39c;cursor: pointer;'>修改状态</button>",
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
        if($scope.so_orderno == undefined){
            $scope.so_orderno = ""
        }if($scope.so_goodsname == undefined){
            $scope.so_goodsname = ""
        }if($scope.so_getcarcity == undefined){
            $scope.so_getcarcity = ""
        }if($scope.so_name == undefined){
            $scope.so_name = ""
        }if($scope.so_mobile == undefined){
            $scope.so_mobile = ""
        }
        $http.get(basePath+get_url+"access_token="+localStorage.getItem("token")+
            "&order_sn^="+$scope.so_orderno+
            "&goods_name^="+$scope.so_goodsname+
            "&city_name^="+$scope.so_getcarcity+
            "&contact_name^="+$scope.so_name+
            "&contact_mobile^="+$scope.so_mobile+
            "&origin_code=D01"+
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

                    $scope.imgs = [];
                    var str;
                    for(var i=0; i < get_data.length;i++){
                        str = get_data[i]._id;
                        get_data[i].index = i+1;
                        myGrid.addRow(str,[
                            0,
                            get_data[i].order_sn,
                            //get_data[i].order_goods.goods_name,
                            //get_data[i].city_name,
                            get_data[i].contact_name,
                            get_data[i].contact_mobile,
                            get_data[i].pay_status.desc,
                            get_data[i].order_status.desc,
                            "<button id='see_detail' style='color:#39c;cursor: pointer;'>查看详情</button>",
                        ],i);


                    }
                }else{

                    dhx_alert(res.response.return_code);
                }
            })
    }

//点击事件-详情
    $("table").on('click','#see_detail',function(){
        window.location.href = "foundcar_order_detail.html?"+$scope.this_row_id
    });


    var obj=document.getElementById("view");
    $scope.selectValue = obj.options[obj.selectedIndex].value;

    //点击事件-修改
    $("table").on('click','#modify_status',function(){
        var tips = $("#Layer1 .content");
        $("#Layer1").removeClass("hide");
        GeneralTip($("#Layer1 .content"));
        $http.get(basePath+"api/v1.0/admin/order/"+$scope.this_row_id+"?"+"access_token="+localStorage.getItem("token"))
            .success(function(res){
                if(res.response.success == 1){
                    $scope.modify_data = res.response.data;
                    $scope.modify_price = $scope.modify_data.should_pay;

                    $scope.modify_remark = $scope.modify_data.remark;

                    for(i=0;i<obj.length;i++){

                        if(obj[i].value== $scope.modify_data.order_status.desc)
                            obj[i].selected = true;
                    }
                }
            })
    });
    //关闭弹窗
    $scope.cancel_status = function(){
        $("#Layer1").addClass("hide");
    };


//修改- 确认
    $scope.doSure =function(){
        if($scope.selectValue == undefined ||$scope.selectValue == ""){
            dhx_alert("请选择状态")
        }else if($scope.modify_price == undefined ||$scope.modify_price ==""){
            dhx_alert("请输入价格")
        }else if($scope.modify_remark ==undefined){
            $scope.modify_remark =""
        }else{
            $http({
                method:'put',
                url:basePath+"api/v1.0/admin/order/store/"+$scope.this_row_id,
                params:{
                    "access_token":localStorage.getItem("token"),
                    "order_status":obj.options[obj.selectedIndex].value,
                    "should_pay":$scope.modify_price,
                    "remark":$scope.modify_remark
                }
            }).success(function(res){
                if(res.response.success == 1){
                    dhx_alert("修改成功",function(){
                        window.location.href = "foundcar_order.html"
                    });
                }else{
                    dhx_alert(res.response.return_code)
                }
            })
        }
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

        $scope.so_orderno=document.getElementById("parame_a").value;
        $scope.so_goodsname=document.getElementById("parame_b").value;
        $scope.so_getcarcity=document.getElementById("parame_c").value;
        $scope.so_name=document.getElementById("parame_d").value;
        $scope.so_mobile=document.getElementById("parame_e").value;




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
    //select 选择查询
    $("#view").bind("change",function(){

    });
});