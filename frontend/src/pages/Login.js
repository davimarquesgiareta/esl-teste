import React, { useContext, useState } from 'react';

import { Context } from '../Context/AuthContext';

export default function Login() {
  const { authenticated, handleLogin } = useContext(Context);

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function whatever (){
    // var getEmail = document.getElementsByName("email");
    // var getPassword = document.getElementsByName("password");

    console.log("infos", email + password)
  }
  return (
    
    <>
      <h1>login</h1>
      <label>usuario</label>
      <input type="text" name="email" onChange={e => setEmail(e.target.value)}></input>
      <br/>
      <label>senha</label>
      <input type="text" name="password" onChange={e => setPassword(e.target.value)}></input>
      <button type="button" onClick={()=> handleLogin({email, password})}>Entrar</button>
      
    </>
    
  )
  // return <button type="button" onClick={handleLogin}>Entrar</button>;
}