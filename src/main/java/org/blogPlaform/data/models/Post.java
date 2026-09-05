package org.blogPlaform.data.models;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document("Posts")
public class Post {
    @Id
    private String id;
    @DBRef
    private String bloggerId;
    private String title;
    private String content;
    private List<Comment> comments;
}
