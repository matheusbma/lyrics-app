import express from "express";
import cors from "cors";
import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn']
})

app.use(express.json())
app.use(cors())

// localhost:7777

// Post - Create
// Get - Read
// Put - Update 
// Delete - Delete

////// USER
// GET - LOGIN 
app.get("/login", async(req, res) => {

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

// UPDATE - UPDATE USER 
app.put("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const body:any = req.body;

  if (!userId) {
    return res.status(400).json({error: "userId is required"});
  }

  const user = await prisma.user.update({
    where: {id: userId},
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
      image: body.image,
    }
  });
  return res.status(200).json(user);
});

// POST - CREATE USER
app.post("/signup", async (req, res) => {
  const body:any = req.body;
  const sameEmail = await prisma.user.findFirst({
    where: {email: body.email}
  });

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'Please provide email and password'
    })}
  if (sameEmail) {
    return res.status(400).json({
      error: 'Email already exists'
    })
  }

  const user = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password,
      image: body.image,
    }
  });
  return res.status(201).json("create user");

});


////// SETLISTS
// GET
app.get("/:userId/setlists", async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({error: "userId is required"});
  }
  
  const setlists = await prisma.setlist.findMany({
    where: {userId: userId},
    include: {
      _count: {
        select: {songs: true}
      }
    }
  });
  return res.status(200).json(setlists);
});

// POST
app.post("/:userId/setlists", async (req, res) => {
  const userId = req.params.userId;
  const body:any = req.body;

  const sameSetlistName = await prisma.setlist.findFirst({
    where: {name: body.name}
  });

  if (!req.body.name) {
    return res.status(400).json({
      error: 'Please provide userId and name of setlist'
    })} 
  if (sameSetlistName) {
    return res.status(400).json({
      error: 'Setlist name already exists'
    })
  };

  const setlist = await prisma.setlist.create({
    data: {
      userId,
      name: body.name,
      image: body.image,
    }
  });
  return res.status(201).json("create setlist");
});
// Find a setlist by name

////// SONGS
// GET
app.get("/setlist/:setlistId/songs", async (req, res) => {
  const setlistId = req.params.setlistId;

  if (!setlistId) {
    return res.status(400).json({error: "setlistId is required"});
  }

  const songs = await prisma.song.findMany({
    where: {setlistId: setlistId}
  })
  return res.status(200).json(songs);
});

// POST
app.post("/setlist/:setlistId/songs", async (req, res) => {
  const setlistId = req.params.setlistId;
  const body:any = req.body;

  const sameSongName = await prisma.song.findFirst({
    where: {title: body.title}
  });

  if (!req.body.title) {
    return res.status(400).json({
      error: 'Please provide a title for this song'
    })} 
  if (sameSongName) {
    return res.status(400).json({
      error: 'Song name already exists'
    })
  };

  const song = await prisma.song.create({
    data: {
      setlistId,
      title: body.title,
      artist: body.artist,
      tags: body.tags,
      lyrics: body.lyrics,
      chords: body.chords,
      key: body.key,
      bpm: body.bpm,
      tonality: body.tonality,
    }
  });
  return res.status(201).json("create song");
});
// Find a song by name

////// SONG 
// GET
app.get("/setlist/:setlistId/songs/:songId", async (req, res) => {
  const setlistId = req.params.setlistId;
  const songId = req.params.songId;

  if (!setlistId || !songId) {
    return res.status(400).json({error: "setlistId and songId are required"});
  }

  const song = await prisma.song.findFirst({
    where: {id: songId, setlistId: setlistId}
  });
  return res.status(200).json(song);
});

app.listen(7777)