import React from "react";
import { Observable } from "rxjs";

/**
 * @param {Observable} observable
 * @param {*} initialValue
 */
export default (observable, initialValue) => {
    const [value, setValue] = React.useState(
        initialValue ? initialValue : observable.getValue()
    );

    React.useEffect(() => {
        const subscription = observable.subscribe((value) => setValue(value));

        return () => subscription.unsubscribe();
    }, []);

    return value;
};
