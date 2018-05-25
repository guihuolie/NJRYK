var PsnIdTypesAllMap = {'I':'身份证','O':'其他(个人)','P':'护照','S':'军人证','R':'在华居住证'};
var PsnIdTypesMap = {'I':'身份证'};
var PsnIdTypesMap2 = {'P':'护照'};
var RelsMap = {'O':'其它','F':'朋友','M':'本人','S':'配偶','P':'父母','C':'子女','B':'雇主','E':'雇员','A':'祖父母','G':'孙子女','R':'亲属','K':'监护人','L':'被监护人','X':'未知'};
var GrpIdTypesMap = {'G':'组织机构代码证',  'B':'工商登记证','T':'税务登记证','S':'办学许可证','O':'其它'};

var pathPrefix = '';
if(location.href.indexOf('/yunweb')> -1){
    pathPrefix = '/yunweb';
}
function parseObjToSelectArray(obj){
	var array = [];
	for (var prop in obj) {
		array.push({
			value:prop,
			text:obj[prop]
		});
	}
	return array;
}

function getGenderFromID(id){
	var gender;
	if(id.length==18){
		gender = parseInt(id.substring(16,17));
	}else{
		gender = parseInt(id.substring(14,15));
	}
    if(gender%2 ==1){
        return "M";
    }else{
        return "F";
    }
}

function  getBirthdateFromID (id){
	var birthdate;
	if(id.length==18){
		birthdate = moment(parseInt(id.substring(6,10))+"-"+(id.substring(10,12))+"-"+(id.substring(12,14)) ).format("YYYY-MM-DD");
	}else{
		birthdate = moment( "19"+parseInt(id.substring(6,8))+"-"+(id.substring(8,10))+"-"+(id.substring(10,12)) ).format("YYYY-MM-DD");
	}
   
    return birthdate;
}

function  getAgeFromID (id){
    var birthdate;
	if(id.length==18){
		birthdate = moment(parseInt(id.substring(6,10))+"-"+(id.substring(10,12))+"-"+(id.substring(12,14)) ).format("YYYY-MM-DD");
	}else{
		birthdate = moment( "19"+parseInt(id.substring(6,8))+"-"+(id.substring(8,10))+"-"+(id.substring(10,12)) ).format("YYYY-MM-DD");
	}
    return moment().diff(moment(birthdate),'years');
}

function getAgeFromBirthDate (birthdate){
    var temage = moment(birthdate);
    if(temage.isValid()){
        return moment().diff(temage,'years');
    }else{
        return 0;
    }
}


function shareQrCode(shareurl){
	// var urlstr = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx03f3fb41ee248c92&redirect_uri=http%3A%2F%2Fjstby.e-chinalife.com%2F"
 //                            + "&response_type=code&scope=snsapi_base&state=&connect_redirect=1#wechat_redirect"; 
     var urlstr= shareurl;   //'http://jstby.e-chinalife.com/WxQCCocdePay.do?wxsrc=weixin://wxpay/bizpayurl?pr=Nv8Hozz'      
    var description ="中国人寿江苏省分公司订单支付";
    var imgUrl="https://cdn.jsclyun.net/wxreport/app/img/applogo.png";
    if(systype){
        //type 1 转发，0分享到朋友圈
        window.webkit.messageHandlers.generalView.postMessage({body: 'wxShare',text:'-1',url:urlstr,type:'1',title:'中国人寿江苏省分公司订单支付',description:description,imgUrl:imgUrl});
    }else{
        //type 1 转发，0分享到朋友圈
        window.goUrl.WxShare('-1',urlstr,'1','中国人寿江苏省分公司订单支付',description,imgUrl);
    } 
}

function shareQrCodeSub(shareurl){
	// var urlstr = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx03f3fb41ee248c92&redirect_uri=http%3A%2F%2Fjstby.e-chinalife.com%2F"
 //                            + "&response_type=code&scope=snsapi_base&state=&connect_redirect=1#wechat_redirect"; 
     var urlstr= shareurl;   //'http://jstby.e-chinalife.com/WxQCCocdePay.do?wxsrc=weixin://wxpay/bizpayurl?pr=Nv8Hozz'      
    var description ="中国人寿江苏省分公司订单支付";
    var imgUrl="https://cdn.jsclyun.net/wxreport/app/img/applogo.png";
    if(systype){
        //type 1 转发，0分享到朋友圈
        window.webkit.messageHandlers.generalView1.postMessage({body: 'wxShare',text:'-1',url:urlstr,type:'1',title:'中国人寿江苏省分公司订单支付',description:description,imgUrl:imgUrl});
    }else{
        //type 1 转发，0分享到朋友圈
        window.goUrl2.WxShare('-1',urlstr,'1','中国人寿江苏省分公司订单支付',description,imgUrl);
    } 
}

function generateDownloadParam (applno, type){
    applno =  applno.split("").reverse().join("");
    var temp = type+"-"+util.encodeBase64(applno);
    param = util.encodeBase64(temp);
    return param;
}