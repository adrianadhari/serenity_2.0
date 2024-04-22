import { Link } from "@inertiajs/react";

export default function Navbar({ user, titlePage }) {
    return (
        <div className="sticky top-0 z-10 bg-white navbar px-2 lg:px-6">
            <div className="flex-1 items-center gap-2">
                <label
                    htmlFor="my-drawer-2"
                    className="drawer-button lg:hidden cursor-pointer"
                >
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fillRule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </label>

                <h2 className="font-semibold text-xl text-gray-800">
                    {titlePage}
                </h2>
            </div>

            <div className="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                >
                    <div className="w-10 rounded-full">
                        <img
                            alt="profile"
                            src={`https://ui-avatars.com/api/?name=${user.name}`}
                        />
                    </div>
                </div>

                <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                    <li className="border-b py-1">
                        <p className="px-2 py-1 text-sm font-semibold">
                            {user.name}
                        </p>
                        <p className="px-2 py-1 text-sm font-semibold">
                            {user.email}
                        </p>
                    </li>

                    <li className="mt-2">
                        <Link
                            className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold hover:bg-gray-100 hover:text-gray-800"
                            href={route("profile.edit")}
                        >
                            <svg
                                className="w-4 h-4 mr-3"
                                aria-hidden="true"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <span>Edit Profile</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            className="inline-flex items-center w-full px-2 py-1 text-sm font-semibold hover:bg-gray-100 hover:text-gray-800"
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            <svg
                                className="w-4 h-4 mr-3"
                                aria-hidden="true"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                            </svg>
                            <span>Log out</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
