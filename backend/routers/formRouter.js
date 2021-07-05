import express from "express";
import expressAsyncHandler from 'express-async-handler';
import FormDetails from "../models/formDetailsModel.js";
//import Form from "../models/formModel.js";
import mongoose from 'mongoose';
const formRouter = express.Router()

formRouter.post(
    '/createformdetails',
    expressAsyncHandler(async (req, res) => {
      
      const formdetails = new FormDetails({
        uid: req.body.uid,
        email: req.body.email,
        formschemaobj:req.body.formschemaobj,
        formschema:req.body.formschema,
      });
      const createdFormDetails = await formdetails.save();
      if(createdFormDetails){
        res.send({
          _id:createdFormDetails._id,
          uid: createdFormDetails.uid,
          email:createdFormDetails.email,
          formschemaobj:createdFormDetails.formschemaobj,
          formschema:createdFormDetails.formschema,
          
        });
        return
      }
    })
  );
formRouter.post(
  '/checkformcreated',
  expressAsyncHandler(async (req,res) => {
    const formdetails = await FormDetails.findOne({ email: req.body.email });
    if (formdetails) 
    {
        res.send({
          _id: formdetails._id,
          uid:formdetails.uid,
          email: formdetails.email,
          formschemaobj:formdetails.formschemaobj,
          formschema: formdetails.formschema,
        });
        return;
    }
    res.status(401).send({ message: 'Not exists' });
  })
)
formRouter.post(
  '/enterformdetails',
  expressAsyncHandler(async (req,res) => {
    const formdetails = await FormDetails.findOne({ uid: req.body.formId });
    if (formdetails) 
    {
        res.send({
          _id: formdetails._id,
          uid:formdetails.uid,
          email: formdetails.email,
          formschemaobj:formdetails.formschemaobj,
          formschema: formdetails.formschema,
        });
        return;
    }
    res.status(401).send({ message: 'Not exists' });
  })
)
const formSchema = new mongoose.Schema(
  {},{strict:false}
);
const Form = mongoose.model('formdata', formSchema);
formRouter.post(
  '/collectresponse',
  expressAsyncHandler(async (req, res) => {;
   
    // var formschema = req.body.formschema;
    // var schema = "{"+formschema.slice(1,formschema.length)+"}"; 
    
    const formdata = new Form(
    
    req.body.formdata
    );
    const createdForm = await formdata.save();
    if(createdForm){
      return;
    }
    res.status(401).send({ message: 'Not exists' });
  })
);
formRouter.post(
  '/getmyformdetails',
  expressAsyncHandler(async (req, res) => {;
    const getmyformdetails = await Form.find({ ownerid: req.body.formId });
   
    if (getmyformdetails) 
    {
        res.send(getmyformdetails);
        return;
    }
    res.status(401).send({ message: 'Not exists' });
  })
);

export default formRouter;