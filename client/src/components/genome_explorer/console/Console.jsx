import { useEffect, useState } from "react";
import HydropathyPlot from "./HydropathyPlot";


export default function Console ( { consoleHeight, presentView, peptideSequence } ) {

    const [consoleView, setConsoleView] = useState()

    useEffect(() => {
        if(presentView === 'Protein') {
            setConsoleView(<HydropathyPlot peptideSequence={peptideSequence} />)
        } 
        else {
            setConsoleView(null)
        }
    }, [presentView, peptideSequence])

    return (
        <div id='console' style={{ zIndex: 2, height: `${consoleHeight}%`, width: '100%', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: 'solid', borderWidth: 1 }}>
            {consoleView}
        </div>
    )
}