import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';
import TaskNetHomepage from './TaskNetHomepage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PostJobPage from './components/PostJobPage';
import HowItWorksPage from './components/HowItWorksPage';

const categories = ["Web Development", "Graphic Design", "Content Writing", "Digital Marketing", "Video Editing"];

const initialTasks = [
  { id: 1, title: "WordPress Website Development", category: "Web Development", price: 500, deadline: "5 days" },
  { id: 2, title: "Logo Design for Tech Startup", category: "Graphic Design", price: 200, deadline: "3 days" },
  { id: 3, title: "SEO Content Writing", category: "Content Writing", price: 100, deadline: "2 days" },
  { id: 4, title: "Social Media Marketing Campaign", category: "Digital Marketing", price: 300, deadline: "7 days" },
  { id: 5, title: "Mobile App UI/UX Design", category: "Graphic Design", price: 800, deadline: "10 days" },
  { id: 6, title: "Video Editing for YouTube Channel", category: "Video Editing", price: 150, deadline: "4 days" },
];

const TaskNetHomepage: React.FC = () => {
  const [tasks] = useState(initialTasks);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredTasks = selectedCategories.length > 0
    ? tasks.filter(task => selectedCategories.includes(task.category))
    : tasks;

  return (
    <div>
      <header>
        <div className="container">
          <div className="logo">TaskNet</div>
          <Router>
            <Switch>
              <Route exact path="/" component={TaskNetHomepage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
              <Route path="/post-job" component={PostJobPage} />
              <Route path="/how-it-works" component={HowItWorksPage} />
            </Switch>
          </Router>
          <div className="auth-buttons">
            <button>Log In</button>
            <button className="signup-button">Sign Up</button>
          </div>
          <button className="menu-button">
            <Menu size={24} />
          </button>
        </div>
      </header>

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
            {categories.map(category => (
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
            <div key={task.id} className="task-card">
              <div className="task-content">
                <h4 className="task-title">{task.title}</h4>
                <span className="task-category">{task.category}</span>
                <p className="task-details">Budget: ${task.price}</p>
                <p className="task-details">Deadline: {task.deadline}</p>
              </div>
              <div className="task-footer">
                <div className="client-info">
                  <img
                    src={`https://i.pravatar.cc/40?img=${task.id}`}
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
    </div>
  );
};

export default TaskNetHomepage;