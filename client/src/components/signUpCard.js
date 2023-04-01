import React,{useRef,useEffect,useState} from "react";
import "../css/signUp.css";


const SignUpCard = () => {

  const userRef=useRef();
  const errRef = useRef();

  const [user,setUser] = useState('')
  const [pass,setPass] = useState('')
  const [errMsg,setErrMsg] = useState('')
  const [succes,setSucces] = useState(false)

  useEffect(()=>{
    setErrMsg('')
  },[user,pass])

  const handleSubmit = async e =>{
    e.preventDefault()
    console.log(user,pass)
    setUser('')
    setPass('')
    setSucces(true)
  }


  return (
    <>
  
    <section class="body">
    
    <div class="card-mid">
      <form class="card-main-mid" onSubmit={handleSubmit}>
        <h1>Create a new account now</h1>
 {/*<p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>*/}
      
      <input type="text" id="email" ref={userRef} autoComplete="off" onChange={e => setUser(e.target.value)} value={user} placeholder="Email" class="input-info" required/>
      <input type="password" id="password" autoComplete="off" onChange={e => setPass(e.target.value)} value={pass} placeholder="Password" class="input-info" required/>
      
      <p>Already have an account? <a href="#"><u>Log In</u></a></p>
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <button class="input-info" id="btn-id"> Confirm </button>
      </form>
    </div>
   
    </section>    
    </>
  );
};

export default SignUpCard;
