import loginPage from '../../pages/login/loginPage.js';
import sideMenuPage from '../../pages/sideMenuPage.js';
import sideMenuOptions from '../../enum/sideMenu/sideMenuOptions.js';
import myInfoPage from '../../pages/myInfo/myInfoPage.js';
import commonTexts from '../../support/constants/commonTexts.js';
import applicationUrls from '../../support/constants/applicationUrls.js';

let adminLoginData;

before(function () {
    cy.fixture('login/login').then(function (data) {
        adminLoginData = data.find(item => item.type === 'validUser');
    });
});

beforeEach(() => {
    loginPage.visitLoginPage();
    loginPage.enterLoginDetails(adminLoginData);
    loginPage.clickOnLoginButton();
});

describe('My Info - Profile Picture Tests', { tags: ['MyInfo', 'ProfilePicture'] }, () => {

    it('Verify that users can add or update their profile picture in the My Info section', () => {
        cy.log('User navigates to the My Info page');
        sideMenuPage.clickOnSideMenuOptions(sideMenuOptions.MY_INFO);

        cy.log('My Info page should be displayed');
        cy.url().should('eq', applicationUrls.myInfoPage);

        cy.log('Change Profile Picture section should get visible');
        myInfoPage.clickOnProfilePicture()
        myInfoPage.getChangeProfilePictureTitle().should('eq', commonTexts.changeProfilePicture);

        cy.log('User clicks on the profile picture and uploads a new image');
        const profilePicturePath = 'cypress/testData/profilePicture/testProfile.jpg';
        myInfoPage.uploadProfilePicture(profilePicturePath);

        cy.log('User clicks on the Save button');
        myInfoPage.clickSaveButton();

        cy.log('Verify toast success message is displayed');
        myInfoPage.getToastSuccessTitle().should('eq', commonTexts.toastSuccessTitle);
        myInfoPage.getToastSuccessMessage().should('eq', commonTexts.toastSuccessMessage);

        cy.log('Profile picture should get updated in the My Info page');
        myInfoPage.isProfileImageUpdated();

        cy.log('Profile picture should get updated in the Account Menu tab placed at the top right corner');
        myInfoPage.getEmployeeProfileImage().then((myInfoImageSrc) => {
            myInfoPage.getHeaderProfileImage().then((headerImageSrc) => {
                expect(headerImageSrc).to.include('pim/viewPhoto');
                expect(myInfoImageSrc).to.include('pim/viewPhoto');
            });
        });
    });
});
