import StatistikItem from "@/Components/StatistikItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import KemitraanSearchForm from "./Partials/KemitraanSearchForm";
import PenelitianSearchForm from "./Partials/PenelitianSearchForm";
import PesertaSearchForm from "./Partials/PesertaSearchForm";

export default function Dashboard({
    auth,
    totalSchool,
    mouAktif,
    mouNonAktif,
    totalTraining,
    totalPenelitian,
    sekolahUtama,
    sekolahMadya,
    sekolahPariPurna,
    allKegiatan,
}) {
    const title = "Dashboard";

    return (
        <AuthenticatedLayout user={auth.user} titlePage={title}>
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <StatistikItem
                            title="Sekolah"
                            number={totalSchool}
                            bgColour="text-orange-500 bg-orange-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0.585693L18 6.58569V9H22V19H23V21H1V19H2V9H6V6.58569L12 0.585693ZM18 19H20V11H18V19ZM6 11H4V19H6V11ZM8 7.41412V18.9999H11V12H13V18.9999H16V7.41412L12 3.41412L8 7.41412Z"></path>
                            </svg>
                        </StatistikItem>

                        <StatistikItem
                            title="Dokumen Kerjasama Aktif"
                            number={mouAktif}
                            bgColour="text-green-500 bg-green-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M3 3C2.44772 3 2 3.44772 2 4V20C2 20.5523 2.44772 21 3 21H13V19H4V5H9.58579L11.5858 7H20V13H22V6C22 5.44772 21.5523 5 21 5H12.4142L10.4142 3H3ZM15.4645 18.4647L19 22.0002L23.9497 17.0505L22.5355 15.6362L19 19.1718L16.8787 17.0505L15.4645 18.4647Z"></path>
                            </svg>
                        </StatistikItem>

                        <StatistikItem
                            title="Dokumen Kerjasama Non Aktif"
                            number={mouNonAktif}
                            bgColour="text-red-500 bg-red-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M22 11.2547C21.396 10.8334 20.7224 10.5049 20 10.2899V7H11.5858L9.58579 5H4V19H11.2899C11.5049 19.7224 11.8334 20.396 12.2547 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5H21C21.5523 5 22 5.44772 22 6V11.2547ZM18 22C15.2386 22 13 19.7614 13 17C13 14.2386 15.2386 12 18 12C20.7614 12 23 14.2386 23 17C23 19.7614 20.7614 22 18 22ZM16.7066 19.7076C17.0982 19.895 17.5369 20 18 20C19.6569 20 21 18.6569 21 17C21 16.5369 20.895 16.0982 20.7076 15.7066L16.7066 19.7076ZM15.2924 18.2934L19.2934 14.2924C18.9018 14.105 18.4631 14 18 14C16.3431 14 15 15.3431 15 17C15 17.4631 15.105 17.9018 15.2924 18.2934Z"></path>
                            </svg>
                        </StatistikItem>

                        <StatistikItem
                            title="Judul Penelitian"
                            number={totalPenelitian}
                            bgColour="text-yellow-500 bg-yellow-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                            </svg>
                        </StatistikItem>

                        <StatistikItem
                            title="Training"
                            number={totalTraining}
                            bgColour="text-blue-500 bg-blue-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M8 4C8 5.10457 7.10457 6 6 6 4.89543 6 4 5.10457 4 4 4 2.89543 4.89543 2 6 2 7.10457 2 8 2.89543 8 4ZM5 16V22H3V10C3 8.34315 4.34315 7 6 7 6.82059 7 7.56423 7.32946 8.10585 7.86333L10.4803 10.1057 12.7931 7.79289 14.2073 9.20711 10.5201 12.8943 9 11.4587V22H7V16H5ZM6 9C5.44772 9 5 9.44772 5 10V14H7V10C7 9.44772 6.55228 9 6 9ZM19 5H10V3H20C20.5523 3 21 3.44772 21 4V15C21 15.5523 20.5523 16 20 16H16.5758L19.3993 22H17.1889L14.3654 16H10V14H19V5Z"></path>
                            </svg>
                        </StatistikItem>
                    </div>

                    <TitleSection title="Data Sekolah" />
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <StatistikItem
                            title="Sekolah Utama"
                            number={sekolahUtama}
                            bgColour="text-orange-500 bg-orange-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0.585693L18 6.58569V9H22V19H23V21H1V19H2V9H6V6.58569L12 0.585693ZM18 19H20V11H18V19ZM6 11H4V19H6V11ZM8 7.41412V18.9999H11V12H13V18.9999H16V7.41412L12 3.41412L8 7.41412Z"></path>
                            </svg>
                        </StatistikItem>

                        <StatistikItem
                            title="Sekolah Madya"
                            number={sekolahMadya}
                            bgColour="text-green-500 bg-green-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0.585693L18 6.58569V9H22V19H23V21H1V19H2V9H6V6.58569L12 0.585693ZM18 19H20V11H18V19ZM6 11H4V19H6V11ZM8 7.41412V18.9999H11V12H13V18.9999H16V7.41412L12 3.41412L8 7.41412Z"></path>
                            </svg>
                        </StatistikItem>

                        <StatistikItem
                            title="Sekolah Pari Purna"
                            number={sekolahPariPurna}
                            bgColour="text-red-500 bg-red-100"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0.585693L18 6.58569V9H22V19H23V21H1V19H2V9H6V6.58569L12 0.585693ZM18 19H20V11H18V19ZM6 11H4V19H6V11ZM8 7.41412V18.9999H11V12H13V18.9999H16V7.41412L12 3.41412L8 7.41412Z"></path>
                            </svg>
                        </StatistikItem>
                    </div>

                    <TitleSection title="Cari Dokumen Kerjasama" />
                    <KemitraanSearchForm />

                    <TitleSection title="Cari Laporan Penelitian" />
                    <PenelitianSearchForm />

                    <TitleSection title="Cari Peserta Kegiatan" />
                    <PesertaSearchForm allKegiatan={allKegiatan} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const TitleSection = ({ title }) => {
    return <h1 className="font-bold text-2xl mb-2 mt-8">{title}</h1>;
};
