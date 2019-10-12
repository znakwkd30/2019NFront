import React, { Fragment, useState } from 'react';
import Nav from '../Nav';
import { DropzoneArea, DropzoneDialog } from 'material-ui-dropzone';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Upload from 'material-ui-upload/Upload';
import { makeStyles } from '@material-ui/core/styles';

const Axios = require('../../Axios/Axios');

const useStyles = makeStyles(theme => ({
    root: {
      height: '100vh',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

function Product() {
    const classes = useStyles();

    const [values, setValues] = React.useState({
        category: '',
      });
    
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    const handleChange = event => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
        setInput(input => ({
            ...input,
            category: event.target.value      
        }))
    };

    const imageHandleChange = event => {   
        console.log(event);
        const fd = new FormData();
        fd.append('image', event);
        console.log(fd);
        setInput(input => ({
            ...input,
            image: fd,
        }))
    }
    
    const selectFileHandle = e => {
        console.log(e.target.files[0]);
        setImages(e.target.files[0]);
    }

    const [input, setInput] = useState({
      productName: '',
      description: '',
      price: '',
      hashtag: '',
      category: '',
    });
    const [images, setImages] = useState('');

    async function handleSumbit(e) {
        e.preventDefault();
        const fd = new FormData();
        fd.append('image', images);
        let result = await Axios({
          url: 'api/product/', fd,
          headers: {
              'Content-Type': 'multipart/form-data'
          },
          headers: {"token" : window.localStorage.getItem("token") || window.sessionStorage.getItem("token")},
          method: 'post',
          data: {
            productName: input.productName,
            description: input.description,
            price: input.price,
            hashtag: input.hashtag,
            category: input.category,
            image: fd,
          }
        })
        console.log(result);
    }

    return(
        <Fragment>
            <Nav/>
            <Grid item xs={12} sm={8} md={5} elevation={6} square>
            <div className={classes.paper}>
            <Typography component="h1" variant="h5">
                상품등록
            </Typography>
            <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="상품이름"
                    name="productName"
                    autoFocus
                    onBlur={event => {setInput({...input, productName: event.target.value})}}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="상세설명"
                    name="description"
                    autoFocus
                    onBlur={event => {setInput({...input, description: event.target.value})}}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="price"
                    label="가격"
                    onBlur={event => {setInput({...input, price: event.target.value})}}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="hashtag"
                    label="해시태그"
                    name="hashtag"
                    autoFocus
                    onBlur={event => {setInput({...input, hashtag: event.target.value})}}
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} htmlFor="outlined-age-simple">
                    카테고리
                    </InputLabel>
                    <Select
                    value={values.category}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                    inputProps={{
                        name: 'category',
                        id: 'outlined-age-simple',
                    }}
                    >
                    <MenuItem value={"의류"}>의류</MenuItem>
                    <MenuItem value={"전자기기"}>전자기기</MenuItem>
                    <MenuItem value={"도서"}>도서</MenuItem>
                    <MenuItem value={"스타굿즈"}>굿즈</MenuItem>
                    <MenuItem value={"뷰티"}>뷰티</MenuItem>
                    <MenuItem value={"나눔"}>나눔</MenuItem>
                    <MenuItem value={"기타"}>기타</MenuItem>
                    </Select>
                </FormControl>
                <DropzoneArea
                    onChange={imageHandleChange}
                />
                <input type="file" onChange={selectFileHandle}/>
                {/* <div>
                    <Button onClick={handleOpen.bind(this)}>
                    Add Image
                    </Button>
                    <DropzoneDialog
                        open={false}
                        onSave={handleSave.bind(this)}
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                        showPreviews={true}
                        maxFileSize={5000000}
                        onClose={handleClose.bind(this)}
                    />
                </div> */}
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSumbit}
                >
                상품등록
                </Button>
                </form>
            </div>
        </Grid>
        </Fragment>
    )
}

export default Product;