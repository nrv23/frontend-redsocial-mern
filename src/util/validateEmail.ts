export function validateEmail(email: string) {

    // Define our regular expression.
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    // Using test we can check if the text match the pattern
    return validEmail.test(email);

}