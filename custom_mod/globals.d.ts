declare global {
    // this formats a date value to a human-readable format
    function formatDate(date: Date): string
    //custom function
    interface Window {
        MY_VAR: string
    }
}

export {}