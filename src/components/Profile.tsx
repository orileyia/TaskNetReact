import React, { useState, useEffect, useRef } from 'react';
import '../css/ProfileModule.css';

import facebookIcon from '../images/facebook.png';
import twitterIcon from '../images/twitter.jpg';
import whatsappIcon from '../images/whatsapp.jpeg';
import callIcon from '../images/call.png';
import defaultProfileImage from '../images/profile.jpg';

import { Link } from 'react-router-dom';
import BookmarksJobs from './BookmarksJobs';

const Profile = () => {
    useEffect(() => {
        showOverview();
    }, []);

    const [activeTab, setActiveTab] = useState('overview');
    const [profileImage, setProfileImage] = useState(defaultProfileImage);
    const [firstName, setFirstName] = useState('Iva');
    const [lastName, setLastName] = useState('Traykova');
    const [email, setEmail] = useState('user@gmail.com');
    const [location, setLocation] = useState('Varna');
    const [introduction, setIntroduction] = useState('Developer with over 5 years\' experience working in both the public and private sectors...');
    const [languages, setLanguages] = useState(['English', 'German', 'French']);
    const [tempProfileImage, setTempProfileImage] = useState(null);
    // Temporary state variables for updates
    const [tempFirstName, setTempFirstName] = useState(firstName);
    const [tempLastName, setTempLastName] = useState(lastName);
    const [tempEmail, setTempEmail] = useState(email);
    const [tempLocation, setTempLocation] = useState(location);
    const [tempIntroduction, setTempIntroduction] = useState(introduction);
    const [tempLanguages, setTempLanguages] = useState(languages.join(', '));

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ strength: '', percentage: 0, color: '#dc3545' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const currentPasswordRef = useRef(null);

    useEffect(() => {
        showOverview();
    }, []);

    const showOverview = () => {
        setActiveTab('overview');
    };

    const showSettings = () => {
        setActiveTab('settings');
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const target = e.target;
            if (target && typeof target.result === 'string') {
                setProfileImage(target.result); // Актуализираме изображението в реално време
                localStorage.setItem('tempProfileImage', target.result); // Запазваме изображението в локалното хранилище
            }
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const updateData = () => {
        // Update the main state variables with the temporary state variables
        setFirstName(tempFirstName);
        setLastName(tempLastName);
        setEmail(tempEmail);
        setLocation(tempLocation);
        setIntroduction(tempIntroduction);
        setLanguages(tempLanguages.split(',').map(lang => lang.trim()));
    
        // Reset the temporary state variables
        setTempFirstName(tempFirstName);
        setTempLastName(tempLastName);
        setTempEmail(tempEmail);
        setTempLocation(tempLocation);
        setTempIntroduction(tempIntroduction);
        setTempLanguages(tempLanguages);
    
        const newImageSrc = localStorage.getItem('tempProfileImage');
    if (newImageSrc) {
        setProfileImage(newImageSrc); // Актуализираме профилната снимка за окончателно запазване
        localStorage.removeItem('tempProfileImage'); // Премахваме временното изображение след актуализация
    }

        alert('Profile updated successfully!');
    };

    const togglePassword = (inputRef) => {
        const input = inputRef.current;
        const icon = input.nextElementSibling.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    };

    const checkPasswordStrength = (password) => {
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

        setPasswordStrength({ strength, percentage: strengthPercentage, color }); // Обновен обект с color
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setNewPassword(password);
        checkPasswordStrength(password);
    };

    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            showMessage('New passwords do not match.', 'error');
            return;
        }

        if (passwordStrength.percentage < 60) {
            showMessage('Please ensure your new password meets all requirements.', 'error');
            return;
        }

        showMessage('Password updated successfully!', 'success');
        setNewPassword('');
        setConfirmPassword('');
    };

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
        }, 5000);
    };

    const handleUpdate = () => {
        const newImageSrc = localStorage.getItem('tempProfileImage');
        
        if (newImageSrc) {
            setProfileImage(newImageSrc);
            localStorage.removeItem('tempProfileImage');
        }
        
        alert('Profile updated successfully!');
    };

    return (
        <div className="profile-min-h-screen profile-bg-background profile-flex">
            <div className="profile-flex-1">
                <div className="profile-header">
                    <h1 className="profile-text-2xl profile-font-bold profile-text-primary">My Profile</h1>
                    <div className="profile-button-group">
                    <Link to="/bookmarks-jobs">
                        <button className="profile-btn profile-btn-primary">View Bookmarked Jobs</button>
                    </Link>
                        <a href="login.html"><button className="profile-btn profile-btn-ghost">Log In</button></a>
                        <a href="signup.html"><button className="profile-btn profile-btn-primary">Sign Up</button></a>
                    </div>
                </div>

                <div className="profile-main-content">
                    <div className="profile-left-form" style={{ marginTop: 20 }}>
                        <div className="profile-section">
                            <div className="profile-image">
                                <img src={profileImage} alt="Profile Image" style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <h2 className="profile-name" id="nameAll">{firstName} {lastName}</h2>
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
                                        <a href="javascript:void(0)" className="profile-social-link">
                                            <img src={facebookIcon} alt="Facebook" className="profile-social-icon" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="profile-social-link">
                                            <img src={twitterIcon} alt="Twitter" className="profile-social-icon" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="profile-social-link">
                                            <img src={whatsappIcon} alt="WhatsApp" className="profile-social-icon" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="profile-social-link">
                                            <img src={callIcon} alt="Call" className="profile-social-icon" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <h3 className="profile-section-title">Documents</h3>
                            <div className="profile-document">
                                <i className="profile-document-icon fa fa-file"></i>
                                <span className="profile-document-title">Resume.pdf</span>
                                <i className="profile-download-icon fa fa-download"></i>
                            </div>
                            <div className="profile-document">
                                <i className="profile-document-icon fa fa-file"></i>
                                <span className="profile-document-title">Cover-letter.pdf</span>
                                <i className="profile-download-icon fa fa-download"></i>
                            </div>
                            <hr />
                            <div className="profile-contacts">
                                <h3 className="profile-section-title">Contacts</h3>
                                <p className="profile-contact-info mt-3">
                                    <span>Email:</span> <span id="displayEmail">{email}</span>
                                </p>
                                <p className="profile-contact-info">
                                    <span>Phone:</span> 123-456-7890
                                </p>
                                <p className="profile-contact-info mt-3">
                                    <span>Location:</span> <span id="selectedLocation">{location}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="profile-right-form">
                        <div className="profile-card profile-content-page mt-4 mt-lg-0" style={{ marginTop: 20 }}>
                            <div className="profile-button-container">
                                <button type="button" className="profile-btn profile-btn-overview" onClick={showOverview}>Overview</button>
                                <div className="profile-separator"></div>
                                <button type="button" className="profile-btn profile-btn-settings" onClick={showSettings}>Settings</button>
                            </div>
                            <hr />
                            <div className="profile-card-body p-4">
                                <div className="profile-tab-content" id="pills-tabContent">
                                    {activeTab === 'overview' && (
                                        <div className="profile-tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                            <div>
                                                <h4 className="profile-fs-18 profile-fw-bold">About</h4>
                                                <p className="text-muted mt-4" id="introductionParagraph">{introduction}</p>
                                                <p className="text-muted">
                                                    It describes the candidate's relevant experience, skills, and achievements. The purpose of this career summary is to explain your qualifications for the job in 3-5 sentences and convince the manager to read the whole resume document.
                                                </p>
                                            </div>
                                            <div className="profile-candidate-education-details mt-4">
                                                <h4 className="profile-fs-18 profile-fw-bold mb-0 ">Education</h4>
                                                <div className="profile-candidate-education-content mt-4 d-flex">
                                                    <div className="profile-circle">B</div>
                                                    <div className="profile-text">
                                                        <h6 className="profile-fs-16 mb-1">BCA - Bachelor of Computer Applications </h6>
                                                        <p className="mb-2 text-muted">International University - (2004 - 2010)</p>
                                                        <p className="text-muted">
                                                            There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="profile-candidate-education-content mt-3 d-flex">
                                                    <div className="profile-circle">M</div>
                                                    <div className="profile-text">
                                                        <h6 className="profile-fs-16 mb-1">MCA - Master of Computer Application</h6>
                                                        <p className="mb-2 text-muted">International University - (2010 - 2012)</p>
                                                        <p className="text-muted">
                                                            There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="profile-candidate-education-content mt-3 d-flex">
                                                    <div className="profile-circle">D</div>
                                                    <div className="profile-text">
                                                        <h6 className="profile-fs-16 mb-1">Design Communication Visual</h6>
                                                        <p className="mb-2 text-muted">International University - (2012-2015)</p>
                                                        <p className="text-muted">
                                                            There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="profile-my-4" />
                                            <h4 className="profile-fs-18 profile-fw-bold">Experiences</h4>
                                            <div className="profile-candidate-experience-content mt-4 d-flex">
                                                <div className="profile-circle">W</div>
                                                <div className="profile-text">
                                                    <h6 className="profile-fs-16 mb-1">Web Design & Development Team Leader</h6>
                                                    <p className="mb-2 text-muted">Creative Agency - (2013 - 2016)</p>
                                                    <p className="text-muted">
                                                        There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="profile-candidate-experience-content mt-3 d-flex">
                                                <div className="profile-circle">P</div>
                                                <div className="profile-text">
                                                    <h6 className="profile-fs-16 mb-1">Project Manager</h6>
                                                    <p className="mb-2 text-muted">Jobcy Technology Pvt.Ltd - (Present)</p>
                                                    <p className="text-muted">
                                                        There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                    </p>
                                                </div>
                                            </div>
                                            <hr className="profile-my-4" />
                                            <h4 className="profile-fs-18 profile-fw-bold mt-4">Skills</h4>
                                            <div className="profile-candidate-skills-content mt-4">
                                                <button className="profile-btn profile-btn-sm profile-btn-skill mb-2">Cloud Management</button>
                                                <button className="profile-btn profile-btn-sm profile-btn-skill mb-2">Responsive Design</button>
                                                <button className="profile-btn profile-btn-sm profile-btn-skill mb-2">Network Architecture</button>
                                                <button className="profile-btn profile-btn-sm profile-btn-skill mb-2">PHP</button>
                                                <button className="profile-btn profile-btn-sm profile-btn-skill mb-2">Bootstrap</button>
                                                <button className="profile-btn profile-btn-sm profile-btn-skill mb-2">UI & UX Designer</button>
                                            </div>
                                            <h4 className="profile -fs-18 profile-fw-bold mt-4">Spoken languages</h4>
                                            <div className="profile-candidate-languages-content mt-4" id="languageButtonsContainer">
                                                {languages.map((language, index) => (
                                                    <button key={index} className="profile-btn profile-btn-sm profile-btn-language mb-2">{language}</button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'settings' && (
                                        <div className="profile-tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                                            <form action="#">
                                                <div className="profile-form-group">
                                                    <h5 className="profile-fs-17 profile-fw-semibold mb-3 text-center">My Account</h5>
                                                    <div className="text-center mb-4">
                                                        <div className="profile-image-circle">
                                                            <img src={profileImage} className="profile-img" id="profile-img" alt="Profile Image" />
                                                        </div>
                                                        <div className="profile-photo-edit">
                                                            <input id="profile-img-file-input" type="file" className="profile-img-file-input" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                                            <label htmlFor="profile-img-file-input" className="profile-photo-edit-label" style={{ cursor: 'pointer' }}>
                                                                Избери изображение
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="profile-row mb-3">
                                                        <div className="profile-col-lg-6">
                                                            <label htmlFor="firstName" className="profile-form-label">First Name</label>
                                                            <input type="text" className="profile-form-control" id="firstName" value={tempFirstName} onChange={(e) => setTempFirstName(e.target.value)} />
                                                        </div>
                                                        <div className="profile-col-lg-6">
                                                            <label htmlFor="lastName" className="profile-form-label">Last Name</label>
                                                            <input type="text" className="profile-form-control" id="lastName" value={tempLastName} onChange={(e) => setTempLastName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="profile-row mb-3">
                                                        <div className="profile-col-lg-6">
                                                            <label htmlFor="email" className="profile-form-label">Email</label>
                                                            <input type="text" className="profile-form-control" id="email" value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} />
                                                        </div>
                                                        <div className="profile-col-lg-6">
                                                            <label htmlFor="accountType" className="profile-form-label">Account Type</label>
                                                            <select className="profile-form-select" id="accountType">
                                                                <option value="4">Accounting</option>
                                                                <option value="1">IT & Software</option>
                                                                <option value="3">Marketing</option>
                                                                <option value="5">Banking</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <h5 className="profile-fs-17 profile-fw-semibold mb-3">Profile</h5>
                                                    <h5 className="">Introduce Yourself</h5>
                                                    <textarea className="profile-form-control" id="introduction" rows={5} style={{ maxWidth: '100%' }} value={tempIntroduction} onChange={(e) => setTempIntroduction(e.target.value)}></textarea>
                                                    <div className="profile-row mb-3">
                                                        <div className="profile-col-lg-6">
                                                            <label htmlFor="languages" className="profile-form-label">Languages</label>
                                                            <input type="text" className="profile-form-control" id="languages" value={tempLanguages} onChange={(e) => setTempLanguages(e.target.value)} />
                                                        </div>
                                                        <div className="profile-col-lg-6">
                                                            <label htmlFor="location" className="profile-form-label">Location</label>
                                                            <select className="profile-form-select" id="location" value={tempLocation} onChange={(e) => setTempLocation(e.target.value)}>
                                                                <option value="Sofia">Sofia</option>
                                                                <option value="Plovdiv">Plovdiv</option>
                                                                <option value="Varna">Varna</option>
                                                                <option value="Burgas">Burgas</option>
                                                                <option value="Ruse">Ruse</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="profile-card">
                                                        <div className="profile-card-body">
                                                            <h5 className="profile-fs-17 profile-fw-semibold mb-3">Change Password</h5>
                                                            <div id="passwordChangeForm">
                                                                <div className="profile-row mb-3">
                                                                    <div className="profile-col-lg-111">
                                                                        <label htmlFor="currentPassword" className="profile-form-label">Current password</label>
                                                                        <div className="profile-input-group">
                                                                            <input type="password" className="profile-form-control-long" id="currentPassword" ref={currentPasswordRef} />
                                                                            <button className="profile-btn profile-btn-primary" type="button" onClick={() => togglePassword(currentPasswordRef)} style={{ border: 'none', borderRadius: 0 }}>
                                                                                <i className="fas fa-eye" id="currentPassword-icon"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="profile-row mb-3">
                                                                    <div className="profile-col-lg-6">
                                                                        <label htmlFor="newPassword" className="profile-form-label">New password</label>
                                                                        <div className="profile-input-group">
                                                                            <input type="password" className="profile-form-control" id="newPassword" value={newPassword} onChange={handlePasswordChange} ref={newPasswordRef} />
                                                                            <button className="profile-btn profile-btn-primary" type="button" onClick={() => togglePassword(newPasswordRef)} style={{ border: 'none', borderRadius: 0 }}>
                                                                                <i className="fas fa-eye" id="newPassword-icon"></i>
                                                                            </button>
                                                                        </div>
                                                                        <div id="passwordStrength" className="mt-2" style={{ color: passwordStrength.color }}>
                                                                            Password Strength: {passwordStrength.strength.charAt(0).toUpperCase() + passwordStrength.strength.slice(1)}
                                                                        </div>
                                                                    </div>
                                                                    <div className="profile-col-lg-6">
                                                                        <label htmlFor="confirmPassword" className="profile-form-label">Confirm password</label>
                                                                        <div className="profile-input-group">
                                                                            <input type="password" className="profile-form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ref={confirmPasswordRef} />
                                                                            <button className="profile-btn profile-btn-primary" type="button" onClick={() => togglePassword(confirmPasswordRef)} style={{ border: 'none', borderRadius: 0 }}>
                                                                                <i className="fas fa-eye" id="confirmPassword-icon"></i>
                                                                            </button>
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
                                                                    <button className="profile-btn profile-btn-primary" onClick={handleUpdatePassword}>Update Password</button>
                                                                </div>
                                                                {message && (
                                                                    <div id="message" className={`mt-3 ${messageType === 'success' ? 'success' : 'error'}`}>
                                                                        {message}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                                                        <button className="profile-btn profile-btn-primary" onClick={updateData}>Update</button>
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
        </div>
    );
};

export default Profile;