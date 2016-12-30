
var basePath = "http://cloudrent.dhui100.com:58001/";

//dhtmlx alert text-提示内容，点击确定content-function
function dhx_alert(text,content){
    dhtmlx.alert({
        ok:"确定",
        text:text,
        callback: content
    });
}

//cookie option
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); ;
}

function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

//蒙层定位js
function GeneralTip(GeneralTip){
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var screenHeight = $(window).height();
    var screenWidth = $(window).width();
    var height = parseInt(GeneralTip.css("height").split("px")[0]);
    var width = parseInt(GeneralTip.css("width").split("px")[0]);

    var contentwidth = GeneralTip.outerWidth();
    var imgwidth = $("#Layer5 .content img").outerWidth();
    $("#Layer5 .content img").css("margin-left",(contentwidth-imgwidth)/2+"px");

    var endTop = (screenHeight-height)/2;
    var endLeft = (screenWidth-width)/2;

    GeneralTip.css("top",endTop);
    GeneralTip.css("left",endLeft+$("body").scrollLeft());
}