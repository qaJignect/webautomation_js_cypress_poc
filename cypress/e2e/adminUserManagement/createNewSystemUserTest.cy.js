import loginPage from '../../pages/login/loginPage.js';
import adminPage from '../../pages/admin/adminPage.js';
import applicationUrls from '../../support/constants/applicationUrls.js';
import AdminUserDataFactory from '../../dataFactory/AdminUserFactory.js';
import sideMenuPage from '../../pages/sideMenuPage.js';
import sideMenuOptions from '../../enum/sideMenu/sideMenuOptions.js';
import userManagement from '../../pages/admin/userManagement.js';
import commonTexts from '../../support/constants/commonTexts.js';

let adminLoginData

before(function () {
  cy.fixture('login/login').then(function (data) {
    adminLoginData = data.find(item => item.type === 'validUser');
  })
})

beforeEach(() => {
  loginPage.visitLoginPage();
  loginPage.enterLoginDetails(adminLoginData);
  loginPage.clickOnLoginButton();
  cy.url().should('eq', applicationUrls.dashboard);
});

describe('Admin User Management Module', () => {
  const newUser = AdminUserDataFactory.getAdminUserData();

  it('Verify that a new system user can be created in Admin and can log in with the assigned credentials', () => {

    cy.log('User navigates to the Admin → User Management page');
    sideMenuPage.clickOnSideMenuOptions(sideMenuOptions.ADMIN);

    cy.log('User clicks on the Add button from the system user list table')
    adminPage.clickOnAddUserButton();

    cy.log('Fill User Details and Save');
    userManagement.fillUserDetails(newUser);
    userManagement.clickOnButton(commonTexts.submitButton)

    cy.log('Verify new user appears in user list (with pagination)');
    userManagement.enterUserDetailsAndSearch(newUser);
    userManagement.getUserDetailsList().then(({ adminUserDetailsList }) => {
      const createdUser = adminUserDetailsList.find(user => user.username === newUser.username);
      expect(createdUser.username).to.equal(newUser.username, 'Username mismatch');
      expect(createdUser.userRole).to.equal(newUser.userRole, 'User role mismatch');
      expect(createdUser.employeeName).to.equal(newUser.employeeName, 'Employee name mismatch');
      expect(createdUser.status).to.equal(newUser.status, 'Status mismatch');
    });

    cy.log('Logout from Admin');
    loginPage.clickOnLogoutButton();

    cy.log('Login with newly created system user credentials');
    loginPage.enterLoginCredentials(newUser.username, newUser.password);
    loginPage.clickOnLoginButton()

    cy.log('Verify dashboard visible after new user login');
    loginPage.getDashboardHeader().should('be.visible');
  });
});
