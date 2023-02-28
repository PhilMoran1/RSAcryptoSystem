import React, { useState } from 'react';
import './SelectPerson.css'

interface Props {
    contacts: {
        name: string;
        keypair: {
            pubKey: string;
            privKey: string;
        },
    }[],
    label: string,
    onPersonChange: (sender: { name: string; keypair: { pubKey: string; privKey: string; } }) => void

}

const SelectPerson: React.FC<Props> = ({ contacts, label, onPersonChange }) => {
    const [selectedOption, setSelectedOption] = useState(contacts[0])

    const handleSenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const optionValue = event.target.value;
        const option = contacts.find((option) => option.name === optionValue);

        if (option) {
            setSelectedOption(option);
            onPersonChange(option);
        }
    };


    return (
        <div className='main'>
        <label> {label} </label> <br />
        <select value={selectedOption.name} onChange={handleSenderChange}>
            {contacts.map((option) => (
                <option key={option.name} value={option.name}>
                    {option.name}
                </option>
            ))}
        </select>
        </div>
        
    );
}

export default SelectPerson;