
export class User {
//We changed from id: number = 0; to id!: number in order not to initialise the id value on 0 during POST and PUT requests,
// and make it null instead.
//We changed from id!: number to id: number = 0 to hide the password field when editing a user, and showing it only when creating
//a new one.
  id: number = 0;
  name!: string;
  lastName!: string;
  email!: string;
  username!: string;
  password!: string;

}
