import './dashboardpage.css'

const DashboardPage = () => {
    return (
        <div className='dashboardpage'>
            <div className="texts">
                <div className="logo">
                    <img src="/ogo.png" alt="" />
                    <h1>Brainrot AI</h1>
                </div>
                <div className="options">
                    <div className="option">
                        <img src="/chat.png" alt="" />
                        <span>Create a New Chat</span>
                    </div>

                    <div className="option">
                        <img src="/chat.png" alt="" />
                        <span>Create a New Chat</span>
                    </div>

                    <div className="option">
                        <img src="/chat.png" alt="" />
                        <span>Create a New Chat</span>
                    </div>
                    
                </div>
            </div>
            <div className="formContainer"></div>
        </div>
    )
}

export default DashboardPage;