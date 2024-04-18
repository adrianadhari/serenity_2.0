import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <li className="relative px-6 py-3">
            <span
                className={
                    "absolute inset-y-0 left-0 w-1 bg-rose-600 rounded-tr-lg rounded-br-lg " +
                    (active ? "" : "hidden")
                }
            ></span>
            <Link
                {...props}
                className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800"
            >
                {children}
            </Link>
        </li>
    );
}
