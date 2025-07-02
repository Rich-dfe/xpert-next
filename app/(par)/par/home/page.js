import LoggerConfigForm from "@/app/components/config/Form-logger-config";
import SelectLoggersForm from "@/app/components/loggers/Select-loggers";
import MapBox from "@/app/components/loggers/Map-box";

const API_LOGGERS = [
    { value: '1', label: 'PAR 1' },
    { value: '2', label: 'PAR 2' },
    { value: '3', label: 'PAR 3' },
  ];

export default function WlHome() {
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
