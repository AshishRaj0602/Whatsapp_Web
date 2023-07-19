
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
import { useDispatch, useSelector } from 'react-redux';
import { register, setLoading } from '../store/userSlice';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../utils/services';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Loading from '../components/loading/Loading';

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

 const  SignUp=()=> {
    const dispatch=useDispatch();
    const isloading=useSelector(state=> state?.user?.isLoading)
    const [inputs,setInputs]=useState({name:"",email:"",password:""});
    const navigate = useNavigate();
  const handleSubmit =async(e)=>{
    e.preventDefault();
   dispatch(setLoading(true));
   const res= await postRequest("register",inputs);
   dispatch(setLoading(false));
   if(res) {
    if(!res.error){
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
            title: 'Registration Failed!',
            text: `${res.message}`,
            icon: 'warning',
          });
    }
   }
   if(res.status===208){
    setInputs({name: '',email: '',password:''});
   }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      {isloading ?<Loading/>:<Container component="main" maxWidth="xs">
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={inputs.name}
              autoComplete="name"
              autoFocus
              onChange={(e)=> setInputs({...inputs,[e.target.name]: e.target.value})}
            />
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={inputs.password}
              label="Password"
              type="password"
              id="password"
              autoComplete="password"
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
                <Link href="" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                 Already have an account? <Link href="/login" variant="body">Login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>}
    </ThemeProvider>
  );
}

export default SignUp