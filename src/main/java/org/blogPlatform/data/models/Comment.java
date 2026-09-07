package org.blogPlatform.data.models;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;


@Data
@Entity
public class Comment {
    @Id
    private String id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "blogger_id")
    private Blogger blogger;

    @ManyToOne
    @JoinColumn(name = "guest_id")
    private Guest guest;

    private String message;
}
