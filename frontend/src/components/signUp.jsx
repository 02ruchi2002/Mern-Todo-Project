import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const SignUp = () => {
    const [userData,setUserData] = useState()
    const navigate = useNavigate()

    const handleSignup =async() =>{
        //   e.preventDefault()
       let respone = await fetch('http://localhost:3500/signup',{
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
        navigate('/')
       }
    }
    return (
        <div className="container">
            <h1>Sign Up</h1>
            {/* <form> */}
                <label htmlFor="">Name</label>
                <input
                    onChange={(e)=>setUserData({...userData,name:e.target.value})}
                    type="text"
                    name='name'
                    placeholder="enter user name" />
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

                <button type='submit' className="submit" onClick={handleSignup}>Sign Up</button>
                <Link to="/login" className="link">Login</Link>
            {/* </form> */}
        </div>
    )
}

export default SignUp