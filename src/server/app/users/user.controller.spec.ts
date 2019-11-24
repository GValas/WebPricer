import { UserController } from './user.controller';
import { UsersService } from './user.service';

describe('UserController', () => {
    let userController: UserController;
    let userService: UsersService;

    beforeEach(() => {
        userService = new UsersService();
        userController = new UserController(userService);
    });

    describe('findAll', () => {
        it('should return an array of cats', async () => {
            const result = ['test'];
            jest.spyOn(userService, 'findAll').mockImplementation(() => result);

            expect(await userController.findAll()).toBe(result);
        });
    });
});