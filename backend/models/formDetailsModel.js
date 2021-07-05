import mongoose from 'mongoose';
const formDetailsSchema = new mongoose.Schema(
    {
      uid:{type:String,required:true,unique:true},
      email:{type : String},
      formschemaobj:{type:Object},
      formschema:{type:String}
    }
);
const FormDetails = mongoose.model('formdetail', formDetailsSchema);
export default FormDetails;
