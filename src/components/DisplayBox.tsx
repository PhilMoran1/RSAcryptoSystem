
import './InputBox.css'
interface Props {
    label: string,
    content: string
}

const DisplayBox: React.FC<Props> = ({ label, content }) => {
    return (
        <div className='inputmain'>
            <label>{label}</label>
            <textarea value={content} rows={4} cols={50} > </textarea>
        </div>
    );
}

export default DisplayBox;