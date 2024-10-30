import React, { useState } from 'react'
import { Search, Menu } from 'lucide-react'
import { Link, Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage.tsx'
import SignupPage from './components/SignupPage.tsx'
import PostJobPage from './components/PostJobPage.tsx'
import HowItWorksPage from './components/HowItWorksPage.tsx'
import './css/App.css';

const categories = ["Web Development", "Graphic Design", "Content Writing", "Digital Marketing", "Video Editing"]

const initialTasks = [
  { id: 1, title: "WordPress Website Development", category: "Web Development", price: 500, deadline: "5 days" },
  { id: 2, title: "Logo Design for Tech Startup", category: "Graphic Design", price: 200, deadline: "3 days" },
  { id: 3, title: "SEO Content Writing", category: "Content Writing", price: 100, deadline: "2 days" },
  { id: 4, title: "Social Media Marketing Campaign", category: "Digital Marketing", price: 300, deadline: "7 days" },
  { id: 5, title: "Mobile App UI/UX Design", category: "Graphic Design", price: 800, deadline: "10 days" },
  { id: 6, title: "Video Editing for YouTube Channel", category: "Video Editing", price: 150, deadline: "4 days" },
]

export default function TaskNetHomepage() {
  const [tasks] = useState(initialTasks)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const filteredTasks = selectedCategories.length > 0
    ? tasks.filter(task => selectedCategories.includes(task.category))
    : tasks

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
  )

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
        </nav>
        <div className="auth-buttons">
          <Link to="/login">
            <button>Log In</button>
          </Link>
          <Link to="/signup">
            <button className="signup-button">Sign Up</button>
          </Link>
        </div>
        <button className="menu-button">
          <Menu size={24} />
        </button>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/post-job" element={<PostJobPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
      </Routes>
    </div>
  )
}