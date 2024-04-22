import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function CreateSekolah({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} titlePage="Tambah Sekolah">
            <Head title="Sekolah" />

            <div className="py-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2 my-4">
                        <Link
                            href={route("sekolah.index")}
                            className="justify-center flex items-center px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-rose-600 border border-transparent rounded-lg active:bg-rose-600 hover:bg-rose-700 focus:outline-none focus:shadow-outline-rose ease-in-out"
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

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}