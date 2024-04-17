import { StylesConfig } from 'react-select';

type OptionType = {
    label: string;
    value: string;
};

type IsMulti = true;

const customDropdownStyles: StylesConfig<OptionType, IsMulti> = {
    control: (provided) => ({
        ...provided,
        border: '1px solid #bababa',
        borderRadius: '0.375rem',
        fontSize: '1.125rem',
        minHeight: '44px',
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '1.125rem',
        color: '#1d1c1d90',
        backgroundColor: state.isFocused ? '#F9F9F8' : provided.backgroundColor,
    }),
};

export default customDropdownStyles;
