import Tutorial_1 from  "../images/Tutorial_1.png"
import Tutorial_2 from  "../images/Tutorial_2.png"
import Tutorial_3 from  "../images/Tutorial_3.png"
import Tutorial_4 from  "../images/Tutorial_4.png"

export function Oppg1() {
    return (
        <div className="main">
            <h1>Oppgave 1</h1>
            <p>
                Tutorial
            </p>
            <img src={Tutorial_1}/>
            <img src={Tutorial_2}/>
            <img src={Tutorial_3}/>
            <img src={Tutorial_4}/>
        </div>
    )
}