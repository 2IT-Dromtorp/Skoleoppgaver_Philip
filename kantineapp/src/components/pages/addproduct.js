import React from 'react'
import { useState } from 'react'
import './styles/addproduct.css'

function Addproduct() {

    const [files, setFiles] = useState([]);

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
            console.log(e.target.result);
            setFiles(e.target.result);
        };
    };

    const submitFile = () => {
        const body = {
            file: files
        }
        console.log(body)
        fetch('http://localhost:8080/api/v1/addjsonproduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            if(data.success) {
                console.log('yippie')
            }
        })

    }

    return (
        <main id='page-render'>
            <div className='addproduct-render'>
                <input className='file-button' type='file' onChange={handleChange} />
                <span className='files-container'>
                    {files}
                </span>
                <button className='logreg-button' onClick={submitFile}>Submit Files</button>
            </div>
        </main>
    )
}

export default Addproduct