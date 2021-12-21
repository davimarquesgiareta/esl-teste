import React, { useState, useEffect, useContext } from 'react';
import $ from "jquery"
import api from '../api';
import history from '../history';
import { Context } from '../Context/AuthContext';

import './../styles/button.css'

export default function Schedule(props) {
  const emailStorage = localStorage.getItem('email');

  const { handleLogout } = useContext(Context);
  const [description, setDescription] = useState("")
  const [updateDescription, setUpdateDescription] = useState("")
  const [indexDescription, setIndexDescription] = useState("")
  const [hourDescription, setHourDescription] = useState("")
  const [userData, setUserData] = useState({})
  const [scheduleData, setScheduleData] = useState({})
  const [users, setUsers] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/schedule');

      setUsers(data);
    })();
  }, []);

  var indexDelete = ""
  var hourDelete= ""
  var userValues = ""
  var scheduleDatax =""
  
  function deleteValues(index, hour){
  indexDelete= index
  hourDelete= hour
  }

  async function deleteUser(day, hour){
    var idUser = userLogged._id
    var idSchedule = ""
    for (let i = 0; i<userLogged.schedule.length ; i++) {
     if( userLogged.schedule[i].weekDay === day &&  userLogged.schedule[i].hourSchedule === hour){
       idSchedule = userLogged.schedule[i].id
     }
    }

    const response = await api.delete(`/user/${idUser}/${idSchedule}`); 

    alert("Deletado com Sucesso!");
    document.location.reload(true)
  }

  function setUserValues(index, hour){
    setIndexDescription(index)
    setHourDescription(hour)
  }

  async function setUser(){
    var idUser = userLogged._id
    const response = await api.post(`/register/${idUser}`, {
      schedule:[
        {
          description: description,
          weekDay: indexDescription ,
          hourSchedule: hourDescription 
        }
      ]
    }); 
    
    alert("Agendado com Sucesso!");
    document.location.reload(true)

  }

  function getUserValues(index, hour){
   for (let i = 0; i < users.length; i++) {
     for (let j = 0; j < users[i].schedule.length; j++) {
      if (users[i].schedule[j].weekDay === index && users[i].schedule[j].hourSchedule === hour ){
        userValues = users[i]
        scheduleDatax = users[i].schedule[j]
        
      }
        setUserData(userValues)
        setScheduleData(scheduleDatax)
     }  
   }
   
   
   window.$('#exampleModal3').modal();
  

  }

  async function updateUser(){
   var idUser = userData._id
   var idSchedule = scheduleData.id

   const response = await api.put(`/user/${idUser}/${idSchedule}`, {
    schedule:[
      {
        description: updateDescription
      }
    ]
  }); 
  
  alert("Alterado com Sucesso!");
  document.location.reload(true)
  }

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
        console.log(`Horário não existe`);
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
                   <button  type="button" onClick={()=> setUserValues(index, 6)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 6) } >{sixHours}</label>
                   } 
                   {
                     sixHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 6)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">7:00</th>
              {Hours.seven.map((sevenHours,index)=>(
                <td key={index}> 
                  {sevenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 7)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 7) } >{sevenHours}</label>
                   }
                   {
                     sevenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 7)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
                 
            </tr>
            <tr>
              <th scope="row">8:00</th>
              {Hours.eight.map((eightHours,index)=>(
                <td key={index}> 
                  {eightHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 8)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 8) } >{eightHours}</label>
                   }
                   {
                     eightHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 8)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">9:00</th>
              
              {Hours.nine.map((nineHours,index)=>(
                <td key={index}> 
                  {nineHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 9)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 9) } >{nineHours}</label>
                   }
                   {
                     nineHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 9)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
              
            </tr>
            <tr>
              <th scope="row">10:00</th>
              {Hours.ten.map((tenHours,index)=>(
                <td key={index}> 
                  {tenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 10)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 10) } >{tenHours}</label>
                   }
                   {
                     tenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 10)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">11:00</th>
              {Hours.eleven.map((elevenHours,index)=>(
                <td key={index}> 
                  {elevenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 11)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 11) } >{elevenHours}</label>
                   }
                   {
                     elevenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 11)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">12:00</th>
              {Hours.twelve.map((twelveHours,index)=>(
                <td key={index}> 
                  {twelveHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 12)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 12) } >{twelveHours}</label>
                   }
                   {
                     twelveHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 12)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">13:00</th>
              {Hours.thirteen.map((thirteenHours,index)=>(
                <td key={index}> 
                  {thirteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 13)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 13) } >{thirteenHours}</label>
                   }
                   {
                     thirteenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 13)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">14:00</th>
              {Hours.fourteen.map((fourteenHours,index)=>(
                <td key={index}> 
                  {fourteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 14)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 14) } >{fourteenHours}</label>
                   }
                   {
                     fourteenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 14)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">15:00</th>
              {Hours.fifteen.map((fifteenHours,index)=>(
                <td key={index}> 
                  {fifteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 15)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 15) } >{fifteenHours}</label>
                   }
                   {
                     fifteenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 15)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">16:00</th>
              {Hours.sixteen.map((sixteenHours,index)=>(
                <td key={index}> 
                  {sixteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 16)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 16) } >{sixteenHours}</label>
                   }
                   {
                     sixteenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 16)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">17:00</th>
              {Hours.seventeen.map((seventeenHours,index)=>(
                <td key={index}> 
                  {seventeenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 17)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 17) } >{seventeenHours}</label>
                   }
                   {
                     seventeenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 17)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">18:00</th>
              {Hours.eighteen.map((eighteenHours,index)=>(
                <td key={index}> 
                  {eighteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 18)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 6) } >{eighteenHours}</label>
                   }
                   {
                     eighteenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 18)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">19:00</th>
              {Hours.nineteen.map((nineteenHours,index)=>(
                <td key={index}> 
                  {nineteenHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 19)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 6) } >{nineteenHours}</label>
                   }
                   {
                     nineteenHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 20)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">20:00</th>
              {Hours.tweny.map((twenyHours,index)=>(
                <td key={index}> 
                  {twenyHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 20)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 20) } >{twenyHours}</label>
                   }
                   {
                     twenyHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 20)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                   
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">21:00</th>
              {Hours.twenyone.map((twenyoneHours,index)=>(
                <td key={index}> 
                  {twenyoneHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 21)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 21) } >{twenyoneHours}</label>
                   }
                   {
                     twenyoneHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 21)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">22:00</th>
              {Hours.twenytwo.map((twenytwoHours,index)=>(
                <td key={index}> 
                  {twenytwoHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 22)} data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 22) } >{twenytwoHours}</label>
                   }
                   {
                     twenytwoHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 22)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
                   }
                 </td>
              ))}
            </tr>
            <tr>
              <th scope="row">23:00</th>
              {Hours.twenythree.map((twenythreeHours,index)=>(
                <td key={index}> 
                  {twenythreeHours === "disponivel" ?
                   <button  type="button" onClick={()=> setUserValues(index, 23)}  data-toggle="modal" data-target="#exampleModal"> disponivel</button> 
                   : 
                   <label style={{cursor:"pointer"}} onClick={()=> getUserValues(index, 23) } >{twenythreeHours}</label>
                   }
                   {
                     twenythreeHours === userLogged.name ? 
                     <button className="button ml-1" onClick={()=> deleteValues(index, 23)}  data-toggle="modal" data-target="#exampleModal2">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                       </svg>
                     </button> : ''
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
      <textarea class="form-control" name="description" rows="5" onChange={e => setDescription(e.target.value)} placeholder='Digite a descrição do Agendamento'></textarea>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={()=> setUser()}>Salvar Agendamento</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Deletar o Agendamento</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <h3>Deseja mesmo deletar?</h3>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        <button type="button" class="btn btn-primary"  data-dismiss="modal" onClick={()=> deleteUser(indexDelete, hourDelete)}>Deletar</button>
      </div>
    </div>
  </div>
</div>



 <div class="modal fade" id="exampleModal3" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel3" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Detalhes do Usuário</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
       <div>
         <h5>Professor: {userData.name}</h5>
         <h5>Data da reserva: {scheduleData.date}</h5>
         <h5>Hora da reserva: {scheduleData.hour} </h5>
         {userLogged.name === userData.name ?
          <textarea class="form-control" name="description" rows="5" onChange={e => setUpdateDescription(e.target.value)} placeholder='Digite a descrição do Agendamento'>{scheduleData.description}</textarea> : 
          <h5>Descrição: {scheduleData.description} </h5>}
         
       </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
        {userLogged.name === userData.name ?
          <button type="button" class="btn btn-primary" onClick={()=> updateUser()}  data-dismiss="modal" >Salvar</button>  : 
          ''}
      </div>
    </div>
  </div>
</div>



    </>
  );
}