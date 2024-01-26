import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

function Datakunnskap(props) {
    const { loggedIn, email } = props;

    const COURSE_ID = 'DATAKUNNSKAP';

    const [isRegistered, setIsRegistered] = useState(false);

    let btnId = '';
    let btnText = 'Meld deg på';

    if (loggedIn && isRegistered) {
        btnText = 'Meld deg av';
    }

    if (isRegistered) {
        btnId = 'red';
    } else {
        btnId = 'blue';
    }

    if (!loggedIn) {
        btnId = 'grey';
    }

    const is_registered = () => {
        console.log("is_registered?");

        const body = {
            email: email,
            course_id: COURSE_ID,
        };

        fetch('/api/is_registered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === 'S') {
                    setIsRegistered(data.is_registered);
                    // localStorage.setItem(localStorageKey, data.is_registered);                    
                }
            })
            .catch((error) => console.error(error));
    };

    const doSignUp = () => {
        if (!loggedIn) {
            return;
        }

        const endpoint = isRegistered ? '/api/unregister' : '/api/register';

        const body = {
            email: email,
            course_id: COURSE_ID,
        };

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'S') {
                    setIsRegistered(!isRegistered);
                    // localStorage.setItem(localStorageKey, !isRegistered);
                    toast.success(data.message);
                } else {
                    console.error(data.message);
                    toast.error(data.message);
                }
            })
            .catch((error) => console.error(error));
    };

    useNavigate();

    is_registered();

    return (
        <>
            <div id="kurs-container">
                <div id="kurs-header">
                    <h1>Datakunnskap</h1>
                </div>
                <div id="sub-header">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam a
                        mattis ipsum. Nullam eu felis odio. Etiam tempus felis ac
                        condimentum ultrices.
                    </p>
                </div>
                <div id="button-container">
                    <button onClick={doSignUp} id={btnId}>
                        {btnText}
                    </button>
                </div>
                <div id='kurspage-information-container'>
                    <div id='kursinfo-box'>
                        <h2>Pristabell</h2>
                        <p>1 time: 129kr</p>
                        <p>2 timer: 239kr</p>
                        <p>3 timer: 329kr</p>
                        <p>4 timer: 399kr</p>
                        <p>4+ timer: 99kr per time</p>
                    </div>
                    <div id='kursinfo-box'>
                        <h2>Timeplan</h2>
                        <p>1. Juni - 19:00-20:00</p>
                        <p>2. Juni - 19:00-20:00</p>
                        <p>3. Juni - 19:00-20:00</p>
                        <p>4. Juni - 19:00-20:00</p>
                        <p>5. Juni - 19:00-20:00</p>
                    </div>
                    <div id='kursinfo-box'>
                        <h2>Oppmøtesteder</h2>
                        <p>Skomakergata</p>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}

export default Datakunnskap;