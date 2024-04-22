import ButtonDropdown from "@/Components/ButtonDropdown";
import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user} titlePage="Dashboard">
            <Head title="Dashboard" />

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
                            <ButtonDropdown>
                                <ButtonDropdown.Trigger>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 mr-2 -ml-1"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path>
                                    </svg>
                                    <span>Import Data</span>
                                </ButtonDropdown.Trigger>
                                <ButtonDropdown.Content>
                                    <ButtonDropdown.Link>
                                        Upload File
                                    </ButtonDropdown.Link>
                                    <ButtonDropdown.Link>
                                        Download Format
                                    </ButtonDropdown.Link>
                                </ButtonDropdown.Content>
                            </ButtonDropdown>

                            <ButtonDropdown>
                                <ButtonDropdown.Trigger>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 mr-2 -ml-1"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M13 10H18L12 16L6 10H11V3H13V10ZM4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19Z"></path>
                                    </svg>
                                    <span>Export Data</span>
                                </ButtonDropdown.Trigger>
                                <ButtonDropdown.Content>
                                    <ButtonDropdown.Link>
                                        Copy
                                    </ButtonDropdown.Link>
                                    <ButtonDropdown.Link>
                                        CSV
                                    </ButtonDropdown.Link>
                                    <ButtonDropdown.Link>
                                        Excel
                                    </ButtonDropdown.Link>
                                    <ButtonDropdown.Link>
                                        PDF
                                    </ButtonDropdown.Link>
                                    <ButtonDropdown.Link>
                                        Print
                                    </ButtonDropdown.Link>
                                </ButtonDropdown.Content>
                            </ButtonDropdown>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
