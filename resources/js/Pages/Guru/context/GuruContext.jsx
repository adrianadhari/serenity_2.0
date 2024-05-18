import React, { createContext } from "react";

export const TeacherContext = createContext();

export const TeacherProvider = (props) => {
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
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const sekolahOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedPendidikanTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const pendidikanOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedJenisKelaminTemplate,
        jenisKelaminOptionTemplate,
        selectedSekolahTemplate,
        sekolahOptionTemplate,
        selectedPendidikanTemplate,
        pendidikanOptionTemplate,
    };

    return (
        <TeacherContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </TeacherContext.Provider>
    );
};
