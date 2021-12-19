import React, { useState, useEffect, useContext } from 'react';

import api from '../api';
import { Context } from '../Context/AuthContext';


export default function Schedule(props) {
  const emailStorage = localStorage.getItem('email');
  var resp =  typeof(emailStorage)
  console.log("o email é", emailStorage)
  const { handleLogout } = useContext(Context);


  console.log(resp)

  const [users, setUsers] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/schedule');

      setUsers(data);
    })();
  }, []);

  console.log(users)


  var Hours = {
    six: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    seven: ['disponível', "marcao", "zanqueta","disponível", "disponível"],
    eight: ['disponivel', "disponivel", "zanqueta","disponível", "disponível"],
    nine: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    ten: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    eleven: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    tweny: ['marcao', "marcao", "zanqueta","disponível", "disponível"],
    thirteen: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    fourtenn: ['marcao', "marcao", "zanqueta","disponível", "disponível"],
    fifteen: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    sixteen: ['disponivel', "marcao", "disponivel","marcao", "disponível"],
    seventeen: ['disponivel', "marcao", "disponivel","disponível", "disponível"],
    eighteen: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    nineteen: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    twelve: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    twelveone: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    twelvetwo: ['disponivel', "marcao", "zanqueta","disponível", "disponível"],
    twelvethree: ['disponivel', "marcao", "zanqueta","disponível", "disponível"]
  }

  return (
    <>
      <div class="container mb-5">
        <div class="row">
          <div class="col-6">
            <h2>Reserva de Sala</h2>
          </div>
          <div class="col-6 d-flex justify-content-end align-items-center">
           <label class="mr-3">Usuário: {emailStorage}</label> 
            <button type="button" onClick={handleLogout}>Sair</button>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="table-responsive" style={{fontSize:"3vh"}}>
          <table class="table-striped" style={{width:"100%"}}>
          <thead>
            <tr>
              <th scope="col">Horário</th>
              <th scope="col">Segunda</th>
              <th scope="col">Terça</th>
              <th scope="col">Quarta</th>
              <th scope="col">Quinta</th>
              <th scope="col">Sexta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">6:00</th>
              {Hours.six.map((sixHours,index)=>(
                <td key={index}> 
                  {sixHours === "disponível" ?
                   <button  type="button" onClick={()=> console.log(index)}  data-toggle="modal" data-target="#exampleModal"> disponível</button> 
                   : 
                   <h3>{sixHours}</h3>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">7:00</th>
              {Hours.seven.map((sixHours,index)=>(
                <td key={index}> 
                  {sixHours === "disponível" ?
                   <button  type="button" onClick={()=> console.log(index)}  data-toggle="modal" data-target="#exampleModal"> disponível</button> 
                   : 
                   <h3>{sixHours}</h3>
                   }
                 </td>
              ))}
                 
            </tr>
            <tr>
              <th scope="row">8:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">9:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">10:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">11:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">12:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">13:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">8:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">14:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">15:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">16:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">17:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">18:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">19:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">20:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">21:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">22:00</th>
              <td>Larry</td>
            </tr>
            <tr>
              <th scope="row">23:00</th>
              <td>Larry</td>
            </tr>

          </tbody>
          </table>
        </div>
      </div>

<br/>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Cadastrar Agendamento</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <textarea class="form-control" name="description" rows="5" placeholder='Digite a descrição do Agendamento'></textarea>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary">Salvar Agendamento</button>
      </div>
    </div>
  </div>
</div>

    </>
  );
}