import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LearningPost.css';
import NavBar from '../../Components/NavBar/NavBar';

function UpdateLearnPost() {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    plan: '',
    method: '',
    outCome: '',
    postOwnerID: '',
    postOwnerName: '',
  });

  useEffect(() => {
    // Fetch the existing post data
    axios.get(`http://localhost:8080/learningSystem/${id}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => console.error('Error fetching post data:', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/learningSystem/${id}`, formData);
      alert('Post updated successfully!');
      navigate('/myLearningPlan');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="LPost-container">
        <div className="LPost-header">
          <h2>Update Learning Post</h2>
          <p>Edit your learning journey details</p>
        </div>

        <form className="LPost-form" onSubmit={handleSubmit}>
          <div className="LPost-form-group">
            <label>Title</label>
            <input
              className="LPost-form-input"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Enter your learning topic"
            />
          </div>

          <div className="LPost-form-group">
            <label>Plan</label>
            <textarea
              className="LPost-form-textarea"
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              required
              placeholder="Describe your learning plan"
            />
          </div>

          <div className="LPost-form-group">
            <label>Method</label>
            <textarea
              className="LPost-form-textarea"
              value={formData.method}
              onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              required
              placeholder="Explain your learning methods"
            />
          </div>

          <div className="LPost-form-group">
            <label>Outcome</label>
            <textarea
              className="LPost-form-textarea"
              value={formData.outCome}
              onChange={(e) => setFormData({ ...formData, outCome: e.target.value })}
              required
              placeholder="Share what you've achieved"
            />
          </div>

          <button type="submit" className="LPost-submit-btn">Update Post</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateLearnPost;
