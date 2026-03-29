const baseURL = `https://opensource-demo.orangehrmlive.com/web/index.php`;

export const ApplicationUrls = {

  //Login
  login: `${baseURL}/auth/login`,

  //Employees
  subUnits: `${baseURL}/api/v2/dashboard/employees/subunit`,

  //Dashboard
  dashboard: `${baseURL}/dashboard/index`,

  //Admin
  saveSystemUser: `${baseURL}/admin/saveSystemUser`,

  //employees
  getEmployee: `${baseURL}/api/v2/pim/employees`,

  //PersonalDetails
  personalDetails: `${baseURL}/api/v2/pim/employees/7/personal-details`,

  //MyInfo
  myInfoPage: `${baseURL}/pim/viewPersonalDetails/empNumber/7`

}
export default ApplicationUrls;