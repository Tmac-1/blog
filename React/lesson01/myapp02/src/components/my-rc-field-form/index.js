
import _Form from './Form';
import Field from './Field';
import useForm from './useForm';

const Form = _Form;
// const Form = React.forwardRef(_Form)
Form.useForm = useForm;

export {Field, useForm}
export default Form;