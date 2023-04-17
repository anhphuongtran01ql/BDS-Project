import * as yup from "yup";

const createPostSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    numberOfRooms: yup.number()
        .transform((value) => (isNaN(value) || value === null || value === undefined) ? null : value)
        .required(),
    squareArea: yup.number()
        .transform((value) => (isNaN(value) || value === null || value === undefined) ? null : value)
        .required(),
    price: yup.number()
        .transform((value) => (isNaN(value) || value === null || value === undefined) ? null : value)
        .required()
    ,
    detailAddress: yup.string().required(),
    typeOfApartment: yup.string().required(),
});

export default createPostSchema;