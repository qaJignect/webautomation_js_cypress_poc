import commonTexts from '../../support/constants/commonTexts';

const addButton = `button[class*='button--medium oxd-button--secondary']:contains('Add')`

class AdminPage {

  clickOnAddUserButton() {
    cy.get(addButton).click().wait(commonTexts.twoSeconds)
  }  
}
export default new  AdminPage();
