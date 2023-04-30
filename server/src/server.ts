import express from "express";
import bodyParser, { BodyParser } from "body-parser";
import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn']
})

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// localhost:7777

// Post - Create
// Get - Read
// Put - Update 
// Delete - Delete

// LOGIN
app.get("/login", bodyParser.json(), async(req, res) => {

  if (!req.body.email || !req.body.password) {
    res.status(400).json({
      error: 'Please provide email and password'
    })
  }

  const account = await prisma.user.findFirst({
    where: {
      email: req.body.email,
      password: req.body.password,
    }
  });

  if (!account) {
    return res.json({
      status: 'error authentication failed'
    })
  } else {
    return res.json({
      account
    })
  }
});

// USER


// SETLISTS
app.get("/setlists", async (req, res) => {
  const userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({error: "userId is required"});
  }
  
  const setlists = await prisma.setlist.findMany({
    where: {userId: userId}
  });
  return res.status(200).json(setlists);
});

app.post("/setlists", (req, res) => {
  console.log("POST /setlists");

  return res.status(201).json([
    "create setlist"
  ]);
});
// Find a setlist by name

// SONGS
app.get("/setlist/songs", async (req, res) => {
  const setlistId = req.body.setlistId;
  if (!setlistId) {
    return res.status(400).json({error: "setlistId is required"});
  }

  const songs = await prisma.song.findMany({
    where: {setlistId: setlistId}
  })

  return res.status(200).json(songs);
});

app.post("/setlist/:id/songs", (req, res) => {
  console.log("POST /songs");

  return res.status(201).json([
    "create song"
  ]);
});
// Find a song by name

// SONG 
app.get("/setlist/songs/:songId", (req, res) => {
  const songId = req.params.songId;

  return res.status(200).json([
    { id: songId, title: "Smells Like Teen Spirit" },
  ]);
});


app.listen(7777)