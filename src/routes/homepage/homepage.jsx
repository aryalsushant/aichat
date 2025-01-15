import './homepage.css'
import { Link } from 'react-router-dom';

const Homepage = () => {
    return (
        <div className='homepage'>
            <div className="left">
                <h1>Brainrot AI</h1>
                <h2>Talk to AI huzz cause you can't get nun irl</h2>
                <h3>Pull up and get fluent in Gen Z slang wit ya AI bestie! I’ll keep you in da loop, put you on trends, and level up ya text game. Whether you tryna vibe or just not be mad lost, I gotchu. No cap, it’s light work.</h3>
                <button>Get Started</button>
            </div>
            <div className="right"></div>
        </div>
    )
}

export default Homepage;