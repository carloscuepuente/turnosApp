import React, { createContext, useState } from "react";

export const DayContext = createContext();

export function DayProvider(props) {

    const [day, setDay] = useState("day");

    return (
        <DayContext.Provider value={{ day, setDay }}>

            {props.children}


        </DayContext.Provider>

    )

}