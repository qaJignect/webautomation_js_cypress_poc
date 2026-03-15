class EmployeeDataFactory {
  static getEmployeeData() {
    const timestamp = Date.now();
    const employee = {
      firstName: `FirstName${timestamp}`,
      middleName: `MiddleName${timestamp}`,
      lastName: `LastName${timestamp}`,
      employeeId: `${timestamp}`,
      createLoginDetails: true,
      username: `empuser${timestamp}`,
      password: 'Password@123'
    };
    return employee;
  }
}
export default EmployeeDataFactory;
