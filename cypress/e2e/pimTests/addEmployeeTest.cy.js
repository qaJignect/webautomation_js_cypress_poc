import loginPage from '../../pages/login/loginPage.js';
import sideMenuPage from '../../pages/sideMenuPage.js';
import sideMenuOptions from '../../enum/sideMenu/sideMenuOptions.js';
import pimPage from '../../pages/pim/pimPage.js';
import applicationUrls from '../../support/constants/applicationUrls.js';
import EmployeeData from '../../dataFactory/EmployeeData.js';
import addEmployeePage from '../../pages/pim/addEmployee/addEmployeePage.js';
import commonTexts from '../../support/constants/commonTexts.js';
import employeeListPage from '../../pages/pim/employeeList/employeeListPage.js';

let adminLoginData;

before(function () {
  cy.fixture('login/login').then(function (data) {
    adminLoginData = data.find(item => item.type === 'validUser');
  });
});

beforeEach(() => {
  loginPage.visitLoginPage();
  loginPage.enterLoginDetails(adminLoginData);
  loginPage.clickOnLoginButton();
  cy.url().should('eq', applicationUrls.dashboard);
});

describe('PIM Module Tests - Add Employee', () => {

  it('Verify that a newly added employee appears in the Employee List and does not have Admin access upon login', () => {
    const employeeData = EmployeeData.getEmployeeData();

    cy.log('User navigates to the PIM page');
    sideMenuPage.clickOnSideMenuOptions(sideMenuOptions.PIM);

    cy.log('User clicks the Add button in the employee list table');
    employeeListPage.clickAddEmployee();

    cy.log('User fills in all mandatory fields including login details and clicks Save button');
    addEmployeePage.fillEmployeeDetails(employeeData);
    addEmployeePage.clickOnSaveEmployeeButton();

    cy.log('User clicks on the Employee List tab from the navbar');
    pimPage.clickOnTab(commonTexts.employeeListTab);

    cy.log('User searches for the newly created Employee from the filter section');
    employeeListPage.enterEmployeeName(employeeData.firstName)
    employeeListPage.searchEmployee(employeeData.employeeId);

    cy.log('Verify newly created employee appears in the Employee List');
    employeeListPage.getEmployeeDetailsList().then(({ employeeDetailsList }) => {
      const createdEmployee = employeeDetailsList.find(emp => emp.employeeId === employeeData.employeeId);
      expect(createdEmployee.employeeId).to.equal(employeeData.employeeId, 'Employee Id is matched');
      expect(createdEmployee.firstName).to.includes(employeeData.firstName, 'Employee Id is matched');
      expect(createdEmployee.lastName.trim()).to.equal(employeeData.lastName.trim(), 'LastName is matched')
    });

    cy.log('User clicks on the Account Menu tab from navbar and clicks on Logout');
    loginPage.clickOnLogoutButton();

    cy.log('User logs in using the newly created employee credentials');
    loginPage.enterLoginCredentials(employeeData.username, employeeData.password);
    loginPage.clickOnLoginButton(false);

    cy.log('verify the newly created employee does not have Admin access');
    sideMenuPage.isAdminSideMenuDisplayed().then((isDisplayed) => {
      expect(isDisplayed).to.be.false;
    });
  });
});
