package com.topwulian.utils;

import java.util.Base64;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

public class ParseBase64ImgUtil {

    private ParseBase64ImgUtil(){}

    public static InputStream parse(String img) throws IOException {
        String imageFile = img.replaceFirst(".*;base64,", "");
        Base64.Decoder decoder = Base64.getDecoder();
        byte[] bytes1 = decoder.decode(imageFile);
        return new ByteArrayInputStream(bytes1);
    }

}
