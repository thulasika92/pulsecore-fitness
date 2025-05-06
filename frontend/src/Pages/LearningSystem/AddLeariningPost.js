import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LearningPost.css';
import NavBar from '../../Components/NavBar/NavBar';

function AddLeariningPost() {
  const [formData, setFormData] = useState({
    title: '',
    plan: '',
    method: '',
    outCome: '',
    postOwnerID: '',
    postOwnerName: '',
    createdAt: '',
  });

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { ...formData, createdAt: new Date().toISOString() };
    try {
      await axios.post('http://localhost:8080/learningSystem', newPost);
      alert('Post added successfully!');
      setFormData({
        title: '',
        plan: '',
        method: '',
        outCome: '',
        postOwnerID: '',
        postOwnerName: '',
        createdAt: '',
      });
      navigate('/myLearningPlan');
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post.');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="LPost-container">
        <div className="LPost-header">
          <h2>Add Learning Post</h2>
          <p>Share your learning journey with the community</p>
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
//button
          <button type="submit" className="LPost-submit-btn">Submit Post</button>
        </form>
      </div>
    </div>
  );
}

export default AddLeariningPost;
