package org.blogPlaform.data.models;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document("Comments")
public class Comment {
    @Id
    private String id;
    @DBRef
    private String postId;
    @DBRef
    private String bloggerId;
    @DBRef
    private String guestId;
    private String message;
}
