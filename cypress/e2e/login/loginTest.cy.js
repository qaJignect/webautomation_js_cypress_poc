import dashboardPage from "../../pages/dashboard/dashboardPage";
import loginPage from "../../pages/login/loginPage";
import applicationUrls from "../../support/constants/applicationUrls";
import commonTexts from "../../support/constants/commonTexts";

describe('OrangeHRM Login Scenarios', { tags: '@regression' }, () => {

  let validLoginData, invalidLoginData

  before(function () {
    cy.fixture('login/login').then(function (data) {
      validLoginData = data.find(item => item.type === 'validUser');
      invalidLoginData = data.find(item => item.type === 'invalidUser');
    })
  })

  it('Verify that users can log in successfully with valid credentials and receive proper error messages with invalid credentials', function () {
    cy.log('Navigating to the login page...');
    loginPage.visitLoginPage();

    cy.log('Verify Login page should be displayed with correct details.');
    loginPage.getLoginTitle().should('eq', commonTexts.loginTitle);
    loginPage.isCompanyLogoDisplayed().should('be.true', 'Company logo is displayed');
    loginPage.isUsernameFieldDisplayed().should('be.true', 'Username field is displayed');
    loginPage.isPasswordFieldDisplayed().should('be.true', 'Password field is displayed');
    loginPage.isLoginButtonDisplayed().should('be.true', 'Login button is displayed');
    loginPage.isForgotPasswordLinkDisplayed().should('be.true', 'Forgot password link is displayed');

    cy.log('Login with invalid credentials');
    loginPage.enterLoginDetails(invalidLoginData);
    loginPage.clickOnLoginButton(false);
    loginPage.getLoginErrorMessage().should('eq', commonTexts.invalidCredential);

    cy.log('Login with valid credentials');
    loginPage.enterLoginDetails(validLoginData);
    loginPage.clickOnLoginButton();

    cy.log('Verify url and dashboard title after login.');
    cy.url().should('eq', applicationUrls.dashboard)
    dashboardPage.getDashboardTitle().should('eq', commonTexts.dashboardTitle);

    cy.log('Clicks on Account Menu tab and Logout button');
    dashboardPage.logout();

    cy.log('Verify login page title after logout');
    loginPage.getLoginTitle().should('eq', commonTexts.loginTitle);
  });

});
