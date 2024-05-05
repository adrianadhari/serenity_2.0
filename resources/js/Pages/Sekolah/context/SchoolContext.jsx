import React, { createContext } from "react";

export const SchoolContext = createContext();

export const SchoolProvider = (props) => {
    const selectedSchoolTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const schoolOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedSchoolCategoryTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const schoolCategoryOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    const selectedSchoolTypeTemplate = (option, props) => {
        if (option) {
            return <div className="text-sm">{option}</div>;
        }

        return <span>{props.placeholder}</span>;
    };

    const schoolTypeOptionTemplate = (option) => {
        return <div className="text-sm">{option}</div>;
    };

    let handleFunctions = {
        selectedSchoolTemplate,
        schoolOptionTemplate,
        selectedSchoolCategoryTemplate,
        schoolCategoryOptionTemplate,
        selectedSchoolTypeTemplate,
        schoolTypeOptionTemplate,
    };

    return (
        <SchoolContext.Provider
            value={{
                handleFunctions,
            }}
        >
            {props.children}
        </SchoolContext.Provider>
    );
};
