import React from 'react';
import './Educational.css';
import backgroundImage from '../assets/education.jpeg';

const StudentForm = () => {
  return (
    <form className="form">
      <h2 className="form-title">Form for Students</h2>
      <div className="form-grid">
        <div>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />
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
          <label>Current Education Level (School, College, etc.)</label>
          <input type="text" placeholder="Enter your current education level" />
        </div>
        <div>
          <label>Name of Institution</label>
          <input type="text" placeholder="Enter the name of your institution" />
        </div>
        <div>
          <label>Are you aware of any government educational policies or schemes?</label>
          <div className="inline-options">
            <label><input type="radio" name="awarePolicies" value="yes" /> Yes</label>
            <label><input type="radio" name="awarePolicies" value="no" /> No</label>
          </div>
        </div>
        <div>
          <label>Which challenges do you face in continuing your education? (Check all that apply):</label>
          <div className="inline-options">
            <label><input type="checkbox" /> Financial constraints</label>
            <label><input type="checkbox" /> Lack of access to resources</label>
            <label><input type="checkbox" /> Transportation issues</label>
            <label><input type="checkbox" /> Other (please specify)</label>
            <input type="text" placeholder="Specify other challenges" />
          </div>
        </div>
        <div>
          <label>Would you like to receive information about government policies and schemes related to education?</label>
          <div className="inline-options">
            <label><input type="radio" name="receiveInfo" value="yes" /> Yes</label>
            <label><input type="radio" name="receiveInfo" value="no" /> No</label>
          </div>
        </div>
        <div>
          <label>How would you prefer to receive this information?</label>
          <div className="inline-options">
            <label><input type="checkbox" name="receiveMethod" value="email" /> Email</label>
            <label><input type="checkbox" name="receiveMethod" value="sms" /> SMS</label>
            <label><input type="checkbox" name="receiveMethod" value="webinar" /> Webinar</label>
            <label><input type="checkbox" name="receiveMethod" value="phone" /> Phone Call</label>
          </div>
        </div>
        <div>
          <label>What kind of support do you feel would help you the most?</label>
          <input type="text" placeholder="Enter the kind of support" />
        </div>
        <button type="submit" className='submit-button'>Submit</button>
      </div>
    </form>
  );
};

const Educational = () => {
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
        <StudentForm />
      </div>
    </div>
  );
}

export default Educational;