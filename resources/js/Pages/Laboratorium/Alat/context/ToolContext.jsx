import React, { createContext } from "react";

export const ToolContext = createContext();

export const ToolProvider = (props) => {
    const selectedKategoriAlatTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const kategoriAlatOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedStatusBMNTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const statusBMNOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedSumberDanaTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const sumberDanaOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedKategoriAlatTemplate,
        kategoriAlatOptionTemplate,
        selectedStatusBMNTemplate,
        statusBMNOptionTemplate,
        selectedSumberDanaTemplate,
        sumberDanaOptionTemplate,
    };

    return (
        <ToolContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </ToolContext.Provider>
    );
};
