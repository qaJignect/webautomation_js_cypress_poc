import applicationUrls from '../../support/constants/applicationUrls';

const loginTitle = `.orangehrm-login-slot h5[class*="login-title"]`
const userName = `input[name="username"]`
const password = `input[name="password"]`
const loginButton = `button[type="submit"]`
const loginError = `.orangehrm-login-form div[class*='content--error'] p`
const forgotPasswordLink = `div[class*='orangehrm-login-forgot'] p:contains('Forgot your password?')`
const companyLogo = `div[class='orangehrm-login-branding'] img`
const userAccountArea = `div[class*='header-userarea'] .oxd-userdropdown`
const dropdownMenu = (option) => `.oxd-dropdown-menu a:contains('${option}')`

class LoginPage {

  visitLoginPage() {
    cy.visit(applicationUrls.login);
  }

  getLoginTitle() {
    return cy.get(loginTitle).invoke('text');
  }

  isUsernameFieldDisplayed() {
    return cy.isElementDisplayed(userName);
  }

  isPasswordFieldDisplayed() {
    return cy.isElementDisplayed(password);
  }

  enterUsername(name) {
    cy.get(userName).clear().type(name);
  }

  enterPassword(passwordValue) {
    cy.get(password).clear().type(passwordValue);
  }

  clickOnLoginButton(isWait = true) {
    cy.intercept('GET', applicationUrls.subUnits).as('employeesSubUnits');
    cy.get(loginButton).click({ force: true });
    if (isWait) {
      cy.wait('@employeesSubUnits');
    }
  }

  isLoginButtonDisplayed() {
    return cy.isElementDisplayed(loginButton);
  }

  getLoginErrorMessage() {
    return cy.get(loginError).invoke('text');
  }

  isForgotPasswordLinkDisplayed() {
    return cy.isElementDisplayed(forgotPasswordLink);
  }

  isCompanyLogoDisplayed() {
    return cy.isElementDisplayed(companyLogo);
  }

  enterLoginDetails(loginData) {
    this.enterUsername(loginData.username);
    this.enterPassword(loginData.password);
  }

  enterLoginCredentials(username, passwordValue) {
    this.enterUsername(username);
    this.enterPassword(passwordValue);
  }

  clickOnLogoutButton() {
    cy.get(userAccountArea).click();
    cy.get(dropdownMenu('Logout')).click();
  }
}
export default new LoginPage();
