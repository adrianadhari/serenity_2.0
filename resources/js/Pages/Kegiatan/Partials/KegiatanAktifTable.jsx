import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Link } from "@inertiajs/react";
import moment from "moment";
import Spinner from "@/Components/Spinner";

export default function KegiatanAktifTable({ activities }) {
    const [dataActivities, setDataActivities] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);

    useEffect(() => {
        setDataActivities(activities);
    }, [activities]);

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex items-center gap-1">
                <Link
                    href={route("kegiatan.show", rowData.kode)}
                    className="btn-info flex items-center gap-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                    </svg>
                </Link>

                <Link
                    href={route("kegiatan.peserta.index", rowData.kode)}
                    className="btn-success flex items-center gap-1"
                >
                    <span className="text-xs font-medium">Daftar</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                    </svg>
                </Link>
            </div>
        );
    };

    const header = (
        <div className="justify-end flex">
            <div className="flex items-center order-1 lg:order-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                >
                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                </svg>
                <InputText
                    onInput={(e) => setGlobalFilter(e.target.value)}
                    placeholder="Cari..."
                    className="border-0 bg-transparent border-b pl-0 focus:ring-0 focus:border-black w-full"
                />
            </div>
        </div>
    );

    const dateStartTemplate = (rowData) => {
        return moment(rowData.jadwal_mulai).format("D/MM/YYYY h:mm");
    };

    return (
        <div className="card shadow-lg">
            <DataTable
                value={dataActivities}
                paginator
                rows={10}
                globalFilter={globalFilter}
                rowsPerPageOptions={[10, 25, 50, 100]}
                header={header}
                emptyMessage="Tidak ada data."
                stripedRows
                removableSort
                currentPageReportTemplate="Menampilkan {first} sampai {last} dari {totalRecords} kegiatan aktif"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown CurrentPageReport"
            >
                <Column sortable field="kode" header="Kode Kegiatan" />
                <Column
                    sortable
                    field="judul_kegiatan"
                    header="Judul Kegiatan"
                />
                <Column sortable body={dateStartTemplate} header="Jadwal" />
                <Column
                    sortable
                    body={(rowData) => <PesertaTemplate rowData={rowData} />}
                    header="Peserta"
                />
                <Column body={actionBodyTemplate} />
            </DataTable>
        </div>
    );
}

const PesertaTemplate = ({ rowData }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/api/jumlah-peserta?id=${rowData.id}`
                );
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [rowData.id]);

    if (data === null) {
        return <Spinner isLoading={true} />;
    }

    return data;
};
