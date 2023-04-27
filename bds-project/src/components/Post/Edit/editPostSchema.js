import * as yup from "yup";

const editPostSchema = yup.object().shape({
    // postTitle: yup.string().required(),
    // description: yup.string().required(),
    // numberOfRooms: yup
    //     .number()
    //     .transform((value) =>
    //         isNaN(value) || value === null || value === undefined ? null : value
    //     )
    //     .required(),
    // squareArea: yup
    //     .number()
    //     .transform((value) =>
    //         isNaN(value) || value === null || value === undefined ? null : value
    //     )
    //     .required(),
    // price: yup
    //     .number()
    //     .transform((value) =>
    //         isNaN(value) || value === null || value === undefined ? null : value
    //     )
    //     .required(),
    // detailsAddress: yup.string().required(),
    // typeOfApartment: yup.string().required(),
});

export default editPostSchema;

