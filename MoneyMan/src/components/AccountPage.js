import React, { useState, useEffect } from 'react';

function AccountPage({ isLoggedIn, username }) {
    const [currency, setCurrency] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [users, setUsers] = useState([]);
    const [transferAmount, setTransferAmount] = useState(0);
    const [recipient, setRecipient] = useState('');

    useEffect(() => {
        if (isLoggedIn && username) {
            fetch(`/currency?username=${username}`, {
                method: "GET",
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Network response was not ok.');
            }).then((data) => {
                setCurrency(data.currency);
            }).catch((err) => {
                console.error("Error fetching currency:", err);
            });

            fetch('/users', {
                method: "GET",
            }).then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('Network response was not ok.');
            }).then((data) => {
                setUsers(data.users);
            }).catch((err) => {
                console.error("Error fetching users:", err);
            });
        }
    }, [isLoggedIn, username]);

    const handleSearch = (event) => {
        const inputValue = event.target.value;
        setSearchInput(inputValue);

        if (inputValue === '') {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        const regex = new RegExp(`^${inputValue}`, 'i');
        const results = users.filter(user => regex.test(user.username));
        setSearchResults(results);

        setShowDropdown(true);
    };

    const transferCurrency = () => {
        if (transferAmount <= 0) {
            alert("Du kan ikke overføre 0 MM");
            return;
        } else if (transferAmount > currency) {
            alert("Du har ikke nok MM");
            return;
        }

        fetch('/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: username,
                recipient: recipient,
                amount: transferAmount
            }),
        })
        .then((res) => {
            if(res.ok) {
                alert('Transaksjon utført');
                setTransferAmount(0);
                setRecipient('');
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch((err) => {
            console.error('Error:', err);
            alert('Noe gikk galt');
        });
    }

    const handleRecipientSelection = (selectedRecipient) => {
        setRecipient(selectedRecipient);
        setShowDropdown(false);
    };

    return (
        <div id='mainWindow'>
            <div id='account'>
                <h1>@{username}</h1>
                <div id='accountData'>
                    <div id='left'>
                        <span id='header'>MoneyMan-saldo</span>
                        <span id='currency'>{currency ? currency : '?'} MM</span>
                        <span >Tilgjengelig saldo</span>
                    </div>
                    <div id='right'>
                        <span id='header'>Pengedeling</span>
                        <div id='userSearchBox'>
                            <input placeholder='Søk etter bruker' id='userSearch' type="text" value={searchInput} onChange={handleSearch} />
                            {showDropdown && (
                                <div id="userList">
                                    <ul>
                                        {searchResults.map((result, index) => (
                                            <li key={index} onClick={() => handleRecipientSelection(result.username)}>
                                                {result.username}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <input id='transferBox' type='number' value={transferAmount} onChange={(e) => setTransferAmount(parseFloat(e.target.value))}
                            placeholder="Enter amount"></input>
                        <button id='transferButton' onClick={transferCurrency}>Send penger</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;
