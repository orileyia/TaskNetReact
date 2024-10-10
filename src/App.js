import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
    <h2 className="text-lg font-semibold mb-4">Navigation</h2>
    <nav>
      <a href="index.html" className="nav-item">
        <i data-lucide="home" />
        Home
      </a>
      <a href="#" className="nav-item">
        <i data-lucide="briefcase" />
        My Jobs
      </a>
      <a href="#" className="nav-item">
        <i data-lucide="users" />
        Find Freelancers
      </a>
      <a href="#" className="nav-item">
        <i data-lucide="message-square" />
        Messages
      </a>
      <a href="#" className="nav-item">
        <i data-lucide="settings" />
        Settings
      </a>
    </nav>
  </aside>
  )
}

export default App;
