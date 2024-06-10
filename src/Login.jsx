import { useState, useRef, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { Link } from 'react-router-dom';

const Login = () => {
    const [user, setUser] = useState("");
    const userRef = useRef();
    const [pass, setPass] = useState("");
    const [usersRegister, setUserRegister] = useLocalStorage("users");
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        userRef.current.focus();
    }, []);
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(usersRegister);
        const result = usersRegister.find((e) => e.user === user && e.pass === pass);
        console.log(result);
        if (result) {
            setSuccess(true);
        }
        else setSuccess(false);
    }
    return (
        <>
            {success ? (
                <section className="container">
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to="/SignInSignUp">Go to Home page</Link>
                    </p>
                </section>
            ) : (
                <section className="container">
                    <h1>Sign In</h1>
                    <form className='login' onSubmit={handleSubmit}>
                        <label>Username:</label>
                        <input
                            type='text'
                            value={user}
                            ref={userRef}
                            placeholder='Enter Username'
                            onChange={(e) => setUser(e.target.value)}></input>
                        <label>Password:</label>
                        <input
                            type='password'
                            value={pass}
                            placeholder='Enter Your Password'
                            onChange={(e) => setPass(e.target.value)}></input>
                        <button className='btn'>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <Link to="/SignInSignUp" >Sign Up</Link>
                    </p>
                </section>
            )}


        </>
    );
}

export default Login;