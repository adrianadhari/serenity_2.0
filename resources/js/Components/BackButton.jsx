import { Link } from "@inertiajs/react";

export default function BackButton({ ...props }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2 my-4">
            <Link
                {...props}
                className="justify-center flex items-center btn-primary"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2 -ml-1"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                </svg>
                <span>Kembali</span>
            </Link>
        </div>
    );
}
