const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

const mongodbURL = "mongodb+srv://womp:Womp@cluster0.3znw9ak.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const mongoClient = new MongoClient(mongodbURL);

async function main() {
    try {
        await mongoClient.connect();
        console.log("Connected to MongoDB");
        const mainDB = mongoClient.db('microcord');
        const serversCol = mainDB.collection('servers');
        const channelsCol = mainDB.collection('channels');
        const messagesCol = mainDB.collection('messages');

        app.get("/microcord/api/servers", async (req, res) => {
            try {
                const servers = await serversCol.find({}).toArray();
                const formattedServers = servers.map(server => ({
                    id: server._id,
                    name: server.name,
                    url: server.url
                }));
                res.status(200).json(formattedServers);
            } catch (error) {
                console.error("Error fetching servers:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.post("/microcord/api/server", async (req, res) => {
            try {
                const { serverid } = req.body;
                const server = await serversCol.findOne({ _id: new ObjectId(serverid) });
                const channels = await channelsCol.find({ serverid: new ObjectId(serverid) }).toArray();
                if (server) {
                    res.status(200).json({ server, channels });
                } else {
                    res.status(404).json({ error: "Server not found" });
                }
            } catch (error) {
                console.error("Error fetching server:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.post("/microcord/api/channel/create", async (req, res) => {
            const { serverid, name } = req.body;
            try {
                const server = await serversCol.findOne({ _id: new ObjectId(serverid) });
                if (server) {
                    const channel = {
                        name,
                        serverid: new ObjectId(serverid)
                    };
                    const result = await channelsCol.insertOne(channel);
                    res.status(200).json(result.ops[0]);
                } else {
                    res.status(404).json({ error: "Server not found" });
                }
            } catch (error) {
                console.error("Error creating channel:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.post("/microcord/api/channel", async (req, res) => {
            try {
                const { serverid, channelid } = req.body;
                const messages = await messagesCol.find({
                    serverid: serverid,
                    channelid: channelid
                }).toArray();
                if (messages) {
                    res.status(200).json({ messages });
                } else {
                    res.status(404).json({ error: "No messages found" });
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.post("/microcord/api/message/send", async (req, res) => {
            const { serverid, channelid, author, timestamp, message } = req.body;
        })

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        app.get("*", (req, res) => {
            res.sendFile(path.resolve("./build/index.html"));
        });
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

main().catch(console.error);
