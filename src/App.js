import logo from './logo.svg';
import './App.css';
import { Icon, Import } from 'lucide-react';
import { BriefcaseBusiness, UserPlus, MessageSquare, Settings, House } from 'lucide-react';


function App() {
  return (
    <Sidebar />
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
    <h2 className="text-lg font-semibold mb-4">Navigation</h2>
    <nav>
      <a href="index.html" className="nav-item">
        <House />
        <span>Home</span>
      </a>
      <a href="#" className="nav-item">
        <BriefcaseBusiness />
        <span>My Jobs</span>
      </a>
      <a href="#" className="nav-item">
        <UserPlus />
        <span>Find Freelancers</span>
      </a>
      <a href="#" className="nav-item">
        <MessageSquare />
        <span>Messages</span>
      </a>
      <a href="#" className="nav-item">
        <Settings />
        <span>Settings</span>
      </a>
    </nav>
  </aside>
  )
}

export default App;
