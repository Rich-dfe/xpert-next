import { LoggersProvider } from "../store/user-loggers-context";
import LoggersList from "./Form-card-test-child";

const FormCardTest = () => {

  return (
    <>
    <LoggersProvider>
    <div>
      <h3>Component A</h3>
      <p>String from Context: <strong>FORM CARD TEST</strong></p>
    </div>
    <LoggersList />
    </LoggersProvider>
    </>
  );
};

export default FormCardTest;