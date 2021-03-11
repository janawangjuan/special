//js日历
(function(){
var calendar = function(calendarId,Examdata){
    //日历对象不存在，返回日历
    if(!(this instanceof calendar)){
        return new calendar();
    }
    //获取当前日历对象
    var c =this;
    //获取引用日历的节点id，这是外面提供的要放哪里的id
    var calendarId = document.getElementById(calendarId);
    //动态加载样式
    function loadStyles(str){
        loadStyles.mark = 'load';
        var style = document.createElement("style");
        style.type = "text/css";
        try{
            style.innerHTML = str;
        }catch(ex){
            style.styleSheet.cssText = str;
        }
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(style); 
    }
    //生成节点的函数
    c.buildPart = function(json){
        var oPart = document.createElement(json.node);
        if(json.id){oPart.setAttribute('id',json.id);}
        if(json.className){oPart.className = json.className;}
        if(json.innerHTML){oPart.innerHTML = json.innerHTML;}
        if(json.href){oPart.setAttribute('href',json.href);}
        if(json.src){oPart.setAttribute('src',json.src);}
        if(json.appendToBox){
          json.appendToBox.appendChild(oPart);
        }
        return oPart;
    }
    //全局初始化日期表格tr字符串
    var CalendarTr;
    //获取当前的日期，为的是高亮显示当前的日期
    var today = new Date().getDate();
    var thisyear =  new Date().getFullYear();
    var thismonth =  new Date().getMonth()+1;
    
    //是否为考试日期
   	c.isExamDay = function(year,month,day,ExamArr){
   		month = month < 10 ? '0' + month:month
   		var isExamDay = false
   		for(var i=0;i<ExamArr.length;i++){
   			var ExamYear = ExamArr[i].split('-')[0]
    		var ExamMonth = ExamArr[i].split('-')[1]
    		var ExamDay = ExamArr[i].split('-')[2]
    		if(year==ExamYear&&month==ExamMonth&&day==ExamDay){
    			isExamDay = true
    			break;
    		}
    	}
   		return isExamDay;
    }
    
    
    
    //生成日历的函数
    c.getcalendar = function(year,month){
      var last = new Date(year,month-1,0);//获取上个月份的时间对象
      var lastdate = last.getDate();//获取上个月的最大日期
      var lastday = last.getDay();//获取上个月最大日期的星期几
      var months = new Date(year,month,0);
      var Maxdate = months.getDate();//获取这个月最大的日期
      //星期表头
      var str = '<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>';
      //获取上个月在这个月份中存在的最后日期
      var remainlastdate = lastdate - lastday;
      var t = 1;
      //日历的日期
      str += '<tr>';
       
      for(var g=0;g<=6;g++){
      //星期是从0开始到6结束的，小于等于上个月最大星期的日期则是上个月的日期
          if(g <= lastday){
            str +='<td class="Tr">  </td>';
          }else{
            //高亮显示当前日期
            //thisyear == year && thismonth == month && today == t
            //c.isExamDay(year,month,today,Examdata)
            
         
            if(c.isExamDay(year,month,t,Examdata)){  	
              str +='<td class="activeTd"><span>'+ t++ +'</span></td>';
              //假如不是当前月份则默认1为高亮日期
            }else{
              //该月份的普通日期
                  str +='<td class="blueTr">'+ t++ +'</td>';
              }
          }
      }
        str += '</tr>';
        //除去上面的部分，这个月从哪里开始
        var remainlastday = 6 - lastday + 1;
        var nextMonthday = 1;//下一个月份的开始日期
        //这里i最大值为5是为了兼容所有的月份，有的月份可能跨越6个tr
        for(var i=1;i<=5;i++){
          str += '<tr>';
          for(var j=0;j<7;j++){
            if(remainlastday <= Maxdate){
            	
              if(c.isExamDay(year,month,remainlastday,Examdata)){
                str +='<td class="activeTd"><span>'+ remainlastday++ +'</span></td>';
               }else{
                  str +='<td class="blueTr">'+ remainlastday++ +'</td>';
                }
            }else{
                //str +='<td class="Tr">'+ nextMonthday++ +'</td>';
                str +='<td class="Tr"> </td>';
            }
          }
          str += '</tr>';
        }
       return str;
    }
    //初始化内部构造函数
    c.init = function(){
        //生成日历的表格tr
        CalendarTr = c.getcalendar(thisyear,thismonth);
        if(loadStyles.mark != 'load'){
        loadStyles(".calendarDiv {width:361px;text-align:center;}\
            .Table{width:100%; margin: 0.2rem 0px;font-size: 0.26rem;}\
            .Table th{color: #999999; font-size: 0.26rem;}\
            .Table tr{height: 0.6rem;}\
            .box{width:100%;text-align:center;padding: 0.2rem 0.3rem; color:#4e4e4d;font-size:0.28rem;}\
            .box-dec{margin-top:0.04rem;transform:rotate(180deg);float:left; width:0.18rem;}\
            .box-add{margin-top:0.04rem; float:right;width:0.18rem;}\
            .Tr{text-align:center;}\
            .activeTd {position:relative;}\
            .activeTd span{text-align: center; background-color: #6ba1fc;box-shadow: 0px 0px 0.07rem #6ba1fc;   color: #fff; border-radius: 30px; width: 0.5rem; position: absolute; height: 0.5rem; left: 50%; line-height: 0.5rem; top: 50%; transform: translate(-50%, -50%);}\
            .blueTr{color:#4e4e4d;text-align:center;};");
        }
        //生成整个日历的div，包括年月份的div和日历表格都放在这个div里面
        c.buildPart({
            node : 'div',
            id : 'calendarDiv',
            className : 'calendar',
            appendToBox : calendarId//整个日历添加到提供进来的要放日历的id里面
        });
        //生成存储日历的年月份的div
        c.buildPart({
            node : 'div',
            id : 'headId',
            className : 'box',
            appendToBox : calendarDiv
        });
        //生成存储减少月份的span
        c.buildPart({
            node : 'img',
            id : 'dec',
            className : 'box-dec',
          	src: 'image/arrors.png',
            appendToBox : headId
        });
        //生成存储年份的span
        c.buildPart({
            node : 'span',
            id : 'Year',
            innerHTML : thisyear + '年',
            appendToBox : headId
        });
        //生成存储月份的span
        c.buildPart({
            node : 'span',
            id : 'Month',
            innerHTML : thismonth < 10 ? '0'+ thismonth + '月' : thismonth + '月',
            appendToBox : headId
        });
        //生成存储增加月份的div
        c.buildPart({
            node : 'img',
            id : 'add',
            className : 'box-add',
            src:'image/arrors.png',
            appendToBox : headId
        });
        //生成存储日历的table
        c.buildPart({
            node : 'table',
            id : 'calendarTable',
            className : 'Table',
            innerHTML : CalendarTr,
            appendToBox : calendarDiv
        });
    }
    //内部初始化日历生成
    c.init();
    //日历的事件部分
    (function(){
        var dec = document.getElementById('dec');
        var add = document.getElementById('add');
        var Month = document.getElementById('Month');
        var Year = document.getElementById('Year');
        var Tr = document.getElementById('calendarTable');
        month = parseInt(Month.innerHTML);
        year = parseInt(Year.innerHTML);
        //设置月份减少的点击事件
        dec.onclick = function(e){
            e = e || event;
            var target = e.target || e.srcElement;
            if(target.id == 'dec'){
                if(month>1 || month== 12){
                    Month.innerHTML = --month < 10 ? '0' + month+ '月': month+ '月';
                    CalendarTr = c.getcalendar(year,month);
                    Tr.innerHTML = '';
                    Tr.innerHTML = CalendarTr;
                }else{
                    Year.innerHTML  = --year <=1970 ? 1970 + '年' : year + '年';
                    Month.innerHTML = year < 1970 && month < 2 ? '01月': 12 + '月';
                    //小于1970的时间显示为1970的时间
                    if(year < 1970 && month < 2){
                        year = 1970,month=1;
                        CalendarTr = c.getcalendar(year,month);
                        Tr.innerHTML = '';
                        Tr.innerHTML = CalendarTr;
                    }else{
                        month = 12;
                        CalendarTr = c.getcalendar(year,month);
                        Tr.innerHTML = '';
                        Tr.innerHTML = CalendarTr;
                    }
                    
                }
            }
        }
        //设置月份增加的点击事件
        add.onclick = function(e){
            e = e || event;
            var target = e.target || e.srcElement;
            if(target.id == 'add'){
                if(month>0 && month<12){
                    Month.innerHTML = ++month < 10 ? '0' + month+ '月': month+ '月';
                    CalendarTr = c.getcalendar(year,month);
                    Tr.innerHTML = '';
                    Tr.innerHTML = CalendarTr;
                }else{
                    Year.innerHTML  = ++year + '年';
                    Month.innerHTML = '0'+1 + '月';
                    month = 1;
                    CalendarTr = c.getcalendar(year,month);
                    Tr.innerHTML = '';
                    Tr.innerHTML = CalendarTr;
                }
            }
        }    
    })();
}
window.calendar = calendar;
})();