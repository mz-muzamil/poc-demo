import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
  Input,
} from "@headlessui/react";
import { Fragment } from "react";

const EditDataModal = ({
  currentItem,
  setCurrentItem,
  handleSave,
  isEditing,
  setIsEditing,
}) => {
  return (
    <>
      <Transition appear show={isEditing} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsEditing(false)}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Edit Item:{" "}
                    <span className="capitalize">{currentItem.name}</span>
                  </DialogTitle>
                  <form onSubmit={handleSave} className="mt-4">
                    <div className="mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <Input
                        type="text"
                        className="mt-1 block w-full border rounded-md shadow-sm p-4 sm:text-sm"
                        value={currentItem.name}
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-2 mt-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        className="mt-1 block w-full border rounded-md shadow-sm p-4 h-40 sm:text-sm"
                        value={currentItem.description}
                        onChange={(e) =>
                          setCurrentItem({
                            ...currentItem,
                            description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="flex justify-between mt-8 border-t pt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center py-2 px-4 border rounded-md"
                        onClick={() => setIsEditing(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF3600]"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default EditDataModal;
