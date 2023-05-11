import { Fragment, HTMLAttributes, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AvatarEditor from "react-avatar-editor";

// TODO:
// Falta criar o código para mexer a posição da imagem no modal
// Falta criar o código para fazer o crop circular da imagem
// Falta criar o código para fazer o upload da imagem para o servidor

interface SignUpProps extends HTMLAttributes<HTMLButtonElement> {
  modalIsOpen: boolean;
  modalIsClose: (close: boolean) => void;
  avatarImage: (image: string) => void;
}

export function ImageSignUpModal(props: SignUpProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState("");
  const [cropImage, setCropImage] = useState("");
  const hiddenFileInput = useRef<any>(null);
  const editorRef = useRef<any>(null);

  useEffect(() => {
    setIsOpen(props.modalIsOpen);
  }, [props.modalIsOpen]);

  function handleClick() {
    hiddenFileInput.current.click();
  }

  function handleUploadImage(event: any) {
    const fileUploaded = event.target.files[0];
    if (fileUploaded.size > 1000000) {
      return alert("File is too big!");
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(fileUploaded);
    fileReader.onloadend = () => {
      setImage(fileReader.result as string);
    };
  }

  const handleCrop = () => {
    const canvasScaled = editorRef.current.getImageScaledToCanvas().toDataURL();
    setCropImage(canvasScaled);
  };

  function handleConfirm() {
    props.avatarImage(cropImage);
    setIsOpen(false);
    props.modalIsClose(false);
  }

  function handleClose() {
    props.modalIsClose(false);
    setTimeout(() => {
      setImage("");
    }, 500);
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-950 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            onClick={handleClose}
            className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-zinc-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-zinc-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center sm:text-left">
                    <Dialog.Title className="text-base font-semibold leading-6 text-white">
                      Select a new profile picture
                    </Dialog.Title>
                    <div className="flex flex-col items-center mt-2">
                      <p className="text-sm text-gray-500">
                        You can upload a JPG or PNG file. The maximum file size
                        is 1MB.
                      </p>

                      {image ? (
                        <AvatarEditor
                          ref={editorRef}
                          image={image}
                          onImageChange={handleCrop}
                          width={360}
                          height={360}
                          border={20}
                          borderRadius={200}
                          scale={1}
                        />
                      ) : (
                        <button
                          onClick={handleClick}
                          className=" w-[400px] h-[400px] border-black border-2 border-dashed"
                        >
                          <p className="text-md text-gray-500">Choose a file</p>
                          <input
                            accept=".png, .jpg, .jpeg"
                            type="file"
                            ref={hiddenFileInput}
                            onChange={handleUploadImage}
                            className="hidden"
                          />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-[#00875F] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0a7051] sm:ml-3 sm:w-auto"
                    onClick={handleConfirm}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition ring-inset hover:bg-red-700 sm:mt-0 sm:w-auto"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
