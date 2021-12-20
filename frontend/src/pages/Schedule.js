import React, { useState, useEffect, useContext } from 'react';

import api from '../api';
import { Context } from '../Context/AuthContext';


export default function Schedule(props) {
  const emailStorage = localStorage.getItem('email');

  const { handleLogout } = useContext(Context);

  const [users, setUsers] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/schedule');

      setUsers(data);
    })();
  }, []);

   var userLogged = {}

  var Hours = {
    six: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    seven: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    eight: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    nine: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    ten: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    eleven: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    twelve: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    thirteen: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    fourteen: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    fifteen: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    sixteen: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    seventeen: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    eighteen: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    nineteen: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    tweny: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    twenyone: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    twenytwo: ['disponivel','disponivel','disponivel','disponivel','disponivel'],
    twenythree: ['disponivel','disponivel','disponivel','disponivel','disponivel']
  }

  for (let index = 0; index < users.length; index++) {
    
    if (`"${users[index].email}"` === emailStorage){
      userLogged = users[index]
    }    
  }

  function putOnSchedule(schedule, user){
   
    switch (schedule.hourSchedule) {
      case 6:
        Hours.six[schedule.weekDay] = user.name
        break;
      case 7:
        Hours.seven[schedule.weekDay] = user.name
        break;
      case 8:
        Hours.eigth[schedule.weekDay] = user.name
        break;
      case 9:
        Hours.nine[schedule.weekDay] = user.name
        break;
      case 10:
        Hours.ten[schedule.weekDay] = user.name
        break;
      case 11:
      Hours.eleven[schedule.weekDay] = user.name
      break;
      case 12:
        Hours.twelve[schedule.weekDay] = user.name
      break;
      case 13:
        Hours.thirteen[schedule.weekDay] = user.name
      break;
      case 14:
        Hours.fourteen[schedule.weekDay] = user.name
      break;
      case 15:
        Hours.fifteen[schedule.weekDay] = user.name
      break;
      case 16:
        Hours.sixteen[schedule.weekDay] = user.name
      break;
      case 17:
        Hours.seventeen[schedule.weekDay] = user.name
      break;
      case 18:
        Hours.eigthteen[schedule.weekDay] = user.name
      break;
      case 19:
        Hours.nineteen[schedule.weekDay] = user.name
      break;
      case 20:
        Hours.tweny[schedule.weekDay] = user.name
      break;
      case 21:
        Hours.twenyone[schedule.weekDay] = user.name
      break;
      case 22:
        Hours.twenytwo[schedule.weekDay] = user.name
      break;
      case 23:
        Hours.twenythree[schedule.weekDay] = user.name
      break;
      default:
        console.log(`Nao deu em nada`);
  }
  }

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < users[i].schedule.length; j++) {
      putOnSchedule(users[i].schedule[j], users[i])
    }
    
  }

  return (
    <>
      <div class="container mb-5">
        <div class="row">
          <div class="col-6">
            <h2>Reserva de Sala</h2>
          </div>
          <div class="col-6 d-flex justify-content-end align-items-center">
           <label class="mr-3">Usuário: {userLogged.name}</label> 
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
                  {sixHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(index)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{sixHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">7:00</th>
              {Hours.seven.map((sixHours,index)=>(
                <td key={index}> 
                  {sixHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <h3>{sixHours}</h3>
                   }
                 </td>
              ))}
                 
            </tr>
            <tr>
              <th scope="row">8:00</th>
              {Hours.eight.map((eightHours,index)=>(
                <td key={index}> 
                  {eightHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{eightHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">9:00</th>
              
              {Hours.nine.map((nineHours,index)=>(
                <td key={index}> 
                  {nineHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{nineHours}</label>
                   }
                 </td>
              ))}
              
            </tr>
            <tr>
              <th scope="row">10:00</th>
              {Hours.ten.map((tenHours,index)=>(
                <td key={index}> 
                  {tenHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{tenHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">11:00</th>
              {Hours.eleven.map((elevenHours,index)=>(
                <td key={index}> 
                  {elevenHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{elevenHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">12:00</th>
              {Hours.twelve.map((twelveHours,index)=>(
                <td key={index}> 
                  {twelveHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{twelveHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">13:00</th>
              {Hours.thirteen.map((thirteenHours,index)=>(
                <td key={index}> 
                  {thirteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{thirteenHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">14:00</th>
              {Hours.fourteen.map((fourteenHours,index)=>(
                <td key={index}> 
                  {fourteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{fourteenHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">15:00</th>
              {Hours.fifteen.map((fifteenHours,index)=>(
                <td key={index}> 
                  {fifteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{fifteenHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">16:00</th>
              {Hours.sixteen.map((sixteenHours,index)=>(
                <td key={index}> 
                  {sixteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{sixteenHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">17:00</th>
              {Hours.seventeen.map((seventeenHours,index)=>(
                <td key={index}> 
                  {seventeenHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{seventeenHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">18:00</th>
              {Hours.eighteen.map((eighteenHours,index)=>(
                <td key={index}> 
                  {eighteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{eighteenHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">19:00</th>
              {Hours.nineteen.map((nineteenHours,index)=>(
                <td key={index}> 
                  {nineteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{nineteenHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">20:00</th>
              {Hours.tweny.map((twenyHours,index)=>(
                <td key={index}> 
                  {twenyHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{twenyHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">21:00</th>
              {Hours.twenyone.map((twenyoneHours,index)=>(
                <td key={index}> 
                  {twenyoneHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{twenyoneHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">22:00</th>
              {Hours.twenytwo.map((twenytwoHours,index)=>(
                <td key={index}> 
                  {twenytwoHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{twenytwoHours}</label>
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">23:00</th>
              {Hours.twenythree.map((twenythreeHours,index)=>(
                <td key={index}> 
                  {twenythreeHours === "disponivel" ?
                   <button  type="button" onClick={()=> console.log(`${index}`)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label>{twenythreeHours}</label>
                   }
                 </td>
              ))}
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