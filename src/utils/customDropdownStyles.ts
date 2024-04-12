const customDropdownStyles = {
    control: (provided) => ({
        ...provided,
        border: '1px solid #bababa',
        borderRadius: '0.375rem', // Adjusted for consistency with your input component
        fontSize: '1.125rem', // Adjusted to match your input component's text size
        minHeight: '44px', // Adjusted to match your input component's height
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '1.125rem', // Adjusted to match your input component's text size
        color: '#1d1c1d90', // Adjusted to match your input component's placeholder color
        backgroundColor: state.isFocused ? '#F9F9F8' : provided.backgroundColor, // Example focus state styling
    }),
};

export default customDropdownStyles;
