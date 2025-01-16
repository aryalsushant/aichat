import './homepage.css'
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';


const Homepage = () => {
    return (
        <div className='homepage'>
            <img src = "/orbital.png" className = "orbital" />
            <div className="left">
                <h1>BrainrotAI</h1>
                <h2>Talk to AI huzz cause you can't get nun irl</h2>
                <h3>Pull up and get fluent in Gen Z slang wit ya AI bestie! I’ll keep you in da loop, put you on trends, and level up ya text game. Whether you tryna vibe or just not be mad lost, I gotchu. No cap, it’s light work.</h3>
                <Link to = "/dashboard">Get Started</Link>
            </div>
            <div className="right">
                <div className="imgContainer">
                    <div className="bgContainer">
                        <div className="bg">
                           
                        </div>
                    </div>
                    <img src = "/bot.png" className = "bot"/>

                    <div className="chat">
                    
                    <TypeAnimation
                        sequence={[
                        // Same substring at the start will only be typed out once, initially
                        'We produce food for Mice',
                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                        'We produce food for Hamsters',
                        1000,
                        'We produce food for Guinea Pigs',
                        1000,
                        'We produce food for Chinchillas',
                        1000
                        ]}
                        wrapper="span"
                        speed={50}
                        style={{ fontSize: '2em', display: 'inline-block' }}
                        repeat={Infinity}
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;