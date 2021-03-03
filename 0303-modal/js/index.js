$(function(){
	$('.modal0303').show()
	$('.modal0303 .inner-box').eq(0).show().siblings('.inner-box').hide()
	var get_href, token, activityId = '174a803150d411eb8d48506b4b4a9882', code0129, phone0129,select0129, timer_code, getCookie0113 = getCookie('_userid') || '';
	
	get_href = window.location.host.indexOf('https')==-1? 'https://www.zbgedu.com':window.location.host;
	var localHref = window.location.host.indexOf('https')==-1? 'https://www.zbgedu.com':window.location.host
	
    //验证码
  	function get_Code(phone0129, codeId, color) {
	    $('#' + codeId).attr('style', 'color:#'+color).text('获取中...').attr('disabled', 'disabled');
	    $('#loading20210113').show()
	    $.ajax({
	        url: get_href + '/api/PublicLoginApi/get_token.html',
	        type: 'post',
	        dataType: 'json',
	        data: {
	          'mobile': phone0129
	        },
	        success: function (res) {
	          	token = res.token;
	         	if (res.state == 'success') {
		            $.ajax({
		              url: 'https://api.zbgedu.com/api/base/sms/sendsms/v1.0/',
		              type: 'post',
		              dataType: 'json',
		              data: {
		                'token': token,
		                'phone': phone0129,
		                'templateSn': '05',
		                'isResend': 1
		              },
		              success: function (res) {
		              	$('#loading20210113').hide()
		                if (res.state == 'success') {
		                  $('#' + codeId).html('30秒');
		                  fn1(codeId, color);
		                } else {
		                	showTip('网络有误！')
		                	$('#' + codeId).text('获取验证码').attr('style', 'color:#' + color).removeAttr('disabled');
		                }
		              },
		              error: function () {
		                clearInterval(timer_code);
		                $('#loading20210113').hide();
		                $('#' + codeId).text('获取验证码').removeAttr('disabled').attr('style', 'color:#' + color);
		                showTip('网络错误')
		              }
		            })
		        }else {
		        	showTip('获取token失败')
		            $('#' + codeId).text('获取验证码').removeAttr('disabled').attr('style', 'color:#' + color);
		        }
	        },
	        error: function () {
	          clearInterval(timer_code);
	          showTip('网络请求失败')
	          $('#' + codeId).text('获取验证码').removeAttr('disabled');
	        }
	    })
	}
    //点击发送验证码
    $(document).on('click', '#getCode0129', function () {
	    phone0129 = $.trim($('#phone0129').val());
	    if (!(/^1[3456789]\d{9}$/.test(phone0129))) {
	     	showTip('手机号有误')
	    } else {
	      	get_Code(phone0129, 'getCode0129', 'fff')
	    }
	})
   	//弱提示
   	function showTip(txt){
   	 	$('#weakTips20210113').show();
	    $('#weakTips20210113 .tipName').html(txt);
   		setTimeout(function(){
   			$('#weakTips20210113').hide();
   		},2000)
   	}
    //获取cookie
  	function getCookie(name) {
	    var name = name + "=";
	    var ca = document.cookie.split(';');
	    for (var i = 0; i < ca.length; i++) {
	      var c = ca[i].trim();
	
	      if (c.indexOf(name) == 0) {
	        return c.substring(name.length, c.length);
	      }
	    }

  	}
  	
	//定时器清除
  	function reset() {
	    clearInterval(timer_code);
	    $('#phone0129').val('');
	    $('#code0129').val('');
	    $('#getCode0129').text('获取验证码').removeAttr('disabled').attr('style', 'color:#fff');
	}
    
    //验证码倒计时
	function fn1(codeId, color) {
	    var num = 30;
	    timer_code = setInterval(function () {
	      num--;
	      $('#' + codeId).text(num + '秒');
	      if (num == 0) {
	        clearInterval(timer_code);   //定时器清除；
	        $('#' + codeId).text('重新发送').attr('style', 'color:#' + color).removeAttr('disabled');
	      }
	    }, 1000)
	};
	
	//点击登录，提交表单
	$(document).on('click', '#loginBtn0129', function () {
	    phone0129 = $.trim($('#phone0129').val());
	    code0129 = $.trim($('#code0129').val());
		select0129 = getSeleteItem()
	    if (!(/^1[3456789]\d{9}$/.test(phone0129))) {
	      showTip('手机号错误');
	    } else if (code0129.length != 6) {
	     showTip('验证码错误');
	    } else {
			console.log('请求参数')
			console.log('手机号--'+phone0129)
			console.log('验证码--'+code0129)
			console.log('选中折扣id--')
			console.log(select0129)
	      goLogin(phone0129, code0129, 'getCode0129')
	    }
		
	})
	// 获取所有选中项
	function getSeleteItem(){
		let selectArr = []
		var selectItem = $(document).find('.coup-swiper .coup-detail.active')
		selectItem.each(function(index){
			selectArr[index] = $(this).attr('data-coupid')
		 });
		return selectArr
	}
	//登录
  	function goLogin(phone0129, code0129, getCodeId) {
	    $('#loading20210113').show();
	    $.ajax({
	      url: get_href + '/api/PublicActivityLoginApi/loginActivity',
	      data: {
	        token: token,
	        mobile: phone0129,
	        activeId: activityId,
	        remark: '寒假',
	        classOne: '10',
	        classTwo: '',
	        password: '',
	        code: code0129,
	        activeTag: '寒假',
	        sn: '05',
	        type: '2',
	        partId: ''
	      },
	      type: 'post',
	      success: function (res) {
	        $('#loading20210113').hide();
	        if (typeof res !== 'object') {
	          res = JSON.parse(res);
	        }
	        if (res.state == 'success') {
	           reset();
			   // 登录成功------
			   $('.modal0303 .inner-box').eq(1).show().siblings('.inner-box').hide()
			    // 登录成功------
	        } else if (res.state == 'error') {
	          //登录失败
			 $('.modal0303 .inner-box').eq(2).show().siblings('.inner-box').hide()
	          clearInterval(timer_code);
	          $('#' + getCodeId).text('获取验证码').removeAttr('disabled');
	        }
	      },
	      error: function () {
	        $('#loading20210113').hide();
	        showTip('请求有误！')
	        $('#' + getCodeId).text('获取验证码').removeAttr('disabled').attr('style', 'color:#fff');
	      }
	    });
	}
	//选择优惠券
	$(document).on('click','.coup-detail',function(){
		$(this).toggleClass('active')
	})
	// 课程优惠券轮播图
	var mySwiper = new Swiper ('.coup-swiper', {
	   loop: false, 
	   direction:"vertical",
		slidesPerView : 1.4,
		slidesPerGroup : 1,
	 })  
	
	//关闭弹框
	$('.know-btn').on('click',function(){
		$('.modal0303 .inner-box').eq(0).show().siblings('.inner-box').hide()
	})
	
	
	//点击抢购，弹出登录或直接跳转
	/* $(document).on('click', '.loginBtn0113', function () {
	    getCookie0113 = getCookie('_userid') || ''
	    localHref= $(this).attr('data-href')
	    if (getCookie0113.length == 32) {//已登录
	    	window.location.href = localHref
	    }else {
	      	$('.modal-box210113').show()
			$('.modal-box210113 .inner-box').hide()
			$('.modal-box210113 .inner-box.login-modal').show()
			$('.stateBox').eq(0).show().siblings('.stateBox').hide()
	    }
	}) */
})
