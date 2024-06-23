import { Link } from "@inertiajs/react";

export default function HeaderLabTable({ title, inputLink, printLink }) {
    return (
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-2">
            <p className="font-bold text-lg">{title}</p>

            <div className="flex md:items-center gap-2 flex-col md:flex-row">
                <Link
                    href={inputLink}
                    className="justify-center flex items-center btn-success px-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2 -ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                    </svg>
                    <span>Input data baru</span>
                </Link>

                <Link
                    href=""
                    className="justify-center flex items-center btn-info px-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5 mr-2 -ml-1"
                        fill="currentColor"
                    >
                        <path d="M17 2C17.5523 2 18 2.44772 18 3V7H21C21.5523 7 22 7.44772 22 8V18C22 18.5523 21.5523 19 21 19H18V21C18 21.5523 17.5523 22 17 22H7C6.44772 22 6 21.5523 6 21V19H3C2.44772 19 2 18.5523 2 18V8C2 7.44772 2.44772 7 3 7H6V3C6 2.44772 6.44772 2 7 2H17ZM16 17H8V20H16V17ZM20 9H4V17H6V16C6 15.4477 6.44772 15 7 15H17C17.5523 15 18 15.4477 18 16V17H20V9ZM8 10V12H5V10H8ZM16 4H8V7H16V4Z"></path>
                    </svg>
                    <span>Cetak Data</span>
                </Link>
            </div>
        </div>
    );
}
