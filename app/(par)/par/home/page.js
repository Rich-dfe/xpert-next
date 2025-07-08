import LoggerConfigForm from "@/app/components/config/Form-logger-config";
import SelectLoggersForm from "@/app/components/loggers/Select-loggers";
import MapBox from "@/app/components/loggers/Map-box";
import loggersService from "@/app/service/loggersService";

// const loggerTypeId = 18;

// async function getLoggers(){
//   try{
//     const apiLoggers = loggersService.fetchLoggersByTypeByUserId(32,loggerTypeId)
//     return apiLoggers;
//   } catch(e){
//     console.log('Fetching error', e)
//     throw new Error('Failed to fetch loggers from API');
//   }
// }

const API_LOGGERS = [
    { value: '1', label: 'PAR 1' },
    { value: '2', label: 'PAR 2' },
    { value: '3', label: 'PAR 3' },
  ];

export default async function WlHome() {
  //const API_LOGGERS = await getLoggers();

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="min-h-[500px]"><SelectLoggersForm loggers={API_LOGGERS} /></div>
        <div className="min-h-[500px]"><MapBox /></div>
        <div className="min-h-[500px]"><LoggerConfigForm /></div>
        </div>
    </div>
    </>
  );
}

// grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4
