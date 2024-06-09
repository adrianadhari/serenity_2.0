import { Link } from "@inertiajs/react";

export default function AddEmployee({ children, link }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between flex-wrap gap-2 py-8">
            <Link
                href={link}
                className="justify-center flex items-center px-4 py-2 btn-primary"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2 -ml-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                </svg>
                <span>Tambah Pegawai</span>
            </Link>

            <div className="flex flex-col md:flex-row md:items-center gap-2">
                {children}
            </div>
        </div>
    );
}
