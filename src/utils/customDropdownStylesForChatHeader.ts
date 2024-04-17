import { StylesConfig } from 'react-select';

type OptionType = {
    label: string;
    value: string;
};

type IsMulti = false;

const customDropdownStylesForChatHeader: StylesConfig<OptionType, IsMulti> = {
    control: (provided) => ({
        ...provided,
        border: '1px solid #bababa50',
        borderRadius: '0.375rem',
        height: '30px',
        minHeight: '24px',
    }),
    valueContainer: (provided) => ({
        ...provided,
        height: '30px',
        padding: '0 6px',
    }),
    indicatorsContainer: (provided) => ({
        ...provided,
        height: '30px',
    }),
    input: (provided) => ({
        ...provided,
        margin: '0px',
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '16px',
        color: '#1d1c1d90',
        backgroundColor: state.isFocused ? '#F9F9F8' : provided.backgroundColor,
    }),
};

export default customDropdownStylesForChatHeader;
