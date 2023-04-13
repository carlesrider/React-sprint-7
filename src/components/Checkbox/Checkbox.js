import { Checkbox } from './Checkbox.styled';

const MyCheckbox = (props) => (
    <Checkbox>
        <input type="checkbox" checked={props.checked} name={props.name} onChange={props.onChange}/>
        <label>{props.text}</label>
    </Checkbox>
    
)
export default MyCheckbox;
