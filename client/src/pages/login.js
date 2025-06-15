import './login.css';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';


const Login= () => {

    let navigate = useNavigate();

     async function Validate(){
        await axios.post('http://37.59.112.35:3001/validate', {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            user_id: document.getElementById('id').value
          })
          .then(function (response) {
            sessionStorage.setItem("auth", response.data[0].id)            
            sessionStorage.setItem("username", document.getElementById('username').value)
            sessionStorage.setItem("user_id", document.getElementById('id').value)
            navigate('/home', {state: {name: document.getElementById('username').value}})
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <>
        <div id='navbar'><img className="logo" src='/logo.png'></img></div>
            <div id='bodydivlogin'>
                <div id='logindiv'>
                    <h1>Login</h1>
                    <div id='inputdiv'>
                        <form>
                        <label>User Name:</label>
                        <input placeholder='Username' id='username' aut></input><br></br>
                        <label> User Password:</label>
                        <input placeholder='Password' id='password' type='password'></input><br></br>
                        <label> User Id:</label>
                        <input placeholder='User Id' id='id'></input>
                        </form>
                    </div>
                    <div id='buttondiv'>
                        <button className='loginbutton' onClick={() => {Validate()}}>Sign In</button>
                        <label>Don't have an account? <Link to="/request-access">Request Access</Link></label>
                    </div>
                </div>
            </div>
        </>
    )
  };
  
  export default Login;