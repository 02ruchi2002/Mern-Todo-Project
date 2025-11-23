import { useState } from "react"
import { Link } from "react-router-dom"

const Login = () => {
    const [userData,setUserData] = useState()

        const handleLogin =async() =>{
        //   e.preventDefault()
       let respone = await fetch('http://localhost:3500/login',{
          method:'Post',
          body:JSON.stringify(userData),
          headers:{
            "Content-Type":"Application/Json"
          }
       })
       let resutl = await respone.json()
       if(resutl){
        //storing jwt token in cookie
        //               keyName   value
        document.cookie="token="+resutl.token
        // navigate('/')
       }
    }

    return (
        <div className="container">
            <h1>Login</h1>
            {/* <form> */}
                <label htmlFor="">Email</label>
                <input
                onChange={(e)=>setUserData({...userData,email:e.target.value})}
                    type="text"
                    name='email'
                    placeholder="enter user email" />
                <label htmlFor="">Password</label>
                <input
                onChange={(e)=>setUserData({...userData,password:e.target.value})}
                    type="text"
                    name='password'
                    placeholder="enter user password" />

                <button type='submit' className="submit">Login</button>
                <Link to="/signup" className="link" onClick={handleLogin}>login Up</Link>
            {/* </form> */}
        </div>
    )
}

export default Login