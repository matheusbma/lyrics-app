import { UserCirclePlus } from "@phosphor-icons/react";

interface ImageSignUpUploadProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  src: string;
}

export function ImageSignUpUpload(props: ImageSignUpUploadProps) {

  function handleClick(e: any) {
    if (props.onClick) {
      props.onClick(e.target.value);
    }
  }

  return (
    <button onClick={handleClick} className="flex justify-center ">
      {props.src ? (
        <div className="flex justify-center items-center w-[180px] h-[180px] bg-zinc-950 rounded-full outline outline-5 outline-zinc-950">
          <img
            src={props.src}
            alt="Profile Picture"
            className="w-[180px] h-[180px] rounded-full"
          />
        </div>
      ) : (
        <div className="flex justify-center items-center w-[180px] h-[180px] bg-zinc-950 rounded-full outline outline-5 outline-zinc-950">
          <UserCirclePlus size={100} color="#71717a" />
        </div>
      )}
    </button>
  );
}
