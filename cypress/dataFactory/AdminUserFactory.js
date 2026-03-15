import AdminUserDetails from '../dataObject/AdminUserData';

class AdminUserDataFactory {
  static getAdminUserData() {
    const timestamp = Date.now();
    const adminUserDetails = new AdminUserDetails();
    adminUserDetails.userRole = 'Admin';
    adminUserDetails.employeeName = 'a';
    adminUserDetails.status = 'Enabled';
    adminUserDetails.username = `sysuser${timestamp}`;
    adminUserDetails.password = 'Password@123';
    adminUserDetails.confirmPassword = 'Password@123';
    return adminUserDetails;
  }
}
export default AdminUserDataFactory;

