import TextInput from './TextInput.jsx'

function EducationForm({ formData, setFormData, onSubmit, errors,
    submitted }) {

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Education Information</h2>

            <TextInput
                label="School Name"
                name="school"
                value={formData.school}
                onChange={handleChange}
                error={errors.school}
            />

            <TextInput
                label='Title of Study'
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={errors.title}
            />

            <TextInput
                label='Date of Study'
                name="date"
                value={formData.date}
                onChange={handleChange}
                error={errors.date}
            />

            <button type="submit">
                Submit
            </button>

            {submitted && <p className='success'>Form submitted successfully!</p>}
        </form>
    );
}

export default EducationForm