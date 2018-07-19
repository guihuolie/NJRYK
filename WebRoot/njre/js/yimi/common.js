function $(s){
	var o = document.getElementById(s);
	if (o!=null)
		return o;
	o = document.getElementsByName(s);
	return o[0];
}
function $$(s){return document.frames?document.frames[s]:$(s).contentWindow;}
function o(s){
	var e = document.getElementById(s);
	if (e!=null)
		return e;
	e = document.getElementsByName(s);
	if (e.length==0)
		return null;
	else
		return e[0];
}
function obj(s) {
	if (o(s)!=null)
		return o(s);
	var objs = document.getElementsByName(s);
	return objs[0];
}
function $c(s){return document.createElement(s);}
function exist(s){return $(s)!=null;}
function dw(s){document.write(s);}
function hide(s){$(s).style.display=$(s).style.display=="none"?"":"none";}
function isNull(_sVal){return (_sVal == "" || _sVal == null || _sVal == "undefined");}

function detectBrowser(){
	var sUA = navigator.userAgent.toLowerCase();
	var sIE = sUA.indexOf("msie");
	var sOpera = sUA.indexOf("opera");
	var sMoz = sUA.indexOf("gecko");
	if (sOpera != -1) return "opera";
	if (sIE != -1){
		nIeVer = parseFloat(sUA.substr(sIE + 5));
		if (nIeVer >= 6) return "ie6";
		else if (nIeVer >= 5.5) return "ie55";
		else if (nIeVer >= 5 ) return "ie5";
	}
	if (sMoz != -1)	return "moz";
	return "other";
}

var isMSIE=!!window.ActiveXObject;

function isIE() {
	// return detectBrowser().indexOf("ie")>-1;
	return isMSIE;
}

// 涓嶅吋瀹笽E11
var IE_VER = (function(){  
    var undef,  
    v = 3,  
    div = document.createElement('div'),  
    all = div.getElementsByTagName('i');  
   
    while (  
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',  
        all[0]  
    );
	    
    return v > 4 ? v : undef;  
}());

// 鍏煎IE11
var _IE = (function(d,w){
return d.querySelector ? d.documentMode : (d.compatMode == "CSS1Compat" ? "XMLHttpRequest" in w ? 7 : 6 : 5);
}(document, this));

// var isIE6=isMSIE&&!window.XMLHttpRequest;
// var isIE8=isMSIE&&!!document.documentMode;
// var isIE7=isMSIE&&!isIE6&&!isIE8;
var isIE6=isMSIE && (IE_VER==6);
var isIE7=isMSIE && (IE_VER==7);
var isIE8=isMSIE && (IE_VER==8);
var isIE9=isMSIE && (IE_VER==9);
var isIE10=isMSIE && (IE_VER==10);
var isIE11 = (_IE==11);

if (isIE11) {
	isMSIE = true;
}

if (document.documentMode == 10)
	isIE10 = true;
	
function getOS(){
   if(isIE())return 1;//IE
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0)return 2;//Firefox
   if(isSafari=navigator.userAgent.indexOf("Chrome")>0)return 3;//Chrome
   if(isSafari=navigator.userAgent.indexOf("Safari")>0)return 4;//Safari
   if(isCamino=navigator.userAgent.indexOf("Camino")>0)return 5;//Camino
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0)return 6;//Gecko
   //other...
   return 0;
}

function getRadioValue(radionname) {
	var radioboxs = document.getElementsByName(radionname);
	if (radioboxs!=null)
	{
		for (i=0; i<radioboxs.length; i++)
		{
			if (radioboxs[i].type=="radio" && radioboxs[i].checked)
			{ 
				return radioboxs[i].value;
			}
		}
		return radioboxs.value
	}
	return "";
}

function setRadioValue(myitem, v)
{
     var radioboxs = document.getElementsByName(myitem);
     if (radioboxs!=null)
     {
       for (i=0; i<radioboxs.length; i++)
          {
            if (radioboxs[i].type=="radio")
              {
                 if (radioboxs[i].value==v)
				 	radioboxs[i].checked = true;
              }
          }
     }
}

function getCheckboxValue(checkboxname){
	var checkboxboxs = document.getElementsByName(checkboxname);
	var CheckboxValue = '';
	if (checkboxboxs!=null)
	{
		// 濡傛灉鍙湁涓€涓厓绱�
		if (checkboxboxs.length==null) {
			if (checkboxboxs.checked) {
				return checkboxboxs.value;
			}
		}
		for (i=0; i<checkboxboxs.length; i++)
		{
			if (checkboxboxs[i].type=="checkbox" && checkboxboxs[i].checked)
			{
				if (CheckboxValue==''){
					CheckboxValue += checkboxboxs[i].value;
				}
				else{
					CheckboxValue += ","+ checkboxboxs[i].value;
				}
			}
		}
	}
	return CheckboxValue;
}

function setCheckboxChecked(checkboxname, v) {
	var checkboxboxs = document.getElementsByName(checkboxname);
	if (checkboxboxs!=null)
	{
		// 濡傛灉鍙湁涓€涓厓绱�
		if (checkboxboxs.length==null) {
			if (checkboxboxs.value == v) {
				checkboxboxs.checked = true;
			}
		}
		for (i=0; i<checkboxboxs.length; i++)
		{
			if (checkboxboxs[i].type=="checkbox" && checkboxboxs[i].value == v)
			{
				checkboxboxs[i].checked = true;
			}
		}
	}
}

/*缃涓猚heckbox锛屽弬鏁皏濡傛灉鏈夊涓€硷紝鍒欓€氳繃,鍙峰垎闅�*/
function setMultiCheckboxChecked(checkboxname, v) {
	var checkboxboxs = document.getElementsByName(checkboxname);
	if (checkboxboxs!=null)
	{
		// 濡傛灉鍙湁涓€涓厓绱�
		if (checkboxboxs.length==null) {
			if (checkboxboxs.value == v) {
				checkboxboxs.checked = true;
			}
		}
		var ary = v.split(",");
		for (i=0; i<checkboxboxs.length; i++)
		{
			if (checkboxboxs[i].type=="checkbox")
			{
				for (j=0; j<ary.length; j++) {
					if (checkboxboxs[i].value == ary[j]) {
						checkboxboxs[i].checked = true;
					}
				}
			}
		}
	}
}

function isNumeric(str) {
	if (str==null || str=="")
		return false;
	return !isNaN(str);
}

function isNotCn(str) {
	if (/[^\x00-\xff]/g.test(str))
		return false;
	else
		return true;
}

String.prototype.trim= function() {  
    return this.replace(/(^\s*)|(\s*$)/g, "");  
}

String.prototype.replaceAll = function(s1, s2){   
	return this.replace(new RegExp(s1,"gm"), s2);   
} 

var cwAjax = {xmlhttp:function(){ 
		try{ 
			return new ActiveXObject('Msxml2.XMLHTTP'); 
		}catch(e){ 
			try{ 
				return new ActiveXObject('Microsoft.XMLHTTP'); 
			}catch(e){ 
				return new XMLHttpRequest(); 
			} 
		} 
	} 
}; 

cwAjax.Request = function(){ 
	if (arguments.length<2) return; 
	var _p = {asynchronous:true,method:"GET",parameters:""}; 
	for (var key in arguments[1]){
		_p[key] = arguments[1][key]; 
	} 
	var _x = cwAjax.xmlhttp();
	var _url = arguments[0];
	if(_p["parameters"].length>0) _p["parameters"] += '&_='; 
	if(_p["method"].toUpperCase()=="GET")_url += (_url.match(/\?/) ? '&' : '?') + _p["parameters"]; 
	_x.open(_p["method"],_url,_p["asynchronous"]); 
	_x.onreadystatechange = function(){ 
	if (_x.readyState==4){ 
	if(_x.status==200){ 
		_p["onComplete"]?_p["onComplete"](_x):""; 
	}else{ 
		_p["onError"]?_p["onError"](_x):""; 
	} 
	} 
	} 
	if(_p["method"].toUpperCase()=="POST")_x.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	_x.send(_p["method"].toUpperCase()=="POST" ? _p["parameters"] : null); 
}

function openWin(url,width,height, scrollbars) {
	if (width>window.screen.width)
		width = window.screen.width;
	if (height>window.screen.height)
		height = window.screen.height;
 	var l = (window.screen.width - width) / 2; 
	var t = (window.screen.height - height) / 2;
	/*
	var scroll = "no";
	if (scrollbars || scrollbars=="yes")
		scroll = "yes";
	*/
	// var newwin=window.open(url,"_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=" + scroll + ",resizable=no,top=" + t + ",left=" + l + ",width="+width+",height="+height);
	var newwin=window.open(url,"_blank","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,top=" + t + ",left=" + l + ",width="+width+",height="+height);
	return newwin;
}

function get_cookie(Name) {
	var search = Name + "="
	var returnvalue = "";
	// console.log(document.cookie);
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search)
		// if cookie exists
		if (offset != -1) { 
			offset += search.length
			// set index of beginning of value
			end = document.cookie.indexOf(";", offset);
			// set index of end of cookie value
			if (end == -1) end = document.cookie.length;
			returnvalue=unescape(document.cookie.substring(offset, end))
		}
	}
	return returnvalue;
}

function set_cookie( name, value, expires, path, domain, secure ){
	var today = new Date();
	today.setTime( today.getTime() );
	if (expires){
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires));
	document.cookie = name + "=" +escape( value ) +
	((expires)?";expires=" + expires_date.toGMTString():"")+
	((path)?";path=" + path:"" ) + 
	((domain)?";domain="+domain:"" ) +
	((secure)?";secure":"" );
}

function selAllCheckBox(checkboxname){
	var checkboxboxs = document.getElementsByName(checkboxname);
	if (checkboxboxs!=null)
	{
		// 濡傛灉鍙湁涓€涓厓绱�
		if (checkboxboxs.length==null) {
			checkboxboxs.checked = true;
		}
		for (i=0; i<checkboxboxs.length; i++)
		{
			checkboxboxs[i].checked = true;
		}
	}
}

function deSelAllCheckBox(checkboxname) {
  var checkboxboxs = document.getElementsByName(checkboxname);
  if (checkboxboxs!=null)
  {
	  if (checkboxboxs.length==null) {
	  checkboxboxs.checked = false;
	  }
	  for (i=0; i<checkboxboxs.length; i++)
	  {
		  checkboxboxs[i].checked = false;
	  }
  }
}

function cwAddLoadEvent(func) {
	if (isIE()){
	window.attachEvent('onload',func)//瀵逛簬IE
	}
	else{
	window.addEventListener('load', func,false);//瀵逛簬FireFox
	}
}

function isApple() {
	return navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i) != null; //boolean check for popular mobile browsers
}

var winCount = new Date().getTime();
function addTab(title, url) {
	if (window.top.mainFrame)
		window.top.mainFrame.addTab(title, url);
	else {
		if (window.top.myDesktop) {
			var data={
				'iconSrc':'desktop/icon/default.png',
				'windowsId':'tempWin' + winCount,
				'windowTitle':title,
				'iframSrc':url,
				// 'windowWidth':800,
				// 'windowHeight':600,
				'parentPanel':"div.currDesktop",
				'isWidget':false
				}

			window.top.myDesktop.myWindow.init(data);

			//娣诲姞鍒扮姸鎬佹爮
			if(!o("taskTab_"+data.windowsId) || !$("#taskTab_"+data.windowsId).size()){
				window.top.myDesktop.taskBar.addTask(data.windowsId,data.windowTitle,data.iconSrc);
			}

			winCount ++;
		}
		else {
			// window.location.href = url;
			openWin(url, 800, 600);
		}
		/*
		if (parent && !parent.myDesktop) {
			window.location.href = url;
		}
		else {
			var data={
				'iconSrc':'desktop/icon/default.png',
				'windowsId':'tempWin' + winCount,
				'windowTitle':title,
				'iframSrc':url,
				// 'windowWidth':800,
				// 'windowHeight':600,
				'parentPanel':"div.currDesktop",
				'isWidget':false
				}

			window.top.myDesktop.myWindow.init(data);

			//娣诲姞鍒扮姸鎬佹爮
			if(!o("taskTab_"+data.windowsId) || !$("#taskTab_"+data.windowsId).size()){
				parent.myDesktop.taskBar.addTask(data.windowsId,data.windowTitle,data.iconSrc);
			}

			winCount ++;
		}
		*/
	}
}

function setActiveTabTitle(title) {
	if (window.top.mainFrame)
		window.top.mainFrame.setActiveTabTitle(title);
}