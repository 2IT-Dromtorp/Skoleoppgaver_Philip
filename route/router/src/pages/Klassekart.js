import Elev from "./Elev"

export function Klassekart() {
    return (
        <div className="klassekart-main">
            <h1>Klassekart</h1>
            <div className="rightwrapper"> {/*start leftwrapper*/}
            <div className="box">
                <div className="row">
                <Elev name="Andreas"/>
                <Elev name="Ahmad"/>
                </div>
                    <div className="row">
                    <Elev name="Philip"/>
                    <Elev name="n/a"/>
                    </div>
                        <div className="row">
                        <Elev name="Gabriel"/>
                        <Elev name="Theodor"/>
                        </div>
                    </div>
                    </div> {/*end leftwrapper*/}

            <div className="leftwrapper"> {/*start rightwrapper*/}
            <div className="box">
                <div className="row">
                <Elev name="Matheo"/>
                <Elev name="Elias"/>
                <Elev name="Johannes"/>
                </div>
                    <div className="row">
                    <Elev name="Kristoffer"/>
                    <Elev name="Vetle"/>
                    <Elev name="Axel"/>
                    </div>
                        <div className="row">
                        <Elev name="Silas"/>
                        <Elev name="Alva"/>
                        <Elev name="Matthis"/>
                        </div>
                    </div>
                    </div> {/*end leftwrapper*/}
        </div>
    )
}