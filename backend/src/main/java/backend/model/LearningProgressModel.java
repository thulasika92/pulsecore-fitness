package backend.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "LearningProgress")
public class LearningProgressModel {
    @Id
    @GeneratedValue
    private String id;
    private String postOwnerID;
    private String postOwnerName;
    private String title;
    private String startDate;
    private String endDate;
    private String description;
    private String feedBack;

    public LearningProgressModel() {

    }

    public LearningProgressModel(String id, String postOwnerID, String postOwnerName, String title, String startDate, String endDate, String description, String feedBack) {
        this.id = id;
        this.postOwnerID = postOwnerID;
        this.postOwnerName = postOwnerName;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.feedBack = feedBack;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFeedBack() {
        return feedBack;
    }

    public void setFeedBack(String feedBack) {
        this.feedBack = feedBack;
    }
}
