import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Table from "@/Components/Table";

export default function Peserta({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} titlePage="Peserta">
            <Head title="Peserta" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between flex-wrap gap-2 my-4">
                        <PrimaryButton className="justify-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5 mr-2 -ml-1"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
                            </svg>
                            <span>Tambah Data</span>
                        </PrimaryButton>

                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                            <details className="dropdown">
                                <summary className="cursor-pointer flex items-center justify-center lg:justify-between px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-rose-600 border border-transparent rounded-lg active:bg-rose-600 hover:bg-rose-700 focus:outline-none focus:shadow-outline-rose ease-in-out">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 mr-2 -ml-1"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path>
                                    </svg>
                                    <span>Import Data</span>
                                </summary>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                    <li>
                                        <a>Upload File</a>
                                    </li>
                                    <li>
                                        <a>Download Format</a>
                                    </li>
                                </ul>
                            </details>

                            <details className="dropdown lg:dropdown-end">
                                <summary className="cursor-pointer flex items-center justify-center lg:justify-between px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-rose-600 border border-transparent rounded-lg active:bg-rose-600 hover:bg-rose-700 focus:outline-none focus:shadow-outline-rose ease-in-out">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 mr-2 -ml-1"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
                                    </svg>
                                    <span>Export Data</span>
                                </summary>
                                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                    <li>
                                        <a>Copy</a>
                                    </li>
                                    <li>
                                        <a>CSV</a>
                                    </li>
                                    <li>
                                        <a>Excel</a>
                                    </li>
                                    <li>
                                        <a>PDF</a>
                                    </li>
                                    <li>
                                        <a>Print</a>
                                    </li>
                                </ul>
                            </details>
                        </div>
                    </div>
                    <Table />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
