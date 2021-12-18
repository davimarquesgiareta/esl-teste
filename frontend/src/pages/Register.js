import React, { useState } from 'react';
import api from '../api';
import history from '../history';

export default function Register() {
 
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function submit (){

    if (password === confirmPassword && password!== '' && email !== '' && name !== ''){
      console.log('senhas batem e email ta preenchido')

      const response = await api.post("/auth/register", {
        name: name,
        email: email,
        password: password,
        confirmpassword: confirmPassword 
      }); 

      console.log(response) 
      // if response.msg === "Criado com sucesso!" -> history.push('/login')
      history.push('/login');
    }
  }

  return (
  <>
    <div class="container">
      <h3>Cadastro de Usuários</h3>
    </div>
    <div class="container mt-3 rounded-left" style={{background:"#F8F8FF"}} >
      <div class="form-group" >
        <label for="exampleInputEmail1" ><h4>Nome</h4></label>
        <input type="text" class="form-control"  name="name" aria-describedby="emailHelp" placeholder="Digite seu Nome" onChange={e => setName(e.target.value)}/>
      </div>
      <div class="form-group" >
        <label for="exampleInputEmail1" ><h4>E-mail</h4></label>
        <input type="email" class="form-control"  name="email" aria-describedby="emailHelp" placeholder="Digite seu e-mail" onChange={e => setEmail(e.target.value)}/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1"><h4>Senha</h4></label>
        <input type="password" class="form-control" name="password" placeholder="Digite sua senha" onChange={e => setPassword(e.target.value)}/>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1"><h4>Confirmar Senha</h4></label>
        <input type="password" class="form-control" name="confirmPassword" placeholder="Digite sua senha" onChange={e => setConfirmPassword(e.target.value)}/>
      </div>
      <div class="d-flex justify-content-end align-items-center mb-3">
        <a href='/login' for="exampleInputPassword1" class="mr-3 ">Voltar</a>
      <button type="button" class="btn btn-primary w-25" onClick={()=> submit()}>Criar Conta</button>
      </div>
    </div>    
  </>  
  )
}