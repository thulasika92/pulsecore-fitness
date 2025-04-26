import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPen, FaUserCircle,FaEdit, FaTrash, } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import './LearningPost.css';
import NavBar from '../../Components/NavBar/NavBar'

function MyLearningPost() {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const navigate = useNavigate();
    const userID = localStorage.getItem("userID");
    useEffect(() => {
        fetch('http://localhost:8080/learningSystem')
            .then((response) => response.json())
            .then((data) => {
                const userSpecificData = data.filter(progress => progress.postOwnerID === userID);
                setPosts(userSpecificData);
                setFilteredPosts(userSpecificData);
            })
            .catch((error) => console.error('Error fetching learning Post data:', error));
    }, [userID]);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this learning Post?")) {
            fetch(`http://localhost:8080/learningSystem/${id}`, {
                method: 'DELETE',
            })
                .then(() => {
                    const updatedData = filteredPosts.filter(progress => progress.id !== id);
                    setFilteredPosts(updatedData);
                    alert("Learning Post deleted successfully.");
                })
                .catch((error) => console.error('Error deleting learning Post:', error));
        }
    };
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <NavBar />
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
                                <div className="card-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/updateLearnPost/${post.id}`)}
                                    >
                                        <FaEdit /> Update
                                    </button>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDelete(post.id)}
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

export default MyLearningPost
