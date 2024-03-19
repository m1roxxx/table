package ru.mirox.table.authentication;

import java.util.UUID;

public class WebSession {
  String session_id;
  long creation_time;
  long last_used_time;
  long max_inactive_interval;

  public void createSession() {
    session_id = generateSessionId();
    creation_time = System.currentTimeMillis() / 1000L;
    last_used_time = System.currentTimeMillis() / 1000L;
    max_inactive_interval = 20;
  }

  private String generateSessionId() {
    return UUID.randomUUID().toString().replaceAll("-","").toUpperCase();
  }

  public String getSession_id() {
    return session_id;
  }

  public long getCreation_time() {
    return creation_time;
  }
  public long getLast_used_time() {
    return last_used_time;
  }

  public long getMax_inactive_interval() {
    return max_inactive_interval;
  }

  public void setSession_id(String session_id) {
    this.session_id = session_id;
  }

  public void setCreation_time(long creation_time) {
    this.creation_time = creation_time;
  }

  public void setLast_used_time(long last_used_time) {
    this.last_used_time = last_used_time;
  }

  public void setMax_inactive_interval(long max_inactive_interval) {
    this.max_inactive_interval = max_inactive_interval;
  }
}
