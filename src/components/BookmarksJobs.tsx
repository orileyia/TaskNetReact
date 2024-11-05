import React, { useState, useEffect, useRef } from 'react';
import '../css/ProfileModule.css';

import facebookIcon from '../images/facebook.png';
import twitterIcon from '../images/twitter.jpg';
import whatsappIcon from '../images/whatsapp.jpeg';
import callIcon from '../images/call.png';
import defaultProfileImage from '../images/profile.jpg';

const Profile = ({ profileImage, firstName, lastName, email, location, facebookIcon, twitterIcon, whatsappIcon, callIcon }) => {
  return (
    <div className="profile-min-h-screen profile-bg-background profile-flex">
      <div className="profile-flex-1">
        <div className="profile-header">
          <h1 className="profile-text-2xl profile-font-bold profile-text-primary">My Profile</h1>
          <div className="profile-button-group">
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
            <div className="col-lg-12">
              <div className="job-box card mt-4">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-1">
                      <a href="company-details.html"><img src="assets/images/featured-job/img-01.png" alt="" className="img-fluid rounded-3" /></a>
                    </div>
                    <div className="col-lg-9">
                      <div className="mt-3 mt-lg-0">
                        <h5 className="fs-17 mb-1"><a href="job-details.html" className="text-dark">Business Associate</a> <small className="text-muted fw-normal">(2-4 Yrs Exp.)</small></h5>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0">Jobcy Technology Pvt.Ltd</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="mdi mdi-map-marker"></i> California</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 - $800 / month</p>
                          </li>
                        </ul>
                        <div className="mt-2">
                          <span className="badge bg-danger-subtle text-danger mt-1">Part Time</span>
                          <span className="badge bg-warning-subtle text-warning mt-1">Urgent</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 align-self-center">
                      <ul className="list-inline mt-3 mb-0">
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="View More">
                          <a href="job-details.html" className="avatar-sm success-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="mdi mdi-eye"></i>
                          </a>
                        </li>
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                          <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#deleteModal" className="avatar-sm danger-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="uil uil-trash-alt"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-box card mt-4">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-1">
                      <a href="company-details.html"><img src="assets/images/featured-job/img-02.png" alt="" className="img-fluid rounded-3" /></a>
                    </div>
                    <div className="col-lg-9">
                      <div className="mt-3 mt-lg-0">
                        <h5 className="fs-17 mb-1"><a href="job-details.html" className="text-dark">Marketing Director</a> <small className="text-muted fw-normal">(2-4 Yrs Exp.)</small></h5>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0">Creative Agency</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="mdi mdi-map-marker"></i> New York</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 - $800 / month</p>
                          </li>
                        </ul>
                        <div className="mt-2">
                          <span className="badge bg-danger-subtle text-danger mt-1">Part Time</span>
                          <span className="badge bg-info-subtle text-info mt-1">Private</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 align-self-center">
                      <ul className="list-inline mt-3 mb-0">
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="View More">
                          <a href="job-details.html" className="avatar-sm success-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="mdi mdi-eye"></i>
                          </a>
                        </li>
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                          <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#deleteModal ```javascript
" className="avatar-sm danger-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="uil uil-trash-alt"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-box card mt-4">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-1">
                      <a href="company-details.html"><img src="assets/images/featured-job/img-03.png" alt="" className="img-fluid rounded-3" /></a>
                    </div>
                    <div className="col-lg-9">
                      <div className="mt-3 mt-lg-0">
                        <h5 className="fs-17 mb-1"><a href="job-details.html" className="text-dark">HTML Developer</a> <small className="text-muted fw-normal">(2-4 Yrs Exp.)</small></h5>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0">Jobcy Technology Pvt.Ltd</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="mdi mdi-map-marker"></i> California</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 - $800 / month</p>
                          </li>
                        </ul>
                        <div className="mt-2">
                          <span className="badge bg-success-subtle text-success mt-1">Freelance</span>
                          <span className="badge bg-primary-subtle text-primary mt-1">Internship</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 align-self-center">
                      <ul className="list-inline mt-3 mb-0">
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="View More">
                          <a href="job-details.html" className="avatar-sm success-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="mdi mdi-eye"></i>
                          </a>
                        </li>
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                          <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#deleteModal" className="avatar-sm danger-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="uil uil-trash-alt"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-box card mt-4">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-1">
                      <a href="company-details.html"><img src="assets/images/featured-job/img-04.png" alt="" className="img-fluid rounded-3" /></a>
                    </div>
                    <div className="col-lg-9">
                      <div className="mt-3 mt-lg-0">
                        <h5 className="fs-17 mb-1"><a href="job-details.html" className="text-dark">Product Sales Specialist</a> <small className="text-muted fw-normal">(5+ Yrs Exp.)</small></h5>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0">Jobcy Technology Pvt.Ltd</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="mdi mdi-map-marker"></i> California</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 - $800 / month</p>
                          </li>
                        </ul>
                        <div className="mt-2">
                          <span className="badge bg-success-subtle text-success mt-1"> Full Time</span>
                          <span className="badge bg-info-subtle text-info mt-1">Private</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 align-self-center">
                      <ul className="list-inline mt-3 mb-0">
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="View More">
                          <a href="job-details.html" className="avatar-sm success-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="mdi mdi-eye"></i>
                          </a>
                        </li>
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                          <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#deleteModal" className="avatar-sm danger-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="uil uil-trash-alt"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-box card mt-4">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-1">
                      <a href="company-details.html"><img src="assets/images/featured-job/img-05.png" alt="" className="img-fluid rounded-3" /></a>
                    </div>
                    <div className="col-lg-9">
                      <div className="mt-3 mt-lg-0">
                        <h5 className="fs-17 mb-1"><a href="job-details.html" className="text-dark">Product Designer</a> <small className="text-muted fw-normal">(0-5 Yrs Exp.)</small></h5>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0">Creative Agency</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="mdi mdi-map-marker"></i> California</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 - $800 / month</p>
                          </li>
                        </ul>
                        <div className="mt-2">
                          <span className="badge bg-primary-subtle text-primary mt-1">Internship</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 align-self-center">
                      <ul className="list-inline mt-3 mb-0">
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="View More">
                          <a href="job-details.html" className="avatar-sm success-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="mdi mdi-eye"></i>
                          </a>
                        </li>
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                          <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#deleteModal" className="avatar-sm danger-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="uil uil-trash-alt"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="job-box card mt-4">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-1">
                      <a href="company-details.html"><img src="assets/images/featured-job/img-06.png" alt="" className="img-fluid rounded-3" /></a>
                    </div>
                    <div className="col-lg-9">
                      <div className="mt-3 mt-lg-0">
                        <h5 className="fs-17 mb-1"><a href="job-details.html" className="text-dark">Project Manager</a> <small className="text-muted fw-normal">(0-2 Yrs Exp.)</small></h5>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0">Jobcy Technology Pvt.Ltd</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="mdi mdi-map-marker"></i> California</p>
                          </li>
                          <li className="list-inline-item">
                            <p className="text-muted fs-14 mb-0"><i className="uil uil-wallet"></i> $250 - $800 / month</p>
                          </li>
                        </ul>
                        <div className="mt-2">
                          <span className="badge bg-success-subtle text-success mt-1">Full Time</span>
                          <span className="badge bg-warning-subtle text-warning mt-1">Urgent</span>
                          <span className="badge bg-info-subtle text-info mt-1">Private</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 align-self-center">
                      <ul className="list-inline mt-3 mb-0">
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="View More">
                          <a href="job-details.html" className="avatar-sm success-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="mdi mdi-eye"></i>
                          </a>
                        </li>
                        <li className="list-inline-item" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete">
                          <a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#deleteModal" className="avatar-sm danger-bg-subtle d-inline-block text-center rounded-circle fs-18">
                            <i className="uil uil-trash-alt"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
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