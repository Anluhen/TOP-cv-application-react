import TextInput from './TextInput.jsx'

function PersonalInfoForm({ formData, setFormData, onSubmit, errors,
    submitted }) {

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <form onSubmit={onSubmit}>
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