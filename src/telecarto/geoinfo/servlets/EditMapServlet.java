package telecarto.geoinfo.servlets;

import telecarto.geoinfo.db.MysqlAccessBean;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class EditMapServlet extends HttpServlet {

	/**
	 * Constructor of the object.
	 */
	public EditMapServlet() {
		super();
	}

	/**
	 * Destruction of the servlet. <br>
	 */
	public void destroy() {
		super.destroy(); // Just puts "destroy" string in log
		// Put your code here
	}

	/**
	 * The doGet method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to get.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html;charset=UTF-8");
		response.setCharacterEncoding("UTF-8");
		String description;
		String name;
		String display;
		String mapClass;
		String mapID = request.getParameter("id");
		int id = Integer.parseInt(mapID);
		String type = request.getParameter("type");
		MysqlAccessBean mysql = null;
		if(type.equals("edit")){//编辑专题图
			description = request.getParameter("description");
			name = request.getParameter("name");
			display = request.getParameter("display");
			mapClass = request.getParameter("mapClass");
			try{
				int flag;
				mysql = new MysqlAccessBean();
				Date time= new Date(new java.util.Date().getTime());
				DateFormat simpleDateFormat= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");   //创建一个格式化日期对象
				String punchTime = simpleDateFormat.format(time);   //格式化后的时间

				String sql = "UPDATE thematic_maps SET MAP_NAME = '" + name + "', DISPLAY = '" + display +
						"',DESCRIPE = '" + description + "',DATE='"+punchTime+"',CLASS='"+mapClass+"' WHERE ID = "+ id +"";
				flag = mysql.update(sql);
				PrintWriter out = response.getWriter();
				out.println(flag);
				out.flush();
				out.close();
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			finally {
				mysql.close();
			}
		}
		else {//删除专题图
			try {
				int flag;
				mysql = new MysqlAccessBean();
				String sql = "DELETE FROM thematic_maps WHERE ID = "+ id +"";
				flag = mysql.update(sql);

				PrintWriter out = response.getWriter();
				out.println(flag);
				out.flush();
				out.close();
			}
			catch (Exception e) {
				e.printStackTrace();
			}
			finally {
				mysql.close();
			}
		}
	}

	/**
	 * The doPost method of the servlet. <br>
	 *
	 * This method is called when a form has its tag value method equals to post.
	 * 
	 * @param request the request send by the client to the server
	 * @param response the response send by the server to the client
	 * @throws ServletException if an error occurred
	 * @throws IOException if an error occurred
	 */
	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doGet(request,response);
	}

	/**
	 * Initialization of the servlet. <br>
	 *
	 * @throws ServletException if an error occurs
	 */
	public void init() throws ServletException {
		// Put your code here
	}

}
