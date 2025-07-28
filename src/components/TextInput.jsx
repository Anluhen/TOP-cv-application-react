function TextInput({ label, name, value, onChange, type = "text", error }) {
    return (
        <div style={{ marginBottom: '1rem' }}>
            <label htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
            {error && <div className='error'>{error}</div>}
        </div>
    );
}

export default TextInput