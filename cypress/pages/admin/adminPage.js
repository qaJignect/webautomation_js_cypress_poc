import ApplicationUrls from '../../support/constants/applicationUrls';
import commonTexts from '../../support/constants/commonTexts';

const addButton = `button[class*='button--medium oxd-button--secondary']:contains('Add')`

class AdminPage {

  clickOnAddUserButton() {
    cy.intercept('GET', ApplicationUrls.saveSystemUser).as('saveSystemUser');
    cy.get(addButton).click()
    cy.wait('@saveSystemUser')
  }
}
export default new  AdminPage();
