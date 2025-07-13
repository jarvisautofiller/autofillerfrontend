class UserModel {
    constructor(user) {
      
      this.phoneNumber = user.phoneNumber || '';
      this.password = user.password || '';
    }
  }
  export default UserModel;