import React from "react";
import { useLoggers } from "../store/user-loggers-context";
import HomeCard from "./Home-card";

function LoggersList() {
  const {
    allLoggers,
    waterLevelLoggers,
    parLoggers,
    conductivityLoggers,
    depthLoggers,
    temperatureLoggers,
    rainGaugeLoggers,
    soilMoistureLoggers,
    wipers,
    xtreemConductivityLoggers,
    isLoading,
    error,
  } = useLoggers();
  if (!allLoggers) {
    return <div>Loggers not loaded</div>;
  }

  if (isLoading) {
    return <div className="text-2xl text-red-500">  Loading Loggers...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (allLoggers.length === 0) {
    return <div>No logger found</div>;
  }

  return (
    <>
      <div>
        <h2 className="text-amber-100">All Loggers - {allLoggers.length}</h2>
        <ul className="bg-amber-300">
          {allLoggers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-amber-100">
          Water Level Loggers - {waterLevelLoggers.length}
        </h2>
        <ul className="bg-amber-600">
          {waterLevelLoggers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-amber-100">PAR Loggers - {parLoggers.length}</h2>
        <ul className="bg-amber-600">
          {parLoggers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-amber-100">
          Conductivity Loggers - {conductivityLoggers.length}
        </h2>
        <ul className="bg-amber-600">
          {conductivityLoggers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-amber-100">
          Depth Loggers - {depthLoggers.length}
        </h2>
        <ul className="bg-amber-600">
          {depthLoggers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-amber-100">
          Temperature Loggers - {temperatureLoggers.length}
        </h2>
        <ul className="bg-amber-600">
          {temperatureLoggers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-amber-100">
          Rain Gauge Loggers - {rainGaugeLoggers.length}
        </h2>
        <ul className="bg-amber-600">
          {rainGaugeLoggers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-amber-100">
          Soil Moisture Loggers - {soilMoistureLoggers.length}
        </h2>
        <ul className="bg-amber-600">
          {soilMoistureLoggers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-amber-100">
          Wipers - {wipers.length}
        </h2>
        <ul className="bg-amber-600">
          {wipers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-amber-100">
          Xtreem Conductivity - {xtreemConductivityLoggers.length}
        </h2>
        <ul className="bg-amber-600">
          {xtreemConductivityLoggers.map((logger) => (
            <li key={logger.id}>
              {logger.logger_name} - {logger.id} - {logger.product_id}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 mb-8 ml-4 mr-4">
          <HomeCard
            product="PAR"
            text="The Xtreem PAR logger is easier to use than ever and has improved specifications."
            link="/par/home"
            qty={parLoggers.length}
          />
        </div>
    </>
  );
}

export default LoggersList;
