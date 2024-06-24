import React, { createContext } from "react";

export const AnalyticContext = createContext();

export const AnalyticProvider = (props) => {
    const selectedKodePraAnalisaTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const kodePraAnalisaOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedKodePraAnalisaTemplate,
        kodePraAnalisaOptionTemplate,
    };

    return (
        <AnalyticContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </AnalyticContext.Provider>
    );
};
