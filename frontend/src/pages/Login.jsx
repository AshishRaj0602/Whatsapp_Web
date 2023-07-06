import  React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector,useDispatch } from 'react-redux';
import { register, setLoading } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../utils/services';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();






// import React,{useState} from 'react'
// import { Alert,Button,Form,Row,Col,Stack } from 'react-bootstrap';
// import { postRequest } from '../utils/services';
// import { useDispatch } from 'react-redux';
// import { register } from '../store/userSlice';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import { useNavigate } from 'react-router-dom';
const Login = () => {


  const dispatch=useDispatch();
  const Navigate=useNavigate();
  const [inputs,setInputs]=useState({email:"",password:""});
  const [Error,setError] =useState(false);
  const [ErrorMessage,setErrorMessage] = useState('')
  const navigate = useNavigate();


const handleSubmit =async(e)=>{
  e.preventDefault();
  const res= await postRequest("login",inputs);
 if(res) {
 setError(res.error);
 setErrorMessage(res.message);
 if(!res.error){
  console.log(res.data)
  localStorage.setItem("User",JSON.stringify(res.data));
  dispatch(register(res.data));
  await Swal.fire({
    title: 'Success!',
    text: 'Successfully Registered',
    icon: 'success',
  });
  navigate("/");
}else{
        Swal.fire({
            title: 'login Failed!',
            text: `${ErrorMessage}`,
            icon: 'warning',
          });
    }
 }
 setInputs({email: "", password:""});

}

return (
  <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={inputs.email}
            autoComplete="email"
            onChange={(e)=> setInputs({...inputs,[e.target.name]: e.target.value})}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={inputs.password}
            autoComplete="current-password"
            onChange={(e)=> setInputs({...inputs,[e.target.name]: e.target.value})}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              {/* <div href="" variant="body2" onClick={()=>Navigate("/sigsnup")}> */}
               Don't have an account?<Link href="" variant="body2" onClick={()=>Navigate("/signup")}>Signup</Link>
              {/* </div> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  </ThemeProvider>
);
}

export default Login
