import axios from "axios"
import { useEffect, useState } from "react"

import { SetlistBanner } from '../Components/SetlistBanner'
import { SetlistHeader } from "../Components/SetlistHeader";

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
      <SetlistHeader/>

      <div className="grid grid-cols-3 gap-16 mt-20">
        <a href="" className='relative rounded-sm overflow-hidden'>
          <div className='w-full h-[168px]   flex items-center justify-center content-center bg-gray-700 rounded-sm'>
            <strong className='text-6xl font-thin text-white'>+</strong>
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