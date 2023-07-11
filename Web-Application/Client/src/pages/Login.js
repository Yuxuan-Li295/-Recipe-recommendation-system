/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/app.css';
import ReactGoogleLogin from 'react-google-login';
import checkUser from '../components/userDB';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkPassword = async (username_, password_) => {
    let result;

    await checkUser(username_, password_, (success) => {
      if (success) {
        console.log(success);
      } else {
        console.log(success);
      }
      result = success;
      return result;
    });
    return result;
  };

  const loginHandler = async () => {
    if (username.length <= 0 || password.length <= 0) {
      console.log('Invalid username and password. It cannot be empty');
    } else if (!await checkPassword(username, password)) {
      console.log('Incorrect password or username not exists');
    } else if (await checkPassword(username, password)) {
      navigate('/homepage');
    }
  };

  const onSuccess = () => navigate('/homepage');
  const onFailure = (response) => console.error(response);

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <ReactGoogleLogin
            clientId="283065530314-47br03ps00fne249nrmoohspp8agvnpm"
            buttonText="Login with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
          />
          <div
            className="github"
            style={{ backgroundColor: 'blue' }}
            onClick={() => { window.location.href = '/auth/github'; }}
          >
            Login with GitHub
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          <button type="button" className="submit" onClick={() => loginHandler()}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
