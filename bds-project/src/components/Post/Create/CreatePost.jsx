import React, {useState} from 'react';
import {useForm, Controller} from "react-hook-form";
import {
    useMutation,
} from '@tanstack/react-query';

import {yupResolver} from '@hookform/resolvers/yup';
import Container from "@mui/material/Container";
import {typographyTextAlignLeft} from "../../../themes/commonStyles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import Button from "@mui/material/Button";
import {createPost} from "../../../Services/Post/PostServices";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import InputAdornment from '@mui/material/InputAdornment';
import NumericFormatCustom from "../../../Helper/NumericFormatCustom";
import RequiredComponent from "../../../Helper/RequiredComponent";
import createPostSchema from "./createPostSchema";
import CancelIcon from '@mui/icons-material/Cancel';

const CreatePost = () => {
    const {mutate} = useMutation(createPost)
    const [imagesUpload, setImagesUpload] = useState([])
    const userId = 2;
    const defaultValue = {
        title: '',
        description: '',
        numberOfRooms: '',
        squareArea: 0,
        price: '',
        detailAddress: '',
        typeOfApartment: 'Room',
        authorId: '',
        images: []
    }
    const {handleSubmit, control, formState: {errors}, setValue, getValues} = useForm({
        resolver: yupResolver(createPostSchema),
        defaultValues: defaultValue
    });
    const TYPE_OF_APARTMENT = [
        'Room',
        'Apartment'
    ]

    const handleFileUpload = (e) => {
        if (!e.target.files) {
            return;
        }
        const files = Object.values(e.target.files);
        let imagesData = [];
        files.forEach((file, index) => {
            imagesData = [...imagesData, {name: file.name, src: URL.createObjectURL(file)}]
        })
        setValue('images', [...getValues('images'), ...files])
        setImagesUpload([...imagesUpload, ...imagesData])
    }

    const handleRemoveImage = image => () => {
        setImagesUpload(imagesUpload.filter(item => item.name !== image.name));
        setValue('images', getValues('images').filter(item => item.name !== image.name))
    }

    const onSubmit = data => {
        const additionalData = {
            authorId: userId,
        }
        mutate({...data, ...additionalData}, {
            onSuccess: (data) => {
                //show messae success here
            },
            onError: (error) => {
                //show messae fail here
            },
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container maxWidth="lg">
                <Card className="card-common" sx={{minWidth: 275, marginTop: '30px'}}>
                    <CardContent>
                        <Grid container spacing={3} sx={{width: {xs: '100%', sm: '80%'}, margin: '0 auto'}}>
                            <Grid item xs={12}>
                                <Typography variant="h4"
                                            gutterBottom>Create Post</Typography>
                            </Grid>

                            <Grid item xs={12}
                                  sm={3}
                            >
                                <Typography variant="h6" style={{...typographyTextAlignLeft}}
                                >Title<RequiredComponent/></Typography>
                            </Grid>

                            <Grid item xs={12}
                                  sm={9}
                            >
                                <Controller
                                    control={control}
                                    name="title"
                                    defaultValue={defaultValue.title}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <TextField variant="outlined"
                                                   onChange={onChange}
                                                   fullWidth
                                                   error={errors.title ? true : false}
                                                   helperText={errors?.title && errors?.title?.message}
                                                   value={value}/>
                                    )}/>
                            </Grid>

                            <Grid item xs={12}
                                  sm={3}
                            >
                                <Typography variant="h6" style={{...typographyTextAlignLeft}}
                                            gutterBottom>Number of rooms<RequiredComponent/></Typography>
                            </Grid>

                            <Grid item xs={12}
                                  sm={9}
                            >
                                <Controller
                                    control={control}
                                    name="numberOfRooms"
                                    defaultValue={defaultValue.numberOfRooms}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <TextField variant="outlined"
                                                   onChange={onChange}
                                                   type="number"
                                                   error={errors.numberOfRooms ? true : false}
                                                   helperText={errors?.numberOfRooms && errors?.numberOfRooms?.message}
                                                   fullWidth
                                                   value={value}/>
                                    )}/>
                            </Grid>

                            <Grid item xs={12}
                                  sm={3}
                            >
                                <Typography variant="h6" style={{...typographyTextAlignLeft}}
                                            gutterBottom>Square area<RequiredComponent/></Typography>
                            </Grid>

                            <Grid item xs={12}
                                  sm={9}
                            >
                                <Controller
                                    control={control}
                                    name="squareArea"
                                    defaultValue={defaultValue.squareArea}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <TextField variant="outlined"
                                                   onChange={onChange}
                                                   name="squareArea"
                                                   InputProps={{
                                                       inputComponent: NumericFormatCustom,
                                                       endAdornment: <InputAdornment position="end">m2</InputAdornment>,
                                                   }}
                                                   error={errors.squareArea ? true : false}
                                                   helperText={errors?.squareArea && errors?.squareArea?.message}
                                                   fullWidth
                                                   value={value}/>
                                    )}/>
                            </Grid>

                            <Grid item xs={12}
                                  sm={3}
                            >
                                <Typography variant="h6" style={{...typographyTextAlignLeft}}
                                            gutterBottom>Price<RequiredComponent/></Typography>
                            </Grid>

                            <Grid item xs={12}
                                  sm={9}
                            >
                                <Controller
                                    control={control}
                                    name="price"
                                    defaultValue={defaultValue.price}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <TextField variant="outlined"
                                                   onChange={onChange}
                                                   name="price"
                                                   InputProps={{
                                                       inputComponent: NumericFormatCustom,
                                                       endAdornment: <InputAdornment
                                                           position="end">VNĐ</InputAdornment>,
                                                   }}
                                                   error={errors.price ? true : false}
                                                   helperText={errors?.price && errors?.price?.message}
                                                   fullWidth
                                                   value={value}/>
                                    )}/>
                            </Grid>

                            <Grid item xs={12}
                                  sm={3}
                            >
                                <Typography variant="h6" style={{...typographyTextAlignLeft}}
                                            gutterBottom>Detail Address<RequiredComponent/></Typography>
                            </Grid>

                            <Grid item xs={12}
                                  sm={9}
                            >
                                <Controller
                                    control={control}
                                    name="detailAddress"
                                    defaultValue={defaultValue.detailAddress}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <TextField variant="outlined"
                                                   onChange={onChange}
                                                   fullWidth
                                                   error={errors.detailAddress ? true : false}
                                                   helperText={errors?.detailAddress && errors?.detailAddress?.message}
                                                   value={value}/>
                                    )}/>
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <Typography variant="h6" style={{...typographyTextAlignLeft}}
                                            gutterBottom>Type of Apartment<RequiredComponent/></Typography>
                            </Grid>

                            <Grid item xs={12}
                                  sm={9}
                            >
                                <Controller
                                    control={control}
                                    name="typeOfApartment"
                                    defaultValue={defaultValue.typeOfApartment}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <TextField
                                            fullWidth
                                            id="select-type-of-apartment"
                                            select
                                            value={value}
                                            onChange={onChange}
                                            error={errors.typeOfApartment ? true : false}
                                            helperText={errors?.typeOfApartment && errors?.typeOfApartment?.message}
                                        >
                                            {TYPE_OF_APARTMENT.map((item, index) =>
                                                <MenuItem value={item} key={index}>{item}</MenuItem>
                                            )}
                                        </TextField>
                                    )}/>

                            </Grid>

                            <Grid item xs={12}
                                  sm={3}
                            >
                                <Typography variant="h6" style={{...typographyTextAlignLeft}}
                                            gutterBottom>Description<RequiredComponent/></Typography>
                            </Grid>

                            <Grid item xs={12}
                                  sm={9}
                            >
                                <Controller
                                    control={control}
                                    name="description"
                                    defaultValue={defaultValue.description}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <TextField variant="outlined"
                                                   onChange={onChange}
                                                   multiline
                                                   error={errors.description ? true : false}
                                                   helperText={errors?.description && errors?.description?.message}
                                                   rows={4} fullWidth value={value}/>
                                    )}/>
                            </Grid>

                            <Grid item xs={12}
                                  sm={3}
                            >
                                <Typography variant="h6" style={{...typographyTextAlignLeft}}
                                            gutterBottom>Image<RequiredComponent/></Typography>
                            </Grid>

                            <Grid item xs={12} sx={{display: {sm: 'flex'}}}
                                  sm={9}
                            >
                                <Controller
                                    control={control}
                                    name="description"
                                    defaultValue={defaultValue.description}
                                    render={({field: {onChange, onBlur, value, ref}}) => (
                                        <Button
                                            variant="contained"
                                            component="label"
                                        >
                                            Upload Image
                                            <input
                                                type="file"
                                                hidden
                                                multiple
                                                accept="image/*"
                                                onChange={handleFileUpload}
                                            />
                                        </Button>
                                    )}/>
                            </Grid>

                            <Grid item sm={3}></Grid>
                            <Grid item xs={12} sx={{minHeight: 250}}
                                  sm={9}
                            >
                                <Grid container spacing={2}>
                                    {
                                        imagesUpload.length > 0 && imagesUpload.map((item, index) =>
                                            <Grid item sm={12} md={6} lg={4} xs={12} key={index}>
                                                <div style={{display: 'inline-block', position: 'relative'}}>
                                                    <img
                                                        width={200}
                                                        style={{objectFit: 'contain'}}
                                                        height={200}
                                                        src={item.src}
                                                        alt={`images-${index}`}/>
                                                    <CancelIcon onClick={handleRemoveImage(item)} className='icon-close'/>
                                                </div>
                                            </Grid>
                                        )
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button type='submit' size="small" variant='primary' sx={{
                            width: 'auto',
                            margin: '0 auto',
                            background: '#FF385C',
                            color: 'white',
                            fontSize: 15,
                            fontWeight: 'bold',
                            textTransform: 'none'
                        }}>Create</Button>
                    </CardActions>
                </Card>
            </Container>
        </form>
    );
}
export default CreatePost;
