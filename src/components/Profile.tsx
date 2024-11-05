import React, { useState, useEffect } from 'react';
import '../css/Profile.css'; // Уверете се, че имате подходящ CSS файл

const Profile = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [profileImage, setProfileImage] = useState('assets/images/profile.jpg');
    const [firstName, setFirstName] = useState('Iva');
    const [lastName, setLastName] = useState('Traykova');
    const [email, setEmail] = useState('user@gmail.com');
    const [location, setLocation] = useState('Varna');
    const [introduction, setIntroduction] = useState('Developer with over 5 years\' experience working in both the public and private sectors...');
    const [languages, setLanguages] = useState(['English', 'German', 'French']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordStrength, setPasswordStrength] = useState({ strength: '', percentage: 0 });

    useEffect(() => {
        showOverview(); // Показваме секцията с преглед при зареждане на страницата
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
                setProfileImage(target.result);
                localStorage.setItem('tempProfileImage', target.result);
            }
        };
        
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const updateData = () => {
        alert('Profile updated successfully!');
    };

    const togglePassword = (inputId: string) => {
        const input = document.getElementById(inputId) as HTMLInputElement; // Указваме, че input е HTMLInputElement
        const icon = document.getElementById(`${inputId}-icon`);
    
        if (input && icon) {
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
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

        setPasswordStrength({ strength, percentage: strengthPercentage });
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        checkPasswordStrength(password);
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
                <div className="header">
                    <h1 className="text-2xl font-bold text-primary">My Profile</h1>
                    <div className="button-group">
                        <a href="login.html"><button className="btn btn-ghost">Log In</button></a>
                        <a href="signup.html"><button className="btn btn-primary">Sign Up</button></a>
                    </div>
                </div>

                <div className="main-content">
                    <div className="left-form" style={{ marginTop: 20 }}>
                        <div className="profile-section">
                            <div className="profile-image">
                                <img src={profileImage} alt="Profile Image" style={{ width: '100%', height: 'auto' }} />
                            </div>
                            <h2 className="name" id="nameAll">{firstName} {lastName}</h2>
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
                                            <img src="./images/facebook.png" alt="Facebook" className="social-icon" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="social-link">
                                            <img src="./images/twitter.jpg" alt="Twitter" className="social-icon" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="social-link">
                                            <img src="./images/whatsapp.jpeg" alt="WhatsApp" className="social-icon" />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="javascript:void(0)" className="social-link">
                                            <img src="./images/call.png" alt="Call" className="social-icon" />
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
                                    <span>Email:</span> <span id="displayEmail">{email}</span>
                                </p>
                                <p className="contact-info">
                                    <span>Phone:</span> 123-456-7890
                                </p>
                                <p className="contact-info mt-3">
                                    <span>Location:</span> <span id="selectedLocation">{location}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="right-form">
                        <div className="card profile-content-page mt-4 mt-lg-0" style={{ marginTop: 20 }}>
                            <div className="button-container">
                                <button type="button" className="btn btn-overview" onClick={showOverview}>Overview</button>
                                <div className="separator"></div>
                                <button type="button" className="btn btn-settings" onClick={showSettings}>Settings</button>
                            </div>
                            <hr />
                            <div className ="card-body p-4">
                                <div className="tab-content" id="pills-tabContent">
                                    {activeTab === 'overview' && (
                                        <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                            <div>
                                                <h4 className="fs-18 fw-bold">About</h4>
                                                <p className="text-muted mt-4" id="introductionParagraph">{introduction}</p>
                                                <p className="text-muted">
                                                    It describes the candidate's relevant experience, skills, and achievements. The purpose of this career summary is to explain your qualifications for the job in 3-5 sentences and convince the manager to read the whole resume document.
                                                </p>
                                            </div>
                                            <div className="candidate-education-details mt-4">
                                                <h4 className="fs-18 fw-bold mb-0">Education</h4>
                                                <div className="candidate-education-content mt-4 d-flex">
                                                    <div className="circle">B</div>
                                                    <div className="text">
                                                        <h6 className="fs-16 mb-1">BCA - Bachelor of Computer Applications </h6>
                                                        <p className="mb-2 text-muted">International University - (2004 - 2010)</p>
                                                        <p className="text-muted">
                                                            There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="candidate-education-content mt-3 d-flex">
                                                    <div className="circle">M</div>
                                                    <div className="text">
                                                        <h6 className="fs-16 mb-1">MCA - Master of Computer Application</h6>
                                                        <p className="mb-2 text-muted">International University - (2010 - 2012)</p>
                                                        <p className="text-muted">
                                                            There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="candidate-education-content mt-3 d-flex">
                                                    <div className="circle">D</div>
                                                    <div className="text">
                                                        <h6 className="fs-16 mb-1">Design Communication Visual</h6>
                                                        <p className="mb-2 text-muted">International University - (2012-2015)</p>
                                                        <p className="text-muted">
                                                            There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                        </p>
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
                                                    <p className="text-muted">
                                                        There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="candidate-experience-content mt-3 d-flex">
                                                <div className="circle">P</div>
                                                <div className="text">
                                                    <h6 className="fs-16 mb-1">Project Manager</h6>
                                                    <p className="mb-2 text-muted">Jobcy Technology Pvt.Ltd - (Present)</p>
                                                    <p className="text-muted">
                                                        There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
                                                    </p>
                                                </div>
                                            </div>
                                            <hr className="my-4" />
                                            <h4 className="fs-18 fw-bold mt-4">Skills</h4>
                                            <div className="candidate-skills-content mt-4">
                                                <button className="btn btn-sm btn-skill mb-2">Cloud Management</button>
                                                <button className="btn btn-sm btn-skill mb-2">Responsive Design</button>
                                                <button className="btn btn-sm btn-skill mb-2">Network Architecture</button>
                                                <button className="btn btn -sm btn-skill mb-2">PHP</button>
                                                <button className="btn btn-sm btn-skill mb-2">Bootstrap</button>
                                                <button className="btn btn-sm btn-skill mb-2">UI & UX Designer</button>
                                            </div>
                                            <h4 className="fs-18 fw-bold mt-4">Spoken languages</h4>
                                            <div className="candidate-languages-content mt-4" id="languageButtonsContainer">
                                                {languages.map((language, index) => (
                                                    <button key={index} className="btn btn-sm btn-language mb-2">{language}</button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {activeTab === 'settings' && (
                                        <div className="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
                                            <form action="#">
                                                <div className="form-group">
                                                    <h5 className="fs-17 fw-semibold mb-3 text-center">My Account</h5>
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
                                                    <div className="row mb-3">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                                            <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                                            <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className="row mb-3">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="email" className="form-label">Email</label>
                                                            <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                                    <textarea className="form-control" id="introduction" rows={5} style={{ maxWidth: '100%' }} value={introduction} onChange={(e) => setIntroduction(e.target.value)}></textarea>
                                                    <div className="row mb-3">
                                                        <div className="col-lg-6">
                                                            <label htmlFor="languages" className="form-label">Languages</label>
                                                            <input type="text" className="form-control" id="languages" value={languages.join(', ')} onChange={(e) => setLanguages(e.target.value.split(',').map(lang => lang.trim()))} />
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <label htmlFor="location" className="form-label">Location</label>
                                                            <select className="form-select" id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
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
                                                                        < label htmlFor="currentPassword" className="form-label">Current password</label>
                                                                        <div className="input-group">
                                                                            <input type="password" className="form-control-long" id="currentPassword" />
                                                                            <button className="btn btn-primary" type="button" onClick={() => togglePassword('currentPassword')} style={{ border: 'none', borderRadius: 0 }}>
                                                                                <i className="fas fa-eye" id="currentPassword-icon"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="row mb-3">
                                                                    <div className="col-lg-6">
                                                                        <label htmlFor="newPassword" className="form-label">New password</label>
                                                                        <div className="input-group">
                                                                            <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                                                            <button className="btn btn-primary" type="button" onClick={() => togglePassword('newPassword')} style={{ border: 'none', borderRadius: 0 }}>
                                                                                <i className="fas fa-eye" id="newPassword-icon"></i>
                                                                            </button>
                                                                        </div>
                                                                        <div id="passwordStrength" className="mt-2"></div>
                                                                    </div>
                                                                    <div className="col-lg-6">
                                                                        <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
                                                                        <div className="input-group">
                                                                            <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                                            <button className="btn btn-primary" type="button" onClick={() => togglePassword('confirmPassword')} style={{ border: 'none', borderRadius: 0 }}>
                                                                                <i className="fas fa-eye" id="confirmPassword-icon"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="password-requirements mb-3">
                                                                    <h6 className="fw-semibold mb-2">Password must contain:</h6>
                                                                    <ul className="list-unstyled">
                                                                        <li id="length" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least 8 characters</li>
                                                                        <li id="uppercase" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least one uppercase letter</li>
                                                                        <li id="lowercase" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least one lowercase letter</li>
                                                                        <li id="number" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least one number</li>
                                                                        <li id="special" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least one special character</li>
                                                                    </ul>
                                                                </div>
                                                                <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                                                                    <button className="btn btn-primary" onClick={handleUpdate}>Update Password</button>
                                                                </div>
                                                                <div id="message" className="mt-3" style={{ display: 'none' }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                                                        <button className="btn btn-primary" onClick={updateData}>Update</button>
                                                    </div>
                                                    <p id="message" className="mt-3"></p>
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





// import React, { useState, useEffect } from 'react';
// import '../css/Profile.css'; // Уверете се, че имате подходящ CSS файл

// const Profile = () => {
//     const [activeTab, setActiveTab] = useState('overview');
//     const [profileImage, setProfileImage] = useState('assets/images/profile.jpg');
//     const [firstName, setFirstName] = useState('Iva');
//     const [lastName, setLastName] = useState('Traykova');
//     const [email, setEmail] = useState('user@gmail.com');
//     const [location, setLocation] = useState('Varna');
//     const [introduction, setIntroduction] = useState('Developer with over 5 years\' experience working in both the public and private sectors...');
//     const [languages, setLanguages] = useState(['English', 'German', 'French']);
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [passwordStrength, setPasswordStrength] = useState({ strength: '', percentage: 0 });

//     useEffect(() => {
//         showOverview(); // Показваме секцията с преглед при зареждане на страницата
//     }, []);

//     const showOverview = () => {
//         setActiveTab('overview');
//     };

//     const showSettings = () => {
//         setActiveTab('settings');
//     };

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         const reader = new FileReader();
        
//         reader.onload = (e) => {
//             const target = e.target;
//             if (target && typeof target.result === 'string') {
//                 setProfileImage(target.result);
//                 localStorage.setItem('tempProfileImage', target.result);
//             }
//         };
        
//         if (file) {
//             reader.readAsDataURL(file);
//         }
//     };

//     const updateData = () => {
//         alert('Profile updated successfully!');
//     };

//     const togglePassword = (inputId: string) => {
//         const input = document.getElementById(inputId) as HTMLInputElement;
//         const icon = document.getElementById(`${inputId}-icon`);
    
//         if (input && icon) {
//             if (input.type === 'password') {
//                 input.type = 'text';
//                 icon.classList.replace('fa-eye', 'fa-eye-slash');
//             } else {
//                 input.type = 'password';
//                 icon.classList.replace('fa-eye-slash', 'fa-eye');
//             }
//         }
//     };

//     const checkPasswordStrength = (password) => {
//         const requirements = {
//             length: password.length >= 8,
//             uppercase: /[A-Z]/.test(password),
//             lowercase: /[a-z]/.test(password),
//             number: /[0-9]/.test(password),
//             special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
//         };

//         const strengthPercentage = Object.values(requirements).filter(Boolean).length * 20;
//         let strength = 'weak';
//         let color = '#dc3545';

//         if (strengthPercentage >= 80) {
//             strength = 'strong';
//             color = '#048565';
//         } else if (strengthPercentage >= 60) {
//             strength = 'good';
//             color = '#52a4fc';
//         } else if (strengthPercentage >= 40) {
//             strength = 'medium';
//             color = '#ffc107';
//         }

//         setPasswordStrength({ strength, percentage: strengthPercentage });
//     };

//     const handlePasswordChange = (e) => {
//         const password = e.target.value;
//         checkPasswordStrength(password);
//     };

//     const handleUpdate = () => {
//         const newImageSrc = localStorage.getItem('tempProfileImage');
        
//         if (newImageSrc) {
//             setProfileImage(newImageSrc);
//             localStorage.removeItem('tempProfileImage');
//         }
        
//         alert('Profile updated successfully!');
//     };

//     return (
//         <div className="min-h-screen bg-background flex">
//             <aside className="sidebar">
//                 <h2 className="text-lg font-semibold mb-4">Navigation</h2>
//                 <nav>
//                     <a href="index.html" className="nav-item">Home</a>
//                     <a href="#" className="nav-item">My Jobs</a>
//                     <a href="#" className="nav-item">Find Freelancers</a>
//                     <a href="profile.html" className ="nav-item">Profile</a>
//                     <a href="#" className="nav-item">Messages</a>
//                     <a href="#" className="nav-item">Settings</a>
//                 </nav>
//             </aside>
//             <div className="flex-1">
//                 <div className="header">
//                     <h1 className="text-2xl font-bold text-primary">My Profile</h1>
//                     <div className="button-group">
//                         <a href="login.html"><button className="btn btn-ghost">Log In</button></a>
//                         <a href=" signup.html"><button className="btn btn-primary">Sign Up</button></a>
//                     </div>
//                 </div>

//                 <div className="main-content">
//                     <div className="left-form" style={{ marginTop: 20 }}>
//                         <div className="profile-section">
//                             <div className="profile-image">
//                                 <img src={profileImage} alt="Profile Image" style={{ width: '100%', height: 'auto' }} />
//                             </div>
//                             <h2 className="name" id="nameAll">{firstName} {lastName}</h2>
//                             <p className="title">Developer</p>
//                             <div className="rating">
//                                 <i>★</i>
//                                 <i>★</i>
//                                 <i>★</i>
//                                 <i>★</i>
//                                 <i>★</i>
//                             </div>
//                             <div className="social-links">
//                                 <ul className="candidate-detail-social-menu list-inline mb-0">
//                                     <li className="list-inline-item">
//                                         <a href="javascript:void(0)" className="social-link">
//                                             <img src="./images/facebook.png" alt="Facebook" className="social-icon" />
//                                         </a>
//                                     </li>
//                                     <li className="list-inline-item">
//                                         <a href="javascript:void(0)" className="social-link">
//                                             <img src="./images/twitter.jpg" alt="Twitter" className="social-icon" />
//                                         </a>
//                                     </li>
//                                     <li className="list-inline-item">
//                                         <a href="javascript:void(0)" className="social-link">
//                                             <img src="./images/whatsapp.jpeg" alt="WhatsApp" className="social-icon" />
//                                         </a>
//                                     </li>
//                                     <li className="list-inline-item">
//                                         <a href="javascript:void(0)" className="social-link">
//                                             <img src="./images/call.png" alt="Call" className="social-icon" />
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </div>
//                             <hr />
//                             <h3 className="section-title">Documents</h3>
//                             <div className="document">
//                                 <i className="document-icon fa fa-file"></i>
//                                 <span className="document-title">Resume.pdf</span>
//                                 <i className="download-icon fa fa-download"></i>
//                             </div>
//                             <div className="document">
//                                 <i className="document-icon fa fa-file"></i>
//                                 <span className="document-title">Cover-letter.pdf</span>
//                                 <i className="download-icon fa fa-download"></i>
//                             </div>
//                             <hr />
//                             <div className="contacts">
//                                 <h3 className="section-title">Contacts</h3>
//                                 <p className="contact-info mt-3">
//                                     <span>Email:</span> <span id="displayEmail">{email}</span>
//                                 </p>
//                                 <p className="contact-info">
//                                     <span>Phone:</span> 123-456-7890
//                                 </p>
//                                 <p className="contact-info mt-3">
//                                     <span>Location:</span> <span id="selectedLocation">{location}</span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="right-form">
//                         <div className="card profile-content-page mt-4 mt-lg-0" style={{ marginTop: 20 }}>
//                             <div className="button-container">
//                                 <button type="button" className="btn btn-overview" onClick={showOverview}>Overview</button>
//                                 <div className="separator"></div>
//                                 <button type="button" className="btn btn-settings" onClick={showSettings}>Settings</button>
//                             </div>
//                             <hr />
//                             <div className="card-body p-4">
//                                 <div className="tab-content" id="pills-tabContent">
//                                     {activeTab === 'overview' && (
//                                         <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
//                                             <div>
//                                                 <h4 className="fs-18 fw-bold">About</h4>
//                                                 <p className="text-muted mt-4" id="introductionParagraph">{introduction}</p>
//                                                 <p className="text-muted">
//                                                     It describes the candidate's relevant experience, skills, and achievements. The purpose of this career summary is to explain your qualifications for the job in 3-5 sentences and convince the manager to read the whole resume document.
//                                                 </p>
//                                             </div>
//                                             <div className="candidate-education-details mt-4">
//                                                 <h4 className="fs-18 fw-bold mb-0">Education</h4>
//                                                 <div className="candidate-education-content mt-4 d-flex">
//                                                     <div className="circle">B</div>
//                                                     <div className="text">
//                                                         <h6 className="fs-16 mb-1">BCA - Bachelor of Computer Applications </h6>
//                                                         <p className="mb-2 text-muted">International University - (2004 - 2010)</p>
//                                                         <p className="text-muted">
//                                                             There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                                 <div className="candidate-education-content mt-3 d-flex">
//                                                     <div className="circle">M</div>
//                                                     <div className="text">
//                                                         <h6 className="fs-16 mb-1">MCA - Master of Computer Application</h6>
//                                                         <p className="mb-2 text-muted">International University - (2010 - 2012)</p>
//                                                         <p className="text-muted">
//                                                             There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                                 <div className="candidate-education-content mt-3 d-flex">
//                                                     <div className="circle">D</div>
//                                                     <div className="text">
//                                                         <h6 className="fs-16 mb-1">Design Communication Visual</h6>
//                                                         <p className="mb-2 text-muted">International University - (2012-2015)</p>
//                                                         <p className="text-muted">
//                                                             There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <hr className="my-4" />
//                                             <h4 className="fs-18 fw-bold">Experiences</h4>
//                                             <div className="candidate-experience-content mt-4 d-flex">
//                                                 <div className="circle">W</div>
//                                                 <div className="text">
//                                                     <h6 className="fs-16 mb-1">Web Design & Development Team Leader</h6>
//                                                     <p className="mb-2 text-muted">Creative Agency - (2013 - 2016)</p>
//                                                     <p className="text-muted">
//                                                         There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <div className="candidate-experience-content mt-3 d-flex">
//                                                 <div className="circle">P</div>
//                                                 <div className="text">
//                                                     <h6 className="fs-16 mb-1">Project Manager</h6>
//                                                     <p className="mb-2 text-muted">Jobcy Technology Pvt.Ltd - (Present)</p>
//                                                     <p className="text-muted">
//                                                         There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                             <hr className="my-4" />
//                                             <h4 className="fs-18 fw-bold mt-4">Skills</h4>
//                                             <div className="candidate-skills-content mt-4">
//                                                 <button className="btn btn-sm btn-skill mb-2">Cloud Management</button>
//                                                 <button className="btn btn-sm btn-skill mb-2">Responsive Design</button>
//                                                 <button className="btn btn-sm btn-skill mb-2">Network Architecture</button>
//                                                 <button className="btn btn-sm btn-skill mb-2">PHP</button>
//                                                 <button className="btn btn-sm btn-skill mb-2">Bootstrap</button>
//                                                 <button className="btn btn-sm btn-skill mb-2">UI & UX Designer</button>
//                                             </div>
//                                             <h4 className="fs-18 fw-bold mt-4">Spoken languages</h4>
//                                             <div className="candidate-languages-content mt-4" id="languageButtonsContainer">
//                                                 {languages.map((language, index) => (
//                                                     <button key={index} className="btn btn-sm btn-language mb-2">{language}</button>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                     {activeTab === 'settings' && (
//                                         <div className="tab-pane fade" id="settings" role="tabpanel" aria-labelledby="settings-tab">
//                                             <form action="#">
//                                                 <div className="form-group">
//                                                     <h5 className="fs-17 fw-semibold mb-3 text-center">My Account</h5>
//                                                     <div className="text-center mb-4">
//                                                         <div className="profile-image-circle">
//                                                             <img src={profileImage} className="profile-img" id=" profile-img" alt="Profile Image" />
//                                                         </div>
//                                                         <div className="profile-photo-edit">
//                                                             <input id="profile-img-file-input" type="file" className="profile-img-file-input" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
//                                                             <label htmlFor="profile-img-file-input" className="profile-photo-edit-label" style={{ cursor: 'pointer' }}>
//                                                                 Избери изображение
//                                                             </label>
//                                                         </div>
//                                                     </div>
//                                                     <div className="row mb-3">
//                                                         <div className="col-lg-6">
//                                                             <label htmlFor="firstName" className="form-label">First Name</label>
//                                                             <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                                                         </div>
//                                                         <div className="col-lg-6">
//                                                             <label htmlFor="lastName" className="form-label">Last Name</label>
//                                                             <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                                                         </div>
//                                                     </div>
//                                                     <div className="row mb-3">
//                                                         <div className="col-lg-6">
//                                                             <label htmlFor="email" className="form-label">Email</label>
//                                                             <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                                         </div>
//                                                         <div className="col-lg-6">
//                                                             <label htmlFor="accountType" className="form-label">Account Type</label>
//                                                             <select className="form-select" id="accountType">
//                                                                 <option value="4">Accounting</option>
//                                                                 <option value="1">IT & Software</option>
//                                                                 <option value="3">Marketing</option>
//                                                                 <option value="5">Banking</option>
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                     <h5 className="fs-17 fw-semibold mb-3">Profile</h5>
//                                                     <h5 className="">Introduce Yourself</h5>
//                                                     <textarea className="form-control" id="introduction" rows={5} style={{ maxWidth: '100%' }} value={introduction} onChange={(e) => setIntroduction(e.target.value)}></textarea>
//                                                     <div className="row mb-3">
//                                                         <div className="col-lg-6">
//                                                             <label htmlFor="languages" className="form-label">Languages</label>
//                                                             <input type="text" className="form-control" id="languages" value={languages.join(', ')} onChange={(e) => setLanguages(e.target.value.split(',').map(lang => lang.trim()))} />
//                                                         </div>
//                                                         <div className="col-lg-6">
//                                                             <label htmlFor="location" className="form-label">Location</label>
//                                                             <select className="form-select" id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
//                                                                 <option value="SOF">Sofia</option>
//                                                                 <option value="PLD">Plovdiv</option>
//                                                                 <option value="VAR">Varna</option>
//                                                                 <option value="BUR">Burgas</option>
//                                                                 <option value="RUS">Ruse</option>
//                                                             </select>
//                                                         </div>
//                                                     </div>
//                                                     <div className="card">
//                                                         <div className="card-body">
//                                                             <h5 className="fs-17 fw-semibold mb-3">Change Password</h5>
//                                                             <div id="passwordChangeForm">
//                                                                 <div className="row mb-3">
//                                                                     <div className="col-lg-111">
//                                                                         <label htmlFor="currentPassword" className="form-label">Current password</label>
//                                                                         <div className="input-group">
//                                                                             <input type="password" className="form-control-long" id="currentPassword" />
//                                                                             <button className="btn btn-primary" type="button" onClick={() => togglePassword('currentPassword')} style={{ border: 'none', borderRadius: 0 }}>
//                                                                                 <i className="fas fa-eye" id="currentPassword-icon"></i>
//                                                                             </button>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="row mb-3">
//                                                                     <div className="col-lg-6">
//                                                                         <label htmlFor="newPassword" className="form-label">New password</label>
//                                                                         <div className="input-group">
//                                                                             <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//                                                                             <button className="btn btn-primary" type="button" onClick={() => togglePassword('newPassword')} style={{ border: 'none', borderRadius: 0 }}>
//                                                                                 <i className="fas fa-eye" id="newPassword-icon"></i>
//                                                                             </button>
//                                                                         </div>
//                                                                         <div id="passwordStrength" className="mt-2"></div>
//                                                                     </div>
//                                                                     <div className="col-lg-6">
//                                                                         <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
//                                                                         <div className="input-group">
//                                                                             <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//                                                                             <button className="btn btn-primary" type="button" onClick={() => togglePassword('confirmPassword')} style={{ border: 'none', borderRadius: 0 }}>
//                                                                                 <i className="fas fa-eye" id="confirmPassword-icon"></i>
//                                                                             </button>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                                 <div className="password-requirements mb-3">
//                                                                     <h6 className="fw-semibold mb-2">Password must contain:</h6>
//                                                                     <ul className="list-unstyled">
//                                                                         <li id="length" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least 8 characters</li>
//                                                                         <li id="uppercase" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least one uppercase letter</li>
//                                                                         <li id="lowercase" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least one lowercase letter</li>
//                                                                         <li id="number" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least one number</li>
//                                                                         <li id="special" className="text-muted"><i className="fas fa-circle-notch me-2"></i>At least one special character</li>
//                                                                     </ul>
//                                                                 </div>
//                                                                 <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
//                                                                     <button className="btn btn-primary" onClick={handleUpdate}>Update Password</button>
//                                                                 </div>
//                                                                 <div id="message" className="mt-3" style={{ display: 'none' }}></div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
//                                                         <button className="btn btn-primary" onClick={updateData}>Update</button>
//                                                     </div>
//                                                     <p id="message" className="mt-3"></p>
//                                                 </div>
//                                             </form>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;

// import React, { useState, useEffect } from 'react';
// import '../css/Profile.css';

// const Profile = () => {
//     const [activeTab, setActiveTab] = useState('overview');
//     const [profileImage, setProfileImage] = useState<string>('../images/profile.jpg');
//     const [firstName, setFirstName] = useState('Iva');
//     const [lastName, setLastName] = useState('Traykova');
//     const [email, setEmail] = useState('user@gmail.com');
//     const [location, setLocation] = useState('Varna');
//     const [introduction, setIntroduction] = useState('Developer with over 5 years\' experience working in both the public and private sectors...');
//     const [languages, setLanguages] = useState(['English', 'German', 'French']);
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [passwordStrength, setPasswordStrength] = useState({ strength: '', percentage: 0 });

//     useEffect(() => {
//         // Показваме секцията с преглед при зареждане на страницата
//         setActiveTab('overview');
//     }, []);

//     const handleTabChange = (tab) => {
//         setActiveTab(tab);
//     };

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setProfileImage(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const handleUpdateProfile = () => {
//         // Тук добавете логиката за актуализиране на профила
//         alert('Profile updated successfully!');
//     };


//     const togglePassword = (inputId: string) => {
//         const input = document.getElementById(inputId) as HTMLInputElement;
//         if (input) {
//             input.type = input.type === 'password' ? 'text' : 'password';
//         }
//     };
    
//     const updatePassword = () => {
//         // Логиката за актуализиране на паролата
//         alert('Password updated successfully!');
//     };

//     const checkPasswordStrength = (password) => {
//         const requirements = {
//             length: password.length >= 8,
//             uppercase: /[A-Z]/.test(password),
//             lowercase: /[a-z]/.test(password),
//             number: /[0-9]/.test(password),
//             special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
//         };

//         const strengthPercentage = Object.values(requirements).filter(Boolean).length * 20;
//         let strength = 'weak';

//         if (strengthPercentage >= 80) {
//             strength = 'strong';
//         } else if (strengthPercentage >= 60) {
//             strength = 'good';
//         } else if (strengthPercentage >= 40) {
//             strength = 'medium';
//         }

//         setPasswordStrength({ strength, percentage: strengthPercentage });
//     };

//     return (
//         <div className="min-h-screen bg-background flex">
//             <aside className="sidebar">
//                 <h2 className="text-lg font-semibold mb-4">Navigation</h2>
//                 <nav>
//                     <a href="index.html" className="nav-item">Home</a>
//                     <a href="#" className="nav-item">My Jobs</a>
//                     <a href="#" className="nav-item">Find Freelancers</a>
//                     <a href="profile.html" className="nav-item">Profile</a>
//                     <a href="#" className="nav-item">Messages</a>
//                     <a href="#" className="nav-item">Settings</a>
//                 </nav>
//             </aside>
//             <div className="flex-1">
//                 <div className="header">
//                     <h1 className="text-2xl font-bold text-primary">My Profile</h1>
//                     <div className="button-group">
//                         <a href="login.html"><button className="btn btn-ghost">Log In</button></a>
//                         <a href="signup.html"><button className="btn btn-primary">Sign Up</button></a>
//                     </div>
//                 </div>
//                 <div className="main-content">
//                     <div className="left-form" style={{ marginTop: '20px' }}>
//                         <div className="profile-section">
//                             <div className="profile-image">
//                                 <img src={profileImage} alt="Profile" style={{ width: '100%', height: 'auto' }} />
//                             </div>
//                             <h2 className="name">{`${firstName} ${lastName}`}</h2>
//                             <p className="title">Developer</p>
//                             <div className="rating">
//                                 <i>★</i>
//                                 <i>★</i>
//                                 <i>★</i>
//                                 <i>★</i>
//                                 <i>★</i>
//                             </div>
//                             <div className="social-links">
//                                 <ul className="candidate-detail-social-menu list-inline mb-0">
//                                     <li className="list-inline-item">
//                                         <a href="javascript:void(0)" className="social-link">
//                                             <img src="./images/facebook.png" alt="Facebook" className="social-icon" />
//                                         </a>
//                                     </li>
//                                     <li className="list-inline-item">
//                                         <a href="javascript:void(0)" className="social-link">
//                                             <img src="./images/twitter.jpg" alt="Twitter" className="social-icon" />
//                                         </a>
//                                     </li>
//                                     <li className="list-inline-item">
//                                         <a href="javascript:void(0)" className="social-link">
//                                             <img src="./images/whatsapp.jpeg" alt="WhatsApp" className="social-icon" />
//                                         </a>
//                                     </li>
//                                     <li className="list-inline-item">
//                                         <a href="javascript:void(0)" className="social-link">
//                                             <img src="./images/call.png" alt="Call" className="social-icon" />
//                                         </a>
//                                     </li>
//                                 </ul>
//                             </div>
//                             <hr />
//                             <h3 className="section-title">Documents</h3>
//                             <div className="document">
//                                 <i className="document-icon fa fa-file" />
//                                 <span className="document-title">Resume.pdf</span>
//                                 <i className="download-icon fa fa-download" />
//                             </div>
//                             <div className="document">
//                                 <i className="document-icon fa fa-file" />
//                                 <span className="document-title">Cover-letter.pdf</span>
//                                 <i className="download-icon fa fa-download" />
//                             </div>
//                             <hr />
//                             <div className="contacts">
//                                 <h3 className="section-title">Contacts</h3>
//                                 <p className="contact-info mt-3">
//                                     <span>Email:</span> <span id="displayEmail">{email}</span>
//                                 </p>
//                                 <p className="contact-info">
//                                     <span>Phone:</span> 123-456-7890
//                                 </p>
//                                 <p className="contact-info mt-3">
//                                     <span>Location:</span> <span id="selectedLocation">{location}</span>
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="right-form">
//                         <div className="card profile-content-page mt-4 mt-lg-0">
//                             <div className="button-container">
//                                 <button type="button" className="btn btn-overview" onClick={() => handleTabChange('overview')}>Overview</button>
//                                 <div className="separator" />
//                                 <button type="button" className="btn btn-settings" onClick={() => handleTabChange('settings')}>Settings</button>
//                             </div>
//                             <hr />
//                             {activeTab === 'overview' ? (
//                                 <div>
//                                     <h4 className="fs-18 fw-bold"> About</h4>
//                                     <p className="text-muted mt-4" id="introductionParagraph">{introduction}</p>
//                                     <p className="text-muted">
//                                         It describes the candidate's relevant experience, skills, and achievements. The purpose of this career summary is to explain your qualifications for the job in 3-5 sentences and convince the manager to read the whole resume document.
//                                     </p>
//                                     <div className="candidate-education-details mt-4">
//                                         <h4 className="fs-18 fw-bold mb-0">Education</h4>
//                                         <div className="candidate-education-content mt-4 d-flex">
//                                             <div className="circle">B</div>
//                                             <div className="text">
//                                                 <h6 className="fs-16 mb-1">BCA - Bachelor of Computer Applications</h6>
//                                                 <p className="mb-2 text-muted">International University - (2004 - 2010)</p>
//                                                 <p className="text-muted">
//                                                     There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="candidate-education-content mt-3 d-flex">
//                                             <div className="circle">M</div>
//                                             <div className="text">
//                                                 <h6 className="fs-16 mb-1">MCA - Master of Computer Application</h6>
//                                                 <p className="mb-2 text-muted">International University - (2010 - 2012)</p>
//                                                 <p className="text-muted">
//                                                     There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                         <div className="candidate-education-content mt-3 d-flex">
//                                             <div className="circle">D</div>
//                                             <div className="text">
//                                                 <h6 className="fs-16 mb-1">Design Communication Visual</h6>
//                                                 <p className="mb-2 text-muted">International University - (2012-2015)</p>
//                                                 <p className="text-muted">
//                                                     There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <hr className="my-4" />
//                                     <h4 className="fs-18 fw-bold">Experiences</h4>
//                                     <div className="candidate-experience-content mt-4 d-flex">
//                                         <div className="circle">W</div>
//                                         <div className="text">
//                                             <h6 className="fs-16 mb-1">Web Design & Development Team Leader</h6>
//                                             <p className="mb-2 text-muted">Creative Agency - (2013 - 2016)</p>
//                                             <p className="text-muted">
//                                                 There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <div className="candidate-experience-content mt-3 d-flex">
//                                         <div className="circle">P</div>
//                                         <div className="text">
//                                             <h6 className="fs-16 mb-1">Project Manager</h6>
//                                             <p className="mb-2 text-muted">Jobcy Technology Pvt.Ltd - (Present)</p>
//                                             <p className="text-muted">
//                                                 There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful product development and design specialist with more than 4 Years of My experience.
//                                             </p>
//                                         </div>
//                                     </div>
//                                     <hr className="my-4" />
//                                     <h4 className="fs-18 fw-bold mt-4">Skills</h4>
//                                     <div className="candidate-skills-content mt-4">
//                                         <button className="btn btn-sm btn-skill mb-2">Cloud Management</button>
//                                         <button className="btn btn-sm btn-skill mb-2">Responsive Design</button>
//                                         <button className="btn btn-sm btn-skill mb-2">Network Architecture</button>
//                                         <button className="btn btn-sm btn-skill mb-2">PHP</button>
//                                         <button className="btn btn-sm btn-skill mb-2">Bootstrap</button>
//                                         <button className="btn btn-sm btn-skill mb-2">UI & UX Designer</button>
//                                     </div>
//                                     <h4 className="fs-18 fw-bold mt-4">Spoken languages</h4>
//                                     <div className="candidate-languages-content mt-4" id="languageButtonsContainer">
//                                         {languages.map((language, index) => (
//                                             <button key={index} className="btn btn-sm btn-language mb-2">{language}</button>
//                                         ))}
//                                     </div>
//                                 </div>
//                             ) : (
//                                 <form>
//                                     <div className="form-group">
//                                         <h5 className="fs-17 fw-semibold mb-3 text-center">My Account</h5>
//                                         <div className="text-center mb-4">
//                                             <div className="profile-image-circle">
//                                                 <img src={profileImage} className="profile-img" alt="Profile Image" />
//                                             </div>
//                                             <div className="profile-photo-edit">
//                                                 <input id="profile-img-file-input" type="file" className="profile-img-file-input" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
//                                                 <label htmlFor="profile-img-file-input" className="profile-photo-edit-label" style={{ cursor: 'pointer' }}>
//                                                     Избери изображение
//                                                 </label>
//                                             </div>
//                                         </div>
//                                         <div className="row mb-3">
//                                             <div className="col-lg-6">
//                                                 <label htmlFor="firstName" className="form-label">First Name</label>
//                                                 <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <label htmlFor="lastName" className="form-label">Last Name</label>
//                                                 <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//                                             </div>
//                                         </div>
//                                         <div className="row mb-3">
//                                             <div className="col-lg-6">
//                                                 <label htmlFor="email" className="form-label">Email</label>
//                                                 <input type="text" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <label htmlFor="accountType" className="form-label">Account Type</label>
//                                                 <select className="form-select" id="accountType">
//                                                     <option value="4">Accounting</option>
//                                                     <option value="1">IT & Software</option>
//                                                     <option value="3">Marketing</option>
//                                                     <option value="5">Banking</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <h5 className="fs-17 fw-semibold mb-3">Profile</h5>
//                                         <h5 className="">Introduce Yourself</h5>
//                                         <textarea className="form-control" id="introduction" rows={5} style={{ maxWidth: '100%' }} value={introduction} onChange={(e) => setIntroduction(e.target.value)} />
//                                         <div className="row mb-3">
//                                             <div className="col-lg-6">
//                                                 <label htmlFor="languages" className="form-label">Languages</label>
//                                                 <input type="text" className="form-control" id="languages" value={languages.join(', ')} onChange={(e) => setLanguages(e.target.value.split(',').map(lang => lang.trim()))} />
//                                             </div>
//                                             <div className="col-lg-6">
//                                                 <label htmlFor="location" className="form-label">Location</label>
//                                                 <select className="form-select" id="location" value={location} onChange={(e) => setLocation(e.target.value)}>
//                                                     <option value="SOF">Sofia</option>
//                                                     <option value="PLD">Plovdiv</option>
//                                                     <option value="VAR">Varna</option>
//                                                     <option value="BUR">Burgas</option>
//                                                     <option value="RUS">Ruse</option>
//                                                 </select>
//                                             </div>
//                                         </div>
//                                         <div className="card">
//                                             <div className="card-body">
//                                                 <h5 className="fs-17 fw-semibold mb-3">Change Password</h5>
//                                                 <div id="passwordChangeForm">
//                                                     <div className="row mb-3">
//                                                         <div className="col-lg-111">
//                                                             <label htmlFor="currentPassword" className="form-label">Current password</label>
//                                                             <div className="input-group">
//                                                                 <input type="password" className="form-control-long" id="currentPassword" />
//                                                                 <button className="btn btn-primary" type="button" onClick={() => togglePassword('currentPassword')}>
//                                                                     <i className="fas fa-eye" id="currentPassword-icon" />
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="row mb-3">
//                                                         <div className="col-lg-6 ">
//                                                             <label htmlFor="newPassword" className="form-label">New password</label>
//                                                             <div className="input-group">
//                                                                 <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//                                                                 <button className="btn btn-primary" type="button" onClick={() => togglePassword('newPassword')}>
//                                                                     <i className="fas fa-eye" id="newPassword-icon" />
//                                                                 </button>
//                                                             </div>
//                                                             <div id="passwordStrength" className="mt-2" />
//                                                         </div>
//                                                         <div className="col-lg-6">
//                                                             <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
//                                                             <div className="input-group">
//                                                                 <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
//                                                                 <button className="btn btn-primary" type="button" onClick={() => togglePassword('confirmPassword')}>
//                                                                     <i className="fas fa-eye" id="confirmPassword-icon" />
//                                                                 </button>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                     <div className="password-requirements mb-3">
//                                                         <h6 className="fw-semibold mb-2">Password must contain:</h6>
//                                                         <ul className="list-unstyled">
//                                                             <li id="length" className="text-muted">
//                                                                 <i className="fas fa-circle-notch me-2" />
//                                                                 At least 8 characters
//                                                             </li>
//                                                             <li id="uppercase" className="text-muted">
//                                                                 <i className="fas fa-circle-notch me-2" />
//                                                                 At least one uppercase letter
//                                                             </li>
//                                                             <li id="lowercase" className="text-muted">
//                                                                 <i className="fas fa-circle-notch me-2" />
//                                                                 At least one lowercase letter
//                                                             </li>
//                                                             <li id="number" className="text-muted">
//                                                                 <i className="fas fa-circle-notch me-2" />
//                                                                 At least one number
//                                                             </li>
//                                                             <li id="special" className="text-muted">
//                                                                 <i className="fas fa-circle-notch me-2" />
//                                                                 At least one special character
//                                                             </li>
//                                                         </ul>
//                                                     </div>
//                                                     <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//                                                         <button className="btn btn-primary" onClick={updatePassword}>Update Password</button>
//                                                     </div>
//                                                     <div id="message" className="mt-3" style={{ display: 'none' }} />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="mt-4 text-end" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
//                                             <button className="btn btn-primary" onClick={handleUpdateProfile}>Update</button>
//                                         </div>
//                                         <p id="message" className="mt-3" />
//                                     </div>
//                                 </form>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Profile;