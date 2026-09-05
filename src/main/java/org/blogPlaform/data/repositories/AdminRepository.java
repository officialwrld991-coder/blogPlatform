package org.blogPlaform.data.repositories;
import org.blogPlaform.data.models.Admin;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface AdminRepository extends MongoRepository<Admin, String> {
}
