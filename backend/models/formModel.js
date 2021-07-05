import mongoose from 'mongoose';
// import { useSelector } from 'react-redux';
// import { enterFormDetails } from '../../frontend/src/actions/formActions';
// const enterDetails = useSelector((state) => state.enterFormDetails);
// const { formInfo } = enterDetails;
const formSchema = new mongoose.Schema(

);
const Form = mongoose.model('formdata', formSchema);
export default Form;
