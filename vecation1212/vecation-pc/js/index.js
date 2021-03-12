$(function(){
	$('.modal-box210113').hide()
	$('.modal-box210113 .inner-box').hide()

	// 点击跳转页面锚点
	$('.ban-arror a').on('click',function(){
		var posType= $(this).attr('data-pos')
		var pos1,pos2;
		pos1 = $('.section1').offset().top;
		pos2 = $('.section4').offset().top;
		if(posType==1){
			$("html,body").animate({scrollTop:pos1 - "90" + "px"}, 100);
		}else{
			$("html,body").animate({scrollTop:pos2 - "90" + "px"}, 500);
		}

	})
	
	var get_href = 'https://www.zbgedu.com', part3_num, token, activityId = '174a803150d411eb8d48506b4b4a9882', code0113, phone0113,
   
    setTimeout1028, timer_code, getCookie0113 = getCookie('_userid') || '';
    var localHref = 'https://www.zbgedu.com'
    
    //点击抢购，弹出登录或直接跳转
    $(document).on('click', '.loginBtn0113', function () {
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
	})
    //验证码
  	function get_Code(phone0113, codeId, color) {
	    $('#' + codeId).attr('style', 'color:#fff').text('获取中...').attr('disabled', 'disabled');
	    $('#loading20210113').show()
	    $.ajax({
	        url: get_href + '/api/PublicLoginApi/get_token.html',
	        type: 'post',
	        dataType: 'json',
	        data: {
	          'mobile': phone0113
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
		                'phone': phone0113,
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
    $(document).on('click', '#getCode0113', function () {
	    phone0113 = $.trim($('#phone0113').val());
	    if (!(/^1[3456789]\d{9}$/.test(phone0113))) {
	     	showTip('手机号有误')
	    } else {
	      	get_Code(phone0113, 'getCode0113', 'fff')
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
	    clearTimeout(setTimeout1028);
	    $('#phone0109').val('');
	    $('#code0109').val('');
	    $('#getCode0109').text('获取验证码').removeAttr('disabled').attr('style', 'color:#000');
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
	$(document).on('click', '#loginBtn13', function () {
	    phone0113 = $.trim($('#phone0113').val());
	    code0113 = $.trim($('#code0113').val());
	    if (!(/^1[3456789]\d{9}$/.test(phone0113))) {
	      showTip('手机号错误');
	    } else if (code0113.length != 6) {
	     showTip('验证码错误');
	    } else {
	      goLogin(phone0113, code0113, 'getCode0113')
	    }
	})
	//登录
  	function goLogin(phone0113, code0113, getCodeId) {
	    $('#loading20210113').show();
	    $.ajax({
	      url: get_href + '/api/PublicActivityLoginApi/loginActivity',
	      data: {
	        token: token,
	        mobile: phone0113,
	        activeId: activityId,
	        remark: '寒假',
	        classOne: '10',
	        classTwo: '',
	        password: '',
	        code: code0113,
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
	          	$('#loading20210113').hide();
				$('.modal-box210113 .login-modal .stateBox').eq(1).show().siblings('.stateBox').hide()
	        } else if (res.state == 'error') {
	          //登录失败
	          $('.modal-box210113 .login-modal .stateBox').eq(2).show().siblings('.stateBox').hide()
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
	
	
	//奖品轮播图
	 var mySwiper = new Swiper ('.prize-cont', {
	    loop: false, 
	    pagination: {
	      el: '.swiper-pagination',
	      clickable:true
	    },
	    slidesPerView : 5,
	    slidesPerGroup : 5,
	    centeredSlides : false,
	    spaceBetween : 33,
	    navigation: {
	      nextEl: '.swiper-button-next',
	      prevEl: '.swiper-button-prev',
	    }
	  })  
	
	//点击显示规则
	$('.btn-ruler0113').on('click',function(){
		let type = $(this).attr('data-type')
		$('.modal-box210113').show()
		$('.modal-box210113 .ruler-modal').fadeIn(400).siblings('.inner-box').hide()
		$('.inner-box.ruler-modal .ruler-txt ul').eq(type).fadeIn(400).siblings('ul').hide()
	})
	//关闭弹框
	$('.closeModal0113').on('click',function(){
		if($(this).attr('data-type')==5){
			window.location.href = localHref
		}else{
			$('.modal-box210113').hide()
		}
		
	})
	//财经、金融、更多 tab切换
	var allTab = $('.finance')
	for(var i=0;i<allTab.length;i++){
		$('.finance').eq(i).find('.finance-tab a').eq(0).addClass('active').siblings('a').remove('active')
		$('.finance').eq(i).find('.inner-box').eq(0).show().siblings('.inner-box').hide()
	}
	$('.finance-tab a').on('click',function(){
		var _idx = $(this).index()
		$(this).parents('.finance').find('.finance-tab a').eq(_idx).addClass('active').siblings('a').removeClass('active')
		$(this).parents('.finance').find('.inner-box').eq(_idx).show().siblings('.inner-box').hide()
	})
})
