import * as yup from "yup";

const validateSchema = yup.object().shape({
  email: yup.string().required("Email is required!").email("Email invalid!"),
  username: yup.string().required("Username is required!"),
  fullName: yup.string().required("Full name is required!"),
  gender: yup.string().required("Gender is required!"),
  address: yup.string().required("Address is required!"),  
});

export default validateSchema;
