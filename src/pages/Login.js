import React,{useEffect, useState} from 'react'
import './css/login.css'
import {useNavigate} from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import { CircularProgress } from '@mui/material';
import {toast} from 'react-toastify'
import { login } from '../controllers/apiController';
import Dialog from '../components/ForgotPasswordDialog'

const Login = () => {

    const {setAuth}=useStateContext();
    const navigate=useNavigate();
    const [show, setShow] = useState(false)

    useEffect(()=>{

        const auth=sessionStorage.getItem("user");
        if(auth){
             navigate("/")
        }

    },[])

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [loader,setLoader]=useState(false)
    

    async function handleSubmit(e){
        setLoader(true);
        e.preventDefault();
        
        let resp=await login({username,password})
        if(resp){
          sessionStorage.setItem('user',JSON.stringify(resp.message))
          sessionStorage.setItem("token",resp.token)
          setAuth(resp.message);
          navigate("/dashboard");
          return toast.success("Successfully Login")
        }

        toast.error("Username or password are incorrect")
        setLoader(false)
    }

  return (
    
  <>
  {loader?<div style={{height:"100vh",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <CircularProgress/>
  </div>:    

  <div className="login-box">
  <h2 style={{color:"#717883"}}>Login</h2>
  <form onSubmit={handleSubmit}>
    <div className="user-box">
      <input type="text"  required value={username} onChange={(e)=>setUsername(e.target.value)}/>
      <label>username</label>
    </div>
    <div className="user-box">
      <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <label>Password</label>
    </div>
    <p onClick={()=>setShow(true)} className='text-red-400 cursor-pointer text-sm hover:underline fontSize'>Forgot Password?</p>
    <a>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <button type={"Submit"} style={{cursor:"pointer"}}>Login</button>
    </a>
  </form>
  <Dialog show={show} setShow={setShow} />
</div>
}
  </>

  )
}

export default Login