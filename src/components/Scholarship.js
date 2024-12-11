import React from 'react';
import './Scholarship.css';

const scholarships = [
  {
    name: "North South Foundation (NSF) Scholarship 2024-25",
    description: "Provides financial assistance up to ₹30,000 per annum to meritorious Class 12 students entering Engineering, Medicine, or 3-year polytechnic (diploma in engineering) courses, based on merit and financial need.",
    link: "https://www.buddy4study.com/scholarship/north-south-foundation-nsf-scholarship"
  },
  {
    name: "NSP Central Sector Scheme of Scholarship for College and University Students 2024-25",
    description: "Offers financial assistance to meritorious students from economically disadvantaged backgrounds for higher education. Successful applicants will receive an annual scholarship of up to ₹20,000.",
    link: "https://www.buddy4study.com/scholarship/nsp-central-sector-scheme-of-scholarship-for-college-and-university-students"
  },
  {
    name: "LIFE’S GOOD Scholarship Program 2024",
    description: "A CSR initiative by LG Electronics India providing financial assistance to meritorious students from economically weaker backgrounds pursuing undergraduate or postgraduate courses. Preference is given to female students.",
    link: "https://www.buddy4study.com/page/life-s-good-scholarship-program"
  },
  {
    name: "Junior Merit Scholarship for ST/SC/OBC/SEBC/GENERAL/EBC Communities, Odisha 2024-25",
    description: "Supports meritorious Higher Secondary School students of Odisha by providing financial assistance of ₹3,000 per annum for two years.",
    link: "https://www.buddy4study.com/scholarship/junior-merit-scholarship-for-st-sc-obc-sebc-general-ebc-communities-odisha"
  },
  {
    name: "Federal Bank Hormis Memorial Foundation Scholarship 2024-25",
    description: "Provides 100% reimbursement of tuition fees and other educational expenses for first-year undergraduate students pursuing specified professional courses from Gujarat, Karnataka, Kerala, Maharashtra, Punjab, and Tamil Nadu.",
    link: "https://www.buddy4study.com/scholarship/federal-bank-hormis-memorial-foundation-scholarships"
  },
  {
    name: "HDFC Bank Parivartan's ECSS Programme 2024-25",
    description: "Supports meritorious and needy students from underprivileged sections of society by providing monetary assistance up to ₹75,000 for their studies. The programme is open to school students from Classes 1 to 12 and those pursuing diploma, ITI, polytechnic, UG, and PG programmes.",
    link: "https://www.buddy4study.com/page/hdfc-bank-parivartans-ecss-programme"
  }
];

const governmentSchemes = [
  {
    name: "AICTE – Saksham Scholarship Scheme For Specially-Abled Student (Diploma)",
    link: "https://www.myscheme.gov.in/schemes/sak-dip"
  },
  {
    name: "Junior Research Fellowship (JRF) And Research Associateship (RA) For Foreign Nationals",
    link: "https://www.myscheme.gov.in/schemes/jrfrafn"
  },
  {
    name: "Ishan Uday Special Scholarship Scheme For North Eastern Region",
    link: "https://www.myscheme.gov.in/schemes/iu-sss-ner"
  },
  {
    name: "Prime Minister’s Special Scholarship Scheme For The Students Of Union Territories Of Jammu & Kashmir And Ladakh",
    link: "https://www.myscheme.gov.in/schemes/pmsss"
  },
  {
    name: "BSR Scheme",
    link: "https://www.myscheme.gov.in/schemes/bsrs"
  },
  {
    name: "Junior Research Fellowship In Engineering & Technology",
    link: "https://www.myscheme.gov.in/schemes/jrfst"
  },
  {
    name: "Rajiv Gandhi National Fellowship For Scheduled Caste Candidates",
    link: "https://www.myscheme.gov.in/schemes/rgnfscc"
  },
  {
    name: "Pradhan Mantri Uchchatar Shiksha Protsahan (PM-USP) Central Sector Scheme of Scholarship for College and University students",
    link: "https://www.myscheme.gov.in/schemes/csss-cus"
  },
  {
    name: "Free Education For Sports Medal Winners / Participants Of National/ International Events",
    link: "https://www.myscheme.gov.in/schemes/fesmwpnie"
  },
  {
    name: "Research Fellowship In Sciences For Meritorious Students",
    link: "https://www.myscheme.gov.in/schemes/rfsms"
  }
];

const Scholarship = () => {
  return (
    <div>
      <h1 className="scholarship-heading">Scholarships</h1>
      <div className="scholarship-container">
        {scholarships.map((scholarship, index) => (
          <div className="scholarship-panel" key={index}>
            <h2 className="scholarship-title">{scholarship.name}</h2>
            <p className="scholarship-description">{scholarship.description}</p>
            <p className="link-label"><strong>Link: </strong></p>
            <p className="scholarship-link">
              <a href={scholarship.link} target="_blank" rel="noopener noreferrer" className="link-text">{scholarship.link}</a>
            </p>
          </div>
        ))}
      </div>
      <h1 className="government-schemes-heading">Government Schemes</h1>
      <div className="marquee-container">
        <marquee direction="up" height="150px" scrollamount="5" behavior="scroll" loop="infinite">
          <ul className="government-schemes-list visible-bullets">
            {governmentSchemes.map((scheme, index) => (
              <li key={index} className="scheme-item">
                <span className="scheme-name">{scheme.name}</span> - <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="learn-more-link">Learn more</a>
              </li>
            ))}
            {governmentSchemes.map((scheme, index) => (
              <li key={index + governmentSchemes.length} className="scheme-item">
                <span className="scheme-name">{scheme.name}</span> - <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="learn-more-link">Learn more</a>
              </li>
            ))}
          </ul>
        </marquee>
      </div>
    </div>
  );
};

export default Scholarship;
