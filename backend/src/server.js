import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from './models/User.js'

dotenv.config()

const app = express()

app.use(express.json())

app.get("/", (req, res)=>{
  return res.status(200).send("voltou")
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





