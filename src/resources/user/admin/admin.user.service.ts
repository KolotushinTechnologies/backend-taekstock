// Import Users Resources For Stable Work
import UserModel from '@/resources/user/user.model';

// Import Roles Resources For Stable Work
import RoleModel from "@/resources/role/role.model";

// Create Admin User Service
class AdminUserService {
    private user = UserModel;
    private role = RoleModel;

    /**
     * Register a new user for agent
     */
    public async register(
        // Required Data
        username: string,
        fullname: string,
        phoneNumber: string,
        status: string,
        password: string,

        // Optional Data
        email: string,
        dateBirth: string,
        gip: string,
        belt: string,
        city: string,
        comment: string
    ): Promise<string | Error> {
        try {
            // We are looking for the role of the User for future assignment
            const roleUser: any = await this.role.findOne({ value: 'User' });
            const roleInstructor: any = await this.role.findOne({ value: 'Instructor' });
            const roleSuperAdmin: any = await this.role.findOne({ value: 'SuperAdmin' });

            // If there are no roles in the database, then create a user role
            if (!roleUser) {
                await this.role.create({
                    value: 'User',
                });
            }

            if (!roleInstructor) {
                await this.role.create({
                    value: 'Instructor',
                });
            }

            if (!roleSuperAdmin) {
                await this.role.create({
                    value: 'SuperAdmin',
                });
            }

            // We find the User with the same Phone Number in the database, 
            // if there is no User with the same Phone Number in the database, 
            // then we register a new User
            const userIsExist = await this.user.findOne({ phoneNumber });

            // If the User with such Phone Number already exists, then we issue an error
            if (userIsExist) {
                throw new Error('Server Error');
            }

            const usernameIsExist = await this.user.findOne({ username });

            // If the User with such Username already exists, then we issue an error
            if (usernameIsExist) {
                throw new Error('Server Error');
            }

            if (status == 'Спортсмен' || status == 'Родитель') {
                // If the User's Phone Number is not busy, then create a new User. Adding a User role
                await this.user.create({
                    // Required Data
                    username,
                    fullname,
                    phoneNumber,
                    status,
                    password,
    
                    // Optional Data
                    email,
                    dateBirth,
                    gip,
                    belt,
                    city,
                    comment,
    
                    roles: [roleUser.value],
                });
            }

            if (status == 'Тренер' || status == 'Инструктор') {
                // If the User's Phone Number is not busy, then create a new User. Adding a User role
                await this.user.create({
                    // Required Data
                    username,
                    fullname,
                    phoneNumber,
                    status,
                    password,
    
                    // Optional Data
                    email,
                    dateBirth,
                    gip,
                    belt,
                    city,
                    comment,
    
                    roles: [roleInstructor.value],
                });
            }

            if (status == 'Админ' || status == 'Администратор' || status == 'Менеджер') {
                // If the User's Phone Number is not busy, then create a new User. Adding a User role
                await this.user.create({
                    // Required Data
                    username,
                    fullname,
                    phoneNumber,
                    status,
                    password,
    
                    // Optional Data
                    email,
                    dateBirth,
                    gip,
                    belt,
                    city,
                    comment,
    
                    roles: [roleSuperAdmin.value],
                });
            }

            // If everything is successful, 
            // then return the access token to the User Profile
            return "Пользователь успешно зарегистрирован!"
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }

    /**
     * Get all users
     */
     public async getUsers(): Promise<string | object | Error> {
        try {
            // Accessing the Database to Get All Users
            // We remove the password when accepting all Users .select('-password');
            const users = await this.user.find({}).select('-password');

            // Checking if there are users in the database
            if (!users) {
                throw new Error('Users Not Found!');
            }

            // If successful, we return Users
            return users;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get user by ID
     */
    public async getUserById(
        userId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a user by ID in the database
            // We remove the password when the User receives the Identifier .select('-password');
            const user = await this.user.findOne({ _id: userId }).select('-password');;

            // Checking if a user exists in the database
            if (!user) {
                throw new Error('User Not Found!');
            }

            // If successful, return the user
            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search users
     */
    public async findUsers(content: string): Promise<string | object | Error> {
        try {
            // Created a regular expression to search for keywords
            const keywordRegExp = new RegExp(content, "i");

            // Accessing the Database to Get All Users
            // We remove the password when accepting all Users .select('-password');
            // For the fields:
            // name, lastname, email, roles
            // We substitute the value of the regular expression 
            // so that you can find Users by the entered content
            const users = await this.user.find({ $or: [
                { username: keywordRegExp },
                { fullname: keywordRegExp },
                { phoneNumber: keywordRegExp },
                { roles: { $all: [keywordRegExp] } } 
            ]}).select('-password');

            // Checking if there are users in the database
            if (!users) {
                throw new Error('Users Not Found!');
            }

            // If successful, we return Users
            return users;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update Information For user by ID
     */
    public async updateUser(
        userId: object | string,
        // Required Data
        username: string,
        fullname: string,
        phoneNumber: string,
        status: string,
        password: string,

        // Optional Data
        email: string,
        dateBirth: string,
        gip: string,
        belt: string,
        city: string,
        comment: string
    ): Promise<string | object | null | Error> {
        try {
            // Search for a user by ID in the database
            const user = await this.user.findOne({ _id: userId });

            // Checking if a user exists in the database
            if (!user) {
                throw new Error('User Not Found!');
            }

            // We are looking for a User with the same Phone Number that was specified in the request body
            const userPhoneNumber = await this.user.findOne({ _id: { $ne: user._id }, phoneNumber });

            // If the User with such mail already exists, then we display an error
            if (userPhoneNumber) {
                throw new Error('Server Error!');
            }

            const usernameIsExist = await this.user.findOne({ _id: { $ne: user._id }, username });

            // If the User with such Username already exists, then we issue an error
            if (usernameIsExist) {
                throw new Error('Server Error');
            }

            // For custom fields that we need to update,
            // we create a separate object where we add them.
            const userFields = {
                // Required Data
                username,
                fullname,
                phoneNumber,
                status,
                password,

                // Optional Data
                email,
                dateBirth,
                gip,
                belt,
                city,
                comment,
            };

            // If we want to change any of the fields or all fields,
            // then we update those fields that passed in the request body
            if (userFields) {
                // User Update
                await this.user.updateOne(
                    { _id: user._id },
                    {
                        $set: userFields
                    }
                );
            }
            
            // Search for updated user
            // We remove the password when the User receives the Identifier .select('-password');
            const updatedUser = await this.user.findOne({ _id: user._id }).select('-password');
            
            // Return updated user
            return updatedUser;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete user by ID
     */
    public async deleteUser(
        userId: object | string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a user by ID in the database
            const user = await this.user.findOne({ _id: userId });

            // Checking if a user exists in the database
            if (!user) {
                throw new Error('User Not Found!');
            }

            // If we have found the User we want to delete in the database,
            // then we delete it from the database
            await this.user.deleteOne({ _id: userId });

            // In case of successful deletion, 
            // we return the response as a string: User with ID Deleted
            return `User with ${userId} Deleted`;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default AdminUserService;
