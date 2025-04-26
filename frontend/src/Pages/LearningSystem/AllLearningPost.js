import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen, FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './LearningPost.css';
import NavBar from '../../Components/NavBar/NavBar'
function AllLearningPost() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/learningSystem');
        setPosts(response.data);
        setFilteredPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <NavBar/>
      <div className="LPost-container_new ">
        <div className="LPost-header">
          <h1>Learning Posts</h1>
          <p>Explore the learning journeys shared by our community</p>
        </div>
        <div className='create_btn' onClick={() => (window.location.href = '/addLeariningPost')}>
          <FaPen />
        </div>
        <div className="LPost-grid">
          {filteredPosts.length === 0 ? (
            <div className="LPost-empty-state">
              <p>No posts found. Please create a new post.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div className="LPost-card" key={post.id}>
                <div className="LPost-card-header">
                  <div className="LPost-user-info">
                    <div className="LPost-user-avatar">
                      <FaUserCircle />
                    </div>
                    <div className="LPost-user-name">{post.postOwnerName}</div>
                  </div>
                  <div className="LPost-date">{formatDate(post.createdAt)}</div>
                </div>

                <div className="LPost-card-body">
                  <h3 className="LPost-title">{post.title}</h3>

                  <div className="LPost-content-section">
                    <span className="LPost-content-label">Plan:</span>
                    <p className="LPost-content-text">{post.plan}</p>
                  </div>

                  <div className="LPost-content-section">
                    <span className="LPost-content-label">Method:</span>
                    <p className="LPost-content-text">{post.method}</p>
                  </div>

                  <div className="LPost-content-section">
                    <span className="LPost-content-label">Outcome:</span>
                    <p className="LPost-content-text">{post.outCome}</p>
                  </div>


                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllLearningPost;