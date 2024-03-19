package ru.mirox.table;

import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.mirox.table.database.DataBaseHandler;
import ru.mirox.table.utils.Response;

import java.io.IOException;
import java.sql.SQLException;

@WebServlet("/api/users")
public class UserServlet extends HttpServlet {
  @Override
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("/api/users   GET");

    Gson gson = new Gson();
    DataBaseHandler dataBaseHandler = new DataBaseHandler();

    int limit = Integer.parseInt(req.getParameter("showRows"));
    int pageNumber = Integer.parseInt(req.getParameter("pageNumber"));
    try {
      Response response = new Response();
      response.setType("success");
      response.setMessage("array users in object");
      response.setInfo(Integer.toString(dataBaseHandler.getNumberRows()));
      response.setObject(dataBaseHandler.getUsers(limit, pageNumber - 1));
      resp.getWriter().write(gson.toJson(response));
    } catch (SQLException | ClassNotFoundException e) {
      throw new RuntimeException(e);
    }

  }
}
