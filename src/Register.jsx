import { faCircleInfo, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

const Register = () => {
    const userRef = useRef();
    const NAME_REGEX = /^[A-Za-z][A-Za-z0-9_\s]{7,29}$/;
    const PASS_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [pass, setPass] = useState('');
    const [validPass, setValidPass] = useState(false);
    const [passFocus, setPassFocus] = useState(false);
    const [confirmPass, setConfirmPass] = useState('');
    const [validConfirmPass, setValidConfirmPass] = useState(false);
    const [confirmPassFocus, setConfirmPassFocus] = useState(false);
    const [usersRegister, setUserRegister] = useLocalStorage("users", []);

    useEffect(() => {
        userRef.current.focus();
    }, [])
    useEffect(() => {
        setValidUser(NAME_REGEX.test(user));
    }, [user])


    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])
    useEffect(() => {
        setValidPass(PASS_REGEX.test(pass));
        setValidConfirmPass(pass === confirmPass);

    }, [confirmPass, pass])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validUser && validPass && validConfirmPass && validEmail) {
            const element = { id: usersRegister.length, user: user, email: email, pass: pass }
            setUserRegister([...usersRegister, element]);
        }




    }







    return (
        <div className='container'>
            <h1>Register</h1>
            <form className='register' onSubmit={handleSubmit}>
                <label>Username :
                    <FontAwesomeIcon icon={faCheck} className={validUser ? "check" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validUser || !user ? "hide" : "time"} />
                </label>
                <input
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    ref={userRef}
                    type='text' placeholder='Enter userName' ></input>
                <p className={user && !validUser && userFocus ? "show" : "hide"}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    8 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores , spaces allowed.
                </p>
                <label>Email :
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "check" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "time"} />
                </label>
                <input type='email' placeholder='Enter Email'
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}></input>
                <p className={!validEmail && email && emailFocus ? "show" : "hide"}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    one or more alphabetic characters and symbol.<br />
                    The domain follows the '@' symbol and usually includes alphanumeric characters.<br />
                    after dot  2 to 4 characters for example test@gmail.com   .
                </p>
                <label>Password :
                    <FontAwesomeIcon icon={faCheck} className={validPass ? "check" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPass || !pass ? "hide" : "time"} />
                </label>
                <input type='password' placeholder='Enter password'
                    onFocus={() => setPassFocus(true)}
                    onBlur={() => setPassFocus(false)}
                    onChange={(e) => setPass(e.target.value)} >
                </input>
                <p className={pass && passFocus && !validPass ? "show" : "hide"}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    8 to 16 characters.<br />
                    Must include uppercase and lowercase letters, a number and a special character.<br />
                    Allowed special characters
                </p>
                <label>Confirm Password :
                    <FontAwesomeIcon icon={faCheck} className={validConfirmPass && confirmPass ? "check" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validConfirmPass || !confirmPass ? "hide" : "time"} />
                </label>
                <input type='password' placeholder='Enter confirm password'
                    onFocus={() => setConfirmPassFocus(true)}
                    onBlur={() => setConfirmPassFocus(false)}
                    onChange={(e) => setConfirmPass(e.target.value)} >
                </input>
                <p className={confirmPassFocus && !validConfirmPass ? "show" : "hide"}>
                    <FontAwesomeIcon icon={faCircleInfo} />
                    Must match the first password input field.<br />
                </p>
                <button className='btn'>Sign Up</button>
            </form>
            <p className='log'>
                Already registered?<br />
                <Link to="login"  >Sign In</Link>

            </p>
        </div>
    )
}

export default Register