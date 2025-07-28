import { useState } from 'react'
import './App.css'
import PersonalInfoForm from './components/PersonalInfoForm.jsx'

function App() {

  return (
    <div>
      <h1>CV Application</h1>
      // Think about how to structure your application into components. Your application should include:
        // A section to add general information like name, email and phone number.
        <PersonalInfoForm />
        {/* // A section to add your educational experience (school name, title of study and date of study) */}
        {/* <EducationForm /> */}
        {/* // A section to add practical experience (company name, position title, main responsibilities of your jobs, date from and until when you worked for that company) */}
        {/* <ExperienceForm /> */}
      {/* // Be sure to include an edit and submit button for each section or for the whole CV. The submit button should submit your form and display the value of your input fields in HTML elements. The edit button should add back (display) the input fields, with the previously displayed information as values. In those input fields, you should be able to edit and resubmit the content. You’re going to make heavy use of state and props, so make sure you understood those concepts.
      // Create a components directory under your src directory and add your components.
      // Include a styles directory under your src directory for your CSS files. You’ll need to import these in the component files to use them. */}
    </div>
  )
}

export default App
