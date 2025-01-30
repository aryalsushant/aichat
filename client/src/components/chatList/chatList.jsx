import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react"; // ✅ Import Clerk authentication

const ChatList = () => {
  const { getToken } = useAuth(); // ✅ Get Clerk authentication token

  const fetchChats = async () => {
    const token = await getToken(); // ✅ Retrieve the Clerk token

    return fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
      method: "GET",
      credentials: "include", // ✅ Ensures cookies are sent
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ Send Clerk token for authentication
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`); // Handle errors
      return res.json();
    });
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: fetchChats,
  });

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Lama AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to Brot AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
