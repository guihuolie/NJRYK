//获取中文性别
function getChineseSex(sexCode) {
	if (sexCode == "M")
		return "男";
	if (sexCode == "F")
		return "女";
	return "未知";
}
//初始化mobile日期控件
function initMobileDate() {
	var opt = {
		preset : 'date', //日期
		theme : 'jqm', //皮肤样式
		//minDate : new Date(2010, 1, 1),
		//maxDate : new Date(2015, 1, 28),
		display : 'modal', //显示方式 
		mode : 'scroller', //日期选择模式
		dateFormat : 'yyyy-mm-dd', // 日期格式
		setText : '确定', //确认按钮名称
		cancelText : '取消',//取消按钮名籍我
		dateOrder : 'yymmdd', //面板中日期排列格式
		dayText : '日',
		monthText : '月',
		yearText : '年'
	};
	$('input:jqmData(role="datebox")').mobiscroll(opt);
}

// 获取当前日期yyyy-MM-dd
function getCurrentDate() {
	var date = new Date();
	var str = date.getFullYear()
			+ "-"
			+ ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
					+ (date.getMonth() + 1)) + "-"
			+ (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());
	return str;
}

// 获取当前日期yyyy-MM
function getCurrentDate2() {
	var date = new Date();
	var str = date.getFullYear()
			+ "-"
			+ ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
					+ (date.getMonth() + 1));
	return str;
}

//获取当月日期1号
function getFirstOfCurrentMonth() {
	var date = new Date();
	var str = date.getFullYear()
			+ "-"
			+ ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
					+ (date.getMonth() + 1)) + "-"
			+ "01";
	return str;
}

//获取去年1月1日
function getFirstOfLastYear() {
	var date = new Date();
	var str = (date.getFullYear() -1)
			+ "-01-01";
	return str;
}

//获取去年今天
function getTodayOfLastYear() {
	var date = new Date();
	var str = (date.getFullYear() -1)
			+ "-"
			+ ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
				+ (date.getMonth() + 1)) + "-"
			+ (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());
	return str;
}

//获取去年今天后60天
function getTodayOfLastYearSixty() {
	var date = new Date();
	date.setDate(date.getDate() + 60);
	var str = (date.getFullYear() -1)
			+ "-"
			+ ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
				+ (date.getMonth() + 1)) + "-"
			+ (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());
	return str;
}

//yyyyMMdd转化成yyyy-MM-dd
function transDate(str) {
	var s="";
	if(str.length!=8){
		return undefined;
	}else{
		for(var i=0;i<str.length;i++){
			s += String(str).charAt(i);
			if(i==3||i==5){
				s +='-';
			}
		}
		return s;
	}
}

//把日期转化yyyy-MM-dd
function getFormateDate(date) {
	var str = date.getFullYear()
			+ "-"
			+ ((date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0"
					+ (date.getMonth() + 1)) + "-"
			+ (date.getDate() > 9 ? date.getDate() : "0" + date.getDate());
	return str;
}

// 简单校验身份证号
function idnoCheck(idno) {
	var patrn = /^[1-9]{1}[0-9]{16}([0-9]|[x]|[X]{1})/;
	if (!idno || idno == "")
		return false;
	if (!patrn.exec(idno))
		return false;
	return true;
}

// 简单校验手机号码
function mobileCheck(mob) {
	if(mob.length!=11)
		return false;
	var patrn = /^1[0-9]{10}/;
	if (!mob || mob == "")
		return false;
	if (!patrn.exec(mob))
		return false;
	return true;
}

// 如果是空值返回 "无"
function getNullValue(val) {
	if (!val || "" == val || $.trim(val) == "" || null == val || "null" == val
			|| "!" == val || "-" == $.trim(val))
		return "无";
	return val;
}

//是否为空
function isEmpty(val) {
	if (!val || val == null || val == ""
		|| val == "undefined"|| "" == $.trim(val))
		return true;
	return false;
}

// 比较开始时间与结束时间yyyy-MM或yyyy-MM-dd
function compareDate(startDate, endDate) {
	var array1 = String(startDate).split("-", startDate.length);
	var array2 = String(endDate).split("-", endDate.length);
	//alert(array2);
	for (var i = 0; i < array1.length; i++) {
		var val1 = parseInt(array1[i]);
		var val2 = parseInt(array2[i]);
		if(i==2){
			//alert(val1);
			//alert(val2);
		}
		
		if (val1 > val2)
			return -1;
		if (val1 == val2) {
			if (i == array1.length - 1) {
				return 0;
			}
			continue;
		}
		if (val1 < val2)
			return 1;
	}
	return 1;
}
//比较开始时间与结束时间yyyy-MM-dd
function compareDate2(startDate, endDate) {
	var array1 = String(startDate).split("-", startDate.length);
	var array2 = String(endDate).split("-", endDate.length);
	var date1=new Date(array1[0],array1[1],array1[2]);
	var date2=new Date(array2[0],array2[1],array2[2]);
	var space = date1.getTime()-date2.getTime();
	if(space>0){
		return -1;
	}
	if(space<0){
		return 1;
	}
	return 0;
}

// 两个字符串日期间隔天数yyyy-MM或yyyy-MM-dd
function spaceDays(str1, str2) {
	var d1 = Date.parse(str1);
	var d2 = Date.parse(str2);
	return (d2 - d1) / (1000 * 60 * 60 * 24);
}

function urlEncode(str) {
	str = (str + '').toString();
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27')
			.replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A')
			.replace(/%20/g, '+');
}

// 批量隐藏功能按钮接口
function hideWxMenuItems() {
	wx.hideMenuItems({
		menuList : [ "menuItem:share:appMessage", "menuItem:share:qq",
				"menuItem:share:weiboApp", "menuItem:share:facebook",
				"menuItem:copyUrl", "menuItem:openWithSafari",
				"menuItem:openWithQQBrowser", "menuItem:share:email" ]
	// 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
	});
}

function checkWXBrowser() {
	// 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
	var useragent = navigator.userAgent;
	if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
		// 这里警告框会阻塞当前页面继续加载
		// 以下代码是用javascript强行关闭当前页面
		/*
		 * var opened = window.open('about:blank', '_self'); opened.opener =
		 * null; opened.close();
		 */
		// var msg="对不起！只能在微信中打开。";
		var msg = encodeURI(encodeURI("对不起！只能在微信中打开。"));
		location.href = "error.html?msg=" + msg;
	}
}
function checkWXBrowser2() {
	// 对浏览器的UserAgent进行正则匹配，不含有微信独有标识的则为其他浏览器
	var useragent = navigator.userAgent;
	if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
		// 这里警告框会阻塞当前页面继续加载
		// 以下代码是用javascript强行关闭当前页面
		/*
		 * var opened = window.open('about:blank', '_self'); opened.opener =
		 * null; opened.close();
		 */
		// var msg="对不起！只能在微信中打开。";
		var msg = encodeURI(encodeURI("对不起！只能在微信中打开。"));
		location.href = "../sale/error.html?msg=" + msg;
	}
}

var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1,
		63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1,
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
		20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31,
		32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
		50, 51, -1, -1, -1, -1, -1);
function base64encode(str) {
	var out, i, len;
	var c1, c2, c3;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		c1 = str.charCodeAt(i++) & 0xff;
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt((c1 & 0x3) << 4);
			out += "==";
			break;
		}
		c2 = str.charCodeAt(i++);
		if (i == len) {
			out += base64EncodeChars.charAt(c1 >> 2);
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4)
					| ((c2 & 0xF0) >> 4));
			out += base64EncodeChars.charAt((c2 & 0xF) << 2);
			out += "=";
			break;
		}
		c3 = str.charCodeAt(i++);
		out += base64EncodeChars.charAt(c1 >> 2);
		out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
		out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
		out += base64EncodeChars.charAt(c3 & 0x3F);
	}
	return out;
}
function base64decode(str) {
	var c1, c2, c3, c4;
	var i, len, out;
	len = str.length;
	i = 0;
	out = "";
	while (i < len) {
		/* c1 */
		do {
			c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c1 == -1);
		if (c1 == -1)
			break;
		/* c2 */
		do {
			c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
		} while (i < len && c2 == -1);
		if (c2 == -1)
			break;
		out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
		/* c3 */
		do {
			c3 = str.charCodeAt(i++) & 0xff;
			if (c3 == 61)
				return out;
			c3 = base64DecodeChars[c3];
		} while (i < len && c3 == -1);
		if (c3 == -1)
			break;
		out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
		/* c4 */
		do {
			c4 = str.charCodeAt(i++) & 0xff;
			if (c4 == 61)
				return out;
			c4 = base64DecodeChars[c4];
		} while (i < len && c4 == -1);
		if (c4 == -1)
			break;
		out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
	}
	return out;
}
function utf16to8(str) {
	var out, i, len, c;
	out = "";
	len = str.length;
	for (i = 0; i < len; i++) {
		c = str.charCodeAt(i);
		if ((c >= 0x0001) && (c <= 0x007F)) {
			out += str.charAt(i);
		} else if (c > 0x07FF) {
			out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
			out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		} else {
			out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
			out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
		}
	}
	return out;
}
function utf8to16(str) {
	var out, i, len, c;
	var char2, char3;
	out = "";
	len = str.length;
	i = 0;
	while (i < len) {
		c = str.charCodeAt(i++);
		switch (c >> 4) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
			// 0xxxxxxx
			out += str.charAt(i - 1);
			break;
		case 12:
		case 13:
			// 110x xxxx 10xx xxxx
			char2 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
			break;
		case 14:
			// 1110 xxxx 10xx xxxx 10xx xxxx
			char2 = str.charCodeAt(i++);
			char3 = str.charCodeAt(i++);
			out += String.fromCharCode(((c & 0x0F) << 12)
					| ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
			break;
		}
	}
	return out;
}
function encodeBase64(str){
	return base64encode(utf16to8(str));
}
function decodeBase64(str){
	return utf8to16(base64decode(str));
}
function xmlToJson(xml) {
    
    // Create the return object
    var obj = {};
 
    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }
 
    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].length) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
};
function create_doc(text){
	var xmlDoc = null;
	try //Internet Explorer
	{
	  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	  xmlDoc.async="false";
	  xmlDoc.loadXML(text);
	}
	catch(e)
	{
	  try //Firefox, Mozilla, Opera, etc.

	    {
	    parser=new DOMParser();
	    xmlDoc=parser.parseFromString(text,"text/xml");

	    }
	  catch(e) {}

	}
	return xmlDoc;
}
function canVisit(menuId){
	if (!pid) {
		location.href = "../nopermit.html";
	}else{
		var jsonvar = {};
		jsonvar.menuId = menuId;
		jsonvar.pid = pid;
		var data = getDecodedJson2("org.marker.weixin.servletJson.WxGuidJson","canVisit",
				JSON.stringify(jsonvar));
		if(data.url){
			location.href = data.url;
		}
		if(!data.flag){
			location.href = "../nopermit.html";
		}
	}
}
var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子 
var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X 
function IdCardValidate(idCard) { 
	idCard = trim(idCard.replace(/ /g, "")); 
	// if (idCard.length == 15) { 
	// 	return isValidityBrithBy15IdCard(idCard); 
	// } else
	 if (idCard.length == 18) { 
		var a_idCard = idCard.split("");// 得到身份证数组 
		if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){ 
			return true; 
		}else { 
			return false; 
		} 
	} else { 
		return false; 
	}
} 
/**  
 * 验证15位数身份证号码中的生日是否是有效生日  
 * @param idCard15 15位书身份证字符串  
 * @return  
 */  
function isValidityBrithBy15IdCard(idCard15){   
    var year =  idCard15.substring(6,8);   
    var month = idCard15.substring(8,10);   
    var day = idCard15.substring(10,12);   
    var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day));   
    // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
    if(temp_date.getYear()!=parseFloat(year)   
            ||temp_date.getMonth()!=parseFloat(month)-1   
            ||temp_date.getDate()!=parseFloat(day)){   
              return false;   
      }else{   
          return true;   
      }   
}   
/** 
* 验证18位数身份证号码中的生日是否是有效生日 
* @param idCard 18位书身份证字符串 
* @return 
*/ 
function isValidityBrithBy18IdCard(idCard18){ 
	var year = idCard18.substring(6,10); 
	var month = idCard18.substring(10,12); 
	var day = idCard18.substring(12,14); 
	//var temp_date = new Date(year,parseFloat(month)-1,parseFloat(day)); //通过此方式获取日期，部分Android手机存在校验bug，例如：1987-04-12
	var temp_date = new Date();
	temp_date.setFullYear(year,parseFloat(month)-1,parseFloat(day));
	// 这里用getFullYear()获取年份，避免千年虫问题 
	if(temp_date.getFullYear()!=parseFloat(year) 
			||temp_date.getMonth()!=parseFloat(month)-1 
			||temp_date.getDate()!=parseFloat(day)){ 
		return false; 
	}else{ 
		return true; 
	} 
} 

/** 
* 判断身份证号码为18位时最后的验证位是否正确 
* @param a_idCard 身份证号码数组 
* @return 
*/ 
function isTrueValidateCodeBy18IdCard(a_idCard) { 
	var sum = 0; // 声明加权求和变量 
	if (a_idCard[17].toLowerCase() == 'x') { 
		a_idCard[17] = 10;// 将最后位为x的验证码替换为10方便后续操作 
	} 
	for ( var i = 0; i < 17; i++) { 
		sum += Wi[i] * a_idCard[i];// 加权求和 
	} 
	valCodePosition = sum % 11;// 得到验证码所位置 
	if (a_idCard[17] == ValideCode[valCodePosition]) { 
		return true; 
	} else { 
		return false; 
	} 
} 

//去掉字符串头尾空格 
function trim(str) { 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
} 

function setMyCookie(name,value){
    var exp = new Date();
    //exp.setTime(exp.getTime() + Days*24*60*60*1000);
    //exp.setTime(exp.getTime() +60000);
    exp.setTime(exp.getTime() +30*60000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
}

//读取cookies
function getMyCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return (arr[2]);
    else
    	//window.location.href = "../nopermit.html";
        return null;
}

/**
 * 获取浏览器类别
 */
function getUserAgent() {
	var userAgent = navigator.userAgent;
	if(userAgent.match(/MicroMessenger/i) == 'MicroMessenger') {
		userAgent = "wx";
		return userAgent;
	}
	if(userAgent.match(/YunZhuLi/i) == 'YunZhuLi') {
		userAgent = "yzl";
		return userAgent;
	}
	if(userAgent.match(/Mobile Safari/i) == 'Mobile Safari') {
		userAgent = "app";
		return userAgent;
	}
	return "app";
}
//判断是否手机端访问
function isIOS(){
  var userAgentInfo = navigator.userAgent.toLowerCase();
 /* var Agents = ["android", "iphone",
              "symbianos", "windows phone",
              "ipad", "ipod"];*/
  var Agents = ["iphone",
                "ipad", "ipod"];
  //var ly=document.referrer;  //返回导航到当前网页的超链接所在网页的URL

  for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) >= 0) {
          //this.location.href='http://m.***.com';  //wap端地址
    	  return true;
      }
  }
  return false;
}