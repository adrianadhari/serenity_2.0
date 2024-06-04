import React, { createContext } from "react";

export const KegiatanContext = createContext();

export const KegiatanProvider = (props) => {
    const selectedJenisKegiatanTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const jenisKegiatanOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedSemesterTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const semesterOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedFlagshipTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const flagshipOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedModaTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const modaOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedStatusKegiatanTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const statusKegiatanOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedJenisKegiatanTemplate,
        jenisKegiatanOptionTemplate,
        selectedSemesterTemplate,
        semesterOptionTemplate,
        selectedFlagshipTemplate,
        flagshipOptionTemplate,
        selectedModaTemplate,
        modaOptionTemplate,
        selectedStatusKegiatanTemplate,
        statusKegiatanOptionTemplate,
    };

    return (
        <KegiatanContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </KegiatanContext.Provider>
    );
};
