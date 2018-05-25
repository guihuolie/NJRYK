
var NameArray=[];
var zerenArray=[];
var json_array=[];
//var pro_json={"totalCount":2,"rows":[{product_id:3,product_name:'产品1'},{product_id:2,product_name:'产品2'}]};


var app = new Vue({
    el:"#app",
    data:function (){
        return {
//        	 salescode:'',
//        	 salesname:'',
//        	 ipsns:[{
//                 ipsn_name: '',
//                 ipsn_id_type: 'I',
//                 ipsn_id_no: '',
//                 ipsn_gender: '',
//                 ipsn_mobile: '',
//                 ipsn_birth_date: '',
//                 ipsn_rel: ''
//             }]
        }
    },
    watch:{

    	
    	
    },
    mounted: function (){
        Mobilebone.init();
    },
    methods: {
    	submitStep1: function (){
    		
    		var json = {};
    		json.pams_json = "d0fb935839bb9d46f077ab170a2ee23c";
    		json.tx_name=encodeBase64($("#tx_name").val());
    		json.tx_de=encodeBase64($("#tx_de").val());
    		json.tx_s = encodeBase64($("#tx_s").val());
    		var data;
    		$.ajax({
    			type : "GET",
    			url : "../../servlet/LoginServlet",
    			data : json,
    			async : false,
    			success : function(rtData) {
    				data = decodeBase64(rtData);
    				data=$.parseJSON(data);
    				if(data.flag){
    					$.toast("提交成功！","forbidden");
    					return;
    				}
    				else{
    					$.toast("提交失败！","forbidden");
    					return;
    				}
    			},
    			error: function (jqXHR, textStatus, errorThrown) {
    				$.toast("网络异常！","forbidden");
					return;
    		    }
    		});
        },
        
        backStep2: function (){
        	Mobilebone.transition($(".page")[0],$(".page")[1]);
        },
        
        backStep3: function (){
        	Mobilebone.transition($(".page")[1],$(".page")[2]);
        },
        closePopup: function (){
            $.closePopup();
        },
        
    }
});

$(function(){
	$("#bg").bind("click", function() {
		if(systype)
			window.webkit.messageHandlers.generalView.postMessage({body: 'message'});
		else
			window.goUrl.gofoot("message.html");
	});
	
	init_view();
	
});


//var pro_1={"code":200,"msg":"11","detail":{"product_name":1232,"insur_dur":"1年","age_range":"13-66","sum_face_amnt":12121,"sum_premium":44,"occ_class":"1-4类","comm_rate":1,"special_agreement":"产品责任产品责任产品责任产品责任产品责任产品责任产品责任产品责任产品责任产品"}};

function search(product_di){
	var jsonStr = {};
	jsonStr.product_id=product_di;
	var data = getDecodedJson2("org.marker.weixin.servletJson.JstbyEquery","equeryProductDetail", JSON
				.stringify(jsonStr));
//	var data=pro_1;

	if (data.code == 400) {
		$.toast("查询失败！","forbidden");
		return;
	} else if(data.code == 200){
		$("#load_select3").html('');
		var pro_detail=data.detail;//产品详情
		var policies=data.policies;//险种
		var type_values=data.type_values;//责任
		
		
		var div='';
			div=div+'<div class="weui-cells">';
			div=div+'	<div class="weui-cell">';
			div=div+'		<div class="weui-cell__bd">';
			div=div+'			<p>产品名称</p>';
			div=div+'		</div>';
			div=div+'		<div class="weui-cell__ft">'+pro_detail.product_name+'</div>';
			div=div+'	</div>';
			div=div+'	<div class="weui-cell">';
			div=div+'		<div class="weui-cell__bd">';
			div=div+'			<p>保险期间</p>';
			div=div+'		</div>';
			div=div+'		<div class="weui-cell__ft">'+pro_detail.insur_dur+'</div>';
			div=div+'	</div>';
			div=div+'	<div class="weui-cell">';
			div=div+'		<div class="weui-cell__bd">';
			div=div+'			<p>投保范围</p>';
			div=div+'		</div>';
			div=div+'		<div class="weui-cell__ft">'+pro_detail.age_range+'</div>';
			div=div+'	</div>';
			div=div+'	<div class="weui-cell">';
			div=div+'		<div class="weui-cell__bd">';
			div=div+'			<p>销售区域</p>';
			div=div+'		</div>';
			div=div+'		<div class="weui-cell__ft">'+pro_detail.sales_area+'</div>';
			div=div+'	</div>';
			div=div+'	<div class="weui-cell">';
			div=div+'		<div class="weui-cell__bd">';
			div=div+'			<p>总保额</p>';
			div=div+'		</div>';
			div=div+'		<div class="weui-cell__ft">'+pro_detail.sum_face_amnt+'</div>';
			div=div+'	</div>';
			div=div+'	<div class="weui-cell">';
			div=div+'		<div class="weui-cell__bd">';
			div=div+'			<p>总保费</p>';
			div=div+'		</div>';
			div=div+'		<div class="weui-cell__ft">'+pro_detail.sum_premium+'</div>';
			div=div+'	</div>';
			div=div+'	<div class="weui-cell">';
			div=div+'		<div class="weui-cell__bd">';
			div=div+'			<p>投保份数</p>';
			div=div+'		</div>';
			div=div+'		<div class="weui-cell__ft">'+pro_detail.portion_max_num+'</div>';
			div=div+'	</div>';
			
			
			div=div+'	<div class="weui-cell">';
			div=div+'		<div class="weui-cell__bd">';
			div=div+'			<p>职业类别</p>';
			div=div+'		</div>';
			div=div+'		<div class="weui-cell__ft">'+pro_detail.occ_class+'</div>';
			div=div+'	</div>';
			div=div+'	<div class="weui-cell">';
			div=div+'		<div class="weui-cell__bd">';
			div=div+'			<p>佣金</p>';
			div=div+'		</div>';
			div=div+'		<div class="weui-cell__ft">'+pro_detail.comm_rate+'</div>';
			div=div+'	</div>';

			if(pro_detail.product_remark!=null&&pro_detail.product_remark!=''){
				div=div+'	<div class="weui-cell">';
				div=div+'		<div class="weui-cell__bd">';
				div=div+'			<p>产品须知</p>';
				div=div+'		</div>';
				div=div+'		<div class="weui-cell__ft" style="color:red">'+pro_detail.product_remark+'</div>';
				div=div+'	</div>';
			}
			
//			div = div+'	<a class="weui-cell weui-cell_access" href="javascript:search_long(\''+zeren_list+'\',\''+'产品责任'+'\')" >';
//			div = div+'		<div class="weui-cell__bd">';
//			div = div+'			<p>'+'产品责任'+'</p>';
//			div = div+'		</div>';
//			div = div+'		<div class="weui-cell__ft"   >查看责任</div>';
//			div = div+'	</a>';
			
			var zeren_flag=0;
			for(var i=0;i<type_values.length;i++){
				if(type_values[i].product_type_class==5){
					if(zeren_flag==0){
						div=div+'	<div class="weui-cell">';
						div=div+'		<div class="weui-cell__bd">';
						div=div+'			<p>产品责任</p>';
						div=div+'		</div>';
						div=div+'		<div class="weui-cell__ft">'+zerenArray[type_values[i].product_type_value-1]+'</div>';
						div=div+'	</div>';
					}else{
						div=div+'	<div class="weui-cell">';
						div=div+'		<div class="weui-cell__bd">';
						div=div+'			<p></p>';
						div=div+'		</div>';
						div=div+'		<div class="weui-cell__ft">'+zerenArray[type_values[i].product_type_value-1]+'</div>';
						div=div+'	</div>';
					}
					zeren_flag++;
				}
			}
			
			div = div+'	<a class="weui-cell weui-cell_access" href="javascript:search_long(\''+pro_detail.special_agreement.replace(/\n|\r\n/g,'<br/>')+'\',\''+'特约'+'\')" >';
			div = div+'		<div class="weui-cell__bd">';
			div = div+'			<p>'+'特约'+'</p>';
			div = div+'		</div>';
			div = div+'		<div class="weui-cell__ft"   >查看特约</div>';
			div = div+'	</a>';
			
//			div = div+'	<a class="weui-cell weui-cell_access" href="javascript:search_long(\''+'暂无定义'+'\',\''+'条款'+'\')" >';
//			div = div+'		<div class="weui-cell__bd">';
//			div = div+'			<p>'+'条款'+'</p>';
//			div = div+'		</div>';
//			div = div+'		<div class="weui-cell__ft"   >查看条款</div>';
//			div = div+'	</a>';
			
			div=div+'</div>';
			
			
			
			
			if(policies.length>0){
				div = div+'	<a class="weui-cell weui-cell_access" href="javascript:sq_or_zk()" >';
				div = div+'		<div class="weui-cell__bd">';
				div = div+'			<p>'+'险种列表'+'</p>';
				div = div+'		</div>';
				div = div+'		<div class="weui-cell__ft" id="sq_or_zk">展开</div>';
				div = div+'	</a>';
//				div=div+'<div class="weui-cells">';
//				div=div+'	<div class="weui-cells__title title">险种列表</div>';
				div=div+'<div id="fx_area" style="display:none">';
			}
			for(var j=0;j<policies.length;j++){
				div=div+'	<div class="weui-cell">';
				div=div+'		<div class="weui-cell__bd">';
				div=div+'			<p>险种('+(j+1)+')</p>';
				div=div+'		</div>';
				div=div+'		<div class="weui-cell__ft">'+policies[j].policy_name+'</div>';
				div=div+'	</div>';
				div=div+'	<div class="weui-cell">';
				div=div+'		<div class="weui-cell__bd">';
				div=div+'			<p>保额</p>';
				div=div+'		</div>';
				div=div+'		<div class="weui-cell__ft">'+policies[j].face_amnt+'</div>';
				div=div+'	</div>';
//				div=div+'	<div class="weui-cell">';
//				div=div+'		<div class="weui-cell__bd">';
//				div=div+'			<p>保费</p>';
//				div=div+'		</div>';
//				div=div+'		<div class="weui-cell__ft">'+policies[j].premium+'</div>';
//				div=div+'	</div>';
			}
			if(policies.length>0){
				div=div+'</div>';
			}
		$("#load_select3").append(div);
	}
	Mobilebone.transition($(".page")[2],$(".page")[1]);
}

//var json={"total":39,"rows":[{"product_type_class_id":1,"product_type_class_name":"按场景","product_type_value_name":"综合意外","product_type_value":1,"product_type_class":1,"product_type_class_seq":1},{"product_type_class_id":2,"product_type_class_name":"按场景","product_type_value_name":"交通意外","product_type_value":2,"product_type_class":1,"product_type_class_seq":2},{"product_type_class_id":3,"product_type_class_name":"按场景","product_type_value_name":"计生险","product_type_value":3,"product_type_class":1,"product_type_class_seq":3},{"product_type_class_id":4,"product_type_class_name":"按场景","product_type_value_name":"旅行意外","product_type_value":4,"product_type_class":1,"product_type_class_seq":4},{"product_type_class_id":5,"product_type_class_name":"按场景","product_type_value_name":"骑行意外","product_type_value":5,"product_type_class":1,"product_type_class_seq":5},{"product_type_class_id":6,"product_type_class_name":"按场景","product_type_value_name":"自然灾害","product_type_value":6,"product_type_class":1,"product_type_class_seq":6},{"product_type_class_id":7,"product_type_class_name":"按场景","product_type_value_name":"紧急救援","product_type_value":7,"product_type_class":1,"product_type_class_seq":7},{"product_type_class_id":8,"product_type_class_name":"按场景","product_type_value_name":"家庭保险","product_type_value":8,"product_type_class":1,"product_type_class_seq":8},{"product_type_class_id":9,"product_type_class_name":"按场景","product_type_value_name":"学生儿童","product_type_value":9,"product_type_class":1,"product_type_class_seq":9},{"product_type_class_id":10,"product_type_class_name":"按场景","product_type_value_name":"老年险","product_type_value":10,"product_type_class":1,"product_type_class_seq":10},{"product_type_class_id":11,"product_type_class_name":"按场景","product_type_value_name":"建筑工程","product_type_value":11,"product_type_class":1,"product_type_class_seq":11},{"product_type_class_id":12,"product_type_class_name":"按场景","product_type_value_name":"信贷险","product_type_value":12,"product_type_class":1,"product_type_class_seq":12},{"product_type_class_id":13,"product_type_class_name":"按场景","product_type_value_name":"指定场所","product_type_value":13,"product_type_class":1,"product_type_class_seq":13},{"product_type_class_id":14,"product_type_class_name":"按场景","product_type_value_name":"女性专属","product_type_value":14,"product_type_class":1,"product_type_class_seq":14},{"product_type_class_id":15,"product_type_class_name":"按场景","product_type_value_name":"其他","product_type_value":15,"product_type_class":1,"product_type_class_seq":15},{"product_type_class_id":16,"product_type_class_name":"按类型","product_type_value_name":"个人","product_type_value":1,"product_type_class":2,"product_type_class_seq":1},{"product_type_class_id":17,"product_type_class_name":"按类型","product_type_value_name":"团体","product_type_value":2,"product_type_class":2,"product_type_class_seq":2},{"product_type_class_id":18,"product_type_class_name":"按年龄","product_type_value_name":"0-17周岁","product_type_value":1,"product_type_class":3,"product_type_class_seq":1},{"product_type_class_id":19,"product_type_class_name":"按年龄","product_type_value_name":"18-65周岁","product_type_value":2,"product_type_class":3,"product_type_class_seq":2},{"product_type_class_id":20,"product_type_class_name":"按年龄","product_type_value_name":"65周岁以上","product_type_value":3,"product_type_class":3,"product_type_class_seq":3},{"product_type_class_id":21,"product_type_class_name":"按保费","product_type_value_name":"0-10元","product_type_value":1,"product_type_class":4,"product_type_class_seq":1},{"product_type_class_id":22,"product_type_class_name":"按保费","product_type_value_name":"11-100元","product_type_value":2,"product_type_class":4,"product_type_class_seq":2},{"product_type_class_id":23,"product_type_class_name":"按保费","product_type_value_name":"100-200元","product_type_value":3,"product_type_class":4,"product_type_class_seq":3},{"product_type_class_id":24,"product_type_class_name":"按保费","product_type_value_name":"200-500元","product_type_value":4,"product_type_class":4,"product_type_class_seq":4},{"product_type_class_id":25,"product_type_class_name":"按保费","product_type_value_name":"500元以上","product_type_value":5,"product_type_class":4,"product_type_class_seq":5},{"product_type_class_id":26,"product_type_class_name":"按责任","product_type_value_name":"意外伤害","product_type_value":1,"product_type_class":5,"product_type_class_seq":1},{"product_type_class_id":27,"product_type_class_name":"按责任","product_type_value_name":"意外医疗","product_type_value":2,"product_type_class":5,"product_type_class_seq":2},{"product_type_class_id":28,"product_type_class_name":"按责任","product_type_value_name":"交通意外伤害-机动车","product_type_value":3,"product_type_class":5,"product_type_class_seq":3},{"product_type_class_id":29,"product_type_class_name":"按责任","product_type_value_name":"交通意外伤害-轨道交通","product_type_value":4,"product_type_class":5,"product_type_class_seq":4},{"product_type_class_id":30,"product_type_class_name":"按责任","product_type_value_name":"交通意外伤害-水上交通","product_type_value":5,"product_type_class":5,"product_type_class_seq":5},{"product_type_class_id":31,"product_type_class_name":"按责任","product_type_value_name":"交通意外伤害-飞机","product_type_value":6,"product_type_class":5,"product_type_class_seq":6},{"product_type_class_id":32,"product_type_class_name":"按责任","product_type_value_name":"重大疾病","product_type_value":7,"product_type_class":5,"product_type_class_seq":7},{"product_type_class_id":33,"product_type_class_name":"按责任","product_type_value_name":"特定疾病","product_type_value":8,"product_type_class":5,"product_type_class_seq":8},{"product_type_class_id":34,"product_type_class_name":"按责任","product_type_value_name":"住院定额给付","product_type_value":9,"product_type_class":5,"product_type_class_seq":9},{"product_type_class_id":35,"product_type_class_name":"按责任","product_type_value_name":"住院费用报销","product_type_value":10,"product_type_class":5,"product_type_class_seq":10},{"product_type_class_id":36,"product_type_class_name":"按责任","product_type_value_name":"其他","product_type_value":11,"product_type_class":5,"product_type_class_seq":11},{"product_type_class_id":37,"product_type_class_name":"销售途径","product_type_value_name":"智悦APP","product_type_value":1,"product_type_class":6,"product_type_class_seq":1},{"product_type_class_id":38,"product_type_class_name":"销售途径","product_type_value_name":"微信智悦随行","product_type_value":2,"product_type_class":6,"product_type_class_seq":2},{"product_type_class_id":39,"product_type_class_name":"销售途径","product_type_value_name":"线下销售","product_type_value":3,"product_type_class":6,"product_type_class_seq":3}]};

function init_view() {

	
	var jsonStr = {};
	var data = getDecodedJson2("org.marker.weixin.servletJson.JstbyEquery","equeryAllProductAttr", JSON
				.stringify(jsonStr));
//	var data=json;
	var div =''; 
	var check_title='';
	var items=[];// 下拉选项数组
	var json_item={};
	var option_array = [];
	var title_array = [];
	
	if(data.total>0){
		$("#load_select").html('');
		data=data.rows;
		div=div+ '<div class="weui-cells weui-cells_form">';
		for(var i=0; i<data.length; i++) {
			if(check_title!=data[i].product_type_class_name){
				check_title=data[i].product_type_class_name;
				NameArray.push(data[i].product_type_class);
				title_array.push(data[i].product_type_class_name);
				div=div+ '<div class="weui-cell">';
				div=div+ '	<div class="weui-cell__hd"><label class="weui-label">'+data[i].product_type_class_name+'</label></div>';
				div=div+ '	<div class="weui-cell__bd">';//data[i].product_type_class
				div=div+ '		<input class="weui-input " id="select_'+data[i].product_type_class+'"  placeholder="请选择" value="" type="text" >';
				div=div+ '	</div>';
				div=div+ '</div>';
				option_array.push([{title: data[i].product_type_value_name,value:data[i].product_type_class+'-'+data[i].product_type_value}]);
			}else{
				option_array[NameArray.length-1].push({title: data[i].product_type_value_name,value:data[i].product_type_class+'-'+data[i].product_type_value});
			}

			if(5==data[i].product_type_class){
				zerenArray.push(data[i].product_type_value_name);
			}

		}
		div=div+ '	<div class="weui-cell">';
		div=div+ '		<div class="weui-cell__hd"><label class="weui-label">产品名称</label></div>';
		div=div+ '		<div class="weui-cell__bd">';
		div=div+ '			<input class="weui-input" type="text" id="product_name" value="" placeholder="请输入产品名称关键字">';
		div=div+ '		</div>';
		div=div+ '	</div>';
		div=div+ '</div>';
		$("#load_select").html(div);
		console.log(option_array);

		for (var i = 0; i < NameArray.length; i++) {
			if(NameArray[i]==1 ||NameArray[i]==2 ||NameArray[i]==4){
				$("#select_"+(i+1)).select({
					title: "(单选)"+title_array[i],
					multi: true,
					max:1,
					items: option_array[i]
				});
			}else{
				$("#select_"+(i+1)).select({
					title: "(多选)"+title_array[i],
					multi: true,
					// max:1,
					items: option_array[i]
				});
			}

		}
		
/*		check_title='';
		//绑定事件
		for(var j=0; j<data.length; j++) {
			
			if(check_title!=data[j].product_type_class_name){
				check_title=data[j].product_type_class_name;
				if(j>0){
					if(2==data[j-1].product_type_class||4==data[j-1].product_type_class){
						console.log(111111);
						console.log(data[j-1].product_type_class_name);
						$("#select_"+data[j-1].product_type_class).select({
							  title: "(单选)"+data[j-1].product_type_class_name,
							  multi: true,
							  // min:0,
							  max:1,
							  items: items
						});
					}else{
						console.log(222222);
						console.log(data[j-1].product_type_class_name);
						$("#select_"+data[j-1].product_type_class).select({
							  title: "(多选)"+data[j-1].product_type_class_name,
							  multi: true,
							  // min:0,
							  items: items
						});
					}
					items=[];//初始化下拉数组
				}
			}
			
			json_item={};
			json_item.title=data[j].product_type_value_name;
			json_item.value=data[j].product_type_class+'-'+data[j].product_type_value;
			items.push(json_item);
			if(j==data.length-1){
				if(2==data[j].product_type_class||4==data[j].product_type_class){
					console.log(333333);
					console.log(data[j-1].product_type_class_name);
					$("#select_"+data[j-1].product_type_class).select({
						  title: "(单选)"+data[j-1].product_type_class_name,
						  multi: true,
						  // min:0,
						  max:1,
						  items: items
					});
				}else{
					console.log(444444);
					console.log(data[j-1].product_type_class_name);
					$("#select_"+data[j-1].product_type_class).select({
						  title: "(多选)"+data[j-1].product_type_class_name,
						  multi: true,
						  // min:0,
						  // max:1,
						  items: items
					});
				}
				items=[];//初始化下拉数组
			}
			
		}*/
		
	}
	
	
}


function search_long(content,title){
//	$.toast("11","forbidden");
	$("#special_title").html(title);
	$("#special_content").html(content);
	$("#special").popup();
}

function sq_or_zk(){
	if($("#fx_area").css("display")=="none"){
		$("#fx_area").show();
		$("#sq_or_zk").html('收起');
    }else{
    	$("#fx_area").hide();
		$("#sq_or_zk").html('展开');
    }
}
function golast(){
	if(systype)
		window.webkit.messageHandlers.generalView.postMessage({body: 'goback'});
	else
		window.goUrl.goback();
}
function goIndex (){
	if(systype)
		window.webkit.messageHandlers.generalView.postMessage({body: 'wd'});
	else
		window.goUrl.togomy();
}
