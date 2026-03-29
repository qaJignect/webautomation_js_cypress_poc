const toastSuccessTitle = `div[class*='oxd-toast-container'] p[class*='oxd-text--toast-title ']`
const toastSuccessMenssage =  `div[class*='oxd-toast-container'] p[class*='oxd-text--toast-message']`

export default class BasePage {
    spinner = `div[class='oxd-loading-spinner']`
    employeeTableFields = (labelName) => `//label[text()="${labelName}"]/../..//following-sibling::input`;

    getToastSuccessTitle() {
        return cy.get(toastSuccessTitle).invoke('text')
    }

    getToastSuccessMessage() {
        return cy.get(toastSuccessMenssage).invoke('text')
    }
}
