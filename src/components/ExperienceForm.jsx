import TextInput from './TextInput.jsx'

function ExperienceForm({ formData, setExperiences, onSubmit, errors,
    submitted }) {

    function handleChange(index, e) {
        const { name, value } = e.target;
        setExperiences(prev => {
            const updated = [...prev];
            updated[index][name] = value;
            return updated
        });
    }

    function addExperience() {
        setExperiences(prev => [
            ...prev,
            { company: '', position: '', resposabilities: '', startDate: '', endDate: '' }
        ]);
    }

    function removeExperience(index) {
        setExperiences(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <form onSubmit={onSubmit}>
            <h2>Job Experience</h2>

            {formData.map((exp, index) => (
                <fieldset key={index} style={{ marginBottom: '1rem' }}>
                    <legend>Experience {index + 1}</legend>
                    <TextInput
                        label="Company Name"
                        name="company"
                        value={exp.company}
                        onChange={(e) => handleChange(index, e)}
                        error={errors[index]?.company}
                    />

                    <TextInput
                        label='Position Title'
                        name="position"
                        value={exp.position}
                        onChange={(e) => handleChange(index, e)}
                        error={errors[index]?.position}
                    />

                    <TextInput
                        label='Main Responsabilities'
                        name="resposabilities"
                        value={exp.resposabilities}
                        onChange={(e) => handleChange(index, e)}
                        error={errors[index]?.resposabilities}
                    />

                    <TextInput
                        label='Start Date'
                        name="startDate"
                        value={exp.startDate}
                        onChange={(e) => handleChange(index, e)}
                        error={errors[index]?.startDate}
                    />

                    <TextInput
                        label='End Date'
                        name="endDate"
                        value={exp.endDate}
                        onChange={(e) => handleChange(index, e)}
                        error={errors[index]?.endDate}
                    />

                    <button type="button" onClick={() => removeExperience(index)}>
                        Remove
                    </button>

                </fieldset>
            ))}

            <button type="button" onClick={addExperience}>
                Add Experience
            </button>

            <br />

            <button type="submit">
                Submit Experience
            </button>

            {submitted && <p className='success'>Form submitted successfully!</p>}
        </form>
    );
}

export default ExperienceForm