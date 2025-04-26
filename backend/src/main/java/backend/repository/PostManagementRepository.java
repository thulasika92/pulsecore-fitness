package backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostManagementRepository extends MongoRepository<PostManagementModel, String> {
   
}
