import React from "react";
import { Observable } from "rxjs";

/**
 * React hook to make using model observable objects easy to bind to react components.
 * @param {Observable} observable
 * @param {*} initialValue
 */
export default (observable, initialValue) => {
    // State that holds the observable values that can be used in the component.
    const [value, setValue] = React.useState(
        initialValue ? initialValue : observable.getValue()
    );

    /**
     * Creates observable instance and unsubscribes when complete.
     */
    React.useEffect(() => {
        // Creates a subscription that updates the value on rerenders.
        const subscription = observable.subscribe((value) => setValue(value));

        // Clean up function that unsubscribes the subscription to avoid data leaks.
        return () => subscription.unsubscribe();
    }, []);

    return value;
};
