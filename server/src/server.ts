import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn']
})

app.use(express.json())
app.use(cors())

// localhost:7000

// Post - Create
// Get - Read
// Put - Update 
// Delete - Delete

//// OPEN ROUTE - NO AUTHENTICATION NEEDED
app.get("/", (req, res) => {
  return res.status(200).json({
    status: "Welcome",
  });
});

// POST - LOGIN 
app.post("/login", async(req, res) => {
  const body:{email:string, password:string} = req.body;

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'Please provide email and password'
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    }
  });
  const checkPassword = await bcrypt.compare(body.password, user?.password || '');

  if (!user || !checkPassword) {
    return res.status(404).json({
      status: 'Error: authentication failed'
    })
  } 

  try {
    const secret = process.env.SECRET;
    const token = jwt.sign(
      {
        id: user.id,
      },
      secret? secret : '',
    );

    return res.status(200).json({
      status: 'Success: authentication successful',
      user: {
        id: user.id,
        token: token
      }
    })
  } catch {
    return res.status(403).json({
      status: 'Something went wrong with the token'
    })
  }
});

// POST - CREATE USER
app.post("/signup", async (req, res) => {
  const body:{email:string, name:string, password:string, confirmPassword:string, image:string} = req.body;
  const sameEmail = await prisma.user.findFirst({
    where: {email: body.email}
  });

  if (!req.body.email || !req.body.password || !req.body.name) {
    return res.status(400).json({
      error: 'Please provide name, email and password'
    })}
  if (sameEmail) {
    return res.status(400).json({
      error: 'Email already exists'
    })
  }
  if (body.password !== body.confirmPassword) {
    return res.status(401).json({
      error: 'Passwords do not match'
    })
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
        image: body.image,
      }
    });

    return res.status(201).json({
      status: "User created successfully"
    });
  } catch {
    return res.status(500).json({
      status: 'Something went wrong on server side'
    })
  } 
});

//// PRIVATE ROUTE - AUTHENTICATION NEEDED
// CHECK TOKEN
function checkToken(req: any, res: any, next: any) {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: "Error: token not found",
    });
  }

  try {
    const secret = process.env.SECRET;
    jwt.verify(token, secret? secret : '');
    next();
  } catch {
    return res.status(403).json({
      status: "Error: invalid token",
    });
  }
}

////// USER
// GET - GET USER
app.get("/user/:userId", checkToken, async (req, res) => {
  const userId = req.params.userId;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
    }
  });

  if (!user) {
    return res.status(404).json({
      error: "User not found"
    })
  }

  return res.status(200).json(user);
});

// UPDATE - UPDATE USER 
app.put("/user/:userId/update", checkToken, async (req, res) => {
  const userId = req.params.userId;
  const body:any = req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    }
  });
  const checkPassword = await bcrypt.compare(body.password, user?.password || '');

  if (!checkPassword) {
    return res.status(401).json({
      status: 'Error: password incorrect'
    });
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(body.newPassword, salt);

  try {
    const newUser = await prisma.user.update({
      where: {id: userId},
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
        image: body.image,
      }
    });

    return res.status(204).json({
      status: "User updated successfully" 
    });
  } catch {
    return res.status(500).json({
      status: 'Something went wrong on server side'
    })
  } 
});

////// SETLISTS
// GET - GET ALL SETLISTS
app.get("/user/:userId/setlists", checkToken, async (req, res) => {
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

// POST - CREATE SETLIST
app.post("/user/:userId/setlists", async (req, res) => {
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
  return res.status(201).json({
    status: "Setlist created successfully"
  });
});
// Find a setlist by name

////// SONGS
// GET - GET ALL SONGS
app.get("/user/:userId/setlist/:setlistId/songs", async (req, res) => {
  const setlistId = req.params.setlistId;

  if (!setlistId) {
    return res.status(400).json({error: "setlistId is required"});
  }

  const songs = await prisma.song.findMany({
    where: {setlistId: setlistId}
  })
  return res.status(200).json(songs);
});

// POST - CREATE SONG
app.post("/user/:userId/setlist/:setlistId/songs", async (req, res) => {
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
  return res.status(201).json({
    status: "Song created successfully"
  });
});

// Find a song by name

////// SONG 
// GET - GET SONG
app.get("/user/:userId/setlist/:setlistId/songs/:songId", async (req, res) => {
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

app.listen(7000)