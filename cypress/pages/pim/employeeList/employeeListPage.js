import BasePage from "../../base/basePage";
import EmployeeDetails from "../../../dataObject/employeeDetails";
import EmployeeDetailsList from "../../../dataObject/employeeDetailsList";

const addButton = `.orangehrm-header-container button.oxd-button--secondary:contains("Add")`;
const employeeTableFields = (labelName) => `//label[text()='${labelName}']/../..//following-sibling::input`;
const searchButton = `button.oxd-button--secondary:contains("Search")`;
const tableRow = `.oxd-table-card`;
const tableCell = `.oxd-table-cell`;
const adminMenu = `.oxd-main-menu span[class*='oxd-main-menu-item--name']:contains("Admin")`

class EmployeeListPage extends BasePage {

  clickAddEmployee() {
    cy.get(addButton).click();
    cy.waitUntilElementToBeInvisible(this.spinner);
  }

  enterEmployeeName(name) {
    cy.xpath(employeeTableFields('Employee Name')).clear().type(name);
  }

  searchEmployee(employeeDetails) {
    cy.xpath(employeeTableFields('Employee Id')).clear().type(employeeDetails);
    cy.get(searchButton).click();
    cy.waitUntilElementToBeInvisible(this.spinner);
  }

  getEmployeeDetailsList() {
    let employeeDetailsList = new EmployeeDetailsList()
    return cy.get(tableRow).then(($rows) => {
      $rows.each((_, row) => {
        const cells = Cypress.$(row).find(tableCell)
        const employeeDetails = new EmployeeDetails()
        employeeDetails.employeeId = Number(cells.eq(1).text().trim());
        employeeDetails.firstName = cells.eq(2).text().trim()
        employeeDetails.lastName = cells.eq(3).text().trim()
        employeeDetailsList.employeeDetailsList.push(employeeDetails)
      })
      return employeeDetailsList
    })
  }

  getAdminMenu() {
    return cy.get(adminMenu);
  }
}
export default new EmployeeListPage();
