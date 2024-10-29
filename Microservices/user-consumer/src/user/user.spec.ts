import { User } from '../models/user';

describe('User', () => {
  it('should be defined', () => {
    expect(new User()).toBeDefined();
  });
});
