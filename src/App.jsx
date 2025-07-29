import { useState } from 'react'
import './App.css'
import PersonalInfoForm from './components/PersonalInfoForm.jsx'
import EducationForm from './components/EducationForm.jsx'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    title: '',
    date: '',
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [submittedPersonal, setSubmittedPersonal] = useState(false);
  const [submittedEducation, setSubmittedEducation] = useState(false);

  function validate(data) {
    const newErrors = {}
    if (!data.name) newErrors.name = 'Name is required';
    if (!data.email) newErrors.email = 'Email is required';
    if (!data.phone) newErrors.phone = 'Phone is required';
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

      {/* // A section to add practical experience (company name, position title, main responsibilities of your jobs, date from and until when you worked for that company) */}
      {/* <ExperienceForm /> */}

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

        </div>
      )}
    </div >
  )
}

export default App
