import axios from "axios"
import { useEffect, useState } from "react"

import { SetlistBanner } from '../components/SetlistBanner'

interface Setlist {
  id: string
  name: string
  image: string
  _count: {
    songs: number
  }
}

export function Setlists() {
  const [setlists, setSetlists] = useState<Setlist[]>([])

  useEffect(() => {
    axios.get(`http://localhost:7777/d460c627-ebc1-4da8-b199-0b7f8c23b9ab/setlists`)
    .then(res => {
      setSetlists(res.data)
    })
  }, [])
  
  return (
    <div className="flex flex-col justify-center items-center">
      {/* search bar */}

      <div className="grid grid-cols-4 gap-20 mt-20">
        <a href="" className='overflow-hidden'>
          <div className='flex w-[200px] h-[200px] justify-center items-center bg-zinc-800 rounded-sm border-b border-gray-900'>
            <strong className='text-8xl font-thin text-white'>+</strong>
          </div>
        </a>
        {setlists.map(setlist => {
          return(
            <SetlistBanner key={setlist.id} setlistName={setlist.name} setlistImage="" songsCount={setlist._count.songs} />
          )
        })}

        

      </div>
      
    </div>
 
 )
}