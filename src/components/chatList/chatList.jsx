import './chatList.css'
import { Link } from 'react-router-dom';

const ChatList = () => {
   return (
    <div className="chatList">
    <span className = "title">MENU</span>
    <Link to = "/dashboard">Create a new chat</Link>
    <Link>Explore</Link>
    <Link>Contact</Link>

    <hr/>
    <div className="list">
        <Link>My chat title</Link>
        <Link>My chat title</Link>
        <Link>My chat title</Link>
        <Link>My chat title</Link>
        <Link>My chat title</Link>
        <Link>My chat title</Link>
        <Link>My chat title</Link>
        <Link>My chat title</Link>
        <Link>My chat title</Link>
        <Link>My chat title</Link>
    </div>
    <hr/>
    <div className="upgrade">
        <img src = "/logo.png"/>
        <div className="texts">
            <span>Upgrade to Brainrot Premium</span>
            <span>Get unlimited access to all features</span>
        </div>
    </div>

    </div>
   )
}

export default ChatList;