import { Checkbox } from './Checkbox.styled';

const MyCheckbox = (props) => (
    <Checkbox>
        <label>
        <input type="checkbox" checked={props.checked} name={props.name} onChange={props.onChange}/>
        {props.text}
        </label>
    </Checkbox>
    
)
export default MyCheckbox;
