'use client'

import React, { useState, useEffect } from 'react';
import { Search, Menu } from 'lucide-react';
import { getRequest, putRequest } from '../requestUtils.js';
import '../css/ProfileModule.css';

import facebookIcon from '../images/facebook.png';
import twitterIcon from '../images/twitter.jpg';
import whatsappIcon from '../images/whatsapp.jpeg';
import callIcon from '../images/call.png';
import defaultProfileImage from '../images/profile.jpg';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  introduction: string;
  languages: string[];
  skills: string[];
  facebook: string;
  twitter: string;
  whatsapp: string;
  call: string;
}

const categories = ["Web Development", "Graphic Design", "Content Writing", "Digital Marketing", "Video Editing"];

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ strength: '', percentage: 0, color: '#dc3545' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getRequest('/api/profile');
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'languages' | 'skills') => {
    const values = e.target.value.split(',').map(item => item.trim());
    setProfile(prev => prev ? { ...prev, [field]: values } : null);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      await putRequest('/api/profile', profile);
      showMessage('Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error updating profile:', error);
      showMessage('Error updating profile. Please try again.', 'error');
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showMessage('Passwords do not match.', 'error');
      return;
    }

    if (passwordStrength.percentage < 60) {
      showMessage('Please ensure your new password meets all requirements.', 'error');
      return;
    }

    try {
      await putRequest('/api/change-password', { newPassword });
      showMessage('Password updated successfully!', 'success');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error changing password:', error);
      showMessage('Error changing password. Please try again.', 'error');
    }
  };

  const checkPasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const strengthPercentage = Object.values(requirements).filter(Boolean).length * 20;
    let strength = 'weak';
    let color = '#dc3545';

    if (strengthPercentage >= 80) {
      strength = 'strong';
      color = '#048565';
    } else if (strengthPercentage >= 60) {
      strength = 'good';
      color = '#52a4fc';
    } else if (strengthPercentage >= 40) {
      strength = 'medium';
      color = '#ffc107';
    }

    setPasswordStrength({ strength, percentage: strengthPercentage, color });
  };

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-min-h-screen profile-bg-background profile-flex">
      <div className="profile-flex-1">
        <div className="profile-main-content">
          <div className="profile-left-form" style={{ marginTop: 20 }}>
            <div className="profile-section">
              <div className="profile-image">
                <img src={profileImage} alt="Profile" style={{ width: '100%', height: 'auto' }} />
              </div>
              <h2 className="profile-name" id="nameAll">{profile.firstName} {profile.lastName}</h2>
              <p className="profile-title">Developer</p>
              <div className="profile-rating">
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
                <i>★</i>
              </div>
              <div className="profile-social-links">
                <ul className="profile-candidate-detail-social-menu list-inline mb-0">
                  <li className="list-inline-item">
                    <a href={profile.facebook} className="profile-social-link" target="_blank" rel="noopener noreferrer">
                      <img src={facebookIcon} alt="Facebook" className="profile-social-icon" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={profile.twitter} className="profile-social-link" target="_blank" rel="noopener noreferrer">
                      <img src={twitterIcon} alt="Twitter" className="profile-social-icon" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={profile.whatsapp} className="profile-social-link" target="_blank" rel="noopener noreferrer">
                      <img src={whatsappIcon} alt="WhatsApp" className="profile-social-icon" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href={profile.call} className="profile-social-link" target="_blank" rel="noopener noreferrer">
                      <img src={callIcon} alt="Call" className="profile-social-icon" />
                    </a>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="profile-contacts">
                <h3 className="profile-section-title">Contacts</h3>
                <p className="profile-contact-info mt-3">
                  <span>Email:</span> <span id="displayEmail">{profile.email}</span>
                </p>
                <p className="profile-contact-info">
                  <span>Phone:</span> <span id="displayPhone">{profile.phone}</span>
                </p>
                <p className="profile-contact-info mt-3">
                  <span>Location:</span> <span id="selectedLocation">{profile.location}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="profile-right-form">
            <div className="profile-card profile-content-page mt-4 mt-lg-0" style={{ marginTop: 20 }}>
              <div className="profile-button-container">
                <button type="button" className={`profile-btn ${activeTab === 'overview' ? 'profile-btn-overview' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                <div className="profile-separator"></div>
                <button type="button" className={`profile-btn ${activeTab === 'settings' ? 'profile-btn-settings' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
              </div>
              <hr />
              <div className="profile-card-body p-4">
                <div className="profile-tab-content" id="pills-tabContent">
                  {activeTab === 'overview' && (
                    <div className="profile-tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                      <div>
                        <h4 className="profile-fs-18 profile-fw-bold">About</h4>
                        <p className="text-muted mt-4" id="introductionParagraph">{profile.introduction}</p>
                      </div>
                      <hr className="profile-my-4" />
                      <h4 className="profile-fs-18 profile-fw-bold mt-4">Skills</h4>
                      <div className="profile-candidate-skills-content mt-4" id="skillsButtonsContainer">
                        {profile.skills.map((skill, index) => (
                          <button key={index} className="profile-btn profile-btn-sm profile-btn-skill mb-2">{skill}</button>
                        ))}
                      </div>
                      <h4 className="profile-fs-18 profile-fw-bold mt-4">Spoken languages</h4>
                      <div className="profile-candidate-languages-content mt-4" id="languageButtonsContainer">
                        {profile.languages.map((language, index) => (
                          <button key={index} className="profile-btn profile-btn-sm profile-btn-language mb-2">{language}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {activeTab === 'settings' && (
                    <div className="profile-tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                      <form onSubmit={handleSubmit}>
                        <div className="profile-form-group">
                          <h5 className="profile-fs-17 profile-fw-semibold mb-3 text-center">My Account</h5>
                          <div className="text-center mb-4">
                            <div className="profile-image-circle">
                              <img src={profileImage} className="profile-img" id="profile-img" alt="Profile" />
                            </div>
                            <div className="profile-photo-edit">
                              <input id="profile-img-file-input" type="file" className="profile-img-file-input" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                              <label htmlFor="profile-img-file-input" className="profile-photo-edit-label" style={{ cursor: 'pointer' }}>
                                Choose image
                              </label>
                            </div>
                          </div>
                          <div className="profile-row mb-3">
                            <div className="profile-col-lg-6">
                              <label htmlFor="firstName" className="profile-form-label">First Name</label>
                              <input type="text" className="profile-form-control" id="firstName" name="firstName" value={profile.firstName} onChange={handleInputChange} />
                            </div>
                            <div className="profile-col-lg-6">
                              <label htmlFor="lastName" className="profile-form-label">Last Name</label>
                              <input type="text" className="profile-form-control" id="lastName" name="lastName" value={profile.lastName} onChange={handleInputChange} />
                            </div>
                          </div>
                          <div className="profile-row mb-3">
                            <div className="profile-col-lg-6">
                              <label htmlFor="email" className="profile-form-label">Email</label>
                              <input type="email" className="profile-form-control" id="email" name="email" value={profile.email} onChange={handleInputChange} />
                            </div>
                            <div className="profile-col-lg-6">
                              <label htmlFor="phone" className="profile-form-label">Phone</label>
                              <input type="tel" className="profile-form-control" id="phone" name="phone" value={profile.phone} onChange={handleInputChange} />
                            </div>
                          </div>
                          <div className="profile-row mb-3">
                            <div className="profile-col-lg-6">
                              <label htmlFor="location" className="profile-form-label">Location</label>
                              <select className="profile-form-select" id="location" name="location" value={profile.location} onChange={handleInputChange}>
                                <option value="Sofia">Sofia</option>
                                <option value="Plovdiv">Plovdiv</option>
                                <option value="Varna">Varna</option>
                                <option value="Burgas">Burgas</option>
                                <option value="Ruse">Ruse</option>
                              </select>
                            </div>
                          </div>
                          <h5 className="profile-fs-17 profile-fw-semibold mb-3">Profile</h5>
                          <h5 className="">Introduce Yourself</h5>
                          <textarea className="profile-form-control" id="introduction" name="introduction" rows={5} style={{ maxWidth: '100%' }} value={profile.introduction} onChange={handleInputChange}></textarea>
                          <div className="profile-row mb-3">
                            <div className="profile-col-lg-6">
                              <label htmlFor="languages" className="profile-form-label">Languages</label>
                              <input type="text" className="profile-form-control" id="languages" value={profile.languages.join(', ')} onChange={(e) => handleArrayInputChange(e, 'languages')} />
                            </div>
                            <div className="profile-col-lg-6">
                              <label htmlFor="skills" className="profile-form-label">Skills</label>
                              <input type="text" className="profile-form-control" id="skills" value={profile.skills.join(', ')} onChange={(e) => handleArrayInputChange(e, 'skills')} />
                            </div>
                          </div>
                          <h5 className="profile-fs-17 profile-fw-semibold mb-3">Social Media</h5>
                          <div className="profile-row mb-3">
                            <div className="profile-col-lg-6">
                              <label htmlFor="facebook" className="profile-form-label">Facebook</label>
                              <input type="text" className="profile-form-control" id="facebook" name="facebook" value={profile.facebook} onChange={handleInputChange} />
                            </div>
                            <div className="profile-col-lg-6">
                              <label htmlFor="twitter" className="profile-form-label">Twitter</label>
                              <input type="text" className="profile-form-control" id="twitter" name="twitter" value={profile.twitter} onChange={handleInputChange} />
                            </div>
                          </div>
                          <div className="profile-row mb-3">
                            <div className="profile-col-lg-6">
                              <label htmlFor="whatsapp" className="profile-form-label">WhatsApp</label>
                              <input type="text" className="profile-form-control" id="whatsapp" name="whatsapp" value={profile.whatsapp} onChange={handleInputChange} />
                            </div>
                            <div className="profile-col-lg-6">
                              <label htmlFor="call" className="profile-form-label">Call</label>
                              <input type="text" className="profile-form-control" id="call" name="call" value={profile.call} onChange={handleInputChange} />
                            </div>
                          </div>
                          <div className="profile-card">
                            <div className="profile-card-body">
                              <h5 className="profile-fs-17 profile-fw-semibold mb-3">Change Password</h5>
                              <div id="passwordChangeForm">
                                <div className="profile-row mb-3">
                                  <div className="profile-col-lg-6">
                                    <label htmlFor="newPassword" className="profile-form-label">New password</label>
                                    <div className="profile-input-group">
                                      <input type="password" className="profile-form-control" id="newPassword" value={newPassword} onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        checkPasswordStrength(e.target.value);
                                      }} />
                                    </div>
                                    <div id="passwordStrength" className="mt-2" style={{ color: passwordStrength.color }}>
                                      Password Strength: {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                                    </div>
                                  </div>
                                  <div className="profile-col-lg-6">
                                    <label htmlFor="confirmPassword" className="profile-form-label">Confirm password</label>
                                    <div className="profile-input-group">
                                      <input type="password" className="profile-form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                    </div>
                                  </div>
                                </div>
                                <div className="profile-password-requirements mb-3">
                                  <h6 className="profile-fw-semibold mb-2">Password must contain:</h6>
                                  <ul className="list-unstyled">
                                    <li id="length" className={`text-muted ${newPassword.length >= 8 ? 'valid' : ''}`}>
                                      <i className={`fas ${newPassword.length >= 8 ? 'fa-check-circle' : 'fa-circle-notch'} me-2`}></i>
                                      At least 8 characters
                                    </li>
                                    <li id="uppercase" className={`text-muted ${/[A-Z]/.test(newPassword) ? 'valid' : ''}`}>
                                      <i className={`fas ${/[A-Z]/.test(newPassword) ? 'fa-check-circle' : 'fa-circle-notch'} me-2`}></i>
                                      At least one uppercase letter
                                    </li>
                                    <li id="lowercase" className={`text-muted ${/[a-z]/.test(newPassword) ? 'valid' : ''}`}>
                                      <i className={`fas ${/[a-z]/.test(newPassword) ? 'fa-check-circle' : 'fa-circle-notch'} me-2`}></i>
                                      At least one lowercase letter
                                    </li>
                                    <li id="number" className={`text-muted ${/[0-9]/.test(newPassword) ? 'valid' : ''}`}>
                                      <i className={`fas ${/[0-9]/.test(newPassword) ? 'fa-check-circle' : 'fa-circle-notch'} me-2`}></i>
                                      At least one number
                                    </li>
                                    <li id="special" className={`text-muted ${/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'valid' : ''}`}>
                                      <i className={`fas ${/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'fa-check-circle' : 'fa-circle-notch'} me-2`}></i>
                                      At least one special character
                                    </li>
                                  </ul>
                                </div>
                                <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                                  <button className="profile-btn profile-btn-primary" onClick={handlePasswordChange}>Update Password</button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                            <button type="submit" className="profile-btn profile-btn-primary">Update Profile</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {message && (
        <div id="message" className={`mt-3 ${messageType === 'success' ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}