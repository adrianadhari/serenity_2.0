import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Link } from "@inertiajs/react";

export default function Table() {
    const [globalFilterValue, setGlobalFilterValue] = useState("");
    const [selectedProducts, setSelectedProducts] = useState(null);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        kode: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kategori: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        nama_sekolah: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        provinsi: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
        kota: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });

    const data = [
        {
            id: 1,
            kode: 1001,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Bogor",
            provinsi: "DKI Jakarta",
            kota: "Surabaya",
        },
        {
            id: 2,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Bogor",
        },
        {
            id: 3,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Surabaya",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 4,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jogja",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 5,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 6,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 7,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 8,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 9,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 10,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 11,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 12,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 13,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 14,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
        {
            id: 15,
            kode: 1000,
            kategori: "Negeri",
            nama_sekolah: "SMA Negeri 1 Kota Jakarta",
            provinsi: "DKI Jakarta",
            kota: "Jakarta",
        },
    ];

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters["global"].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const renderHeader = () => {
        return (
            <div className="flex justify-end items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                >
                    <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                </svg>
                <InputText
                    value={globalFilterValue}
                    onChange={onGlobalFilterChange}
                    placeholder="Cari..."
                    className="border-0 bg-transparent border-b pl-0 focus:ring-0 focus:border-black"
                />
            </div>
        );
    };

    const renderAction = () => {
        return (
            <div className="flex items-center gap-1">
                <Link className="p-2 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-md active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue ease-in-out">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z"></path>
                    </svg>
                </Link>

                <Link className="p-2 text-white transition-colors duration-150 bg-green-600 border border-transparent rounded-md active:bg-green-600 hover:bg-green-700 focus:outline-none focus:shadow-outline-green ease-in-out">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path>
                    </svg>
                </Link>

                <Link className="p-2 text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-md active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-red ease-in-out">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                    </svg>
                </Link>
            </div>
        );
    };

    const header = renderHeader();
    return (
        <div className="card shadow-lg">
            <DataTable
                value={data}
                paginator
                rows={10}
                filters={filters}
                globalFilterFields={[
                    "id",
                    "kode",
                    "kategori",
                    "nama_sekolah",
                    "provinsi",
                    "kota",
                ]}
                rowsPerPageOptions={[10, 25, 50, 100]}
                header={header}
                emptyMessage="Tidak ada data."
                stripedRows
                removableSort
                selection={selectedProducts}
                onSelectionChange={(e) => setSelectedProducts(e.value)}
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            >
                <Column selectionMode="multiple" />
                <Column sortable field="id" header="id" />
                <Column sortable field="kode" header="Kode" />
                <Column sortable field="kategori" header="Kategori" />
                <Column sortable field="nama_sekolah" header="Nama Sekolah" />
                <Column sortable field="provinsi" header="Provinsi" />
                <Column sortable field="kota" header="Kota" />
                <Column field={renderAction} />
            </DataTable>
        </div>
    );
}
