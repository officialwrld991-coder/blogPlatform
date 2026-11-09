package org.blogPlatform.exceptions;

public class RegisterException extends RuntimeException {
    public RegisterException(String message) {

        super(message);
    }

    public RegisterException(String message, Throwable cause) {
        super(message, cause);
    }

    public RegisterException(Throwable cause) {
        super(cause);
    }

}
