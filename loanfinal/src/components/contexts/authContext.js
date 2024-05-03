import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        isLoggedIn: false,
        username: '',
        role: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userDetails = JSON.parse(atob(token.split('.')[1])); // Decode JWT Payload
            setUser({
                isLoggedIn: true,
                username: `${userDetails.firstName} ${userDetails.lastName}`, // Assuming JWT has firstName and lastName
                role: userDetails.role
            });
        }
    }, []);

    const logOut = () => {
        localStorage.clear();
        setUser({
            isLoggedIn: false,
            username: '',
            role: ''
        });
    };

    return (
        <AuthContext.Provider value={{ user, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};
