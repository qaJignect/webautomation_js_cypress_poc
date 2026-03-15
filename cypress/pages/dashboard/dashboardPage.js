import commonTexts from "../../support/constants/commonTexts";

const title = `div[class*='orangehrm-upgrade-layout'] div[class*="header-title"] h6`
const userAccountArea = `div[class*='header-userarea'] .oxd-userdropdown`
const dropdownMenu = (option) => `.oxd-dropdown-menu a:contains('${option}')`
class DashboardPage {

    getDashboardTitle() {
        return cy.get(title).invoke('text');
    }

    logout() {
        cy.get(userAccountArea).click();
        cy.get(dropdownMenu(commonTexts.logoutOption)).click();
    }
}
export default new DashboardPage();
