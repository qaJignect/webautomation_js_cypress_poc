import loginPage from '../../pages/login/loginPage.js';
import sideMenuPage from '../../pages/sideMenuPage.js';
import sideMenuOptions from '../../enum/sideMenu/sideMenuOptions.js';
import pimPage from '../../pages/pim/pimPage.js';
import applicationUrls from '../../support/constants/applicationUrls.js';
import EmployeeDataFactory from '../../dataFactory/EmployeeFactory.js';

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
  const newEmployee = EmployeeDataFactory.getEmployeeData();

  it('Verify that a newly added employee appears in the Employee List and does not have Admin access upon login', () => {

    cy.log('User navigates to the PIM page');
    sideMenuPage.clickOnSideMenuOptions(sideMenuOptions.PIM);

    cy.log('User clicks the Add button in the employee list table');
    pimPage.clickAddEmployee();

    cy.log('User fills in all mandatory fields including login details and clicks Save button');
    pimPage.fillEmployeeDetails(newEmployee);
    pimPage.clickOnSaveEmployeeButton();

    cy.log('User clicks on the Employee List tab from the navbar');
    pimPage.clickOnEmployeeListTab();

    cy.log('User searches for the newly created Employee from the filter section');
    pimPage.searchEmployeeByName(newEmployee.firstName);

    cy.log('Verify newly created employee appears in the Employee List');
    pimPage.verifyEmployeeExists(newEmployee);

    cy.log('User clicks on the Account Menu tab from navbar and clicks on Logout');
    loginPage.clickOnLogoutButton();

    cy.log('User logs in using the newly created employee credentials');
    loginPage.enterLoginCredentials(newEmployee.username, newEmployee.password);
    loginPage.clickOnLoginButton();

    cy.log('Verify dashboard is visible after login');
    loginPage.getDashboardHeader().should('be.visible');

    cy.log('Verify the newly created employee does not have Admin access');
    pimPage.verifyNoAdminAccess();
  });
});
