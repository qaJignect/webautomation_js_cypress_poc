import commonTexts from "../../../support/constants/commonTexts";
import BasePage from "../../base/basePage";

const firstNameInput = `input.orangehrm-firstname`;
const middleNameInput = `input.orangehrm-middlename`;
const lastNameInput = `input.orangehrm-lastname`;
const nationalityDropdown = `.oxd-select-text-input`;
const saveButton = `button.oxd-button--medium.oxd-button--secondary`;
const dropdownOptions = `div[class*='oxd-select-dropdown'] .oxd-select-option`;

class PersonalDetailsPage extends BasePage {

    enterFirstName(firstName) {
        cy.get(firstNameInput).clear().type(firstName);
    }

    enterMiddleName(middleName) {
        cy.get(middleNameInput).clear().type(middleName);
    }

    enterLastName(lastName) {
        cy.get(lastNameInput).clear().type(lastName);
    }

    enterDriversLicense(licenseNumber) {
        cy.xpath(this.employeeTableFields(commonTexts.drivingLicenceField)).clear().type(licenseNumber);
    }

    selectNationality() {
        cy.get(nationalityDropdown).first().click();
        cy.get(dropdownOptions).first().click();
    }

    clickSaveButton() {
        cy.get(saveButton).first().click();
    }

    getEmployeeName() {
        return cy.get(firstNameInput).invoke('val');
    }

    getMiddleName() {
        return cy.get(middleNameInput).invoke('val');
    }

    getLastName() {
        return cy.get(lastNameInput).invoke('val');
    }
}
export default new PersonalDetailsPage();
