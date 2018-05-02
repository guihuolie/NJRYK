package org.js.db;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
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
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.hibernate.Session;

import org.logicalcobwebs.proxool.ProxoolException;
import org.logicalcobwebs.proxool.ProxoolFacade;
import org.logicalcobwebs.proxool.admin.SnapshotIF;



@SuppressWarnings("all")
public class PoolManagerCommit extends PoolManager {

	public PoolManagerCommit(String name) {
		super(name);
	}
	private String backNowTime19(int year, int month, int day) {
		Date dt = new Date();
		dt.setYear(dt.getYear() + year);
		dt.setMonth(dt.getMonth() + month);
		dt.setDate(dt.getDate() + day);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(dt);
	}
	public boolean sendSms(String msg, String mobile) {
		PoolManager pool = new PoolManager("szsb_biz");
		String sql = " insert into send_sms (id, pln_send_time, send_mobile, send_content,  send_flag) "
				+ " values(send_sms_seq.Nextval,to_date('"
				+ this.backNowTime19(0, 0, 0)
				+ "','YYYY-MM-DD HH24:MI:SS'),?,?,0) ";
		if (pool.executeUpdate(sql, new Object[] { mobile, msg }) > 0)
			return true;
		return false;
	}
	/**
	 * 分页查询
	 * 
	 * @param indexPage
	 *            起始页码 从0开始
	 * @param pageSize
	 *            每页显示行数
	 * @param sql
	 *            查询语句
	 * @param list
	 *            参数
	 * @return
	 * @throws Exception
	 */
	public List<HashMap<String, Object>> getSQLResultMap(int indexPage,
			int pageSize, String sql, List list) throws Exception {
		indexPage++;
		Connection conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		ResultSet rst = null;
		List vlist = new ArrayList();
		conn.setAutoCommit(true);
		try {
			pstmt = pstmt = conn
					.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_UPDATABLE);
			for (int i = 0; i < list.size(); i++) {
				pstmt.setObject(i + 1, list.get(i));
				System.out.println(list.get(i));
			}
			System.out.println(sql);
			// pstmt.setMaxRows(pageSize*(indexPage-1));
			pstmt.setMaxRows(pageSize * indexPage);
			// 获取结果集
			rst = pstmt.executeQuery();
			rst.first();
			rst.relative((indexPage - 1) * pageSize - 2);
			// rst.absolute(indexPage * pageSize);
			// 获取列信息
			ResultSetMetaData rsmd = rst.getMetaData();
			// 循环遍历信息
			while (rst.next()) {
				// 创建map
				Map<String, Object> map = new HashMap<String, Object>();
				// 遍历头信息
				for (int i = 0; i < rsmd.getColumnCount(); i++) {
					map.put(rsmd.getColumnName(i + 1),
							rst.getObject(rsmd.getColumnName(i + 1)));
				}
				// 插入数据
				vlist.add(map);
			}
		} catch (SQLException e) {
			throw new Exception("查询出错：" + e.getMessage());
		} finally {
			conn.close();
		}
		return vlist;
	}
	
	/**
	 * 行转列，只取一行数据
	 * @param sql 查询语句
	 * @param list 参数
	 * @param head 标题汉字名称 顺序同 keys
	 * @param keys 列名名称 顺序同head
	 * @return
	 * @throws Exception
	 */
	public List<HashMap<String, Object>> getTop1SQLResultMap(String sql, List list,String[] head,String[] keys) throws Exception {
		int indexPage=0;
		int pageSize=0;
		indexPage++;
		Connection conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		ResultSet rst = null;
		List vlist = new ArrayList();
		conn.setAutoCommit(true);
		try {
			pstmt = pstmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
			for (int i = 0; i < list.size(); i++) {
				pstmt.setObject(i + 1, list.get(i));
				System.out.println(list.get(i));
			}
			System.out.println(sql);
			// pstmt.setMaxRows(pageSize*(indexPage-1));
			pstmt.setMaxRows(pageSize * indexPage);
			// 获取结果集
			rst = pstmt.executeQuery();
			rst.first();
			rst.relative((indexPage - 1) * pageSize - 2);
			// rst.absolute(indexPage * pageSize);
			// 获取列信息
			ResultSetMetaData rsmd = rst.getMetaData();
			// 循环遍历信息
			if (rst.next()) {
				// 创建map
				
				// 遍历头信息
				for (int i = 0; i <keys.length; i++) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("headKey", keys[i]);
					map.put("headName", head[i]);
					map.put("headValue", rst.getObject(keys[i]));
					
					vlist.add(map);
				}
			}
		} catch (SQLException e) {
			throw new Exception("查询出错：" + e.getMessage());
		} finally {
			conn.close();
		}
		return vlist;
	}

	public List<Map> getSQLResult(int indexPage, int pageSize, String sql,
			List list) throws Exception {
		indexPage++;
		Connection conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		ResultSet rst = null;
		List vlist = new ArrayList();
		//conn.setAutoCommit(true);
		try {
			pstmt = pstmt = conn
					.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
							ResultSet.CONCUR_UPDATABLE);
			for (int i = 0; i < list.size(); i++) {
				pstmt.setObject(i + 1, list.get(i));
				System.out.println(list.get(i));
			}
			System.out.println(sql);
			// pstmt.setMaxRows(pageSize*(indexPage-1));
			pstmt.setMaxRows(pageSize * indexPage);
			// 获取结果集
			rst = pstmt.executeQuery();
			rst.first();
			rst.relative((indexPage - 1) * pageSize - 2);
			// rst.absolute(indexPage * pageSize);
			// 获取列信息
			ResultSetMetaData rsmd = rst.getMetaData();
			// 循环遍历信息
			while (rst.next()) {
				// 创建map
				Map<String, Object> map = new HashMap<String, Object>();
				// 遍历头信息
				for (int i = 0; i < rsmd.getColumnCount(); i++) {
					map.put(rsmd.getColumnName(i + 1),
							rst.getString(rsmd.getColumnName(i + 1)));
				}
				// 插入数据
				vlist.add(map);
			}
		} catch (SQLException e) {
			throw new Exception("查询出错：" + e.getMessage());
		} finally {
			conn.close();
		}
		return vlist;
	}
	public List<Map> getSQLResult3(int indexPage, int pageSize, String sql,
			List list) throws Exception {
		
		Connection conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		ResultSet rst = null;
		List vlist = new ArrayList();
		conn.setAutoCommit(true);
		try {
			pstmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			for (int i = 0; i < list.size(); i++) {
				pstmt.setObject(i + 1, list.get(i));
				System.out.println(list.get(i));
			}
			System.out.println(sql);
			pstmt.setMaxRows(indexPage * pageSize);
			// 获取结果集
			rst = pstmt.executeQuery();
			
			rst.last();
	        int totalRowCountTemp = rst.getRow();  //总行数
	        rst.beforeFirst();
	        int startNum = (indexPage - 1) * pageSize ;
	        if(startNum > 0) {
	        	rst.absolute(startNum);  //定位到请求页的第一条记录
	        }
			// 获取列信息
			ResultSetMetaData rsmd = rst.getMetaData();
			// 循环遍历信息
			while (rst.next()) {
				// 创建map
				Map<String, Object> map = new HashMap<String, Object>();
				// 遍历头信息
				for (int i = 0; i < rsmd.getColumnCount(); i++) {
					map.put(rsmd.getColumnName(i + 1),
							rst.getObject(rsmd.getColumnName(i + 1)));
				}
				// 插入数据
				vlist.add(map);
			}
		} catch (SQLException e) {
			throw new Exception("查询出错：" + e.getMessage());
		} finally {
			conn.close();
		}
		return vlist;
	}

	public List<Map> getSQLResult2(int indexPage, int pageSize, String sql,
			List list) throws Exception {
		Connection conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		ResultSet rst = null;
		List vlist = new ArrayList();
		conn.setAutoCommit(true);
		try {
			pstmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			for (int i = 0; i < list.size(); i++) {
				pstmt.setObject(i + 1, list.get(i));
				System.out.println(list.get(i));
			}
			System.out.println(sql);
			pstmt.setMaxRows(indexPage * pageSize);
			// 获取结果集
			rst = pstmt.executeQuery();
			rst.first();
			rst.absolute((indexPage - 1) * pageSize);
			// 获取列信息
			ResultSetMetaData rsmd = rst.getMetaData();
			// 循环遍历信息
			while (rst.next()) {
				// 创建map
				Map<String, Object> map = new HashMap<String, Object>();
				// 遍历头信息
				for (int i = 0; i < rsmd.getColumnCount(); i++) {
					map.put(rsmd.getColumnName(i + 1),
							rst.getObject(rsmd.getColumnName(i + 1)));
				}
				// 插入数据
				vlist.add(map);
			}
		} catch (SQLException e) {
			throw new Exception("查询出错：" + e.getMessage());
		} finally {
			conn.close();
		}
		return vlist;
	}

	public Connection conn;

	/**
	 * 新增的实现
	 * 
	 * @throws Exception
	 */
	public boolean insert(String sql, List list) throws Exception {
		conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		int rt = 0;
		try {
			// conn.setAutoCommit(false);//禁止自动提交，设置回滚点
			if (conn != null) {
				// 执行预处理
				pstmt = conn.prepareStatement(sql);
				for (int i = 0; i < list.size(); i++) {
					pstmt.setObject(i + 1, list.get(i));
				}
				rt = pstmt.executeUpdate();
			}
		} catch (SQLException e) {
			throw new Exception("新增发生异常：" + e.getMessage());
		} finally {
			conn.close();
		}

		if (rt > 0)
			return true;
		else
			return false;
	}
	
	/**
	 * 文件上传专用。
	 * @param sql
	 * @param ii
	 * @param ins
	 * @param fileName
	 * @param fileType
	 * @param moduleID
	 * @param lev
	 * @param remark
	 * @return
	 * @throws Exception
	 */
	public boolean insertFiles(String sql,int ii, InputStream ins,String fileName,String fileType, int moduleID, int lev,
			String remark) throws Exception {
		conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		int rt = 0;
		try {
			// conn.setAutoCommit(false);//禁止自动提交，设置回滚点
			if (conn != null) {
				// 执行预处理
				pstmt = conn.prepareStatement(sql);
				
				pstmt.setInt(1, ii);
				pstmt.setString(2, fileName);
				pstmt.setString(3, fileType);
				pstmt.setBinaryStream(4, ins, ins.available());
				pstmt.setInt(5, moduleID);
				pstmt.setInt(6, lev);
				pstmt.setString(7, remark);
				
				rt = pstmt.executeUpdate();
			}
		} catch (SQLException e) {
			throw new Exception("新增发生异常：" + e.getMessage());
		} finally {
			conn.close();
		}

		if (rt > 0)
			return true;
		else
			return false;
	}

	public int insertBackInt(String sql, List list) throws Exception {
		// conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		int rt = 0;
		try {
			conn.setAutoCommit(false);// 禁止自动提交，设置回滚点
			if (conn != null) {
				// 执行预处理
				pstmt = conn.prepareStatement(sql);
				System.out.println(sql);
				for (int i = 0; i < list.size(); i++) {
					pstmt.setObject(i + 1, list.get(i));
					System.out.println(list.get(i));
				}
				rt = pstmt.executeUpdate();
				System.out.println("新增ID" + rt);
			}
		} catch (SQLException e) {
			throw new Exception("新增发生异常：" + e.getMessage());
		} finally {
			// conn.close();
		}

		return rt;
	}
	
	

	public void getConn() {
		conn = getConnectionByPool();
	}

	public int insertBackInt(HashMap<String, List> map) throws Exception {
		conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		int rt = 0;
		try {
			conn.setAutoCommit(false);// 禁止自动提交，设置回滚点
			if (conn != null) {
				for (String sql : map.keySet()) {
					// 执行预处理
					pstmt = conn.prepareStatement(sql);
					List list = map.get(sql);
					for (int i = 0; i < list.size(); i++) {
						pstmt.setObject(i + 1, list.get(i));
						System.out.println(list.get(i));
					}
					rt = pstmt.executeUpdate();
				}

			}
			conn.commit();
		} catch (SQLException e) {
			conn.rollback();
			throw new Exception("新增发生异常：" + e.getMessage());
		} finally {
			conn.close();
		}

		return rt;
	}

	/**
	 * 更新实现
	 * 
	 * @throws Exception
	 */
	public boolean update(String sql, List list) throws Exception {
		PreparedStatement pstmt = null;
		int rt = 0;
		try {
			conn.setAutoCommit(false);// 禁止自动提交，设置回滚点
			if (conn != null) {
				// 执行预处理
				pstmt = conn.prepareStatement(sql);
				for (int i = 0; i < list.size(); i++) {
					pstmt.setObject(i + 1, list.get(i));
				}
				rt = pstmt.executeUpdate();
			}
		} catch (SQLException e) {
			throw new Exception("更新发生异常：" + e.getMessage());
		}
		if (rt > 0)
			return true;
		else
			return false;
	}

	public int updateInfo(String sql, List list) throws Exception {
		PreparedStatement pstmt = null;
		int rt = 0;
		try {
			// conn.setAutoCommit(false);//禁止自动提交，设置回滚点
			conn = getConnectionByPool();
			if (conn != null) {
				// 执行预处理
				pstmt = conn.prepareStatement(sql);
				for (int i = 0; i < list.size(); i++) {
					pstmt.setObject(i + 1, list.get(i));
				}
				rt = pstmt.executeUpdate();
			} else
				throw new Exception("数据库连接异常。");
		} catch (SQLException e) {
			throw new Exception("更新发生异常：" + e.getMessage());
		} finally {
			conn.close();
		}
		return rt;
	}

	/**
	 * 一个事务中执行多条语句
	 * 
	 * @param sqlList
	 * @return
	 * @throws Exception
	 */
	public boolean executeBatch(List<String> sqlList) throws Exception {

		Connection conn = getConnectionByPool();

		try {
			conn.setAutoCommit(false);// 禁止自动提交，设置回滚点

			for (int i = 0; i < sqlList.size(); i++) {

				String sql = sqlList.get(i);
				Statement stmt = conn.createStatement();
				stmt.execute(sql);

			}
			conn.commit(); // 事务提交
			return true;
		} catch (Exception e) {
			conn.rollback(); // 操作不成功则回滚
			throw new Exception("更新发生异常：" + e.getMessage());

		} finally {
			freeConnection(conn);
			// return true;
		}

	}
	
	public Map<String,Object> getSQLResult4(int indexPage, int pageSize, String sql,
			List list) throws Exception {
		int numre=0;
		Connection conn = getConnectionByPool();
		PreparedStatement pstmt = null;
		ResultSet rst = null;
		List vlist = new ArrayList();
		conn.setAutoCommit(true);
		try {
			pstmt = conn.prepareStatement(sql, ResultSet.TYPE_SCROLL_SENSITIVE,
					ResultSet.CONCUR_UPDATABLE);
			for (int i = 0; i < list.size(); i++) {
				pstmt.setObject(i + 1, list.get(i));
				System.out.println(list.get(i));
			}
			System.out.println(sql);
			pstmt.setMaxRows(indexPage * pageSize);
			// 获取结果集
			rst = pstmt.executeQuery();
			
			rst.last();
	        numre = rst.getRow();  //总行数
	        rst.beforeFirst();
	        int startNum = (indexPage - 1) * pageSize ;
	        if(startNum > 0) {
	        	rst.absolute(startNum);  //定位到请求页的第一条记录
	        }
			// 获取列信息
			ResultSetMetaData rsmd = rst.getMetaData();
			// 循环遍历信息
			while (rst.next()) {
				// 创建map
				Map<String, Object> map = new HashMap<String, Object>();
				// 遍历头信息
				for (int i = 0; i < rsmd.getColumnCount(); i++) {
					map.put(rsmd.getColumnName(i + 1),
							rst.getObject(rsmd.getColumnName(i + 1)));
				}
				// 插入数据
				vlist.add(map);
			}
		} catch (SQLException e) {
			throw new Exception("查询出错：" + e.getMessage());
		} finally {
			conn.close();
		}
		Map<String,Object> mpre=new HashMap<String,Object>();
		mpre.put("data", vlist);
		mpre.put("num", numre);
		return mpre;
	}
	
}
