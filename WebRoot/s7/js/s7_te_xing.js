


var app = new Vue({
    el:"#app",
    data:function (){
        return {
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
    		
    		if(isEmpty($("#tx_name").val())||isEmpty($("#tx_de").val())||isEmpty($("#tx_s").val())){
    			$.toast("3项内容均不能为空！","forbidden");
				return;
    		}
    		var data;
    		$.ajax({
    			type : "GET",
    			url : "../servlet/LoginServlet",
    			data : json,
    			async : false,
    			success : function(rtData) {
    				data = decodeBase64(rtData);
    				data=$.parseJSON(data);
    				if(data.flag=='1001'){
    					$.toast("提交成功！","forbidden");
    					return;
    				}else if(data.flag=='1002'){
    					$.toast("已有群友提交！谢谢参与！","forbidden");
    					return;
    				}else{
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
	
	
});


//var pro_1={"code":200,"msg":"11","detail":{"product_name":1232,"insur_dur":"1年","age_range":"13-66","sum_face_amnt":12121,"sum_premium":44,"occ_class":"1-4类","comm_rate":1,"special_agreement":"产品责任产品责任产品责任产品责任产品责任产品责任产品责任产品责任产品责任产品"}};

function search(product_di){
	
	Mobilebone.transition($(".page")[2],$(".page")[1]);
}








