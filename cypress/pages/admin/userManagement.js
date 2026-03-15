import commonTexts from "../../support/constants/commonTexts"
import AdminUserDetails from "../../dataObject/AdminUserData"
import AdminUserDetailsList from "../../dataObject/AdminUserDetailsList"
import BasePage from "../base/basePage"

const systemUsersTitle = '.oxd-table-filter-title'
const usernameInput = '.oxd-form input.oxd-input'
const userRoleSelect = '.oxd-grid-item:first-child .oxd-select-text'
const userRoleDropdownOption = (role) => `div[class*='oxd-select-option'] span:contains("${role}")`
const employeeNameInput = '.oxd-autocomplete-text-input input'
const labelField = (labelName) => `label[class="oxd-label oxd-input-field-required"]:contains("${labelName}")`
const selectDropdown = 'div[class="oxd-select-text-input"]'
const resetButton = '.oxd-form-actions button.oxd-button--ghost'
const submitButton = (buttonName) => `.oxd-form-actions button[type="submit"]:contains("${buttonName}")`
const addButton = '.orangehrm-header-container button.oxd-button--secondary'
const tableCell = '.oxd-table-cell'
const tableRow = '.oxd-table-card'
// const tableHeaderCheckbox = '.oxd-table-header input[type="checkbox"]'
// const tableBodyCheckbox = (rowIndex) => `.oxd-table-card:nth-child(${rowIndex}) input[type="checkbox"]`
// const usernameCell = (rowIndex) => `.oxd-table-card:nth-child(${rowIndex}) .oxd-table-cell:nth-child(2)`
// const userRoleCell = (rowIndex) => `.oxd-table-card:nth-child(${rowIndex}) .oxd-table-cell:nth-child(3)`
// const employeeNameCell = (rowIndex) => `.oxd-table-card:nth-child(${rowIndex}) .oxd-table-cell:nth-child(4)`
// const statusCell = (rowIndex) => `.oxd-table-card:nth-child(${rowIndex}) .oxd-table-cell:nth-child(5)`
// const deleteButton = (rowIndex) => `.oxd-table-card:nth-child(${rowIndex}) .oxd-table-cell-actions .bi-trash`
// const editButton = (rowIndex) => `.oxd-table-card:nth-child(${rowIndex}) .oxd-table-cell-actions .bi-pencil-fill`

const employeeNameDropdownbOption= `div[role="listbox"]`
const passwordField = `input[type="password"]`


class UserManagement extends BasePage {

    getSystemUsersTitle() {
        return cy.get(systemUsersTitle).invoke('text')
    }

    enterUsername(username) {
         cy.get(labelField('Username')).closest(usernameInput).clear().type(username)
    }

    enterPassword(fieldName, password) {
        cy.get(labelField(fieldName)).closest(passwordField).clear().type(password)
    }

    selectUserRole(role) {
        cy.get(userRoleSelect).click()
        cy.get(userRoleDropdownOption(role)).click()
    }

    enterAndSelectEmployeeName(name) {
        cy.get(employeeNameInput).clear().type(name).wait(commonTexts.twoSeconds)
         cy.get(employeeNameDropdownbOption, { timeout: 10000 }).first().click()
    }

    selectStatus(status) {
        cy.get(labelField('Status')).closest(selectDropdown).click().wait(commonTexts.oneSecond)
        cy.get(userRoleDropdownOption(status)).click()
    }

    clickResetButton() {
        cy.get(resetButton).click()
    }

    clickOnButton(buttonName) {
        cy.get(submitButton(buttonName)).click()
        cy.waitUntilElementToBeInvisible(this.spinner)
    }

    clickAddButton() {
        cy.get(addButton).click()
    }

    getUserDetailsList() {
        const adminUserDetailsList = new AdminUserDetailsList();
        return cy.get(tableRow).then(($rows) => {
            $rows.each((_, row) => {
                const cells = Cypress.$(row).find(tableCell);
                const userDetails = new AdminUserDetails();
                userDetails.username = cells.eq(1).text().trim();
                userDetails.userRole = cells.eq(2).text().trim();
                userDetails.employeeName = cells.eq(3).text().trim();
                userDetails.status = cells.eq(4).text().trim();
                adminUserDetailsList.adminUserDetailsList.push(userDetails);
            });
            return adminUserDetailsList;
        });
    }

    fillUserDetails(user) {
        this.selectUserRole(user.userRole);
        this.enterAndSelectEmployeeName(user.employeeName);       
        this.selectStatus(user.status);
        this.enterUsername(user.username);
        this.enterPassword('Password', user.password)
        this.enterPassword('Confirm Password', user.password)
    }

    enterUserDetailsAndSearch(user) {
        this.enterUsername(user.username);
        this.selectUserRole(user.userRole); 
        this.selectStatus(user.status);
        this.clickOnButton('Search')
        cy.waitUntilElementToBeInvisible(this.spinner)
    }
}
export default new UserManagement();
