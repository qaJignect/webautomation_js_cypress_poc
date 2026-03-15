import BasePage from "../base/basePage";
import commonTexts from "../../support/constants/commonTexts";

const addButton = `.orangehrm-header-container button.oxd-button--secondary:contains("Add")`;
const employeeListTab = `a.oxd-topbar-body-nav-tab:contains("Employee List")`;
const firstNameInput = `input[placeholder="First Name"]`;
const middleNameInput = `input[placeholder="Middle Name"]`;
const lastNameInput = `input[placeholder="Last Name"]`;
const employeeIdInput = `.oxd-form-row input.oxd-input`;
const createLoginDetailsSwitch = `.oxd-switch-input`;
const usernameInput = `input.oxd-input--active:eq(2)`;
const passwordInput = `input[type="password"]`;
const confirmPasswordInput = `input.oxd-input[type="password"]:eq(1)`;
const saveButton = `button.oxd-button--medium[type="submit"]`;
const employeeNameFilter = `input[placeholder="Type for hints..."]`;
const employeeIdFilterInput = `.oxd-form input.oxd-input`;
const searchButton = `button.oxd-button--secondary:contains("Search")`;
const resetButton = `button.oxd-button--ghost:contains("Reset")`;
const tableRow = `.oxd-table-card`;
const tableCell = `.oxd-table-cell`;
const spinner = `div[class='oxd-loading-spinner']`;

class PimPage extends BasePage {

  navigateToPIM() {
    cy.log('Navigate to PIM page');
  }

  clickAddEmployee() {
    cy.log('Click on Add Employee button');
    cy.get(addButton).should('be.visible').click();
  }

  fillEmployeeDetails(employee) {
    cy.log('Fill in employee details');
    cy.get(firstNameInput).clear({ force: true }).type(employee.firstName);
    cy.get(middleNameInput).clear({ force: true }).type(employee.middleName);
    cy.get(lastNameInput).clear({ force: true }).type(employee.lastName);
    
    if (employee.createLoginDetails) {
      cy.log('Enable create login details');
      cy.get(createLoginDetailsSwitch).should('be.visible').check({ force: true });
      cy.get(usernameInput).clear({ force: true }).type(employee.username);
      cy.get(passwordInput).first().clear({ force: true }).type(employee.password);
      cy.get(confirmPasswordInput).clear({ force: true }).type(employee.password);
    }
  }

  clickOnSaveEmployeeButton() {
    cy.log('Click on Save button');
    cy.get(saveButton).should('be.visible').click();
    cy.waitUntilElementToBeInvisible(this.spinner);
  }

  clickOnEmployeeListTab() {
    cy.log('Click on Employee List tab');
    cy.get(employeeListTab).should('be.visible').click();
  }

  searchEmployeeByName(employeeName) {
    cy.log(`Search for employee: ${employeeName}`);
    cy.get(employeeNameFilter).first().should('be.visible').clear().type(employeeName);
    cy.wait(commonTexts.twoSeconds);
    cy.get(searchButton).should('be.visible').click();
    cy.waitUntilElementToBeInvisible(this.spinner);
  }

  searchEmployeeById(employeeId) {
    cy.log(`Search for employee by ID: ${employeeId}`);
    cy.get(employeeIdFilterInput).eq(1).should('be.visible').clear().type(employeeId);
    cy.get(searchButton).should('be.visible').click();
    cy.waitUntilElementToBeInvisible(this.spinner);
  }

  getEmployeeDetailsList() {
    return cy.get(tableRow).then(($rows) => {
      const employeeList = [];
      $rows.each((_, row) => {
        const cells = Cypress.$(row).find(tableCell);
        const employee = {
          id: cells.eq(1).text().trim(),
          firstName: cells.eq(2).text().trim(),
          lastName: cells.eq(3).text().trim(),
          jobTitle: cells.eq(4).text().trim(),
          employmentStatus: cells.eq(5).text().trim(),
          subUnit: cells.eq(6).text().trim(),
          supervisor: cells.eq(7).text().trim()
        };
        employeeList.push(employee);
      });
      return employeeList;
    });
  }

  verifyEmployeeExists(employeeData) {
    cy.log('Verify employee appears in the list');
    this.getEmployeeDetailsList().then((employeeList) => {
      const foundEmployee = employeeList.find(emp => 
        emp.firstName.includes(employeeData.firstName) && 
        emp.lastName.includes(employeeData.lastName)
      );
      expect(foundEmployee).to.not.be.undefined;
      expect(foundEmployee.firstName).to.include(employeeData.firstName);
      expect(foundEmployee.lastName).to.include(employeeData.lastName);
    });
  }

  clickOnLogoutButton() {
    cy.log('Click on Logout');
    const userAccountArea = `div[class*='header-userarea'] .oxd-userdropdown`;
    const dropdownMenu = `.oxd-dropdown-menu a:contains('Logout')`;
    cy.get(userAccountArea).click();
    cy.get(dropdownMenu).click();
  }

  getDashboardHeader() {
    return cy.get(`div[class*='orangehrm-upgrade-layout'] div[class*="header-title"] h6`);
  }

  getAdminMenu() {
    return cy.get(`.oxd-main-menu span[class*='oxd-main-menu-item--name']:contains("Admin")`);
  }

  getPIMMenu() {
    return cy.get(`.oxd-main-menu span[class*='oxd-main-menu-item--name']:contains("PIM")`);
  }

  verifyNoAdminAccess() {
    cy.log('Verify user does not have Admin access');
    this.getAdminMenu().should('not.exist');
  }
}
export default new PimPage();
