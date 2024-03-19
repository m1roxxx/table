package ru.mirox.table.authentication;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.KeySpec;
import java.util.Base64;

public class Encoder {

  static int iterationCount = 65536;
  static int keyLength = 128;

  static public String hashPassword(String password, byte[] salt) throws NoSuchAlgorithmException, InvalidKeySpecException {

    KeySpec spec = new PBEKeySpec(password.toCharArray(), salt, iterationCount, keyLength);
    SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1");

    byte[] hash = factory.generateSecret(spec).getEncoded();

    Base64.Encoder encoder = Base64.getEncoder();
    return encoder.encodeToString(hash) + ":" + encoder.encodeToString(salt);
  }

  public static byte[] generateSalt() {
    SecureRandom random = new SecureRandom();
    byte[] salt = new byte[16];
    random.nextBytes(salt);
    return salt;
  }

}
