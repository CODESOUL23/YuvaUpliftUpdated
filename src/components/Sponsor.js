import React from 'react';
import './Sponsor.css';
import backgroundImage from '../assets/education.jpeg';

const SponsorForm = () => {
  return (
    <form className="form">
      <h2 className="form-title">Form for Sponsors</h2>
      <div className="form-grid">
        <div>
          <label>Full Name/Organization Name</label>
          <input type="text" placeholder="Enter your full name or organization name" />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" pattern="\d{10}" title="Please enter exactly 10 digits" placeholder="Enter your phone number" />
        </div>
        <div>
          <label>Email ID</label>
          <input type="email" placeholder="Enter your email ID" />
        </div>
        <div>
          <label>Are you aware of government initiatives to support education for underprivileged students?</label>
          <div className="inline-options">
            <label><input type="radio" name="awareInitiatives" value="yes" /> Yes</label>
            <label><input type="radio" name="awareInitiatives" value="no" /> No</label>
          </div>
        </div>
        <div>
          <label>Have you ever participated in such initiatives?</label>
          <div className="inline-options">
            <label><input type="radio" name="participatedInitiatives" value="yes" /> Yes</label>
            <label><input type="radio" name="participatedInitiatives" value="no" /> No</label>
          </div>
        </div>
        <div>
          <label>Would you like to receive details about government education policies and sponsorship opportunities?</label>
          <div className="inline-options">
            <label><input type="radio" name="receiveDetails" value="yes" /> Yes</label>
            <label><input type="radio" name="receiveDetails" value="no" /> No</label>
          </div>
        </div>
        <div>
          <label>What type of support would you be interested in providing? (Check all that apply):</label>
          <div className="inline-options">
            <label><input type="checkbox" name="support" value="financial" /> Financial sponsorship</label>
            <label><input type="checkbox" name="support" value="resources" /> Donating resources (books, computers, etc.)</label>
            <label><input type="checkbox" name="support" value="volunteering" /> Volunteering time or expertise</label>
            <label><input type="checkbox" name="support" value="other" /> Other</label>
            <input type="text" name="otherSupport" placeholder="Specify other support" />
          </div>
        </div>
        <div>
          <label>What motivates you to support education initiatives?</label>
          <textarea name="motivation" placeholder="Enter your motivation" className='motivation'></textarea>
        </div>
        <button type="submit" className='submit-button'>Submit</button>
      </div>
    </form>
  );
};

const Sponsor = () => {
  return (
    <div
      className="container"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <div className="form-container">
        <SponsorForm />
      </div>
    </div>
  );
}

export default Sponsor;