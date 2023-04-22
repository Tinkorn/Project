import { useState } from "react"
import axios from "axios";
var temp;
const Login = ()=>{
  var [username,setUser]=useState(null)
  var [password,setPass]=useState(null)
  const urlAPI="http://localhost:5000/register"
const inputUser=(event)=>{
  console.log(event.target.value)
  setUser(event.target.value)
}

const inputPass=(event)=>{
  console.log(event.target.value)
  setPass(event.target.value)
}

const calAPI=()=>{
  axios.post(urlAPI,{user_id:username,password:password})
  .then(function(response){
    console.log(response)
    temp = response.data;
    localStorage.setItem('token',temp)
    console.log(temp)
})
}

const logout =()=>{
  setUser(null)
  setPass(null)
}

  return(
    <div>
      <input placeholder="username" onChange={inputUser}/>
      <br/>
      <input type="password" placeholder="password" onChange={inputPass}/>
      <br/>
      <button onClick={calAPI}>login</button>
      <br/>
      <button onClick={logout}>logout</button>
    </div>
  )
}
export default Login