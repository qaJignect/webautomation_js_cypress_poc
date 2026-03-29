import loginPage from '../../pages/login/loginPage.js';
import sideMenuPage from '../../pages/sideMenuPage.js';
import sideMenuOptions from '../../enum/sideMenu/sideMenuOptions.js';
import personalDetailsPage from '../../pages/pim/personalDetails/personalDetailsPage.js';
import commonTexts from '../../support/constants/commonTexts.js';
import EmployeeData from '../../dataFactory/EmployeeData.js';
const { faker } = require('@faker-js/faker')

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

describe('My Info - Personal Details Tests', () => {

    it('Verify that personal details can be updated on the My Info page and changes are saved correctly', () => {

        const employeeData = EmployeeData.getEmployeeData();
        const drivinLecence = faker.string.alphanumeric(15);

        cy.log('User navigates to the My Info page');
        sideMenuPage.clickOnSideMenuOptions(sideMenuOptions.MY_INFO);

        cy.log('User updates the personal details');
        personalDetailsPage.enterFirstName(employeeData.firstName);
        personalDetailsPage.enterMiddleName(employeeData.middleName);
        personalDetailsPage.enterLastName(employeeData.lastName);
        personalDetailsPage.enterDriversLicense(drivinLecence)
        personalDetailsPage.selectNationality()

        cy.log('User clicks on the Save button');
        personalDetailsPage.clickSaveButton();

        cy.log('Verify toast success message is displayed.');
        personalDetailsPage.getToastSuccessTitle().should('eq', commonTexts.toastSuccessTitle);
        personalDetailsPage.getToastSuccessMessage().should('eq', commonTexts.toastSuccessMessage);

        cy.log('Verify the personal details are saved correctly');
        personalDetailsPage.getEmployeeName().then((firstName) => {
            expect(firstName).to.eq(employeeData.firstName);
        });
        personalDetailsPage.getMiddleName().then((middleName) => {
            expect(middleName).to.eq(employeeData.middleName);
        });
        personalDetailsPage.getLastName().then((lastName) => {
            expect(lastName).to.eq(employeeData.lastName);
        });
    });
});
