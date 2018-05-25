package sp.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.js.db.PoolManager;
import org.js.db.PoolManagerCommit;

import sp.util.BASE64;
import sp.util.DesUtils;


public class LoginServlet extends HttpServlet {
	public LoginServlet() {
		super();
	}
	public void destroy() {
		super.destroy(); 
	}
	public void init() throws ServletException {
	}
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		this.doPost(request, response);
	}
	PoolManager pool=new PoolManager("hunshe2018");
	public  static String androidVersion="0";
	public  static String iosVersion="0";
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		PrintWriter out = response.getWriter();
		String type=request.getParameter("pams_json");
//		type=URLDecoder.decode(type, "UTF-8");
		DesUtils des;
		JSONObject result = new JSONObject();
//		try {
//			des = new DesUtils("sssss");
//			type = des.decrypt(request.getParameter("pams_json"));
//			JSONObject jsonObject = JSONObject.fromObject(type);
//			if(jsonObject.has("idear")&&"register".equals(jsonObject.get("idear").toString())){
//				result.put("returnCode", register_user(jsonObject));
//			}else if(jsonObject.has("idear")&&"login".equals(jsonObject.get("idear").toString())){
//				result.put("returnCode", login_user(jsonObject));
//			}
//			
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}//自定义密钥   
		
		if(type.length()>20){
			try {
				des = new DesUtils("sgqyz7");
				String version=des.decrypt(type);
				if(version.equals("ywjqb6.0")){
					String tx_name=URLEncoder.encode(request.getParameter("tx_name"),"UTF-8");
					String tx_de=URLEncoder.encode(request.getParameter("tx_de"),"UTF-8");
					String tx_s=URLEncoder.encode(request.getParameter("tx_s"),"UTF-8");
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}//自定义密钥 
		}
		
		out.println(BASE64.getBase64(result.toString()));
		out.flush();
		out.close();
	}
	
	
	
	public String login_user(JSONObject json){
		String userName=json.getString("userName");
		String userPassword=json.getString("userPassword");

		try {
			String sql="from user_info where user_code=? and  pwd=?  ";
			int up_num=pool.getSQLResultCnt(sql,
					new Object[] {userName,userPassword});
			if(up_num==0){
				return "1004";
			}else{
				return "1005";
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			
			return "1003";
		}
		
	}
	public String register_user(JSONObject json){
		String userName=json.getString("userName");
		String userPassword=json.getString("userPassword");
		String userTel=json.getString("userTel");
		String userMail=json.getString("userMail");
		
		try {
			String sql=" from user_info where tel=? ";
			int up_num=pool.getSQLResultCnt(sql,
					new Object[] {userTel});
			if(up_num==0){
				sql="INSERT into user_info (user_code,user_name,pwd,in_time,up_time,lv,email,tel)"
						+ " VALUES(?,?,?,NOW(),NOW(),0,?,?)";
				up_num = pool.executeUpdate(sql,
						new Object[] {userTel,userName,userPassword,userMail,userTel});
				if(up_num==0){
					return "1000";
				}else{
					return "1001";
				}
			}else{
				return "1002";
			}
			
		} catch (Exception e) {
			// TODO: handle exception
			
			return "1003";
		}
		
	}
	
	
	public JSONObject search_integral (String id_no,String id_name) throws Exception{
		JSONObject responseJsonObject = new JSONObject();// 返回对象
		String userCode = "ie_insert";
		//id_no="320125197502014322";
		PoolManagerCommit pool = new PoolManagerCommit("86_pams");
		try {
			String sql = "exec xia_yb_getjf ?";
			List<Map> dataList =  pool.getSQLMapResult(sql, new Object[] {
					id_no});
			int sum_integral=0;
			if(dataList!=null&&dataList.size()>0){
				for (int i = 0; i < dataList.size(); i++) {
					String itrvl_code=dataList.get(i).get("itrvl_code").toString();
					String s=(dataList.get(i).get("money_dur").toString());
					String[] ss=s.split("\\.");
					int money_dur=Integer.parseInt(ss[0]);
					Float fact_std_prem=Float.parseFloat(dataList.get(i).get("fact_std_prem").toString());
					if("W".equals(itrvl_code)){
						sum_integral=sum_integral+(int)(fact_std_prem*0.1);
					}else if("Y".equals(itrvl_code)){
						if(money_dur>=3&&money_dur<5){
							sum_integral=sum_integral+(int)(fact_std_prem*0.3);
						}else if(money_dur>=5&&money_dur<10){
							sum_integral=sum_integral+(int)(fact_std_prem*0.5);
						}else if(money_dur>=10){
							sum_integral=sum_integral+(int)(fact_std_prem*1);
						}
						
					}
				}
				sql="update sear_e_2018_yb_hj_his set integral=?,up_date=GETDATE(),id_name=? where idno=? and user_code=? ";
				
				int k=pool.executeUpdate(sql, new Object[] {sum_integral*3,id_name,id_no,userCode,});
				if(k==0){
					sql="INSERT into sear_e_2018_yb_hj_his (id_name,idno,integral,user_code,up_date) VALUES (?,?,?,?,GETDATE())";
					k=pool.executeUpdate(sql, new Object[] {id_name,id_no,sum_integral*3,userCode});
				}
				responseJsonObject.put("integral",sum_integral*3);
				responseJsonObject.put("code",11);
			}else{
				responseJsonObject.put("code",101);
				responseJsonObject.put("integral",0);
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return responseJsonObject;
	}
	
	
	public JSONObject sum_integral (String id_no,String integral,String yu) throws Exception{
		JSONObject responseJsonObject = new JSONObject();// 返回对象
		String userCode = "ie_insert";

		if(yu==null||"".equals(yu)){
			yu="0";
		}
		PoolManagerCommit pool = new PoolManagerCommit("86_pams");
		try {
			
			
			String sql="update sear_e_2018_yb_hj_his set integral=?,card_money=?,up_date=GETDATE() where idno=? and user_code=? ";
			
			int k=pool.executeUpdate(sql, new Object[] {Integer.parseInt(integral),Integer.parseInt(yu),id_no,userCode,});
			if(k==0){
				sql="INSERT into sear_e_2018_yb_hj_his (idno,integral,card_money,user_code,up_date) VALUES (?,?,?,?,GETDATE())";
				k=pool.executeUpdate(sql, new Object[] {id_no,Integer.parseInt(integral),Integer.parseInt(yu),userCode});
			}
			if(k==0){
				responseJsonObject.put("code",102);
				responseJsonObject.put("integral",0);
			}else{
				
				responseJsonObject.put("integral",Integer.parseInt(integral)+Integer.parseInt(yu)*3);
				responseJsonObject.put("code",22);
			}
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return responseJsonObject;
	}
	
	
	public static void main(String[] args) {
		
	}
}
