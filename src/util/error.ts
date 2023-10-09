export function getErrorMessage(objError: any) {

    if (objError?.error) {
        return objError.error.message;
    }

    if (objError?.error?.data) {
        return objError.error.data.message;
    }

    return '';
}



