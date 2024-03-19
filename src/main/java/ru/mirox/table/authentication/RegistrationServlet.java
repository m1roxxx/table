package ru.mirox.table.authentication;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import ru.mirox.table.utils.Response;
import ru.mirox.table.database.DataBaseHandler;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.SQLException;

@WebServlet("/api/registration")
public class RegistrationServlet extends HttpServlet {
  @Override
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
    System.out.println("/registration   POST");

    try {

    Gson gson = new Gson();
    DataBaseHandler dataBaseHandler = new DataBaseHandler();

    JsonObject request = gson.fromJson(req.getReader().readLine(), JsonObject.class);

    String name = request.get("name").getAsString();
    String lastName = request.get("lastName").getAsString();
    String email = request.get("email").getAsString();
    String password = request.get("password").getAsString();

    Response response = new Response();

    if(!dataBaseHandler.checkUserOnExistsByEmail(email)) {
      dataBaseHandler.addNewUser(name, lastName, email, password);

      response.setType("success");
      response.setMessage("");
    }else {
      response.setType("error");
      response.setMessage("user already exists");
    }

      resp.getWriter().write(gson.toJson(response));

    } catch (SQLException | ClassNotFoundException | NoSuchAlgorithmException | InvalidKeySpecException e) {
      throw new RuntimeException(e);
    }

  }
}
