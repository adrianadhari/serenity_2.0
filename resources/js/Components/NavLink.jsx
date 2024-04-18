import { Link } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}) {
    return (
        <li
            className={
                "relative px-6 " +
                (active
                    ? "bg-rose-50 text-gray-800"
                    : "text-gray-500 hover:text-gray-800")
            }
        >
            <span
                className={
                    "absolute inset-y-0 left-0 w-1 bg-rose-600 rounded-tr-lg rounded-br-lg " +
                    (active ? "" : "hidden")
                }
            ></span>
            <Link
                {...props}
                className="py-3 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150"
            >
                {children}
            </Link>
        </li>
    );
}
