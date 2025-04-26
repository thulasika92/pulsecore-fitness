import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../Components/NavBar/NavBar';

function UpdateLearningProgress() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    skillTitle: '',
    description: '',
    field: '',
    startDate: '',
    endDate: '',
    level: '',
    postOwnerID: '',
    postOwnerName: ''
  });

  useEffect(() => {
    fetch(`http://localhost:8080/learningProgress/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error('Error fetching learning progress data:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/learningProgress/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Learning Progress updated successfully!');
        window.location.href = '/MylearningProgress';
      } else {
        alert('Failed to update Learning Progress.');
      }
    } catch (error) {
      console.error('Error updating learning progress:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="pro-learning-container">
        <div className="pro-learning-header">
          <h2>Update  Your Learning Progress</h2>
          <p>Update your learning journey and achievements</p>
        </div>

        <form className="pro-learning-form" onSubmit={handleSubmit}>
          <div className="pro-form-group">
            <label>Title</label>
            <input
              className="pro-form-input"
              name="title"
              placeholder="Enter progress title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pro-date-inputs">
            <div className="pro-form-group">
              <label>Start Date</label>
              <input
                className="pro-form-input"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="pro-form-group">
              <label>End Date</label>
              <input
                className="pro-form-input"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => {
                  const { name, value } = e.target;
                  if (new Date(value) < new Date(formData.startDate)) {
                    alert("End date cannot be earlier than start date.");
                    return;
                  }
                  handleChange(e);
                }}
                required
              />
            </div>
          </div>

          <div className="pro-form-group">
            <label>Description</label>
            <textarea
              className="pro-form-textarea"
              name="description"
              placeholder="Describe what you've learned"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="pro-form-group">
            <label>Feedback</label>
            <textarea
              className="pro-form-textarea"
              name="feedBack"
              placeholder="Add any feedback or reflections"
              value={formData.feedBack}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="pro-submit-btn">Update Progress</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateLearningProgress;
