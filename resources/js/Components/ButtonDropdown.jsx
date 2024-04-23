import { useState, createContext, useContext, Fragment } from "react";
import { Transition } from "@headlessui/react";

const ButtonDropDownContext = createContext();

const ButtonDropdown = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
        setOpen((previousState) => !previousState);
    };

    return (
        <ButtonDropDownContext.Provider value={{ open, setOpen, toggleOpen }}>
            <div className="relative">{children}</div>
        </ButtonDropDownContext.Provider>
    );
};

const Trigger = ({ children }) => {
    const { open, setOpen, toggleOpen } = useContext(ButtonDropDownContext);

    return (
        <>
            <div
                onClick={toggleOpen}
                className="cursor-pointer flex items-center justify-center lg:justify-between px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-rose-600 border border-transparent rounded-lg active:bg-rose-600 hover:bg-rose-700 focus:outline-none focus:shadow-outline-rose ease-in-out"
            >
                {children}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                </svg>
            </div>

            {open && <div onClick={() => setOpen(false)}></div>}
        </>
    );
};

const Content = ({ children }) => {
    const { open, setOpen } = useContext(ButtonDropDownContext);

    return (
        <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
        >
            <div
                className="absolute z-10 mt-2 rounded-md shadow-lg ltr:origin-top-right rtl:origin-top-left end-0 w-48"
                onClick={() => setOpen(false)}
            >
                <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white">
                    {children}
                </div>
            </div>
        </Transition>
    );
};

const ButtonDropdownLink = ({ className = "", children, ...props }) => {
    return (
        <button
            {...props}
            className={
                "block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out " +
                className
            }
        >
            {children}
        </button>
    );
};

ButtonDropdown.Trigger = Trigger;
ButtonDropdown.Content = Content;
ButtonDropdown.Link = ButtonDropdownLink;

export default ButtonDropdown;
