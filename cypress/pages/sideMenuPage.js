
const sideMenuOptions = (optionName) => `.oxd-main-menu span[class*='oxd-main-menu-item--name']:contains(${optionName})`

class SideMunuPage {
  
  clickOnSideMenuOptions(option) {
    cy.get(sideMenuOptions(option)).click()
  }

}
export default new  SideMunuPage();

