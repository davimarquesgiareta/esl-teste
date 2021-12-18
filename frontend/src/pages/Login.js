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
      {/* <h1>login</h1>
      <label>usuario</label>
      <input type="text" name="email" onChange={e => setEmail(e.target.value)}></input>
      <br/>
      <label>senha</label>
      <input type="text" name="password" onChange={e => setPassword(e.target.value)}></input>
      <button type="button" onClick={()=> handleLogin({email, password})}>Entrar</button> */}
      

  <div class="container mt-3 rounded-left" style={{background:"#F8F8FF"}} >
    <div class="form-group" >
      <label for="exampleInputEmail1" ><h4>E-mail</h4></label>
      <input type="email" class="form-control"  name="email" aria-describedby="emailHelp" placeholder="Digite seu e-mail" onChange={e => setEmail(e.target.value)}/>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1"><h4>Password</h4></label>
      <input type="password" class="form-control" name="password" placeholder="Digite sua senha" onChange={e => setPassword(e.target.value)}/>
    </div>
      
    <div class="d-flex justify-content-end align-items-center mb-3">
    
      <label for="exampleInputPassword1" class="mr-3 ">Criar uma conta</label>
    
    
    <button type="button" class="btn btn-primary w-25" onClick={()=> handleLogin({email, password})}>Entrar</button>
   
    
    
    </div>
   
  </div>    
  

    </>
    
  )
  // return <button type="button" onClick={handleLogin}>Entrar</button>;
}