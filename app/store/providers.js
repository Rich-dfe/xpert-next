"use client"

import { LoggersProvider } from "./user-loggers-context"
import { ChartDataProvider } from "./chart-data-context"

export default function Providers({children}){
    return(
        <ChartDataProvider>
        <LoggersProvider>
            
                {children}
            
        </LoggersProvider>
        </ChartDataProvider>
    );
}