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

  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-6">
            {emailStorage}
          </div>
          <div class="col-6">
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
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
          </tbody>
          </table>
        </div>
      </div>

<br/>

    </>
  );
}