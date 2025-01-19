//import { useEffect, useRef } from 'react';
import './chatpage.css'
import NewPrompt from '../../components/chatList/newPrompt/newPrompt';

const ChatPage = () => {

    
    return (
        <div className='chatpage'>
            <div className="wrapper">
                <div className="chat">
                    <div className="message">Test message</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message</div>
                    <div className="message user">Test message from user</div>
                    <div className="message">Test message</div>
                    <div className="message user">Test message from user</div>

                    <NewPrompt/>

                    
                </div>
            </div>
        </div>
    )
}

export default ChatPage;