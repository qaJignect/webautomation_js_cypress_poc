import SideMenuOptions from "../enum/sideMenu/sideMenuOptions";
import commonTexts from "../support/constants/commonTexts";

const sideMenuOptions = (optionName) => `.oxd-main-menu span[class*='oxd-main-menu-item--name']:contains(${optionName})`

class SideMunuPage {

  clickOnSideMenuOptions(option) {
    cy.get(sideMenuOptions(option)).click()
  }

  isAdminSideMenuDisplayed() {
    return cy.isElementDisplayed(sideMenuOptions(SideMenuOptions.ADMIN));
  }

}
export default new SideMunuPage();

