import BasePage from "../base/basePage";

const changeProfilePictureTitle = `h6.orangehrm-main-title`;
const profilePicture = `div[class*='orangehrm-edit-employee-image'] img`
const addProfilePictureButton = `input[type="file"].oxd-file-input`;
const saveButton = `button[type="submit"].oxd-button--medium.oxd-button--secondary`;
const employeeImage = `.orangehrm-edit-employee-image .employee-image`;
const headerUserDropdown = `div[class*='header-userarea'] .oxd-userdropdown`;
const headerProfileImage = `div[class*='header-userarea'] .oxd-userdropdown img`;

class MyInfoPage extends BasePage {

    clickSaveButton() {
        cy.get(saveButton).click();
    }

    clickOnProfilePicture() {
        cy.get(profilePicture).click();
        cy.waitUntilElementToBeInvisible(this.spinner)
    }

    uploadProfilePicture(filePath) {
        cy.get(addProfilePictureButton).selectFile(filePath, { force: true });
    }

    getChangeProfilePictureTitle() {
        return cy.get(changeProfilePictureTitle).invoke('text');
    }

    getEmployeeProfileImage() {
        return cy.get(employeeImage).invoke('attr', 'src');
    }

    getHeaderProfileImage() {
        cy.get(headerUserDropdown).click();
        return cy.get(headerProfileImage).invoke('attr', 'src');
    }

    isProfilePictureSectionDisplayed() {
        return cy.isElementDisplayed(profilePicture)
    }

    isProfileImageUpdated() {
        cy.get(employeeImage).should('not.have.attr', 'src', '/web/images/default-photo.png');
    }
}
export default new MyInfoPage();
