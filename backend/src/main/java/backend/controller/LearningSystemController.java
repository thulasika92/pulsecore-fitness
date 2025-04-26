package backend.controller;

import backend.exception.LearningSystemNotFoundException;
import backend.exception.UserNotFoundException;
import backend.model.Comment;
import backend.model.LearningSystemModel;
import backend.repository.LearningSystemRepository;
import backend.repository.NotificationRepository;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
public class LearningSystemController {
    @Autowired
    private LearningSystemRepository learningSystemRepository;

    @PostMapping("/learningSystem")
    public LearningSystemModel newLearningSystemModel(@RequestBody LearningSystemModel newLearningSystemModel) {
        newLearningSystemModel.setCreatedAt(LocalDateTime.now());
        return learningSystemRepository.save(newLearningSystemModel);
    }

    @GetMapping("/learningSystem")
    List<LearningSystemModel> getAll() {
        return learningSystemRepository.findAll();
    }

    @GetMapping("/learningSystem/{id}")
    public LearningSystemModel getById(@PathVariable String id) {
        return learningSystemRepository.findById(id)
                .orElseThrow(() -> new LearningSystemNotFoundException(id));
    }

    @PutMapping("/learningSystem/{id}")
    LearningSystemModel update(@RequestBody LearningSystemModel newLearningSystemModel, @PathVariable String id) {
        return learningSystemRepository.findById(id)
                .map(learningSystemModel -> {
                    learningSystemModel.setTitle(newLearningSystemModel.getTitle());
                    learningSystemModel.setPlan(newLearningSystemModel.getPlan());
                    learningSystemModel.setMethod(newLearningSystemModel.getMethod());
                    learningSystemModel.setOutCome(newLearningSystemModel.getOutCome());
                    learningSystemModel.setPostOwnerID(newLearningSystemModel.getPostOwnerID());
                    learningSystemModel.setPostOwnerName(newLearningSystemModel.getPostOwnerName());
                    return learningSystemRepository.save(learningSystemModel);
                }).orElseThrow(() -> new LearningSystemNotFoundException(id));
    }

    @DeleteMapping("/learningSystem/{id}")
    public void delete(@PathVariable String id) {
        learningSystemRepository.deleteById(id);
    }
}
