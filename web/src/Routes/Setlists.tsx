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
      .get(`http://localhost:7000/user/${user.id}/setlists`, {
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
    <div className="flex flex-col justify-center items-center mx-10">
      {/* search bar */}

      <div className="grid gap-20 mt-20 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
        <button className="flex justify-center items-center w-[200px] h-[200px] gap-1 bg-zinc-800 rounded-sm border-b border-gray-900">
            <strong className="text-8xl font-thin text-white">+</strong>
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
