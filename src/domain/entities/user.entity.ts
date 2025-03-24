export class User {
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public password: string,
    public verified: boolean = false,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    if (!name || !email || !password) {
      throw new Error('Name, email and password are required');
    }

    this.createdAt = createdAt ? createdAt : new Date();
    this.updatedAt = updatedAt ? updatedAt : new Date();
  }
}
