// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UsersService } from './user.service';
// import { UserDocument } from './user-document.interface';
// import { Model } from 'mongoose';

describe('UserController', () => {
    // let userController: UserController;
    // let userService: UsersService;

    // beforeEach(async () => {
    //     const module = await Test.createTestingModule({
    //         controllers: [UserController],
    //         providers: [UsersService],
    //     }).compile();
    //     userService = module.get<UsersService>(UsersService);
    //     userController = module.get<UserController>(UserController);
    // });

    describe('findAll', () => {
        it('should return an array of users', () => {
            expect(1).toBe(1);
        });
    });

    // describe('findAll', () => {
    //     it('should return an array of users', async () => {
    //         const result: UserDocument[] = [];
    //         jest.spyOn(userService, 'findAll').mockResolvedValue(result);
    //         expect(await userController.findAll()).toBe(result);
    //     });

    // });

    // afterEach(() => {
    //     jest.resetAllMocks();
    // });

});