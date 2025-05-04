import React, { useState, useEffect } from 'react';
import './LearningPro.css';
import NavBar from '../../Components/NavBar/NavBar';
function AddLearningProgress() {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    feedBack: '',
    postOwnerID: '',
    postOwnerName: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem('userID');
    if (userId) {
      setFormData((prevData) => ({ ...prevData, postOwnerID: userId }));
      fetch(`http://localhost:8080/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.fullname) {
            setFormData((prevData) => ({ ...prevData, postOwnerName: data.fullname }));
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/learningProgress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Learning Progress added successfully!');
        window.location.href = '/MylearningProgress';
      } else {
        alert('Failed to add Learning Progress.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="pro-learning-container">
        <div className="pro-learning-header">
          <h2>Add Learning Progress</h2>
          <p>Track your learning journey and achievements</p>
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

          <button type="submit" className="pro-submit-btn">Add Progress</button>
        </form>
      </div>
    </div>
  );
}

export default AddLearningProgress;