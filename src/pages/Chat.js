// import React, { useState, useEffect } from "react";
// import {
//   Chat,
//   Channel,
//   Thread,
//   Window,
//   ChannelList,
//   ChannelListTeam,
//   MessageList,
//   MessageTeam,
//   MessageInput,
//   withChannelContext,
// } from "stream-chat-react";
// import { StreamChat } from "stream-chat";
// import axios from "axios";
// import { useAuth0 } from "./auth0";
// import "stream-chat-react/dist/css/index.css";

// const chatClient = new StreamChat("8hbcax62bxrs"); // need to change this

// function ChatView() {
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [newChannelName, setNewChannelName] = useState("");
//   const { user, logout } = useAuth0();
//   const username =
//     user && user.email
//       ? user.email.replace(/([^a-z0-9_-]+)/gi, "_")
//       : "default_username";

//   useEffect(() => {
//     async function getTokenAndFetchChannels() {
//       setLoading(true);
//       try {
//         const response = await axios.post("http://localhost:7000/join", {
//           username,
//         });
//         const token = response.data.token;
//         chatClient.setUser(
//           {
//             id: username,
//             name: user.nickname,
//           },
//           token
//         );

//         // Fetch channels the user is a member of
//         const filter = { members: { $in: [username] } };
//         const channels = await chatClient.queryChannels(filter);
//         if (channels.length > 0) {
//           await channels[0].watch();
//           setChannel(channels[0]);
//         }
//       } catch (err) {
//         console.error("Error during token fetching or channel fetching:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (user) {
//       getTokenAndFetchChannels();
//     }
//   }, [user]);

//   const createNewChannel = async () => {
//     if (!newChannelName) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:7000/create-channel",
//         {
//           username,
//           channelName: newChannelName,
//         }
//       );
//       const newChannel = chatClient.channel("team", response.data.channelName);
//       await newChannel.watch();
//       setChannel(newChannel);
//       setNewChannelName("");
//     } catch (err) {
//       console.error("Failed to create channel:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChannelChange = (newChannel) => {
//     setChannel(newChannel);
//   };

//   if (loading || !user) {
//     return <div>Loading chat...</div>;
//   }

//   if (channel) {
//     const CustomChannelHeader = withChannelContext(({ channel }) => (
//       <div className="str-chat__header-livestream">
//         <div className="str-chat__header-livestream-left">
//           <p className="str-chat__header-livestream-left--title">
//             {channel.data.name}
//           </p>
//           <p className="str-chat__header-livestream-left--members">
//             {channel.state.members.length} members,{" "}
//             {channel.state.watcher_count} online
//           </p>
//         </div>
//         <div className="str-chat__header-livestream-right">
//           <button
//             className="logout"
//             onClick={() =>
//               logout({
//                 returnTo: "http://localhost:3000/",
//               })
//             }
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     ));

//     return (
//       <div>
//         <Chat client={chatClient} theme="team light">
//           <ChannelList
//             options={{ subscribe: true, state: true }}
//             List={ChannelListTeam}
//             setActiveChannel={handleChannelChange}
//             filters={{ members: { $in: [username] } }}
//           />
//           <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
//             <input
//               type="text"
//               value={newChannelName}
//               onChange={(e) => setNewChannelName(e.target.value)}
//               placeholder="Enter new channel name"
//             />
//             <button onClick={createNewChannel}>Create Channel</button>
//           </div>
//           <Channel channel={channel}>
//             <Window>
//               <CustomChannelHeader />
//               <MessageList Message={MessageTeam} />
//               <MessageInput focus />
//             </Window>
//             <Thread Message={MessageTeam} />
//           </Channel>
//         </Chat>
//       </div>
//     );
//   }

//   return null;
// }

// export default ChatView;



// import React, { useState, useEffect } from "react";
// import {
//   Chat,
//   Channel,
//   Thread,
//   Window,
//   ChannelList,
//   MessageList,
//   MessageInput,
//   useChannelStateContext,
// } from "stream-chat-react";
// import { StreamChat } from "stream-chat";
// import axios from "axios";
// import { useAuth0 } from "@auth0/auth0-react"; // import { useAuth0 } from "./auth0";

// import "stream-chat-react/dist/css/index.css";

// const chatClient = new StreamChat("8hbcax62bxrs"); // Note: Move sensitive data like this to environment variables

// function ChatView() {
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [newChannelName, setNewChannelName] = useState("");
//   const { user, logout } = useAuth0();
//   const username =
//     user && user.email
//       ? user.email.replace(/([^a-z0-9_-]+)/gi, "_")
//       : "default_username";

//   useEffect(() => {
//     // Function to fetch token and channels has been simplified for clarity
//   }, [user]);

//   const createNewChannel = async () => {
//     if (!newChannelName) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:7000/create-channel",
//         {
//           username,
//           channelName: newChannelName,
//         }
//       );
//       const newChannel = chatClient.channel("team", response.data.channelName);
//       await newChannel.watch();
//       setChannel(newChannel);
//       setNewChannelName("");
//     } catch (err) {
//       console.error("Failed to create channel:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   function CustomChannelHeader() {
//     const { channel } = useChannelStateContext();

//     return (
//       <div className="str-chat__header-livestream">
//         <div className="str-chat__header-livestream-left">
//           <p className="str-chat__header-livestream-left--title">
//             {channel.data.name}
//           </p>
//           <p className="str-chat__header-livestream-left--members">
//             {channel.state.members.length} members,
//             {channel.state.watcher_count} online
//           </p>
//         </div>
//         <div className="str-chat__header-livestream-right">
//           <button onClick={logout}>Logout</button>
//         </div>
//       </div>
//     );
//   }

//   // Simplified rendering logic
//   if (loading || !user) {
//     return <div>Loading chat...</div>;
//   }

//   return (
//     <div>
//       <Chat client={chatClient} theme="team light">
//         <ChannelList
//           options={{ subscribe: true, state: true }}
//           filters={{ members: { $in: [username] } }}
//         />
//         <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
//           <input
//             type="text"
//             value={newChannelName}
//             onChange={(e) => setNewChannelName(e.target.value)}
//             placeholder="Enter new channel name"
//           />
//           <button onClick={createNewChannel}>Create Channel</button>
//         </div>
//         {channel && (
//           <Channel channel={channel}>
//             <Window>
//               <CustomChannelHeader />
//               <MessageList />
//               <MessageInput focus />
//             </Window>
//             <Thread />
//           </Channel>
//         )}
//       </Chat>
//     </div>
//   );
// }

// export default ChatView;



// import React, { useState, useEffect } from "react";
// import {
//   Chat,
//   Channel,
//   Thread,
//   Window,
//   ChannelList,
//   ChannelListTeam,
//   MessageList,
//   MessageTeam,
//   MessageInput,
//   withChannelContext,
// } from "stream-chat-react";
// import { StreamChat } from "stream-chat";
// import axios from "axios";
// import { useAuth0 } from "./auth0";
// import "stream-chat-react/dist/css/index.css";

// const chatClient = new StreamChat("8hbcax62bxrs");

// function ChatView() {
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [newChannelName, setNewChannelName] = useState("");
//   const { user, logout } = useAuth0();
//   const username =
//     user && user.email
//       ? user.email.replace(/([^a-z0-9_-]+)/gi, "_")
//       : "default_username";

//   useEffect(() => {
//     async function getTokenAndFetchChannels() {
//       setLoading(true);
//       try {
//         const response = await axios.post("http://localhost:7000/join", {
//           username,
//         });
//         const token = response.data.token;
//         chatClient.setUser(
//           {
//             id: username,
//             name: user.nickname,
//           },
//           token
//         );

//         // Fetch channels the user is a member of
//         const filter = { members: { $in: [username] } };
//         const channels = await chatClient.queryChannels(filter);
//         if (channels.length > 0) {
//           await channels[0].watch();
//           setChannel(channels[0]);
//         }
//       } catch (err) {
//         console.error("Error during token fetching or channel fetching:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (user) {
//       getTokenAndFetchChannels();
//     }
//   }, [user]);

//   const createNewChannel = async () => {
//     if (!newChannelName) return;
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:7000/create-channel",
//         {
//           username,
//           channelName: newChannelName,
//         }
//       );
//       const newChannel = chatClient.channel("team", response.data.channelName);
//       await newChannel.watch();
//       setChannel(newChannel);
//       setNewChannelName("");
//     } catch (err) {
//       console.error("Failed to create channel:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChannelChange = (newChannel) => {
//     setChannel(newChannel);
//   };

//   if (loading || !user) {
//     return <div>Loading chat...</div>;
//   }

//   if (channel) {
//     const CustomChannelHeader = withChannelContext(({ channel }) => (
//       <div className="str-chat__header-livestream">
//         <div className="str-chat__header-livestream-left">
//           <p className="str-chat__header-livestream-left--title">
//             {channel.data.name}
//           </p>
//           <p className="str-chat__header-livestream-left--members">
//             {channel.state.members.length} members,{" "}
//             {channel.state.watcher_count} online
//           </p>
//         </div>
//         <div className="str-chat__header-livestream-right">
//           <button
//             className="logout"
//             onClick={() =>
//               logout({
//                 returnTo: "http://localhost:3000/",
//               })
//             }
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     ));

//     return (
//       <div>
//         <Chat client={chatClient} theme="team light">
//           <ChannelList
//             options={{ subscribe: true, state: true }}
//             List={ChannelListTeam}
//             setActiveChannel={handleChannelChange}
//             filters={{ members: { $in: [username] } }}
//           />
//           <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
//             <input
//               type="text"
//               value={newChannelName}
//               onChange={(e) => setNewChannelName(e.target.value)}
//               placeholder="Enter new channel name"
//             />
//             <button onClick={createNewChannel}>Create Channel</button>
//           </div>
//           <Channel channel={channel}>
//             <Window>
//               <CustomChannelHeader />
//               <MessageList Message={MessageTeam} />
//               <MessageInput focus />
//             </Window>
//             <Thread Message={MessageTeam} />
//           </Channel>
//         </Chat>
//       </div>
//     );
//   }

//   return null;
// }

// export default ChatView;



import React, { useState, useEffect } from "react";
import {
  Chat,
  Channel,
  Thread,
  Window,
  ChannelList,
  ChannelListMessenger,
  MessageList,
  MessageSimple,
  MessageInput,
  useChannelStateContext,
  useChannelActionContext,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import axios from "axios";
import { useAuth0 } from "./auth0";
import "stream-chat-react/dist/css/index.css";

const chatClient = new StreamChat("8hbcax62bxrs");

function ChatView() {
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const { user, logout = () => {} } = useAuth0() || {};
  const username =
    user && user.email
      ? user.email.replace(/([^a-z0-9_-]+)/gi, "_")
      : "default_username";

  useEffect(() => {
    async function getTokenAndFetchChannels() {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:7000/join", {
          username,
        });
        const token = response.data.token;
        chatClient.setUser(
          {
            id: username,
            name: user.nickname,
          },
          token
        );

        // Fetch channels the user is a member of
        const filter = { members: { $in: [username] } };
        const channels = await chatClient.queryChannels(filter);
        if (channels.length > 0) {
          await channels[0].watch();
          setChannel(channels[0]);
        }
      } catch (err) {
        console.error("Error during token fetching or channel fetching:", err);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      getTokenAndFetchChannels();
    }
  }, [user]);

  const createNewChannel = async () => {
    if (!newChannelName) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:7000/create-channel",
        {
          username,
          channelName: newChannelName,
        }
      );
      const newChannel = chatClient.channel("team", response.data.channelName);
      await newChannel.watch();
      setChannel(newChannel);
      setNewChannelName("");
    } catch (err) {
      console.error("Failed to create channel:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChannelChange = (newChannel) => {
    setChannel(newChannel);
  };

  // if (loading || !user) {
  //   return <div>Loading chat...</div>;
  // }

  if (channel) {
    const CustomChannelHeader = () => {
      const channelState = useChannelStateContext();
      const channelActions = useChannelActionContext();

      return (
        <div className="str-chat__header-livestream">
          <div className="str-chat__header-livestream-left">
            <p className="str-chat__header-livestream-left--title">
              {channelState?.channel?.data?.name}
            </p>
            <p className="str-chat__header-livestream-left--members">
              {channelState?.channel?.state?.members?.length} members,{" "}
              {channelState?.channel?.state?.watcher_count} online
            </p>
          </div>
          <div className="str-chat__header-livestream-right">
            <button
              className="logout"
              onClick={() =>
                logout({
                  returnTo: "http://localhost:3000/",
                })
              }
            >
              Logout
            </button>
          </div>
        </div>
      );
    };

    return (
      <div>
        <Chat client={chatClient} theme="team light">
          <ChannelList
            options={{ subscribe: true, state: true }}
            List={ChannelListMessenger}
            setActiveChannel={handleChannelChange}
            filters={{ members: { $in: [username] } }}
          />
          <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
            <input
              type="text"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
              placeholder="Enter new channel name"
            />
            <button onClick={createNewChannel}>Create Channel</button>
          </div>
          <Channel channel={channel}>
            <Window>
              <CustomChannelHeader />
              <MessageList Message={MessageSimple} />
              <MessageInput focus />
            </Window>
            <Thread Message={MessageSimple} />
          </Channel>
        </Chat>
      </div>
    );
  }

  return null;
}

export default ChatView;
