import * as yup from "yup";

const validateSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email invalid"),
  name: yup.string().required("Name is required"),
});

export default validateSchema;
