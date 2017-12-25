
import {O} from "../../../../utils/object-util";

export const renderErrorMessages = (errors) => (
    errors && (
        <ul className="error-messages">
            {O.mapValuesToList(errors, (errList, field) => (
                errList.map((errMessage) => (
                    <li>{field} {errMessage}</li>
                ))
            ))}
        </ul>
    )
);
