require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { StreamChat } = require("stream-chat");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const serverSideClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_APP_SECRET
);

// Endpoint to join a user to the default channel
app.post("/join", async (req, res) => {
  const { username } = req.body;
  const token = serverSideClient.createToken(username);
  try {
    await serverSideClient.updateUser(
      {
        id: username,
        name: username,
      },
      token
    );
    const admin = { id: "admin" };
    const channel = serverSideClient.channel("team", "chat", {
      name: "Group messaging",
      created_by: admin,
    });
    await channel.create();
    await channel.addMembers([username]);
  } catch (err) {
    res.status(500).json({ err: err.message });
    return;
  }
  return res.status(200).json({ user: { username }, token });
});

// Endpoint to create a channel and add members
app.post("/create-channel", async (req, res) => {
  const { username, channelName, members } = req.body;
  const token = serverSideClient.createToken(username);
  try {
    await serverSideClient.updateUser(
      {
        id: username,
        name: username,
      },
      token
    );
    const admin = { id: "admin" };
    const channel = serverSideClient.channel("team", channelName, {
      name: `Group messaging for ${channelName}`,
      created_by: admin,
    });
    await channel.create();
    const memberIds = members || [];
    await channel.addMembers(memberIds);
    res.status(200).json({ user: { username }, token, channelName });
  } catch (err) {
    console.error("Failed to create or configure the channel:", err);
    res.status(500).json({ err: err.message });
    return;
  }
});

app.get("/get-channels", async (req, res) => {
  const { userId } = req.query;
  try {
    // Ensure the query only returns channels where the user is a member
    const filter = { type: "team", members: { $in: [userId] } };
    const sort = { last_message_at: -1 };
    const channels = await serverSideClient.queryChannels(filter, sort, {
      limit: 20,
    });
    const channelData = channels.map((channel) => ({
      id: channel.id,
      name: channel.data.name,
      members: channel.state.members.length,
      watcher_count: channel.state.watcher_count,
    }));
    res.json(channelData);
  } catch (error) {
    console.error("Error fetching channels:", error);
    res.status(500).json({ message: "Failed to fetch channels" });
  }
});

// Endpoint to delete a channel
app.delete("/delete-channel", async (req, res) => {
  const { username, channelId } = req.body;

  try {
    const channel = serverSideClient.channel("team", channelId);
    await channel.delete();

    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (err) {
    console.error("Failed to delete the channel:", err);
    res.status(500).json({ err: err.message });
  }
});

// Endpoint to request joining a channel
app.post("/request-join-channel", async (req, res) => {
  const { username, channelId } = req.body;

  // This could involve adding a request to a queue for admin approval, or directly adding if certain conditions are met
  try {
    // You might want to check if the user meets certain criteria before allowing them to join
    const channel = serverSideClient.channel("team", channelId);
    await channel.addMembers([username]); // This action could be contingent on approval
    res.status(200).json({ message: "Join request submitted successfully." });
  } catch (err) {
    console.error("Failed to submit join request:", err);
    res.status(500).json({ err: err.message });
  }
});

app.listen(7000, () => {
  console.log(`Server running on PORT 7000`);
});
