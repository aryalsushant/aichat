import { Link } from "react-router-dom";
import "./homepage.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  // const test = async () => {
  //   await fetch("http://localhost:3000/api/test",{
  //     credentials: "include",
  //   })
  // }

  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>Brot AI</h1>
        <h2>Your AI Wingman for Speaking Gen Z Fluently</h2>
        <h3>
        Pull up and get fluent in Gen Z slang wit ya AI bestie! I’ll keep you in da loop, put you on trends, and level up ya text game. Whether you tryna vibe or just not be mad lost, I gotchu. No cap, it’s light work.
        </h3>
        <Link to="/dashboard">Get Started</Link>
        
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human: Imma secure this internship fr",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Broski you already got it in the bag frfr",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human2: I finally got the internship",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: We got bro securing an internship before GTA 6",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;