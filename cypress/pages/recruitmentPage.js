// cypress/pages/recruitmentPage.js
import 'cypress-xpath';
import BasePage from './base/basePage';

class RecruitmentPage extends BasePage {
  get recruitmentMenu() {
    return cy.xpath('//span[text()="Recruitment"]');
  }

  get recruitmentHeader() {
    return cy.xpath('//h5[text()="Candidates"]');
  }

  get addButton() {
    return cy.xpath('//button[normalize-space()="Add"]');
  }

  get addCandidateHeader() {
    return cy.xpath('//h6[text()="Add Candidate"]');
  }

  get firstNameInput() {
    return cy.get('input[name="firstName"]');
  }

  get middleNameInput() {
    return cy.get('input[name="middleName"]');
  }

  get lastNameInput() {
    return cy.get('input[name="lastName"]');
  }

  get emailInput() {
    return cy.xpath('//label[text()="Email"]/parent::div/following-sibling::div//input');
  }

  get saveButton() {
    return cy.xpath('//button[normalize-space()="Save"]');
  }

  get successMessage() {
    return cy.xpath('//div[contains(@class,"oxd-toast-content")]');
  }

  get candidateProfileHeader() {
    return cy.xpath('//label[text()="Name"]/parent::div/following-sibling::div//p');
  }

  get searchButton() {
    return cy.xpath('//button[normalize-space()="Search"]');
  }

  get candidateTableBody() {
    return cy.xpath('//div[@class="oxd-table-body"]');
  }

  get editButton() {
    return cy.xpath('//span[contains(@class,"oxd-switch-input oxd-switch-input--active --label-left")]');
  }

  get confirmDeleteButton() {
    return cy.xpath('//button[normalize-space()="Yes, Delete"]');
  }

  navigateToRecruitment() {
    this.click(this.recruitmentMenu);
  }

  clickOnAddButton() {
    this.click(this.addButton);
    this.addCandidateHeader.should('be.visible');
  }

  fillCandidateForm(candidate) {
    this.type(this.firstNameInput, candidate.firstName);
    this.type(this.middleNameInput, candidate.middleName);
    this.type(this.lastNameInput, candidate.lastName);
    this.type(this.emailInput, candidate.email);
  }

  clickSaveCandidateButton() {
    this.click(this.saveButton);
  }

  clickOnCandidateList() {
    this.click(this.recruitmentMenu);
    this.searchButton.should('be.visible');
  }

  clickEditCandidateButton() {
    this.click(this.editButton);
  }

  clickViewIconByCandidateName(candidateName) {
    this.click(
      cy.xpath(`//div[contains(normalize-space(text()),'${candidateName}')]/parent::div/following-sibling::div[4]//button[1]`)
    );
  }

  clickDeleteIconByCandidateName(candidateName) {
    this.click(
      cy.xpath(`//div[contains(normalize-space(text()),'${candidateName}')]/parent::div/following-sibling::div[4]//button[2]`)
    );
  }

  clickConfirmDeleteButton() {
    this.click(this.confirmDeleteButton);
  }
}

export const recruitmentPage = new RecruitmentPage();
