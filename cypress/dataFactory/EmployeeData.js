const { faker } = require('@faker-js/faker')
import EmployeeDetails from '../dataObject/employeeDetails'

class EmployeeData {
  static getEmployeeData() {
    const employeeDetails = new EmployeeDetails()
    employeeDetails.firstName = faker.person.firstName()
    employeeDetails.middleName = faker.person.middleName()
    employeeDetails.lastName = faker.person.lastName()
    employeeDetails.employeeId = faker.number.int({ min: 100, max: 9999 })
    employeeDetails.createLoginDetails = true
    employeeDetails.username = faker.internet.username().toLowerCase()
    employeeDetails.password = 'Password@123'
    return employeeDetails
  }
}
export default EmployeeData
