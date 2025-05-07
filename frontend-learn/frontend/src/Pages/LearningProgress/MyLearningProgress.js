import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaEdit, FaTrash, FaPen } from "react-icons/fa";
import './LearningPro.css';
import NavBar from '../../Components/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';
//forntend of learning
function MyLearningProgress() {
  const [progressData, setProgressData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    fetch('http://localhost:8080/learningProgress')
      .then((response) => response.json())
      .then((data) => {
        const userSpecificData = data.filter(progress => progress.postOwnerID === userID);
        setProgressData(userSpecificData);
        setFilteredData(userSpecificData);
      })
      .catch((error) => console.error('Error fetching learning progress data:', error));
  }, [userID]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this learning progress?")) {
      fetch(`http://localhost:8080/learningProgress/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          const updatedData = filteredData.filter(progress => progress.id !== id);
          setFilteredData(updatedData);
          alert("Learning progress deleted successfully.");
        })
        .catch((error) => console.error('Error deleting learning progress:', error));
    }
  };

  return (
    <div>
      <NavBar />
      <div className="progress-container">
        <div className="progress-header">
          <h1>Learning Progress</h1>
          <p>Track and manage your learning journey</p>
        </div>
        <div className='create_btn' onClick={()=>(window.location.href='/addLearningProgress')}>
          <FaPen className='create_btn_icon' />
        </div>
        <div className="progress-grid">
          {filteredData.length === 0 ? (
            <div className="empty-state">
              <p>No learning progress found. Start by creating your first progress entry.</p>
            </div>
          ) : (
            filteredData.map((progress) => (
              <div className="progress-card" key={progress.id}>
                <div className="card-header">
                  <div className="user-avatar">
                    <FaUserCircle />
                  </div>
                  <div className="user-name">
                    {progress.postOwnerName}
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="progress-title">{progress.title}</h3>
                  <p className="progress-description">{progress.description}</p>

                  {progress.feedBack && (
                    <div className="progress-feedback">
                      <p>{progress.feedBack}</p>
                    </div>
                  )}

                  <div className="date-section">
                    <div className="date-item">
                      <span className="date-label">Start Date</span>
                      <span>{new Date(progress.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="date-item">
                      <span className="date-label">End Date</span>
                      <span>{new Date(progress.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/updateLearningProgress/${progress.id}`)}
                  >
                    <FaEdit /> Update
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(progress.id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyLearningProgress;
