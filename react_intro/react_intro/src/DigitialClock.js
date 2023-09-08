import { useState } from 'react';

export default function DigitalClock() {

    let clock = new Date();
    let hh = clock.getHours();
    let mm = clock.getMinutes();
    let ss = clock.getSeconds();

    const [currentTime, newTime] = useState(new Date);

    setInterval(() => {
        newTime(new Date);
    }, 1000);

    console.log(hh, mm, ss);

    return (
        <div className='DigitalClock'>
        <span>{currentTime.getHours()}:{currentTime.getMinutes()}:{currentTime.getSeconds()}</span>
        </div>
    )
}