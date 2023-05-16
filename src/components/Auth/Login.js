import { useState } from 'react';
import './Login.scss';

const Login = (props) => {
    const [emai, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        alert('login')
    }
    return (
        <div className="login-container">
            <div className='header'>
                Don't have an account yet?
            </div>
            <div className='title col-4 mx-auto'>
                Thao Duong Gia
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello, Who's this?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type={"email"}
                        className='form-control'
                        value={emai}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type={"password"}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <span className='fogot-password'>Forgot Password ?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={() => handleLogin()}
                    >Login to Thao Duong Gia</button>
                </div>

            </div>
        </div>
    )
}

export default Login;