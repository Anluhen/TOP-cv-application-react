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
      <h1 style={{ maxWidth: '400px', margin: 'auto' }}>CV Application</h1>
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
        <div style={{ marginTop: '2rem' }}>
          <h2>Submitted Data:</h2>

          {submittedPersonal && (
            <div>
              <h3>Personal Information</h3>
              <p><strong>Name:</strong> {submittedData.name}</p>
              <p><strong>Email:</strong> {submittedData.email}</p>
              <p><strong>Phone:</strong> {submittedData.phone}</p>

              <button onClick={() => setSubmittedPersonal(false)} style={{ marginTop: '1rem' }}>
                Edit Information
              </button>
            </div>
          )}

          {submittedEducation && (
            <div>
              <h3>Education Information</h3>
              <p><strong>School Name:</strong> {submittedData.school}</p>
              <p><strong>Title of Study:</strong> {submittedData.title}</p>
              <p><strong>Date of Study:</strong> {submittedData.date}</p>

              <button onClick={() => setSubmittedEducation(false)} style={{ marginTop: '1rem' }}>
                Edit Information
              </button>
            </div>
          )}

          {submittedExperience && submittedExperienceData && (
            <div>
              <h3>Job Experience</h3>
              {submittedExperienceData.map((exp, index) => (
                <div key={index} style={{ marginBottom: '1rem' }}>
                  <h4>Experience {index + 1}</h4>
                  <p><strong>Company Name:</strong> {exp.company}</p>
                  <p><strong>Position Title:</strong> {exp.position}</p>
                  <p><strong>Main Responsibilities:</strong> {exp.resposabilities}</p>
                  <p><strong>Start Date:</strong> {exp.startDate}</p>
                  <p><strong>End Date:</strong> {exp.endDate}</p>
                </div>
              ))}

              <button onClick={() => setSubmittedExperience(false)} style={{ marginTop: '1rem' }}>
                Edit Information
              </button>
            </div>
          )}

        </div>
      )}
    </div >
  )
}

export default App
