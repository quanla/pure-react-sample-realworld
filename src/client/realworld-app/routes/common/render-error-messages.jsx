
import {O} from "../../../../utils/object-util";

export const renderErrorMessages = (errors) => (
    errors && (
        <ul className="error-messages">
            {O.mapValuesToList(errors, (errList, field) => (
                errList.map((errMessage, i) => (
                    <li key={i}>{field} {errMessage}</li>
                ))
            ))}
        </ul>
    )
);
