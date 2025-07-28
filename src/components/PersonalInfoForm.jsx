import { useState } from 'react'
import TextInput from './TextInput.jsx'

function PersonalInfoForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    function validate(data) {
        const newErrors = {}
        if (!data.name) newErrors.name = 'Name is required';
        if (!data.email) newErrors.email = 'Email is required';
        if (!data.phone) newErrors.phone = 'Phone is required';
        return newErrors;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Submited:', formData);
            setSubmitted(true);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Personal Information</h2>

            <TextInput
                label="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
            />
            
            <TextInput 
                label='E-mail'
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <TextInput 
                label='Phone Number'
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
            />

            <button type="submit">
                Submit
            </button>

            {submitted && <p className='success'>Form submitted successfully!</p>}
        </form>
    );
}

export default PersonalInfoForm