import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const LicenseTableDateCell = ({getValue, row, column, table}) => {
    const date = getValue();
    const { updateData } = table.options.meta;
    
    return (
        <>
        <DatePicker 
            wrapperClassName="date-wrapper"
            dateFormat='d-M-Y'
            selected={date}
            onChange={
                (date) => updateData(
                    row.index, column.id, date
                )
            }
        />
        </>
    )
}

export default LicenseTableDateCell;