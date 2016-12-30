


// url = 'http://localhost:8001/api/v1.0/http'

var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope,$interval, $http) {
var url = 'http://139.159.35.179/api/v1.0/http'
    var myGrid;// 声明表格
    var myCalendar;//声明时间插件
    init();//初始化


    $interval(function(){
        myGrid.clearAll();
        get_function();
    },1000*60*5);


function get_function(){
    $http.get(url).success(function (response) {
        if (response.response.success == 1) {
            var get_data = response.response.data;
            console.log(get_data);
            var str;
            for(var i=0; i < get_data.length;i++){
                str = get_data[i]._id;
                get_data[i].index = i+1;
                var color = "red";
                if (get_data[i].status == "通信正常"){
                    color = "green";
                }
                myGrid.addRow(str,[
                    0,
                    get_data[i].index,
                    get_data[i].system_name,
                    get_data[i].system_url,
                    // get_data[i].status,
                    "<span style='color: "+color+"'>"+get_data[i].status+"</span>",
                    get_data[i].last_updated_time.substring(0,19)
                ],i);
            }

        } else {
            alert(response.response.return_code);
        }
    })
}



    function init(){
        if(localStorage.getItem("token") == undefined ||localStorage.getItem("token") == null){
            window.location.href = "../login.html"
        }else{
            //建页
            myGrid = new dhtmlXGridObject('gridbox');
            myGrid.setImagePath("../dhtmlxSuite/sources/dhtmlxGrid/codebase/imgs/");//表格图标路径
            myGrid.setHeader("#master_checkbox,序号,系统名称,系统链接,系统状态,<center>最后一次查询状态时间</center>");//设置表头
            //myGrid.attachHeader("#master_checkbox,&nbsp;,<input type='text' id='content'>,<input type='text' id='web_user_dim_star_add'>&nbsp;<input type='text' id='web_user_dim_end_add'>,<input type='text' id='web_user_dim_star_edit'>&nbsp;<input type='text' id='web_user_dim_end_edit'>,&nbsp;");
            myGrid.setInitWidths("50,50,*,*,200,*");//设置表格初始宽度
            myGrid.setColAlign("left,center,left,left,left,center");//数据显示位置
            myGrid.setColTypes("ch,ro,ro,ro,ro,ro");//数据呈现类型
            //myGrid.setColSorting("price,str,int,price,date,int");//设置各列排序类型
            myGrid.enableAutoWidth(true);
            myGrid.init();

            get_function();//加载数据

        }
    }




    function myGridjiazai2(p){


        $http.get(basePath+get_url+"access_token="+ localStorage.getItem("token")+"&page="+p+"&page_size=15")
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
                        var title = get_data[i].content;
                        title = title.replace(/(\n)/g, "");
                        title = title.replace(/(\t)/g, "");
                        title = title.replace(/(\r)/g, "");
                        title = title.replace(/<\/?[^>]*>/g, "");
                        title = title.replace(/\s*/g, "");
                        title = title.replace(/&nbsp;/g, "");
                        myGrid.addRow(str,[
                            0,
                            get_data[i].index,
                            title,
                            get_data[i].add_time.substring(0,19),
                            get_data[i].last_updated_time.substring(0,19),
                            "<button style='width: 60px;height: 25px;background: none;border: none'>查看详情</button>"
                        ],i);

                    }
                }else{
                    dhx_alert(res.response.return_code);
                }
            })
    }

});





