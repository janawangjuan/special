$(function(){
	/*var aipUrl = 'https://accahelperdev.zbgedu.com/acca'
	var webUrl = "https://wwwdemo.zbgedu.com"*/
	var aipUrl = 'https://accahelper.zbgedu.com/acca'
	var webUrl = "https://m.zbgedu.com"
	var userInfors =''
	var userAccessToken = ''
	var zbgData = {
		activeId:'',
		token:'',
		phone:'',
		partId:''
	}
	var linkPart = ''
	
	
	//获取官网token
	function webTokens(){
		$.ajax({
			type:'post',
			url:webUrl+"/api/PublicLoginApi/get_token",
			async:false,
			success:function(res){
				if(res.state=="success"){
					zbgData.token = res.token
				}
			},
			fail:function(err){
				console.log(err)
			}
		})
	}
	webTokens()
	
	//判断是否登录
	function isLogin(){
		if(getUrlKey('userAccessToken')){
			console.log('app登录')
			userInfors = {
				accaUserId:getUrlKey('appUserId'),
				userAccessToken:getUrlKey('userAccessToken'),
				phone:getUrlKey('phone')||'',
				headImg:getUrlKey('imageUrl')
			}
			console.log('链接参数')
			console.log(userInfors)
			$('.head-img').attr('src',userInfors.headImg)
			setCookie('userAccessToken', userInfors.userAccessToken)
			setCookie('userObject', JSON.stringify(userInfors))
			//partId获取
			if(getUrlKey('partId')){
				loginAgin(getUrlKey('phone'),getUrlKey('partId'),)
			}
			getPrizeTime(userInfors)
		}else{//H5登录
			//partId获取
			if(getUrlKey('partId')){
				zbgData.partId = getUrlKey('partId')
				webActiveId(getUrlKey('partId'))
			}
			if(getUrlKey('delete')=='1'){
				setCookie('userObject','',-1)
				setCookie('userAccessToken','',-1)
			}else{
				userAccessToken = getCookie('userAccessToken')?getCookie('userAccessToken'):''
				if(userAccessToken){//已登录
					userInfors = JSON.parse(getCookie('userObject'))?JSON.parse(getCookie('userObject')):[]
					var headImgTmp =""
					if(userInfors.headImg&&userInfors.headImg.iconUrl==undefined){
						headImgTmp = userInfors.headImg
					}else{
						headImgTmp = userInfors.headImg?userInfors.headImg.iconUrl:'https://accahelper.zbgedu.com/acca/userfiles/497ba53e12834a83ad05e2d1411142cd/images/acca/upload/default/1020.png'
					}
					$('.head-img').attr('src',headImgTmp)
					//点击分享按钮
					wxshares()
					zbgData.phone = userInfors.phone
					getPrizeTime(userInfors)
					webLogin(zbgData)
				}else{
					$('.residue-p .timers').html('0')  //抽奖次数为0
					$('.tip-timers .number').html('0')
				}
			}
			
		}
	}
	isLogin()
	
	console.log('用户信息========')
	console.log(userInfors)
	
	
	//微信分享
	function wxshares(){
		var wx_url = window.location.href;
		var partIds = zbgData.partId||""
		$.ajax({
			type:"POST",
			url:"https://wx.zbgedu.com/getSignature.html",
			datayType:'json',
			data:{
				format: 'json',
				url:encodeURIComponent(wx_url)
			},
			success:function(res){
				wx.config({
				    debug: false,
				    appId: res.data.appId, // 必填，公众号的唯一标识
				    timestamp: res.data.timestamp, // 必填，生成签名的时间戳
				    nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
				    signature: res.data.signature,// 必填，签名，见附录1
				    jsApiList: [// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				    	"onMenuShareAppMessage",
				    	"onMenuShareTimeline",
				    	"onMenuShareQQ",
				    	"onMenuShareQZone"
				    ] 
				});
				wx.ready(function () {
				 	wx.onMenuShareAppMessage({
			            title: '双11红包来袭，疯狂补贴',
			            desc: '送你一张ACCA机考免单券',
			            link: 'https://www.zbgedu.com/special/accaLucky-1015/help-friendtwo.html?phone='+userInfors.phone+'&partId='+partIds+'&device=h',
			            imgUrl: 'https://www.zbgedu.com/special/accaLucky-1015/image/share-banner.jpg',
			            success: function (res) {
		               	},
		               	fail: function (res) {
		               	}
			        });
			        wx.onMenuShareTimeline({
			            title: '双11红包来袭，疯狂补贴',
			            desc: '送你一张ACCA机考免单券',
			            link: 'https://www.zbgedu.com/special/accaLucky-1015/help-friendtwo.html?phone='+userInfors.phone+'&partId='+partIds+'&device=h',
			            imgUrl: 'https://www.zbgedu.com/special/accaLucky-1015/image/share-banner.jpg',
			            success: function (res) {
		                   console.log(res)
		               	},
		               	fail: function (res) {
		               		console.log(res)
		               	}
			        });
			        wx.onMenuShareQQ({
			        	title: '双11红包来袭，疯狂补贴',
			            desc: '送你一张ACCA机考免单券',
			            link: 'https://www.zbgedu.com/special/accaLucky-1015/help-friendtwo.html?phone='+userInfors.phone+'&partId='+partIds+'&device=h',
			            imgUrl: 'https://www.zbgedu.com/special/accaLucky-1015/image/share-banner.jpg',
			            success: function (res) {
		                   console.log(res)
		                   showTips("qq内可参与，但不可二次分享哦！")
		               	},
		               	fail: function (res) {
		               		console.log(res)
		               	}
			        })
			        wx.onMenuShareQZone({
			        	    title: '双11红包来袭，疯狂补贴', // 分享标题
						    desc: '送你一张ACCA机考免单券', // 分享描述
						    link: 'https://www.zbgedu.com/special/accaLucky-1015/help-friendtwo.html?phone='+userInfors.phone+'&partId='+partIds+'&device=h', // 分享链接
						    imgUrl: 'https://www.zbgedu.com/special/accaLucky-1015/image/share-banner.jpg', // 分享图标
						    success: function (res) { 
						       // 用户确认分享后执行的回调函数
						       console.log(res)
						       showTips("qq内可参与，但不可二次分享哦！")
						    },
						    cancel: function (err) {
						    	console.log(err)
						        // 用户取消分享后执行的回调函数
						    }
			        })
				 })
			}
		});
	}

	//获取今日助力人、抽奖次数
	function getPrizeTime(userObject){
		let params = {
	      "activityId": '43',
	      "appUserId": userObject.accaUserId,
	      "userAccessToken": userObject.userAccessToken,
	      "phone": userObject.phone,
	      "mobile": userObject.phone,
	    }
		$.ajax({
			type:"POST",
			dataType:'json',
			data:JSON.stringify(params),
			async:true,
			contentType: "application/json;charset=UTF-8",
			url:aipUrl+"/api/luckDraw/getHandPhoneList.do",
			success:function(res){
				if (res.respCode == 0) {
					var tmpPeople =res.obj.length > 9 || res.obj.length==0 ? res.obj.length : '0' + res.obj.length
					var todayTimers = parseInt(res.obj.length / 5)
					var tmpTime = 0
					if(todayTimers>9){
						tmpTime = todayTimers
					}else{
						if(todayTimers>0){
							tmpTime = '0'+todayTimers
						}
					}
					$('#todayPeople').html(tmpPeople)
					$('#todayTimers').html(tmpTime)
					
					todayRest(userObject)
					if(res.obj.length==15){
						$('#shareType').attr('src','image/btn-invite-disable.png')
						$('#shareType').removeClass('addAnimate')
					}
			      } else {
			        showTips(res.respDesc)
			      }
			}
		});
		
	}
	
	//获取url的连接参数
	function getUrlKey(name){
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
	}
	//获取分部id,产生官网活动id
	function webActiveId(partId){
		$.ajax({
			type:"post",
			url:webUrl+"/api/EduCoupon/get_activity",
			data:{
				partId:partId
			},
			async:false,
			success:function(res){
				if(res.state=='success'){
					zbgData.activeId = res.data?res.data:'8678da870c3311eb8d48506b4b4a9882'
				}
			}
		});
	}
	
	function loginAgin(phone,activId){//小助手二次登录
		$.ajax({
			type:"POST",
			url: aipUrl+"/api/user/login.do", 
			contentType: "application/json;charset=UTF-8",
			async:true,
			data:JSON.stringify({
				smsVcode: "34ce55f70457ae30",
			    phone: phone,
			    activityId: activId,
			    source:"0",
			    deviceId: '123456'
			}),
			success:function(res){}
		})
	}
	
	//官网登录
	function webLogin(data){
		$.ajax({
			type:'post',
			url:webUrl+'/api/PublicActivityLoginApi/loginActivity',
			data:{
				token:data.token,
				'mobile':data.phone,
				'activeId':data.activeId||"8678da870c3311eb8d48506b4b4a9882",
				remark:"小助手活动",
				"classOne":"10",
				'classTwo ':'' ,
				'sn':'05',
				'type':'3',
				partId:data.partId
			},
			success:function(res){
			}
		})
	}
	
	
	//获取今日剩余次数
	var gameState = false   // 游戏状态
	var rotateZPositionCount= 0 // 当前转盘的rotateZ值
	var preUseRotateZ = 0           // 上一次已抽奖中奖奖品的RotateZ
	var luckDrawCount = 0   //  抽奖次数
	function todayRest(userObject){   //获取今日可抽奖次数
		let params = {
	      "activityId": '43',
	      "appUserId": userObject.accaUserId,
	      "mobile": userObject.phone,
	      "userAccessToken": userObject.userAccessToken
	    }
		$.ajax({
			type:"POST",
			url: aipUrl+"/api/luckDraw/getLuckDrawCount.do",
			dataType:'json',
			async:true,
			data:JSON.stringify(params),
			contentType: "application/json;charset=UTF-8",
			success:function(res){
				if (res.respCode == 0) {
					var tmpTime  =$('#todayTimers').html()
					var todayChange = 3-(tmpTime-parseInt(res.obj.total))
					todayChange = todayChange>0?todayChange:0
			        $('#RestTimeDay').html(todayChange)
			        
			        $('.todayRestTime').html(res.obj.total)
			        if(res.obj.total==0){
			        	$('#pointImg').attr('src','image/tew-pointer-disable.png')			        	
			        }else{
			        	$('#pointImg').attr('src','image/tew-pointer.png')
			        }
			    } else {
			        showTips(res.respDesc)
			    }
			}
		})
	}
	
	//我的奖品
	$(document).on('click','#myPrizeBtn',function(){
		if(getUrlKey('userAccessToken')){
			window.location.href="./prize.html"
		}else{
			if(getCookie('userAccessToken')){  //已登录
				window.location.href="./prize.html"
			}else{
				showLogin()
			}
		}
		
	})
	
	
	//点击分享蒙层，关闭
	$(document).on('click','.modal-box',function(){
		var showShare = $(this).find('.share-tip').is(':hidden')
		if(!showShare){
			$('.modal-box').hide()
			$('.inner-box').hide()
		}
	})
	
	//显示登录弹框 
	function showLogin(){
		$('.inner-box').hide();
		$('.tip-modal').hide()
		$('.inner-box.login-inner').show()
		$('.modal-box').fadeIn(600)
	}
	
	
	$(document).on('click','#shareType',function(){
		if(getUrlKey('userAccessToken')){//app内连接
			console.log('app内分享')
			if(isAndroid()){
				window.acca.share("https://www.zbgedu.com/special/accaLucky-1015/help-friendtwo.html")
			}else{
//				acca.share()
				acca.newShare('https://www.zbgedu.com/special/accaLucky-1015/help-friendtwo.html')
			}
		}else if(getCookie('userAccessToken')){//已登录 H5
			$('.modal-box').show()
			$('.inner-box').hide()
			$('.inner-box.share-tip').show()
		}else{//登录弹框
			$('.inner-box').hide();
			$('.inner-box.login-inner').show()
			$('.modal-box').fadeIn(600)
		}
		
		
	})
	//点击抽奖
	$(document).on('click','#pointImg',function(){
		var imgUrl = $(this).attr('src')
		console.log('点击抽奖')
		console.log(getUrlKey('userAccessToken'))
		console.log(getCookie('userAccessToken'))
		
		if(getUrlKey('userAccessToken')||getCookie('userAccessToken')){
			if(imgUrl.indexOf('disable')>-1){  //指针为灰色
				showTips('每邀请5位好友即可抽奖一次')
			}else{  //指针为红色
				gameAction()
			}
		}else{
			showLogin()
		}
		
	})
  	function gameAction() {
  		$('.tip-modal').show()
		$('.weak-tip').addClass('white')
	    if (gameState) return;  // 判断游戏是否进行中
	    let params = {
	        "activityId": '43',
	        "appUserId": userInfors.accaUserId,
	        "couponId": 0,
	        "mobile": userInfors.phone,
	        "remark": "抽奖",
	        "userAccessToken": userInfors.userAccessToken
	    }
	    $.ajax({
	      	type:"POST",
	      	url:aipUrl+'/api/luckDraw/saveLuckDraw.do',
	      	dataType:'json',
	      	data:JSON.stringify(params),
	      	contentType: "application/json;charset=UTF-8",
	      	success:function(res){
	      		$('.tip-modal').hide()
				$('.weak-tip').removeClass('white')
				var ts = parseInt($('#RestTimeDay').html())
				if(ts>0){
					$('#RestTimeDay').html(ts-1)
				}else{
					$('#RestTimeDay').html(0)
				}
	      		if (res.respCode == 0) {
	      			if (res.obj.indexOf("抽奖次数不足") > -1) { //抽奖次数不足
	      				showTips('今日抽奖次数已用完')
	      			}else if(res.obj.indexOf("5元") > -1) {
	      				gameAnimationRun(0)
			        } else if (res.obj.indexOf("10元") > -1) {
			            gameAnimationRun(1);
			        } else if (res.obj.indexOf("30元") > -1) {
			            gameAnimationRun(2);
			        } else if(res.obj.indexOf("50元") > -1){
			          	gameAnimationRun(3);
			       	} else if (res.obj.indexOf('很遗憾未中奖') > -1) {
			            gameAnimationRun(5);
			        } else if (res.obj.indexOf('全科免费券') > -1) {
			            gameAnimationRun(4);
			        }
	      		}else{
	      			showTips(res.respDesc)
	      		}
	      	}
	    });
  	}
  
  	//点击知道了
  	$(document).on('click','.closeTipBtn',function(){
  		var srcNames = $(this).attr('src')
  		if(srcNames.indexOf('receive')>0){ //点击领取
  			$('.modal-box').show()
	    	$('.inner-box').hide()
	    	$('.inner-box.received-inner').fadeIn()
  		}else{
  			$('.modal-box').hide()
	    	$('.inner-box').hide()
  		}
  	})
  	//点击知道了，跳转至appStroe
  	$(document).on('click','.todownBtn',function(){
  		window.location.href="https://a.app.qq.com/o/simple.jsp?pkgname=com.chinaife.acca"
  	})
  	//关闭领奖
  	$(document).on('click','.received-icon-close',function(){
  		$('.modal-box').hide()
	    $('.inner-box').hide()
  	})
  	
  	// 游戏实现部分
  	function gameAnimationRun(rotateZPositionIndex) {    
  		// 设置状态   0：5元， 1:10元 2:30元    3:50元   4：免单   5未中奖
	    gameState=true
	    var rotateZPosition = [175, 245, 45, 290, 1, 100];//5---175deg,10,30----45deg,50---290deg,免单---1deg,未中奖---100deg
	    var rotateZ = 360;  
	    var rotateZCount = 4; 
	    var toRotateZCount = (rotateZPositionCount - preUseRotateZ + rotateZPosition[rotateZPositionIndex]) + rotateZ * rotateZCount; 
	    $('.disk-circle').css('transform','rotate('+toRotateZCount+'deg)')
	    if(luckDrawCount>0){
	    	luckDrawCount=  luckDrawCount - 1   // 抽奖次数减一
	    	$('#pointImg').attr('src','image/tew-pointer.png')
	    }else{
	    	$('#pointImg').attr('src','image/tew-pointer-disable.png')
	    }
	    setTimeout(function(){
	    	$('.modal-box').show()
	    	$('.inner-box').hide()
	    	$('.inner-box.win-inner').fadeIn()
		    if (rotateZPositionIndex!=5){
		    	$('#winTitle').html('恭喜你中奖辣！')
		    	$('#tip-btn-img').attr('src','image/btn-receive.png')
		    	$('#prize-img').attr('src','image/prize-img'+rotateZPositionIndex+'.png')
		    	console.log(rotateZPositionIndex+'=======')
		    	if(rotateZPositionIndex==0){
		    		$('#tip-p').html('获得5元机考优惠券')
		    	}else if(rotateZPositionIndex==1){
		    		$('#tip-p').html('获得10元机考优惠券')
		    	}else if(rotateZPositionIndex==2){
		    		$('#tip-p').html('获得30元机考优惠券')
		    	}else if(rotateZPositionIndex==3){
		    		$('#tip-p').html('获得50元机考优惠券')
		    	}else if(rotateZPositionIndex==4){
		    		$('#tip-p').html('获得机考报名费用全免')
		    	}
			        
			}else if(rotateZPositionIndex==5){
				$('#winTitle').html('未中奖')
		      	$('#tip-p').html('别气馁邀请好友继续抽奖~~！')
		      	$('#tip-btn-img').attr('src','image/btn-know-yel.png')
		      	$('#prize-img').attr('src','image/prize-img4.png')
			}
	      	gameState=false // 将转盘状态切换为可抽奖
	      	preUseRotateZ= rotateZPosition[rotateZPositionIndex] // 上一次奖品
        	rotateZPositionCount=  toRotateZCount              // 记录当前转盘rotateZ值
	    },3400)
  	}
	//点击 判断是否登录
	$('.step-one .item').on('click',function(){
		var _index = $(this).index()
		if(_index!=1&&!getCookie('userAccessToken')){  //未登录
			showLogin()
		}else{  //已登录或抽奖次数显示
			if(_index==2){
				window.location.href="./help-list.html"
			}
		}
	})
	
	//验证码 点击登录
	$(document).on('click','.loginBtn',function(){
		var phone= $('#phone').val().replace(/\s+/g,"")
		var telReg = /^1[3456789]\d{9}$/
		var codeTxt = $('#codeVal').val().replace(/\s+/g,"")
		if (phone&&telReg.test(phone)) {
			if(codeTxt){
				$.ajax({
					type:"POST",
					url: aipUrl+"/api/user/login.do", 
					contentType: "application/json;charset=UTF-8",
					async:true,
					data:JSON.stringify({
						smsVcode: codeTxt,
					    phone: phone,
					    activityId: zbgData.activeId||'',
					    source:"0",
					    deviceId: '123456'
					}),
					success:function(res){
						$('.inner-box').hide();
						$('.modal-box').fadeOut(600)
						if (res.respCode == 0) {  //存储个人信息
				        	setCookie('userAccessToken', res.obj.userAccessToken)
				        	setCookie('userObject', JSON.stringify(res.obj))
				        	window.location.reload()
				       	}else{ //提示错误
				        	showTips( res.respDesc)
				        }
					}
				})
			}else{
				showTips('验证码不能为空')
			}
	    } else  {
	    	showTips('手机号有误')
	    }
		
	})
	
	//获取焦点，关闭红框
	$('.login-input input').on('focus',function(){
		$(this).removeClass('tipNew')
	})
	
	//点击显示规则
	$(document).on('click','.btn-modalBtn',function(){
		var name = $(this).attr('data-name')
		$('.inner-box').hide();
		$('.inner-box.'+ name).show()
		$('.modal-box').fadeIn(600)
	})
	
	
	
	//关闭规则页
	$(document).on('click','.close-modalBtn',function(){
		$('.inner-box').hide();
		$('.modal-box').fadeOut(600)
	})
	
	//点击发送验证码
	$(document).on('click','.sendCodes',function(){
		var phone= $('#phone').val().replace(/\s+/g,"")
		var telReg = /^1[3456789]\d{9}$/
		if(phone&&telReg.test(phone)){
			countDown(60,phone)
		}else{
			$('#phone').attr('placeholder','手机号有误')
	    	$('#phone').addClass('tipNew')
		}
		
	})
	
	//倒计时60s
	function countDown(time,phone) { //倒计时
		var codeTxt = $('#codeBtn').html().replace(/\s+/g,"")
	    if (codeTxt != '发送验证码')
	    return false;
	    $('#codeBtn').html(time+'s后重新发送')
	    var timers = setInterval(function () {
	      time--
	      $('#codeBtn').html(time+'s后重新发送')
	      if (time == 0) {
	        clearInterval(timers)
	        $('#codeBtn').html('发送验证码')
	      }
	    }, 1000)
	    
	    $.ajax({
	    	type:"POST",
	    	dataType:'json',
	    	url:aipUrl+"/api/user/getSmsVcode.do",
	    	contentType: "application/json;charset=UTF-8",
	    	async:true,
	    	data:JSON.stringify({
		    	phone: phone
		    }),
		    success:function(res){
		    	 if (res.respCode == 0) {
			        showTips('验证码已发送！')
			      } else {
			        showTips( res.respDesc)
			      }
		    },
		    fail:function(res){
		    	showTips('请求失败了呢！')
		    }
	    });
  	}
	
  
  
  
	
})
