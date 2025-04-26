package backend.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Document(collection = "LearningSystem")
public class LearningSystemModel {
    @Id
    @GeneratedValue
    private String id;
    private String title;
    private String plan;
    private String method;
    private String outCome;
    private String postOwnerID;
    private String postOwnerName;
    private LocalDateTime createdAt;

    public LearningSystemModel() {
    }

    public LearningSystemModel(String id, String title, String plan, String method, String outCome, String postOwnerID, String postOwnerName, LocalDateTime createdAt) {
        this.id = id;
        this.title = title;
        this.plan = plan;
        this.method = method;
        this.outCome = outCome;
        this.postOwnerID = postOwnerID;
        this.postOwnerName = postOwnerName;
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getOutCome() {
        return outCome;
    }

    public void setOutCome(String outCome) {
        this.outCome = outCome;
    }

    public String getPostOwnerID() {
        return postOwnerID;
    }

    public void setPostOwnerID(String postOwnerID) {
        this.postOwnerID = postOwnerID;
    }

    public String getPostOwnerName() {
        return postOwnerName;
    }

    public void setPostOwnerName(String postOwnerName) {
        this.postOwnerName = postOwnerName;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
