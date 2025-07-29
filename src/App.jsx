import { useState } from 'react'
import './App.css'
import PersonalInfoForm from './components/PersonalInfoForm.jsx'
import EducationForm from './components/EducationForm.jsx'
import ExperienceForm from './components/ExperienceForm.jsx'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    title: '',
    date: '',
  });
  const [experienceData, setExperienceData] = useState([
    {
      company: '',
      position: '',
      resposabilities: '',
      startDate: '',
      endDate: ''
    }
  ])
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [submittedPersonal, setSubmittedPersonal] = useState(false);
  const [submittedEducation, setSubmittedEducation] = useState(false);
  const [submittedExperience, setSubmittedExperience] = useState(false);
  const [experienceErrors, setExperienceErrors] = useState([]);
  const [submittedExperienceData, setSubmittedExperienceData] = useState(null);

  function validate(data) {
    const newErrors = {}
    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.phone) newErrors.phone = 'Phone is required';
    return newErrors;
  }

  function validateExperience(exp) {
    const newErrors = {};
    if (!exp.company) newErrors.company = 'Company is required';
    if (!exp.position) newErrors.position = 'Position is required';
    if (!exp.startDate) newErrors.startDate = 'Start date is required';
    return newErrors;
  }

  function handlePersonalSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setSubmittedPersonal(false);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedPersonal(true);
      setSubmittedData(formData);
    }
  }

  function handleEducationSubmit(e) {
    e.preventDefault();

    const validationErrors = validate(formData);
    setErrors(validationErrors);
    setSubmittedEducation(false);

    if (Object.keys(validationErrors).length === 0) {
      setSubmittedEducation(true);
      setSubmittedData(formData);
    }
  }

  function handleExperienceSubmit(e) {
    e.preventDefault();
    let valid = true;
    const validationErrors = [];

    experienceData.forEach((exp, index) => {
      const errors = validateExperience(exp);
      if (Object.keys(errors).length > 0) {
        valid = false;
      }
      validationErrors[index] = errors;
    });

    setExperienceErrors(validationErrors);
    setSubmittedExperience(false);

    if (valid) {
      setSubmittedExperience(true);
      setSubmittedExperienceData(experienceData);
    }
  }

  return (
    <div>
      <h1 className="cv-heading">CV Application</h1>
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

      {submittedData && (
        <div className="cv-container">
          <h2 className="cv-heading">Curriculum Vitae</h2>

          {submittedPersonal && (
            <section className="cv-section">
              <h3>Personal Information</h3>
              <p><strong>Name:</strong> {submittedData.name}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Phone:</strong> {submittedData.phone}</p>

              <button className="edit-button" onClick={() => setSubmittedPersonal(false)}>
                Edit Information
              </button>
            </section>
          )}

          {submittedEducation && (
            <section className="cv-section">
              <h3>Education</h3>
              <p><strong>School:</strong> {submittedData.school}</p>
              <p><strong>Title of Study:</strong> {submittedData.title}</p>
              <p><strong>Date:</strong> {submittedData.date}</p>

              <button className="edit-button" onClick={() => setSubmittedEducation(false)}>
                Edit Information
              </button>
            </section>
          )}

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
