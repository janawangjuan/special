//设置cookie
function setCookie(name, value,Days) {
	Days =  Days?Days:1;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

	if(arr = document.cookie.match(reg))

		return unescape(arr[2]);
	else
		return null;
}
//显示提示语
function showTips(txt) {
	$('.tip-modal').show()
	$('.tip-modal #wealTip').html(txt)
	$('.tip-modal .weak-tip').fadeIn(600)
	setTimeout(function() {
		$('.tip-modal').hide()
	}, 3000)
}
//格式化字符串
function getDateTime(timestamp) {
	var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	Y = date.getFullYear();
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) ;
	D = date.getDate() + '  ';
	h = date.getHours() ;
	min = date.getMinutes();
	s = date.getSeconds();
	D = D< 10 ? "0" + D : D;
	min = min< 10 ? "0" + min : min;
	h = h< 10 ? "0" + h : h;
	s = s< 10 ? "0" + s : s;
	return Y  + '.'+ M+'.' + D + '  ' + h+':' + min+':'+ s;
}
function getQueryString(name) {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	const urlObj = window.location;
	var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}
function getQueryVariable(variable){
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}
	
//判断是否为安卓
function isAndroid(){
    var u = navigator.userAgent;
    var isAndoroid = u.indexOf('Android')>-1
    return isAndoroid
}
//判断两个日期大小
function tab(date1,date2){
	var flags = false;
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if(oDate1.getTime() > oDate2.getTime()){
        flags = true;
    } else {
        flags = false;
    }
    return flags
}
//tab('2015-10-10','2015-10-11');