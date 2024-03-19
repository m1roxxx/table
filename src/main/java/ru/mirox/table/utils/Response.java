package ru.mirox.table.utils;

import java.util.List;

public class Response {
  String type;
  String message;
  Object object;
  String info;

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public Object getObject() {
    return object;
  }

  public void setObject(Object object) {
    this.object = object;
  }

  public String getInfo() {
    return info;
  }

  public void setInfo(String info) {
    this.info = info;
  }
}
