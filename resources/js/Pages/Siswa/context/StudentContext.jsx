import React, { createContext } from "react";

export const StudentContext = createContext();

export const StudentProvider = (props) => {
    const selectedJenisKelaminTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const jenisKelaminOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedSekolahTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option.nama_sekolah}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const sekolahOptionTemplate = (option) => {
        return <div className="text-sm">{option.nama_sekolah}</div>;
    };

    let handleFunctions = {
        selectedJenisKelaminTemplate,
        jenisKelaminOptionTemplate,
        selectedSekolahTemplate,
        sekolahOptionTemplate,
    };

    return (
        <StudentContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </StudentContext.Provider>
    );
};
