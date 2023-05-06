interface SetlistBannerProps extends React.HTMLAttributes<HTMLButtonElement> {
  setlistImage: string;
  setlistName: string;
  songsCount: number;
}

export function SetlistBanner(props: SetlistBannerProps) {
  return (
    <div>
        <button className='flex flex-col w-[200px] h-[200px] gap-1 bg-zinc-800 justify-end pl-4 pb-4 rounded-sm border-b border-gray-900'>
          <strong className='font-bold text-base text-white'>{props.setlistName}</strong>
          <span className='text-xs text-zinc-300'>{props.songsCount} música(s)</span>
        </button>
    </div>
  )
}