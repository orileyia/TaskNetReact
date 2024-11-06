import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api';
import '../css/SignupPage.css';

interface LoginPageProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  introduction: string;
  languages: string[];
  skills: string[];
}

const SignupPage: React.FC<LoginPageProps> = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState<SignupData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    location: 'Sofia',
    introduction: '',
    languages: [],
    skills: [],
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'languages' | 'skills') => {
    const values = e.target.value.split(',').map(item => item.trim());
    setFormData(prev => ({ ...prev, [field]: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (formData.password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await signup(formData);
      localStorage.setItem('token', response.token);
      setIsLoggedIn(true);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An error occurred during signup');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h1>Sign up for TaskNet</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
            >
              <option value="Sofia">Sofia</option>
              <option value="Plovdiv">Plovdiv</option>
              <option value="Varna">Varna</option>
              <option value="Burgas">Burgas</option>
              <option value="Ruse">Ruse</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="introduction">Introduction</label>
            <textarea
              id="introduction"
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="languages">Languages (comma-separated)</label>
            <input
              type="text"
              id="languages"
              value={formData.languages.join(', ')}
              onChange={(e) => handleArrayInputChange(e, 'languages')}
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills (comma-separated)</label>
            <input
              type="text"
              id="skills"
              value={formData.skills.join(', ')}
              onChange={(e) => handleArrayInputChange(e, 'skills')}
            />
          </div>
          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;