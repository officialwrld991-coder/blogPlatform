package org.blogPlatform.exceptions;

public class AdminException extends RuntimeException {
    public AdminException(String message) {
        super(message);
    }

    public AdminException(String message, Throwable cause) {
        super(message, cause);
    }

    public AdminException(Throwable cause) {
        super(cause);
    }
}
