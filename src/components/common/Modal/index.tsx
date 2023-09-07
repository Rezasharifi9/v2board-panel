import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface Props {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  title?: React.ReactNode
  message?: React.ReactNode
}

const Modal = (props: Props) => {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        className="fixed inset-0 z-10 grid place-items-center"
        onClose={() => {
          props.setIsOpen(false)
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 cursor-pointer firefox:bg-black/40 backdrop-blur-sm " />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="w-full gap-4 flex flex-col max-w-md py-8 px-6 overflow-hidden transition-all transform shadow-xl bg-slate-50 rounded-lg">
            <Dialog.Title
              as="h3"
              className="text-lg text-center font-extrabold leading-6 text-slate-900 "
            >
              {props.title}
            </Dialog.Title>

            <Dialog.Description
              className="mt-2 text-sm flex items-center justify-center font-medium text-slate-500 "
              as="div"
            >
              {props.message}
            </Dialog.Description>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
export default Modal
