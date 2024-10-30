import React from 'react';
import '../css/HowItWorksPage.css';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="how-it-works-page">
      <div className="how-it-works-container">
        <h1>How TaskNet Works</h1>
        <section className="about-us">
          <h2>About Us</h2>
          <p>
            TaskNet is a leading freelance marketplace connecting talented professionals with businesses and individuals
            seeking high-quality services. Our platform makes it easy to find, hire, and collaborate with skilled
            freelancers from around the world.
          </p>
        </section>
        <section className="steps">
          <h2>How It Works</h2>
          <div className="step">
            <h3>1. Post a Job</h3>
            <p>
              Describe your project, set your budget, and specify your requirements. Your job posting will be visible
              to our community of skilled freelancers.
            </p>
          </div>
          <div className="step">
            <h3>2. Receive Proposals</h3>
            <p>
              Qualified freelancers will submit their proposals, including their experience, portfolio, and price quotes.
              Review the proposals and choose the best fit for your project.
            </p>
          </div>
          <div className="step">
            <h3>3. Collaborate</h3>
            <p>
              Work directly with your chosen freelancer through our platform. Use our built-in tools for communication,
              file sharing, and project management.
            </p>
          </div>
          <div className="step">
            <h3>4. Pay Securely</h3>
            <p>
              Once the work is completed to your satisfaction, release the payment to the freelancer. Our secure payment
              system ensures safe transactions for both parties.
            </p>
          </div>
        </section>
        <section className="benefits">
          <h2>Why Choose TaskNet?</h2>
          <ul>
            <li>Access to a global pool of talented freelancers</li>
            <li>Secure and easy-to-use platform</li>
            <li>Competitive pricing and flexible hiring options</li>
            <li>24/7 customer support</li>
            <li>Satisfaction guarantee</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HowItWorksPage;