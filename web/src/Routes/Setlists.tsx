import axios from "axios";
import { useEffect, useState } from "react";

import { Setlist } from "../types/SetlistType";
import { SetlistBanner } from "../components/SetlistBanner";
import { getAuthUser } from "../utils/auth";

export function Setlists() {
  const user = getAuthUser();
  const [setlists, setSetlists] = useState<Setlist[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:7777/user/${user.id}/setlists`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setSetlists(res.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* search bar */}

      <div className="grid grid-cols-4 gap-20 mt-20">
        <button className="overflow-hidden">
          <div className="flex w-[200px] h-[200px] justify-center items-center bg-zinc-800 rounded-sm border-b border-gray-900">
            <strong className="text-8xl font-thin text-white">+</strong>
          </div>
        </button>
        {setlists.map((setlist) => {
          return (
            <SetlistBanner
              key={setlist.id}
              setlistName={setlist.name}
              setlistImage={setlist.image}
              songsCount={setlist._count.songs}
            />
          );
        })}
      </div>
    </div>
  );
}
