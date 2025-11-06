
export class User {
//We changed from id: number = 0; to id!: number in order not to initialise the id value on 0 during POST and PUT requests,
// and make it null instead.
  id!: number;
  name!: string;
  lastName!: string;
  email!: string;
  username!: string;
  password!: string;

}
