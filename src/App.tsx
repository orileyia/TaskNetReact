import React, { useState, useEffect } from 'react';
import { Search, Menu } from 'lucide-react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage.tsx';
import SignupPage from './components/SignupPage.tsx';
import PostJobPage from './components/PostJobPage.tsx';
import HowItWorksPage from './components/HowItWorksPage.tsx';
import Profile from './components/Profile.tsx';
import './css/App.css';

// Define the structure of a Task
interface Task {
  _id: string;
  title: string;
  category: string;
  budget: number;
  deadline: string;
}

const categories = ["Web Development", "Graphic Design", "Content Writing", "Digital Marketing", "Video Editing"];

export default function TaskNetHomepage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const filteredTasks = selectedCategories.length > 0
    ? tasks.filter((task) => selectedCategories.includes(task.category))
    : tasks;

  const HomePage = () => (
    <main className="container">
      <h2>Find the perfect freelance services for your business</h2>
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for any service..."
            className="search-input"
          />
          <button className="search-button">
            <Search size={20} />
            Search
          </button>
        </div>
        <div className="categories">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-button ${selectedCategories.includes(category) ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <h3>Featured Tasks</h3>
      <div className="tasks-grid">
        {filteredTasks.map((task) => (
          <div key={task._id} className="task-card">
            <div className="task-content">
              <h4 className="task-title">{task.title}</h4>
              <span className="task-category">{task.category}</span>
              <p className="task-details">Budget: ${task.budget}</p>
              <p className="task-details">Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
            </div>
            <div className="task-footer">
              <div className="client-info">
                <img
                  src={`https://i.pravatar.cc/40?img=1`}
                  alt="Client avatar"
                  className="client-avatar"
                />
                <span>Client Name</span>
              </div>
              <button className="bid-button">Bid Now</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );

  return (
    <div className="container">
      <header>
        <div className="logo">
          <Link to="/">TaskNet</Link>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/post-job">Post a Job</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-button">Log Out</button>
          ) : (
            <>
              <Link to="/login">
                <button>Log In</button>
              </Link>
              <Link to="/signup">
                <button className="signup-button">Sign Up</button>
              </Link>
            </>
          )}
        </div>
        <button className="menu-button">
          <Menu size={24} />
        </button>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<SignupPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}