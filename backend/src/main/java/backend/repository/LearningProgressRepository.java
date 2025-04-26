package backend.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface LearningProgressRepository extends MongoRepository<LearningProgressModel,String> {
}
