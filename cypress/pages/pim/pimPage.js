import BasePage from "../base/basePage";

const haederTab = (tabName) => `nav[aria-label="Topbar Menu"] a[class*="oxd-topbar-body-nav-tab-item"]:contains("${tabName}")`;
const dashboardHeader = `div[class*='orangehrm-upgrade-layout'] div[class*="header-title"] h6`

class PimPage extends BasePage {

  clickOnTab(tabName) {
    cy.get(haederTab(tabName)).click();
    cy.waitUntilElementToBeInvisible(this.spinner);
  }

  getAdminMenu() {
    return cy.get(adminMenu);
  }

  getDashboardHeader() {
    return cy.get(dashboardHeader);
  }
}
export default new PimPage();
