interface SetlistBannerProps {
  setlistImage: string;
  setlistName: string;
  songsCount: number;
}

export function SetlistBanner(props: SetlistBannerProps) {
  return (
    <div>
      <a href="" className='relative rounded-sm overflow-hidden'>
        <div className='w-full h-[168px] pt-24 pb-4 pl-5 pr-11 bg-gray-700 rounded-sm border-b border-gray-900'>
          <strong className='font-bold text-white block'>{props.setlistName}</strong>
          <span className='text-sm text-zinc-300 block'>{props.songsCount} música(s)</span>
        </div>
      </a>
    </div>
  )
}