$(function(){
	var get_href , token, activityId = 'c59bb4e8831211eb8d48506b4b4a9882', partId = getCookie('partId') || '', code0120, phone0120,name0120, setTimeout1028, timer_code, getCookie0120 = getCookie('_userid') || '';
	
	var localHref = window.location.host.indexOf('https')==-1? 'https://m.zbgedu.com':window.location.host,
	get_href = window.location.host.indexOf('https')==-1? 'https://m.zbgedu.com':window.location.host;
    //点击立即购买
    $(document).on('click', '.btnlogin20', function () {
	    getCookie0120 = getCookie('_userid') || ''
	    if (getCookie0120.length == 32) {//已登录
			$('#loading20210113').show()
			var wxug = isWeiXin()?'3':'2'
			window.location.href="https://m.zbgedu.com/api/PayAccounting/pay?payId="+wxug+"&shopId=909"
	    }else {//未登录
	      	$('.modal-box210302').show()
	    }
	})
	// 判断是否为微信浏览器
	function isWeiXin() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/MicroMessenger/i) == 'micromessenger') {
			return true; // 是微信端
		} else {
			return false;
		}
	}
	
	/* function payDetail(){
		var wxug = isWeiXin()?'3':'2'
		$.ajax({
			url: "https://m.zbgedu.com/api/PayAccounting/pay?payId="+wxug+"&shopId=909"",
			data: {
				payId:wxug,
				shopId:'808'
			},
		  type: 'get',
		  success: function (res) {
			  
		})
	} */
	
	
    //验证码
  	function get_Code(phone0120, codeId, color) {
	    $('#' + codeId).attr('style', 'color:#333').text('获取中...').attr('disabled', 'disabled');
	    $('#loading20210113').show()
	    $.ajax({
	        url: get_href + '/api/PublicLoginApi/get_token.html',
	        type: 'post',
	        dataType: 'json',
	        data: {
	          'mobile': phone0120
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
		                'phone': phone0120,
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
			   $('#loading20210113').hide();
	          $('#' + codeId).text('获取验证码').removeAttr('disabled');
	        }
	    })
	}
    //点击发送验证码
    $(document).on('click', '#getCode0120', function () {
	    phone0120 = $.trim($('#phone0120').val());
	    if (!(/^1[3456789]\d{9}$/.test(phone0120))) {
	     	showTip('手机号有误')
	    } else {
	      	get_Code(phone0120, 'getCode0120', '333')
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
  	
	//重置表单
  	function reset() {
	    clearInterval(timer_code);
	    $('#phone0120').val('');
	    $('#code0120').val('');
	    $('#getCode0120').text('获取验证码').removeAttr('disabled').attr('style', 'color:#333');
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
	$(document).on('click', '#loginBtn0120', function () {
	    phone0120 = $.trim($('#phone0120').val());
	    code0120 = $.trim($('#code0120').val());
		
	    if (!(/^1[3456789]\d{9}$/.test(phone0120))) {
	      showTip('手机号错误');
	    } else if (code0120.length != 6) {
	     showTip('验证码错误');
	    } else {
	      goLogin(phone0120, code0120, 'getCode0120')
	    }
	})
	//登录
  	function goLogin(phone0120, code0120, getCodeId) {
	    $('#loading20210113').show();
		$("#loginBtn0120").html('登录中')
	    $.ajax({
	      url: get_href + '/api/PublicActivityLoginApi/loginActivity',
	      data: {
	        token: token,
	        mobile: phone0120,
	        activeId: activityId,
	        remark: '其他',
	        classOne: '10',
	        classTwo: '',
	        password: '',
	        code: code0120,
	        activeTag: '其他',
	        sn: '05',
	        type: '2',
	        partId: partId?partId:''
	      },
	      type: 'post',
	      success: function (res) {
			$("#loginBtn0120").html('验证')
	        if (typeof res !== 'object') {
	          res = JSON.parse(res);
	        }
	        if (res.state == 'success') {//登录成功
				reset();
				var wxug = isWeiXin()?'3':'2';
				window.location.href="https://m.zbgedu.com/api/PayAccounting/pay?payId="+wxug+"&shopId=909"
	        } else if (res.state == 'error') {  //登录失败
	          $('#loading20210113').hide();
			  showTip(res.msg)
			  // timer&&clearInterval(timer);
			  if(timer){
				  clearInterval(timer);
			  }
	          
	          $('#' + getCodeId).text('获取验证码').removeAttr('disabled');
	        }
	      },
	      error: function () {
			 $("#loginBtn0120").html('验证')
	        $('#loading20210113').hide();
	        showTip('请求有误！')
	        $('#' + getCodeId).text('获取验证码').removeAttr('disabled').attr('style', 'color:#333');
	      }
	    });
	  }
	
	
	//关闭弹框
	$('.closeModal0120').on('click',function(){
		$('.modal-box210302').hide()
		reset()
	})
	
})
