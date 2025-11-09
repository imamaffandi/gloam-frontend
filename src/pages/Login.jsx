import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const success = login(username, password);
        if (success) {
            navigate('/admin');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center ">
            <h2 id="form-title" className="text-center text-3xl font-bold mb-10 text-gray-800">Login</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <span className=" sm:inline">{error}</span>
                    </div>
                )}
                <input className="w-full text-gray-400 h-12 border border-gray-800 px-3 rounded-lg" placeholder="Username" id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <input className="w-full text-gray-400 h-12 border border-gray-800 px-3 rounded-lg" id="password"
                    name="password"
                    type="password"
                    placeholder='Password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Sign in</button>
            </form>
            {/* </div>
            </div> */}
        </div>
    );
};

export default Login;

