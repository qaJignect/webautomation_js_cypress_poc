import BasePage from "../../base/basePage";
import commonTexts from "../../../support/constants/commonTexts";
import applicationUrls from "../../../support/constants/applicationUrls";

const firstNameInput = `input[placeholder="First Name"]`;
const middleNameInput = `input[placeholder="Middle Name"]`;
const lastNameInput = `input[placeholder="Last Name"]`;
const createLoginDetailsSwitch = `.oxd-switch-input`;
const loginDetailsInputFields = (labelName) => `//label[text()='${labelName}']/../..//following-sibling::input`
const saveButton = `button.oxd-button--medium[type="submit"]`;
const parentInputField = '.oxd-input-group'
const inputField = 'input.oxd-input'
const labelField = (labelName) => `label.oxd-label:contains("${labelName}")`

class AddEmployeePage extends BasePage {

    enterEmployeeId(employeeId) {
        cy.get(labelField('Employee Id')).parents(parentInputField).find(inputField).clear().type(employeeId)
    }

    fillEmployeeDetails(employee, isCreateLoginDetails = true) {
        cy.get(firstNameInput).clear({ force: true }).type(employee.firstName);
        cy.get(middleNameInput).clear({ force: true }).type(employee.middleName);
        cy.get(lastNameInput).clear({ force: true }).type(employee.lastName);
        this.enterEmployeeId(employee.employeeId)
        if (isCreateLoginDetails) {
            cy.get(createLoginDetailsSwitch).click()
            cy.xpath(loginDetailsInputFields(commonTexts.userNameField)).clear().type(employee.username);
            cy.xpath(loginDetailsInputFields(commonTexts.passwordField)).clear().type(employee.password);
            cy.xpath(loginDetailsInputFields(commonTexts.confirmPassword)).clear().type(employee.password);
        }
    }

    clickOnSaveEmployeeButton() {
        cy.intercept('GET', applicationUrls.getEmployee).as('getEmployees');
        cy.get(saveButton).click();
        cy.waitUntilElementToBeInvisible(this.spinner);
        cy.wait('@getEmployees').its('response.statusCode').should('eq', 200);
    }
}
export default new AddEmployeePage();
