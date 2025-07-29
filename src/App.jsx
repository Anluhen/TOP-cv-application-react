import { useState } from 'react'
import './App.css'
import PersonalInfoForm from './components/PersonalInfoForm.jsx'
import EducationForm from './components/EducationForm.jsx'
import ExperienceForm from './components/ExperienceForm.jsx'

// Main App component that manages the state and renders the CV application
function App() {
  // State for personal and educational information form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    title: '',
    date: '',
  });

  // State for experience form data (array to handle multiple experiences)
  const [experienceData, setExperienceData] = useState([
    {
      company: '',
      position: '',
      resposabilities: '',
      startDate: '',
      endDate: ''
    }
  ]);

  // State to store submitted data for rendering the CV
  const [submittedData, setSubmittedData] = useState(null);

  // State to track validation errors for personal and education forms
  const [errors, setErrors] = useState({});

  // State to track submission status for personal, education, and experience forms
  const [submittedPersonal, setSubmittedPersonal] = useState(false);
  const [submittedEducation, setSubmittedEducation] = useState(false);
  const [submittedExperience, setSubmittedExperience] = useState(false);

  // State to track validation errors for experience form (array for multiple experiences)
  const [experienceErrors, setExperienceErrors] = useState([]);

  // State to store submitted experience data for rendering the CV
  const [submittedExperienceData, setSubmittedExperienceData] = useState(null);

  // Function to validate personal form data
  function validate(data) {
    const newErrors = {}
    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.phone) newErrors.phone = 'Phone is required';
    return newErrors;
  }

  // Function to validate individual experience entries
  function validateExperience(exp) {
    const newErrors = {};
    if (!exp.company) newErrors.company = 'Company is required';
    if (!exp.position) newErrors.position = 'Position is required';
    if (!exp.startDate) newErrors.startDate = 'Start date is required';
    return newErrors;
  }

  // Handler for submitting personal information form
  function handlePersonalSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setSubmittedPersonal(false);

    // If no validation errors, mark the form as submitted and save the data
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedPersonal(true);
      setSubmittedData(formData);
    }
  }

  // Handler for submitting education form
  function handleEducationSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setSubmittedEducation(false);

    // If no validation errors, mark the form as submitted and save the data
    if (Object.keys(validationErrors).length === 0) {
      setSubmittedEducation(true);
      setSubmittedData(formData);
    }
  }

  // Handler for submitting experience form
  function handleExperienceSubmit(e) {
    e.preventDefault();
    let valid = true;
    const validationErrors = [];

    // Validate each experience entry and collect errors
    experienceData.forEach((exp, index) => {
      const errors = validateExperience(exp);
      if (Object.keys(errors).length > 0) {
        valid = false;
      }
      validationErrors[index] = errors;
    });

    setExperienceErrors(validationErrors);
    setSubmittedExperience(false);

    // If all experience entries are valid, mark the form as submitted and save the data
    if (valid) {
      setSubmittedExperience(true);
      setSubmittedExperienceData(experienceData);
    }
  }

  return (
    <div>
      {/* Application heading */}
      <h1 className="cv-heading">CV Application</h1>

      {/* Render personal information form if not submitted */}
      {!submittedPersonal && (
        <div style={{ marginTop: '2rem' }}>
          <PersonalInfoForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handlePersonalSubmit}
            errors={errors}
            submitted={submittedPersonal}
          />
          <hr />
        </div>
      )}

      {/* Render education form if not submitted */}
      {!submittedEducation && (
        <div style={{ marginTop: '2rem' }}>
          <EducationForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleEducationSubmit}
            errors={errors}
            submitted={submittedEducation}
          />
          <hr />
        </div>
      )}

      {/* Render experience form if not submitted */}
      {!submittedExperience && (
        <div style={{ marginTop: '2rem' }}>
          <ExperienceForm
            formData={experienceData}
            setExperiences={setExperienceData}
            onSubmit={handleExperienceSubmit}
            errors={experienceErrors}
            submitted={submittedExperience}
          />
          <hr />
        </div>
      )}

      {/* Render submitted CV data */}
      {submittedData && (
        <div className="cv-container">
          <h2 className="cv-heading">Curriculum Vitae</h2>

          {/* Render personal information section */}
          {submittedPersonal && (
            <section className="cv-section">
              <h3>Personal Information</h3>
              <p><strong>Name:</strong> {submittedData.name}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Phone:</strong> {submittedData.phone}</p>

              {/* Button to edit personal information */}
              <button className="edit-button" onClick={() => setSubmittedPersonal(false)}>
                Edit Information
              </button>
            </section>
          )}

          {/* Render education section */}
          {submittedEducation && (
            <section className="cv-section">
              <h3>Education</h3>
              <p><strong>School:</strong> {submittedData.school}</p>
              <p><strong>Title of Study:</strong> {submittedData.title}</p>
              <p><strong>Date:</strong> {submittedData.date}</p>

              {/* Button to edit education information */}
              <button className="edit-button" onClick={() => setSubmittedEducation(false)}>
                Edit Information
              </button>
            </section>
          )}

          {/* Render experience section */}
          {submittedExperience && submittedExperienceData && (
            <section className="cv-section">
              <h3>Job Experience</h3>
              {submittedExperienceData.map((exp, index) => (
                <div key={index} className="experience-entry">
                  <h4>Experience {index + 1}</h4>
                  <p><strong>Company:</strong> {exp.company}</p>
                  <p><strong>Position:</strong> {exp.position}</p>
                  <p><strong>Responsibilities:</strong> {exp.resposabilities}</p>
                  <p><strong>Start Date:</strong> {exp.startDate}</p>
                  <p><strong>End Date:</strong> {exp.endDate}</p>
                </div>
              ))}

              {/* Button to edit experience information */}
              <button className="edit-button" onClick={() => setSubmittedExperience(false)}>
                Edit Information
              </button>
            </section>
          )}
        </div>
      )}
    </div >
  )
}

export default App
