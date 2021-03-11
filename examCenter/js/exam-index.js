$(function(){
	//适配页面
	var deviceWidth = ''
	function setHtmlFontSize(){
		deviceWidth =document.documentElement.clientWidth>=750?750:document.documentElement.clientWidth
		deviceWidth = deviceWidth<=320?320:deviceWidth
		document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 7.50 + 'px !important'
	}
	setHtmlFontSize()
	if(window.addEventListener) {
		window.addEventListener('resize', function(){
		    setHtmlFontSize()
		}, false)
	}
	var baseUrl = 'https://m.zbgedu.com/' 
	//判断是否为安卓
	function isAnd(){
	    var u = navigator.userAgent;
	    var isAndoroid = u.indexOf('Android')>-1
	    return isAndoroid
	}
	//判断是否为wap端
	function isWap(){
		let flag = true
		var ua = navigator.userAgent;

		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
		
		isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
		
		isAndroid = ua.match(/(Android)\s+([\d.]+)/),
		
		isMobile = isIphone || isAndroid;
		
		//判断
		if(isMobile){
			flag = true
		}else{
			flag = false
		}
		return flag;
	}
	if(isWap()){
		 baseUrl = 'https://m.zbgedu.com/' 
	}else{
		 baseUrl = 'https://www.zbgedu.com/' 
	}
	var api = {
		cityChange: baseUrl + 'shop_machine/Machine/_getksortdata',
		searchCity:baseUrl +'shop_machine/Machine/search_fancy'
	}
	//设置cookie
	function setCookie(name,value){
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	}
	//读取cookie
	function getCookie(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]);
		else
		return null;
	}
	//显示城市 cityChange
	function getCity(){
		$.ajax({
			type:"GET",
			url: api.cityChange,
			async:true,
			dataType:'json',		
			success:function(data){
				var tmpString = ''
				var rightString = ''
				for(var key in data){
					rightString +='<a href="javascript:;">'+key+'</a>'
					tmpString +="<p data-group="+key+" class='each-title'>"+key+"</p>"+getNumCity(data[key])
				}
				$(document).find('#citylist').html(tmpString)
				$(document).find('#listerBar').html(rightString)
			}
		});
	}
	getCity()
	//获取具体字母下的城市
	function getNumCity(obj){
		var tmpStr = '<div class="city-box">'
		obj.forEach((item,index)=>{
			tmpStr +="<a href='javascript:;' data-id="+item.id+">"+item.name+"</a>"
		})
		tmpStr+='</div>'
		return tmpStr;
	}
	//点击锚链接
	$(document).on('click', '#listerBar>a', function() {
		var txt = $(this).html()
		var hasTxt = $('p[data-group="' + txt + '"]').html();
		if(hasTxt) {
			scrollTxt(txt)
		}
	})
	function scrollTxt(txt){
		if($('p[data-group="' + txt + '"]').length==0)
		return false;
		var topHight = $('p[data-group="' + txt + '"]').offset().top;
		$('p[data-group="' + txt + '"]').addClass('shows').siblings().removeClass('shows')
		setTimeout(()=>{
			$('p[data-group="' + txt + '"]').removeClass('shows')
		},5000)
		$('html,body').animate({
			scrollTop: topHight - 20
		}, 800)
	}
	//输入框搜索
	var this_txt='',firstL='',toTar='',topHight='',letterReg = /[a-zA-Z]/
	if(isAnd()){
		$('.search-box').on('keyup',function(){
			this_txt = $.trim($(this).val());
			if(this_txt){
				toTar = getPinYin(this_txt,'',true )
				firstL = (toTar).match(letterReg)
				firstL&&scrollTxt(firstL[0])
			}
		})
	}else{
		$('.search-box').on('change',function(){
			var this_txt = $.trim($(this).val());
			if(this_txt){
				toTar = getPinYin(this_txt,'',true )
				firstL = (toTar).match(letterReg)
				firstL&&scrollTxt(firstL[0])
			}
		})
	}
	//点击跳转到对应页面
	function clickLi(id){
		window.location.href="https://accahelper.zbgedu.com/acca/static/examCenter/testCenter.html?getPointId="+id
	}
	$(document).on('click','.city-box>a',function(){
		$(this).data('id')&&clickLi($(this).data('id'))
	})
})
