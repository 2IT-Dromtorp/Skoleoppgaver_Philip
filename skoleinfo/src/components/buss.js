import React, { useState, useEffect } from 'react';

function Buss() {
    const [stopName, setStopName] = useState('');
    const [stopId, setStopId] = useState('');
    const [departures, setDepartures] = useState([]);
    const [newStopInput, setNewStopInput] = useState('');
    const [transportModeColors, setTransportModeColors] = useState({});

    useEffect(() => {
        fetchData();
    }, [stopId]);

    const fetchData = () => {
        const query = `{
            stopPlace(id: "${stopId}") {
                name
                id
                estimatedCalls(numberOfDepartures: 10, whiteListedModes: [bus, rail]) {
                    expectedDepartureTime
                    aimedDepartureTime
                    destinationDisplay {
                        frontText
                    }
                    serviceJourney {
                        line {
                            publicCode
                            transportMode
                            presentation {
                                colour
                            }
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

                // Extract and set the transport mode colors from the API response
                const colors = {};
                departures.forEach(departure => {
                    const mode = departure.serviceJourney.line.transportMode;
                    const color = '#' + departure.serviceJourney.line.presentation.colour;
                    colors[mode] = color;
                });
                setTransportModeColors(colors);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const handleInputChange = (event) => {
        setNewStopInput(event.target.value);
    };

    const searchStop = (event) => {
        event.preventDefault();
        fetch(`https://api.entur.io/geocoder/v1/autocomplete?text=${newStopInput}`)
            .then(res => res.json())
            .then(data => {
                if (data.features.length > 0) {
                    const newStopId = data.features[0].properties.id;
                    setStopId(newStopId);
                    setNewStopInput('');
                } else {
                    console.error('Fant ikke stopp med dette navnet');
                }
            })
            .catch(error => console.error('Klarte ikke å fetche id ass', error));
    };

    const formatTime = (expectedTime, aimedTime) => {
        const expectedDate = new Date(expectedTime);
        const aimedDate = new Date(aimedTime);
        const timeToDisplay = Math.abs(expectedDate - aimedDate) > 60000 ? aimedDate : expectedDate;
        return timeToDisplay.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div id='main'>
            <div id='buss-container'>
                <div id='searchForm'>
                    <div>
                        <input type="text" value={newStopInput} onChange={handleInputChange} placeholder="Skriv inn stopp navn" />
                        <button onClick={searchStop}>Sjekk Stopp</button>
                    </div>
                </div>
                <div id='header'><p>{stopName}</p></div>
                <div id='labels'>
                    <div id='departureLabels'>
                        <p>Avgang</p>
                    </div>
                </div>
                <div>
                    <ul id='departureIndex'>
                        {departures.map((departure, index) => (
                            <li id='departure' key={index}>
                                <div id='bus'>
                                    <div id='transportCode' style={{ backgroundColor: transportModeColors[departure.serviceJourney.line.transportMode] }}>
                                        <p>{departure.serviceJourney.line.publicCode}</p>
                                    </div>
                                    <p id='busName'>{departure.destinationDisplay.frontText}</p>
                                </div>
                                <div id='departureTimes'>
                                    <p id={Math.abs(new Date(departure.expectedDepartureTime) - new Date(departure.aimedDepartureTime)) > 60000 ? 'aimed' : 'departureTime'}>
                                        {formatTime(departure.aimedDepartureTime, departure.expectedDepartureTime)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Buss;
