import React, { useState, useEffect } from 'react';

function Buss() {
    const [stopName, setStopName] = useState('');
    const [departures, setDepartures] = useState([]);

    //https://stoppested.entur.org/
    //Gautes vei = 3515
    //Ski næringspark = 4977

    useEffect(() => {
        const fetchData = () => {
            const query = `{
                stopPlace(id: "NSR:StopPlace:4977") {
                    name
                    id
                    estimatedCalls(numberOfDepartures: 5, whiteListedModes: [bus]) {
                        expectedDepartureTime
                        aimedDepartureTime
                        destinationDisplay {
                            frontText
                        }
                        serviceJourney {
                            line {
                                publicCode
                                transportMode
                            }
                        }
                    }
                }
            }`;

            fetch('https://api.entur.io/journey-planner/v2/graphql', {
                method: 'POST',
                headers: {
                    'ET-Client-Name': 'philip',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ query }),
            })
            .then(res => res.json())
            .then(stopPlaceData => {
                const stopName = stopPlaceData.data.stopPlace.name;
                setStopName(stopName);
                const departures = stopPlaceData.data.stopPlace.estimatedCalls;
                setDepartures(departures);
            })
            .catch(error => console.error('Error fetching data:', error));
        };

        const fetchDataInterval = setInterval(fetchData, 15000);

        fetchData();

        return () => {
            clearInterval(fetchDataInterval);
        };
    }, []);

    const formatTime = (expectedTime, aimedTime) => {
        const expectedDate = new Date(expectedTime);
        const aimedDate = new Date(aimedTime);
        const timeToDisplay = Math.abs(expectedDate - aimedDate) > 60000 ? aimedDate : expectedDate;
        return timeToDisplay.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    };

    return (
        <div id='buss-container'>
            <div id='header'><p>{stopName}</p></div>
            <div id='labels'>
                <p>Linje</p>
                <div id='departureLabels'>
                    <p>Avgang</p>
                </div>
            </div>
            <div>
                <ul id='departureIndex'>
                    
                    {departures.map((departure, index) => (
                        <>
                        <li id='departure' key={index}>
                            <div id='bus'>
                                <p id='busCode'>{departure.serviceJourney.line.publicCode}</p>
                                <p id='busName'>{departure.destinationDisplay.frontText}</p>
                            </div>
                            <div id='departureTimes'>
                                <p id={Math.abs(new Date(departure.expectedDepartureTime) - new Date(departure.aimedDepartureTime)) > 60000 ? 'aimed' : 'departureTime'}>
                                    {formatTime(departure.aimedDepartureTime, departure.expectedDepartureTime)}
                                </p>
                            </div>
                        </li>
                        </>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Buss;

//nyooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooom