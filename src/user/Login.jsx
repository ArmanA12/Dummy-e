import React from 'react'
import Dummy from '../assets/dummy.png'
import { useState } from 'react'
import { Client, Account, ID, Databases } from "appwrite";
import { useNavigate, NavLink } from 'react-router-dom';


function Login() {
    const [showHidePass, setShowHidePass] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const togglePasswordVisibility = () => {
        setShowHidePass(!showHidePass);
    };
    const navigate = useNavigate();
    const client = new Client();
    const account = new Account(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
        .setProject('6572b1f0d2dacd3909ac') // Your project ID
        ;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Continue with account creation request
        account
            .createEmailSession(email,password)
            .then(function (response) {
                localStorage.setItem('userId', response.userId);
                localStorage.setItem('userName', response.providerUid)
                addUserDetails();
                navigate('/')
            })
            
            .catch(function (error) {
                setError(error.message)
                console.log(error.message); // Failure
            });
    };

    const databases = new Databases(client);
    const userNumber =  '1234567890';
    const userID = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')
    const userEmail =  email;
    // localStorage.removeItem('username')
    // localStorage.removeItem('userid')
    // localStorage.removeItem('userName')

    // localStorage.removeItem('userId')

    

    
    async function addUserDetails() {
        try {
            const response = await databases.createDocument('6573f9c378124f54aea0', '6573fc463d7db6c87417',
                ID.unique(),
                {
                   userID,  userEmail , userName, userNumber
                }

            )
            console.log(response)
        }
        catch (error) {
            console.log(error.message)
        }
    }


    return (
        <>

            <div className='signup-container'>
                <div className='signup'>
                    <div><img style={{ width: "170px" }} src={Dummy} alt="" /></div>
                    <div><h2>Login Here</h2></div>
                    <div>
                        <form onSubmit={handleSubmit}>
                           
                            <input onChange={(e) => setEmail(e.target.value)} type="email" minLength='3' maxLength='50' placeholder='Enter email' required /><br />
                            <div style={{ position: "relative" }}>   <input placeholder='password'
                                type={showHidePass ? 'text' : 'password'}
                                value={password}
                                minLength='8'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                                <p onClick={togglePasswordVisibility}>{showHidePass ? <i class="fa fa-eye-slash"></i> : <i class="fa fa-eye"></i>}</p>
                            </div>
                            { error ? (<p>Invaid email or password.</p>) : ""}
                            <button type="submit">Login</button>
                        </form>
                    </div>
                    <div style={{ paddingTop: "10px", color: "#424242" }}>Don't Have Account? <NavLink to='/signup'>Create</NavLink></div>
                </div>
            </div>
        </>
    )
}

export default Login