import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from './models/User.js'
import { v4 as uuidv4 } from 'uuid';

dotenv.config()

const app = express()

app.use(express.json())

//FUNCTIONS
function checkToken(request,response,next){
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]

  if(!token){
    return response.status(401).json({msg:"Access Denied!"})
  }

  try {
    const secret = process.env.SECRET

    jwt.verify(token,secret)

    next()

  } catch (error) {
    response.status(400).json({msg:"Token invalid"})
  }
}

// Schedule Details
app.get("/user/:id/:idescription",checkToken , async (request, response)=>{
 
    const id = request.params.id
    const idescription = request.params.idescription

    console.log(id)
    console.log(idescription)
  
    const user = await User.findById(id, '-password')

    var indexSchedule = null

     user.schedule.map( (element,index)=> {
      if (element.id === idescription){
        indexSchedule = index
      }
    })

    const schedule =  user.schedule[indexSchedule]
    
    if(!user){
      return response.status(404).json({msg:"User not found"})
    }
  
    return response.status(200).json({schedule})
  
})

// Delete a Schedule
app.delete("/user/:id/:idescription", checkToken, async (request, response)=>{
 
  const id = request.params.id
  const idescription = request.params.idescription

  const user = await User.findById(id, '-password')

  var filteredSchedules = user.schedule.filter((value)=>{ return value.id !== idescription });

  const updateWithDeletedUser = await User.updateOne({_id:id}, { $set:{schedule: filteredSchedules}})

  return response.status(200).json({updateWithDeletedUser })
  
})

// All Users Registered

app.get("/schedule",checkToken ,async(request, response)=>{
  const users = await User.find({}, '-password')
  return response.status(201).json(users)
})

// REgister a Schedule

app.put("/register/:id", checkToken, async (request, response)=>{
  const { id } = request.params
  const { schedule } = request.body

  const userInfo = await User.findById(id, '-password')
 
  var allSchedules = []

  userInfo.schedule.forEach(element => {
    allSchedules.push(element)
  });

  const schedulePlusId = {
    id: uuidv4(),
    ...schedule[0]
  }

  console.log("schedule ai->", schedule[0])
  console.log("schedule + id", schedulePlusId)
  allSchedules.push(schedulePlusId)

  console.log('ALL SCHEDULES', allSchedules)

  const user = await User.updateOne({_id:id}, { $set:{schedule: allSchedules}})

  return response.status(200).json({user})

  // return response.status(200).json({msg:"ta.."})
  
})



// Login
app.post('/auth/login', async(request,response)=>{
  const {email, password} = request.body

  if(!email){
    return response.status(422).json({msg:"Email is required"})
  }

  if(!password){
    return response.status(422).json({msg:"Password is required"})
  }

  const user = await User.findOne({email: email})

  if (!user){
    return response.status(404).json({msg:"User not found"})
  }

  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword){
    return response.status(422).json({msg:"Password Invalid"})
  }

  try {

    const secret = process.env.SECRET
    const token = jwt.sign({
      id: user._id
    },secret)

    response.status(200).json({msg:"Auth Sucessfull", token})
    
  } catch (error) {
    console.log(error)

    response.status(500).json({
      msg:"Some failed"
    })
  }

})

// Register User
app.post("/auth/register", async(request,response)=>{

const {name, email, password, confirmpassword} = request.body

if(!name){
return response.status(422).json({msg:"Nome requerido"})
}

if(!email){
return response.status(422).json({msg:"Email requerido"})
}

if(!password){
return response.status(422).json({msg:"Senha requerido"})
}

if(password != confirmpassword){
return response.status(422).json({msg:"Senha e Confirmar Senha são diferentes"})
}

const userExists = await User.findOne({email: email})

if(userExists){
return response.status(422).json({msg:"Email já está em uso"})
}

const salt = await bcrypt.genSalt(12)
const passwordHash = await bcrypt.hash(password,salt)

const user = new User({
name,
email,
password: passwordHash,
})

try {
await user.save()

response.status(201).json({msg:"Criado com sucesso!"})

} catch (error) {
console.log(error)
response.status(500).json({msg:error})
}

})

//Credentials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose.
connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.jx2ku.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`).
then(()=>{
  app.listen(3333, ()=> console.log("rodando..."))
})
.catch((err)=> console.log(err))





