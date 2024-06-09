import React, { createContext } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = (props) => {
    const selectedNamaPelatihanTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const namaPelatihanOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedNamaPelatihanTemplate,
        namaPelatihanOptionTemplate,
    };

    return (
        <EmployeeContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </EmployeeContext.Provider>
    );
};
