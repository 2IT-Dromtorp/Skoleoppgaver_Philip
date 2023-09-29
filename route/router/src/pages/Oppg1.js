import Taskbar from "../images/Taskbar.png"
import Tutorial_1 from  "../images/Tutorial_1.png"
import Tutorial_2 from  "../images/Tutorial_2.png"
import Tutorial_3 from  "../images/Tutorial_3.png"
import Tutorial_4 from  "../images/Tutorial_4.png"

export function Oppg1() {
    return (
        <div className="oppg-main">
            <h1>Oppgave 1</h1>
            <p>
                Tutorial om hvordan man skal adde venner på discord.
            </p>
            <p>1. Trykk på Windows knappen på keyboardet ditt, naviger til Discord applikasjonen på taskbar, åpne den ved å dobbel klikke på logoen.</p>
            <img src={Taskbar}></img>
            <p>2. Etter at du har åpnet discord, naviger til "Friends" området.</p>
            <img src={Tutorial_1}/>
            <p>3. Trykk på "add friends" på navbaren øverst på skjermen og skriv inn navn eller handle til brukeren du vil legge til som venn.
                I dette scenarioet heter brukeren "qwq6843".
            </p>
            <img src={Tutorial_2}/>
            <p>4. Trykk på "Send friend request" og vent på at mottageren svarer.</p>
            <img src={Tutorial_3}/>
            <p>Gratulerer, du har nå lagt til en venn i Discord.</p>
            <img src={Tutorial_4}/>
        </div>
    )
}