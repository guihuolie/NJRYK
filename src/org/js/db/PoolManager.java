package org.js.db;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.sql.CallableStatement;
import java.sql.Connection;        
import java.sql.DriverManager;        
import java.sql.PreparedStatement;
import java.sql.ResultSet;        
import java.sql.ResultSetMetaData;
import java.sql.SQLException;        
import java.sql.Statement;        
import java.text.DateFormat;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
       





import org.apache.log4j.Logger;
import org.hibernate.Session;
import org.hibernate.exception.ExceptionUtils;

import org.logicalcobwebs.proxool.ProxoolException;        
import org.logicalcobwebs.proxool.ProxoolFacade;        
import org.logicalcobwebs.proxool.admin.SnapshotIF;



public class PoolManager {
	    
	    private static int activeCount = 0;
	    protected String name;

	    public static Logger logger = Logger.getLogger(PoolManager.class);
        public  PoolManager(String name){        
	      this.name = name;
	    }         
  
	    /**      
	     * 获取连接      
	     * getConnection      
	     * @param name      
	     * @return      
	            
	    public void createConnection(){        
	       conn = getConnectionByPool(name);;        
	    }*/
	    
	    
	    public Connection getConnectionByPool() {
	        try{        
	           Class.forName("com.mysql.jdbc.Driver");//proxool驱动类        
	           Connection conn = DriverManager.getConnection("proxool."+name);     
	           //此处的DBPool是在proxool.xml中配置的连接池别名       
	           //showSnapshotInfo();
	            return conn;        
	        }catch(Exception ex){        
	            ex.printStackTrace();        
	        }        
	        return null;        
	    }        
	    /**      
	     * 获取连接      
	     * getConnectionByPool      
	     * @param name      
	     * @return      
	        
	    public Connection getConnectionByPool(String name) {        
	        try{        
	           Class.forName("org.logicalcobwebs.proxool.ProxoolDriver");//proxool驱动类        
	           Connection conn = DriverManager.getConnection("proxool."+name);     
	           //此处的DBPool是在proxool.xml中配置的连接池别名       
	           //showSnapshotInfo();        
	                    
	            return conn;        
	        }catch(Exception ex){        
	            ex.printStackTrace();        
	        }        
	        return null;        
	    }        */    
	    /**      
	     * 此方法可以得到连接池的信息      
	     * showSnapshotInfo      
	     */       
	    public void showSnapshotInfo(){        
	        try{        
	            SnapshotIF snapshot = ProxoolFacade.getSnapshot("DBPool", true);        
	            int curActiveCount=snapshot.getActiveConnectionCount();//获得活动连接数        
	            int availableCount=snapshot.getAvailableConnectionCount();//获得可得到的连接数        
	            int maxCount=snapshot.getMaximumConnectionCount() ;//获得总连接数        
	            if(curActiveCount!=activeCount)//当活动连接数变化时输出的信息        
	            {        
	             System.out.println("活动连接数:"+curActiveCount+"(active)  可得到的连接数:"+availableCount+"(available)  总连接数:"+maxCount+"(max)");                     
	             activeCount=curActiveCount;        
	            }      
	        }catch(ProxoolException e){        
	            e.printStackTrace();        
	        }        
	    }        

	    /**      
	     * 释放连接      
	     * freeConnection      
	     * @param conn      
	    */        
	    public void freeConnection(Connection conn){
			try {
				if(conn!=null&&!conn.isClosed()){
	                conn.close();        
	            }
	        }   catch (SQLException e) {
				e.printStackTrace();
			}
		}
	    
	    public  List<Map> getSQLMapResult(String sql,Object[] argv) throws SQLException{
	    	Connection conn = getConnectionByPool();   
	        conn.setAutoCommit(true);
	        ResultSet rs = null;
	        PreparedStatement stmt = null;
	        List list = new ArrayList();
	       
	        try{
	         stmt = conn.prepareStatement(sql);
	         //System.out.println(sql);
	         for (int i = 0;i<argv.length;i++)//modify argv.size()
	            {
	        	 //System.out.println(argv[i]);
	        	  stmt.setObject(i+1,argv[i]);
	            }
	         rs = stmt.executeQuery();         
			 while(rs.next()){
			 
				Map map = new HashMap();

				for(int i=1;i<= rs.getMetaData().getColumnCount();i++) 
						map.put(rs.getMetaData().getColumnName(i),rs.getObject(i));
				list.add(map);
			 }
			 
	         rs.close();
	        }
	        catch(Exception he){
				logger.error(ExceptionUtils.getFullStackTrace(he));
	        }
	        finally{
//				if(stmt!=null&&!stmt.isClosed()){
//					stmt.close();
//				}
				try{
					if(conn!=null&&!conn.isClosed()){
						if(stmt!=null){
							stmt.close();
						}
						conn.close();
					}
				}   catch (SQLException e) {
					e.printStackTrace();
				}
	        }
	        return list;
	    }
	    public  List<Map> getSQLMapResultUpperColumn(String sql,Object[] argv) throws SQLException{
	    	Connection conn = getConnectionByPool();
	        conn.setAutoCommit(true);
	        ResultSet rs = null;
	        PreparedStatement stmt = null;
	        List list = new ArrayList();
	        try{
	         stmt = conn.prepareStatement(sql);
	         //System.out.println(sql);
	         for (int i = 0;i<argv.length;i++)//modify argv.size()
	            {
	        	 System.out.println(argv[i]);
	        	  stmt.setObject(i+1,argv[i]);
	            }
	         rs = stmt.executeQuery();
			 while(rs.next()){

				Map map = new HashMap();

				for(int i=1;i<= rs.getMetaData().getColumnCount();i++)
						map.put(rs.getMetaData().getColumnName(i).toUpperCase(),rs.getObject(i));
				list.add(map);
			 }

	         rs.close();
	        }
	        catch(Exception he){
	      	  System.out.println(sql+he);
	        }
	        finally{
				try{
					if(conn!=null&&!conn.isClosed()){
						if(stmt!=null){
							stmt.close();
						}
						conn.close();
					}
				}   catch (SQLException e) {
					e.printStackTrace();
				}
	        }
	        return list;
	    }


		public boolean executeSqlListBigBatch(String sql,List<List> listavg)  {
			
			 
			Connection conn = getConnectionByPool();
			int batchsiz=listavg.size();
			int maxsize=500;
			int batchno=batchsiz/maxsize+1;
			
			try {
				conn.setAutoCommit(false);//禁止自动提交，设置回滚点
				PreparedStatement pstmt = conn.prepareStatement(sql);
				for(int i = 0;i<batchno;i++){
					System.out.println("第"+i+"个批次开始执行!"+(new Date()));
					for(int j=0;j<500&&(i*500+j)<listavg.size();j++){
						for(int k=0;k<listavg.get(i*500+j).size();k++){
							//System.out.println(k);
							//System.out.println(listavg.get(i*500+j).get(k).toString());
							pstmt.setString(k+1, listavg.get(i*500+j).get(k).toString());	
							
						}
						pstmt.addBatch();
					}
					pstmt.executeBatch();
					pstmt.clearBatch();
				}
	            conn.commit(); //事务提交
			}
			catch (SQLException e ) {
	       	 
	   	      	System.out.println("executeSqlListBigBatch出错记录:"+e);
	            try {
	              conn.rollback(); //操作不成功则回滚
	              
	              return false;
	            }catch(Exception ex) {
	          	  System.out.println("executeSqlListBigBatch回滚记录:"+ex);
	          	  return false;
	            }
		}
		finally {
			 if(conn!=null){        
		          try {        
		              conn.close();      
		              return true;
		          } catch (SQLException e) {                      
		              e.printStackTrace();        
		          }        
		     } 
		 
		}
		return true;
			 
		}
		
	    public List<Map> getProMapResult(String sql,Object[] argv) throws SQLException{

	    	Connection conn = getConnectionByPool();
	        conn.setAutoCommit(true);
	        ResultSet rs = null;
	        CallableStatement cstmt = null;
	        List list = new ArrayList();
	        try{
	        	cstmt = conn.prepareCall(sql);

	         for (int i = 0;i<argv.length;i++)//modify argv.size()
	         {
	        	 cstmt.setObject(i+1,argv[i]);
	        	 System.out.println(argv[i]);
	         }
	         System.out.println(sql);
	         rs = cstmt.executeQuery();


			 while(rs.next()){
				Map map = new HashMap();

				for(int i=1;i<= rs.getMetaData().getColumnCount();i++)
				 map.put(rs.getMetaData().getColumnName(i),rs.getObject(i));

				list.add(map);
			 }

	         rs.close();
	        }
	        catch(Exception he){
	      	  System.out.println(sql+he);
	        }
	        finally{
				try{
					if(conn!=null&&!conn.isClosed()){
						if(cstmt!=null){
							cstmt.close();
						}
						conn.close();
					}
				}   catch (SQLException e) {
					e.printStackTrace();
				}
	        }
	        return list;
	    }

	    /**
	     * 释放连接
	     * freeConnection
	     * @param name
	     * @param con

	    public void freeConnection (){
	        freeConnection(conn);
	    }*/
	    public List getProResult(String sql,Object[] argv,String[] colName) throws SQLException{
	    	Connection conn = getConnectionByPool();
	        conn.setAutoCommit(true);
	        ResultSet rs = null;
	        CallableStatement cstmt = null;
	        List list = new ArrayList();
	        try{
	        	cstmt = conn.prepareCall(sql);
	         System.out.println(sql);
	         for (int i = 0;i<argv.length;i++)//modify argv.size()
	            {
	        	 cstmt.setObject(i+1,argv[i]);
	        	 System.out.println(argv[i]);
	            }
	         rs = cstmt.executeQuery();

			 while(rs.next()){
				List li = new ArrayList();

				for(int i=0;i< colName.length;i++)
				 li.add(rs.getObject(colName[i]));

				list.add(li);
			 }

	         rs.close();
	        }
	        catch(Exception he){
	      	  System.out.println(sql+he);
	        }
	        finally{
				try{
					if(conn!=null&&!conn.isClosed()){
						if(cstmt!=null){
							cstmt.close();
						}
						conn.close();
					}
				}   catch (SQLException e) {
					e.printStackTrace();
				}
	        }
	        return list;
	    }

	    public List getSQLResult(String sql,Object[] argv,String[] colName) throws SQLException{
	    	Connection conn = getConnectionByPool();
	        conn.setAutoCommit(true);
	        ResultSet rs = null;
	        PreparedStatement stmt = null;
	        List list = new ArrayList();
	        try{
	         stmt = conn.prepareStatement(sql);

	         for (int i = 0;i<argv.length;i++)//modify argv.size()
	            {
	        	  stmt.setObject(i+1,argv[i]);
	        	  System.out.println(argv[i]);
	            }
	         rs = stmt.executeQuery();


			 while(rs.next()){
				List li = new ArrayList();
				for(int i=0;i< colName.length;i++)
				 li.add(rs.getObject(colName[i]));
				 list.add(li);
			 }

	         rs.close();
	        }
	        catch(Exception he){
	      	  System.out.println(sql+he);
	        }
	        finally{
				try{
					if(conn!=null&&!conn.isClosed()){
						if(stmt!=null){
							stmt.close();
						}
						conn.close();
					}
				}   catch (SQLException e) {
					e.printStackTrace();
				}
	        }
	        return list;
	    }


	    public Map getSQLMapResult(String sql,Object[] argv,String[] colName) throws SQLException{
	    	Connection conn = getConnectionByPool();
	        conn.setAutoCommit(true);
	        ResultSet rs = null;
	        PreparedStatement stmt = null;
	        Map map= new HashMap();
	        try{
	         stmt = conn.prepareStatement(sql);

	         for (int i = 0;i<argv.length;i++)//modify argv.size()
	            {
	        	  stmt.setObject(i+1,argv[i]);
	            }
	         rs = stmt.executeQuery();
	         if(!rs.next())return null;
			 for(int i=0;i< colName.length;i++){
				 map.put(colName[i],rs.getObject(colName[i]));
			 }
	         rs.close();
	        }
	        catch(Exception he){
	      	  System.out.println(sql+he);
	        }
	        finally{
				try{
					if(conn!=null&&!conn.isClosed()){
						if(stmt!=null){
							stmt.close();
						}
						conn.close();
					}
				}   catch (SQLException e) {
					e.printStackTrace();
				}
	        }
	        return map;
	    }



	    public int getSQLResultCnt(String sql,Object[] argv) {
	    	Connection conn = getConnectionByPool();

	        ResultSet rs = null;
	        int cnt = 0;
			PreparedStatement stmt = null;
	        try{
	         conn.setAutoCommit(true);

	         stmt = conn.prepareStatement("select count(*) "+sql);

	          for (int i = 0;i<argv.length;i++)//modify argv.size()
	            {
	        	  stmt.setObject(i+1,argv[i]);
	        	  System.out.println("argv:"+argv[i]);
	            }
	          System.out.println(sql);
	          rs = stmt.executeQuery();
	          rs.next();
	          cnt = rs.getInt(1);
	          rs.close();

	        }
	        catch(Exception he){
	      	  System.out.println(sql+he);
	        }
	        finally{
				try{
					if(conn!=null&&!conn.isClosed()){
						if(stmt!=null){
							stmt.close();
						}
						conn.close();
					}
				}   catch (SQLException e) {
					e.printStackTrace();
				}
			}
	        return cnt;
	    }

	

	    public int executeUpdate(String sql) {
	    	Connection conn = getConnectionByPool();

	        int cnt = 0;
			PreparedStatement pstmt=null;
	        try{
	        conn.setAutoCommit(false);
	        pstmt =(PreparedStatement)conn.prepareStatement(sql);
	        cnt = pstmt.executeUpdate();
	        conn.commit();
	        pstmt.close();

	        }
	        catch(Exception he){
	      	  	System.out.println("update错误："+sql+he);
	        }
	        finally{
				freeConnection(conn);
	        }
	        return cnt;
	    }

	    public int executeUpdate(String sql,Object[] argv) {
	    	Connection conn = getConnectionByPool();

	        int cnt = 0;
			PreparedStatement pstmt=null;
	        try{
	        conn.setAutoCommit(false);
	        pstmt =(PreparedStatement)conn.prepareStatement(sql);
	        for (int i = 0;i<argv.length;i++)
	        {
	        	pstmt.setObject(i+1,argv[i]);
	        }
	        cnt = pstmt.executeUpdate();
	        conn.commit();
	        pstmt.close();

	        }
	        catch(Exception he){
	      	  	System.out.println("update错误："+sql+he);
	        }
	        finally{
				freeConnection(conn);

	        }
	        return cnt;
	    }
	    public int insertDataReturnKeyByGeneratedKeys(String sql,Object[] argv) {
	    	Connection conn = getConnectionByPool();

	        int cnt = 0;
	        ResultSet rs = null;
			PreparedStatement pstmt=null;
	        try{
	        conn.setAutoCommit(false);
	        pstmt =(PreparedStatement)conn.prepareStatement(sql,Statement.RETURN_GENERATED_KEYS);
	        for (int i = 0;i<argv.length;i++)
	        {
	        	pstmt.setObject(i+1,argv[i]);
	        }

	        pstmt.executeUpdate();
	        rs = pstmt.getGeneratedKeys();
	        rs.next();

	        cnt = rs.getInt(1);

	        conn.commit();
	        pstmt.close();

	        }
	        catch(Exception he){
	      	  	System.out.println("update错误："+sql+he);
	        }
	        finally{
				try{
					if(conn!=null&&!conn.isClosed()){
						if(pstmt!=null){
							pstmt.close();
						}
						conn.close();
					}
				}   catch (SQLException e) {
					e.printStackTrace();
				}
	        }
	        return cnt;
	    }

	    public int insertDataReturnKeyByGeneratedKeys(String sql,String name) {
	    	Connection conn = getConnectionByPool();

	        ResultSet rs = null;
	        int cnt = 0;
			PreparedStatement pstmt=null;
			try{
	        conn.setAutoCommit(false);
	        pstmt =(PreparedStatement)conn.prepareStatement(sql,new String[]{name});
	        pstmt.executeUpdate();
	        rs = pstmt.getGeneratedKeys();
	        rs.next();
	        cnt = rs.getInt(1);
	        conn.commit();
	        rs.close();
	        pstmt.close();


	        }
	        catch(Exception he){
	      	  System.out.println(sql+he);
	        }
	        finally{
				freeConnection(conn);
	        }
	        return cnt;
	    }

	public boolean executeSqlList(List<String> list)  {


		Connection conn = getConnectionByPool();
		Statement stm=null;
		try {
			conn.setAutoCommit(false);//禁止自动提交，设置回滚点

			stm = conn.createStatement();
			stm.setQueryTimeout(0);
			for(int i = 0;i<list.size();i++){
				stm.addBatch(list.get(i));
			}
			stm.executeBatch();
            conn.commit(); //事务提交
		}
		catch (SQLException e ) {

   	      	System.out.println("executeSqlList出错记录:"+e);
            try {
              conn.rollback(); //操作不成功则回滚
              return false;
            }catch(Exception ex) {
          	  System.out.println("回滚记录:"+ex);
          	  return false;
            }
	}
	finally {
			try{
				if(conn!=null&&!conn.isClosed()){
					if(stm!=null){
						stm.close();
					}
					conn.close();
				}
			}   catch (SQLException e) {
				e.printStackTrace();
			}


	}
	return true;

	}
	public boolean executeSqlListBigBatch(List<String> list)  {


		Connection conn = getConnectionByPool();
		int batchsiz=list.size();
		int maxsize=500;
		int batchno=batchsiz/500+1;
		Statement stm=null;
		try {
			conn.setAutoCommit(false);//禁止自动提交，设置回滚点

			stm = conn.createStatement();
			stm.setQueryTimeout(0);
			for(int i = 0;i<batchno;i++){
				System.out.println("第"+i+"个批次开始执行!"+(new Date()));
				for(int j=0;j<500&&(i*500+j)<list.size();j++){
					stm.addBatch(list.get(i*500+j));
				}
				stm.executeBatch();
				stm.clearBatch();
			}

            conn.commit(); //事务提交
		}
		catch (SQLException e ) {

   	      	System.out.println("executeSqlListBigBatch出错记录:"+e);
            try {
              conn.rollback(); //操作不成功则回滚

              return false;
            }catch(Exception ex) {
          	  System.out.println("executeSqlListBigBatch回滚记录:"+ex);
          	  return false;
            }
	}
	finally {
			try{
				if(conn!=null&&!conn.isClosed()){
					if(stm!=null){
						stm.close();
					}
					conn.close();
				}
			}   catch (SQLException e) {
				e.printStackTrace();
			}

	}
	return true;

	}

	public boolean executeSqlListUpdate(List<String> list)  {


		Connection conn = getConnectionByPool();
		PreparedStatement s=null;
		try {
			conn.setAutoCommit(false);//禁止自动提交，设置回滚点

			s = null;
			for(int i = 0;i<list.size();i++){
			    s = conn.prepareStatement(list.get(i));
			    s.addBatch();
			}
		    s.executeBatch();
            conn.commit(); //事务提交
		}
		catch (SQLException e ) {

   	      	System.out.println("executeSqlListUpdate出错记录:"+e);
            try {
              conn.rollback(); //操作不成功则回滚

              return false;
            }catch(Exception ex) {
          	  System.out.println("executeSqlListUpdate回滚记录:"+ex);
          	  return false;
            }
	}
	finally {
			try{
				if(conn!=null&&!conn.isClosed()){
					if(s!=null){
						s.close();
					}
					conn.close();
				}
			}   catch (SQLException e) {
				e.printStackTrace();
			}
			freeConnection(conn);
	}
	return true;

	}


	public  List getSQLClassList(String sql ,Object[] argv ,Class cls) throws SQLException{

		    Connection conn = getConnectionByPool();
	        conn.setAutoCommit(true);
	        ResultSet rs = null;
	        PreparedStatement stmt = null;
	        List list = new ArrayList();

	        try{
	         stmt = conn.prepareStatement(sql);

	         for (int i = 0;i<argv.length;i++)//modify argv.size()
	            {
	        	  stmt.setObject(i+1,argv[i]);
	            }
	         rs = stmt.executeQuery();


	         Map<String,Method> methodsMap = new HashMap<String,Method>();

	         Method[] methods = cls.getMethods();

	         for(int i = 0 ; i<methods.length ; i++){
	     		Method md  = methods[i];

	     		if(md.getName().startsWith("set")){
	     			methodsMap.put(md.getName().substring(3).toLowerCase(), md);
	     		}
	     	 }

	         while(rs.next()){

	     		Object obj  = cls.newInstance();

	        	Map mp = new HashMap();
				for(int i=1;i<= rs.getMetaData().getColumnCount();i++){

					String colName = rs.getMetaData().getColumnName(i).replaceAll("_", "").toLowerCase();

					Method md = methodsMap.get(colName);

					if(md != null){
						md.invoke(obj, rs.getObject(i));
					}

				}
				list.add(obj);

			 }

	         rs.close();
	        }
	        catch(Exception he){
	        	he.printStackTrace();
	      	  System.out.println(sql+he);
	        }
	        finally{
				try{
					if(conn!=null&&!conn.isClosed()){
						if(stmt!=null){
							stmt.close();
						}
						conn.close();
					}
				}   catch (SQLException e) {
					e.printStackTrace();
				}
	        }
	        return list;
	}
	   
 
	 
	
}
