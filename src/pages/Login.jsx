import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLoading } from '../context/LoadingContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { setIsLoading } = useLoading();
    const navigate = useNavigate();

    // Ensure loading is off when Login page mounts
    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

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
        <div className="min-h-screen w-full flex items-center justify-center bg-paper text-ink p-4">
            <div className="w-full max-w-md border-2 border-ink crosshairs">
                <div className="flex justify-between bg-ink text-paper micro px-3 py-1.5">
                    <span>[ Restricted ]</span>
                    <span>Auth / RD-SYS</span>
                </div>
                <div className="p-6 md:p-8">
                    <h2 id="form-title" className="macro text-6xl mb-8">
                        Login<span className="text-hazard">.</span>
                    </h2>
                    <form className="flex flex-col gap-6" onSubmit={handleSubmit} aria-labelledby="form-title">
                        {error && (
                            <p role="alert" className="border-2 border-hazard text-hazard micro px-3 py-2">
                                [ ! ] {error}
                            </p>
                        )}
                        <label className="flex flex-col gap-1">
                            <span className="micro opacity-60">Operator ID</span>
                            <input className="field" placeholder="Username" id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </label>
                        <label className="flex flex-col gap-1">
                            <span className="micro opacity-60">Passkey</span>
                            <input className="field" id="password"
                                name="password"
                                type="password"
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <button type='submit' className="btn-ink justify-between mt-2">
                            <span>Sign in</span>
                            <span aria-hidden="true">&gt;&gt;&gt;</span>
                        </button>
                    </form>
                </div>
                <div className="hazard-stripe h-2" aria-hidden="true" />
            </div>
        </div>
    );
};

export default Login;
