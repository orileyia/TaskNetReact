import React, { useState, useEffect } from 'react';
import '../css/Profile.css';

const Profile = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [profileImage, setProfileImage] = useState('assets/images/profile.jpg');
    const [firstName, setFirstName] = useState('Iva');
    const [lastName, setLastName] = useState('Traykova');
    const [email, setEmail] = useState('user@gmail.com');
    const [introduction, setIntroduction] = useState('Developer with over 5 years\' experience...');
    const [languages, setLanguages] = useState(['English', 'German', 'French']);
    const [location, setLocation] = useState('Varna');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ strength: '', percentage: 0, color: '#dc3545' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        showOverview();
    }, []);

    const showOverview = () => setActiveTab('overview');
    const showSettings = () => setActiveTab('settings');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfileImage(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateData = () => {
        // Validate and update logic
        setMessage('Profile updated successfully!');
    };

    const togglePasswordVisibility = (inputId) => {
        const input = document.getElementById(inputId);
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    };

    const checkPasswordStrength = (password) => {
        const requirements = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
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

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;
        if (name === 'newPassword') {
            setNewPassword(value);
            checkPasswordStrength(value);
        } else if (name === 'currentPassword') {
            setCurrentPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleUpdatePassword = () => {
        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match.');
            return;
        }
        setMessage('Password updated successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="min-h-screen bg-background flex">
            <aside className="sidebar">
                <h2 className="text-lg font-semibold mb-4">Navigation</h2>
                <nav>
                    <a href="index.html" className="nav-item">Home</a>
                    <a href="#" className="nav-item">My Jobs</a>
                    <a href="#" className="nav-item">Find Freelancers</a>
                    <a href="profile.html" className="nav-item">Profile</a>
                    <a href="#" className="nav-item">Messages</a>
                    <a href="#" className="nav-item">Settings</a>
                </nav>
            </aside>
            <div className="flex-1">
                <div className ```javascript
="header">
                    <h1 className="text-2xl font-bold text-primary">My Profile</h1>
                    <div className="button-group">
                        <a href="login.html"><button className="btn btn-ghost">Log In</button></a>
                        <a href="signup.html"><button className="btn btn-primary">Sign Up</button></a>
                    </div>
                </div>

                <div className="main-content">
                    <div className="left-form" style={{ marginTop: '20px' }}>
                        <div className="profile-section">
                            <div className="profile-image">
                                <img src={profileImage} alt="Profile" style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <h2 className="name">{`${firstName} ${lastName}`}</h2>
                            <p className="title">Developer</p>
                            <div className="rating">
                                <i>★</i>
                                <i>★</i>
                                <i>★</i>
                                <i>★</i>
                                <i>★</i>
                            </div>
                            <div className="social-links">
                                <ul className="candidate-detail-social-menu list-inline mb-0">
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="social-link">
                                            <img src="./assets/images/facebook.png" alt="Facebook" className="social-icon" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="social-link">
                                            <img src="./assets/images/twitter.jpg" alt="Twitter" className="social-icon" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="social-link">
                                            <img src="./assets/images/whatsapp.jpeg" alt="WhatsApp" className="social-icon" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="social-link">
                                            <img src="./assets/images/call.png" alt="Call" className="social-icon" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <hr />
                            <h3 className="section-title">Documents</h3>
                            <div className="document">
                                <i className="document-icon fa fa-file"></i>
                                <span className="document-title">Resume.pdf</span>
                                <i className="download-icon fa fa-download"></i>
                            </div>
                            <div className="document">
                                <i className="document-icon fa fa-file"></i>
                                <span className="document-title">Cover-letter.pdf</span>
                                <i className="download-icon fa fa-download"></i>
                            </div>
                            <hr />
                            <div className="contacts">
                                <h3 className="section-title">Contacts</h3>
                                <p className="contact-info mt-3">
                                    <span>Email:</span> <span>{email}</span>
                                </p>
                                <p className="contact-info">
                                    <span>Phone:</span> 123-456-7890
                                </p>
                                <p className="contact-info mt-3">
                                    <span>Location:</span> <span>{location}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="right-form">
                        <div className="card profile-content-page mt-4 mt-lg-0" style={{ marginTop: '20px' }}>
                            <div className="button-container">
                                <button type="button" className="btn btn-overview" onClick={showOverview}>Overview</button>
                                <div className="separator"></div>
                                <button type="button" className="btn btn-settings" onClick={showSettings}>Settings</button>
                            </div>
                            <hr />
                            <div className="card-body p-4">
                                <div className="tab-content" id="pills-tabContent">
                                    {activeTab === 'overview' && (
                                        <div className="tab-pane fade show active" id="overview" role="tabpanel">
                                            <div>
                                                <h4 className="fs-18 fw-bold">About</h4>
                                                <p className="text-muted mt-4">{introduction}</p>
                                                <p className="text-muted">
                                                    It describes the candidate's relevant experience, skills, and achievements.
 ```javascript
                                                </p>
                                            </div>
                                            <div className="candidate-education-details mt-4">
                                                <h4 className="fs-18 fw-bold mb-0">Education</h4>
                                                <div className="candidate-education-content mt-4 d-flex">
                                                    <div className="circle">B</div>
                                                    <div className="text">
                                                        <h6 className="fs-16 mb-1">BCA - Bachelor of Computer Applications</h6>
                                                        <p className="mb-2 text-muted">International University - (2004 - 2010)</p>
                                                        <p className="text-muted">Highly skilled in product development and design.</p>
                                                    </div>
                                                </div>
                                                <div className="candidate-education-content mt-3 d-flex">
                                                    <div className="circle">M</div>
                                                    <div className="text">
                                                        <h6 className="fs-16 mb-1">MCA - Master of Computer Application</h6>
                                                        <p className="mb-2 text-muted">International University - (2010 - 2012)</p>
                                                        <p className="text-muted">Expert in software development and project management.</p>
                                                    </div>
                                                </div>
                                                <div className="candidate-education-content mt-3 d-flex">
                                                    <div className="circle">D</div>
                                                    <div className="text">
                                                        <h6 className="fs-16 mb-1">Design Communication Visual</h6>
                                                        <p className="mb-2 text-muted">International University - (2012-2015)</p>
                                                        <p className="text-muted">Specialized in visual communication and design.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <h4 className="fs-18 fw-bold">Experiences</h4>
                                            <div className="candidate-experience-content mt-4 d-flex">
                                                <div className="circle">W</div>
                                                <div className="text">
                                                    <h6 className="fs-16 mb-1">Web Design & Development Team Leader</h6>
                                                    <p className="mb-2 text-muted">Creative Agency - (2013 - 2016)</p>
                                                    <p className="text-muted">Led a team in developing web solutions.</p>
                                                </div>
                                            </div>
                                            <div className="candidate-experience-content mt-3 d-flex">
                                                <div className="circle">P</div>
                                                <div className="text">
                                                    <h6 className="fs-16 mb-1">Project Manager</h6>
                                                    <p className="mb-2 text-muted">Jobcy Technology Pvt.Ltd - (Present)</p>
                                                    <p className="text-muted">Managing projects and ensuring timely delivery.</p>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <h4 className="fs-18 fw-bold mt-4">Skills</h4>
                                            <div className="candidate-skills-content mt-4">
                                                {['Cloud Management', 'Responsive Design', 'Network Architecture', 'PHP', 'Bootstrap', 'UI & UX Designer'].map(skill => (
                                                    <button key={skill} className="btn btn-sm btn-skill mb-2">{skill}</button>
                                                ))}
                                            </div>
                                            <h4 className="fs-18 fw-bold mt-4">Spoken languages</h4>
                                            <div className="candidate-languages-content mt-4" id="languageButtonsContainer">
                                                {languages.map(language => (
                                                    <button key={language} className="btn btn-sm btn-language mb-2">{language}</button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'settings' && (
                                        <div className="tab-pane fade" id="settings" role="tabpanel">
                                            <form onSubmit={(e) => { e.preventDefault(); handleUpdateData(); }}>
                                                <div className="form-group">
                                                    <h5 className="fs-17 fw-semibold mb-3 text-center">My Account</h5>
                                                    <div className="text-center mb-4">
                                                        <div className="profile-image-circle">
                                                            <img src={profileImage} className="profile-img" alt="Profile" />
                                                        </div>
                                                        <div className="profile-photo-edit">
                                                            <input id="profile-img-file-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                                            <label htmlFor="profile -img-file-input" className="profile-photo-edit-label" style={{ cursor: 'pointer' }}>
                                                                Избери изображение
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                                            <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                                            <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="email" className="form-label">Email</label>
                                                            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label htmlFor="accountType" className="form-label">Account Type</label>
                                                            <select className="form-select" id="accountType">
                                                                <option value="4">Accounting</option>
                                                                <option value="1">IT & Software</option>
                                                                <option value="3">Marketing</option>
                                                                <option value="5">Banking</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <h5 className="fs-17 fw-semibold mb-3">Profile</h5>
                                                    <h5 className="">Introduce Yourself</h5>
                                                    <textarea className="form-control" rows="5 value={introduction}" onChange={(e) => setIntroduction(e.target.value)}></textarea>
                                                    <div className="row mb-3">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="languages" className="form-label">Languages</label>
                                                            <input type="text" className="form-control" value={languages.join(', ')} onChange={(e) => setLanguages(e.target.value.split(',').map(lang => lang.trim()))} />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label htmlFor="location" className="form-label">Location</label>
                                                            <select className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
                                                                <option value="SOF">Sofia</option>
                                                                <option value="PLD">Plovdiv</option>
                                                                <option value="VAR">Varna</option>
                                                                <option value="BUR">Burgas</option>
                                                                <option value="RUS">Ruse</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <h5 className="fs-17 fw-semibold mb-3">Change Password</h5>
                                                            <div id="passwordChangeForm">
                                                                <div className="row mb-3">
                                                                    <div className="col-lg-111">
                                                                        <label htmlFor="currentPassword" className="form-label">Current password</label>
                                                                        <div className="input-group">
                                                                            <input type="password" className="form-control-long" name="currentPassword" value={currentPassword} onChange={handlePasswordChange} />
                                                                            <button className="btn btn-primary" type="button" onClick={() => togglePasswordVisibility('currentPassword')}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <div className="col-lg-6">
                                                                        <label htmlFor="newPassword" className="form-label">New password</label>
                                                                        <div className="input-group">
                                                                            <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={handlePasswordChange} />
                                                                            <button className="btn btn-primary" type="button" onClick={() => togglePasswordVisibility('newPassword')}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                                                                        <div className ```javascript
="input-group">
                                                                            <input type="password" className="form-control" name="confirmPassword" value={confirmPassword} onChange={handlePasswordChange} />
                                                                            <button className="btn btn-primary" type="button" onClick={() => togglePasswordVisibility('confirmPassword')}>
                                                                                <i className="fas fa-eye"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="password-requirements mb-3">
                                                                    <h6 className="fw-semibold mb-2">Password must contain:</h6>
                                                                    <ul className="list-unstyled">
                                                                        <li className={passwordStrength.length ? 'valid' : 'text-muted'}><i className="fas fa-circle-notch me-2"></i>At least 8 characters</li>
                                                                        <li className={passwordStrength.uppercase ? 'valid' : 'text-muted'}><i className="fas fa-circle-notch me-2"></i>At least one uppercase letter</li>
                                                                        <li className={passwordStrength.lowercase ? 'valid' : 'text-muted'}><i className="fas fa-circle-notch me-2"></i>At least one lowercase letter</li>
                                                                        <li className={passwordStrength.number ? 'valid' : 'text-muted'}><i className="fas fa-circle-notch me-2"></i>At least one number</li>
                                                                        <li className={passwordStrength.special ? 'valid' : 'text-muted'}><i className="fas fa-circle-notch me-2"></i>At least one special character</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                                                    <button className="btn btn-primary" onClick={handleUpdatePassword}>Update Password</button>
                                                                </div>
                                                                <div id="message" className="mt-3" style={{ display: message ? 'block' : 'none' }}>{message}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                                                        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Update</button>
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