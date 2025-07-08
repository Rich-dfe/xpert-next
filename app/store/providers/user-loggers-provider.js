import { UserLoggersContext } from "../user-loggers-context";

const LoggersProvider = ({ children }) => {
  const contextValue = [
    {
      id: 284,
      logger_name: "Spa Pool",
      product_id: 16,
      logger_uid: 257748921902472,
    },
  ];

  return (
    <UserLoggersContext value={contextValue}>{children}</UserLoggersContext>
  );
};

export default LoggersProvider;
