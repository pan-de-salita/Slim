const customDropdownStylesForChatHeader = {
    control: (provided) => ({
        ...provided,
        border: '1px solid #bababa50',
        borderRadius: '0.375rem',
        height: '30px',
        minHeight: '24px', // Ensure the control does not shrink below 24px
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '30px', // Adjust the height of the value container
        padding: '0 6px', // Adjust padding as needed
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '30px', // Adjust the height of the indicators container
    }),
    input: (provided) => ({
        ...provided,
        margin: '0px', // Adjust input margin as needed
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '16px',
        color: '#1d1c1d90',
        backgroundColor: state.isFocused ? '#F9F9F8' : provided.backgroundColor,
    }),
};

export default customDropdownStylesForChatHeader;
