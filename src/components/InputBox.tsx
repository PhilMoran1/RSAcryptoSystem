import React, { useEffect, useState } from 'react';
import './InputBox.css'

interface Props {
    label: string,
    onInputChange: (value: string) => void

}

const InputBox: React.FC<Props> = ({ label, onInputChange }) => {
    const [input, setInput] = useState("")

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInput(event.target.value)
        onInputChange(event.target.value)
    }


    useEffect(() => {
        onInputChange(input)
        console.log(input)
    },[input])

    return (
        <div className='inputmain'>
            <label>{label}</label>
            {/* <input type='text' value={input} onChange={handleInputChange}></input> */}
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={4} cols={50} > </textarea>
        </div>
    )
}

export default InputBox;