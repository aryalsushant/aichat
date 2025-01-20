import './newPrompt.css'
import { useRef, useEffect } from 'react';

const NewPrompt = () => {

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current.scrollIntoView({behavior: "smooth"})
    })
    return (
        <>
        <div className="endChat" ref = {endRef}></div>
            <form className = "newForm" action="">
                <Upload /> //this is not visible and needs to be fixed
                <input id = "file" type="file" multiple = {false} hidden />
                <input type="text" placeholder='Ask anything...' />
                <button>
                    <img src="/arrow.png" alt="" />
                </button>
            </form>
        </>
    )
}

export default NewPrompt;