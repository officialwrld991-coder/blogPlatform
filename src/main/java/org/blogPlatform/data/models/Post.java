package org.blogPlatform.data.models;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
public class Post {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "blogger_id")
    private Blogger blogger;

    private String title;
    private String content;
    @OneToMany
    private List<Comment> comments;
}
