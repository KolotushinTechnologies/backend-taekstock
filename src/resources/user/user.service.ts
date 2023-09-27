// Import Engine
import bcrypt from 'bcrypt';

// Import Users Resources For Stable Work
import UserModel from '@/resources/user/user.model';

// Import Roles Resources For Stable Work
import RoleModel from "@/resources/role/role.model";

// Import Utils
import token from '@/utils/token';
import { generateCode } from '@/utils/generateCode';

// Create User Service
class UserService {
    private user = UserModel;
    private role = RoleModel;

    /**
     * Register a new user
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
        city: string
    ): Promise<string | Error> {
        try {
            // We are looking for the role of the User for future assignment
            const roleUser: any = await this.role.findOne({ value: 'User' });

            // If there are no roles in the database, then create a user role
            if (!roleUser) {
                await this.role.create({
                    value: 'User',
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

            // If the User's Phone Number is not busy, then create a new User. Adding a User role
            const user = await this.user.create({
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

                roles: [roleUser.value],
            });

            // Based on the Data created for the User, 
            // we create an access token to the User's account
            const accessToken = token.createToken(user);

            // If everything is successful, 
            // then return the access token to the User Profile
            return accessToken;
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        username: string,
        password: string
    ): Promise<string | Error> {
        try {
            // User search by Phone Number
            const user = await this.user.findOne({ username });

            // If the User with such mail does not exist, then we return an error
            if (!user) {
                throw new Error('Server Error');
            }

            // We check if the User entered the correct password, 
            // which matches the password in the database
            if (await user.isValidPassword(password)) {
                // If the password is correct, 
                // then we return a new access token to the User Profile
                return token.createToken(user);
            } else {
                // If the password is incorrect, then we return an error.
                throw new Error('Something went wrong...');
            }
        } catch (error) {
            // Server Error
            throw new Error('Unable to login user');
        }
    }

    /**
     * Forgot Password. |TODO: Will this functionality exist?|
     */
    public async forgotPassword(
        phoneNumber: string
    ): Promise<string | Error> {
        try {
            const userCreator = await this.user.findOne({ phoneNumber: phoneNumber });

            if (!userCreator) {
                throw new Error('Please Try Again!');
            }

            const code = generateCode();

            await this.user.updateOne(
                { phoneNumber: phoneNumber },
                {
                    $set: { secretCode: code }
                }
            );

            return "Please, check the Email! MProject has sent you a verification code!"
        } catch (error: any) {
            // Server Error
            throw new Error('Unable to change password');
        }
    }

    /**
     * Change Password. |TODO: Will this functionality exist?|
     */
     public async changePassword(
        phoneNumber: string,
        secretCode: string,
        newPassword: string
    ): Promise<string | Error> {
        try {
            const userCreator = await this.user.findOne({ phoneNumber: phoneNumber });

            if (!userCreator) {
                throw new Error('Please Try Again!');
            }

            if (secretCode !== userCreator.secretCode) {
                throw new Error('Wrong credentials given')
            }

            const hashPassword = await bcrypt.hash(newPassword, 10);

            await this.user.updateOne(
                { phoneNumber: userCreator.phoneNumber },
                {
                    // TODO: Generate Any Numbers
                    $set: {
                        secretCode: null,
                        password: hashPassword
                    }
                }
            );

            return token.createToken(userCreator);
        } catch (error: any) {
            // Server Error
            throw new Error('Unable to change password');
        }
    }

    /**
     * Change Password For Profile. |TODO: Will this functionality exist?|
     */
     public async changePasswordForProfile(
        userId: string | object,
        newPassword: string,
        confirmNewPassword: string,
    ): Promise<string | object | null | Error> {
        try {
            // We are looking for the User in the Database 
            // (Determining if he is the owner of the Profile?)
            const user = await this.user.findOne({ _id: userId });

            // If we did not find the User in the database, then we give an error
            if (!user) {
                throw new Error('Something went wrong...');
            }

            // Check if the entered new passwords match
            // If not, then we return an error.
            if (newPassword !== confirmNewPassword) {
                throw new Error('Passwords do not match!');
            }

            // If the entered passwords match, then create a new hash
            // So we encrypt the password in the database
            const hashPassword = await bcrypt.hash(confirmNewPassword, 10);

            // Update the password in the database
            await this.user.updateOne(
                { phoneNumber: user.phoneNumber },
                {
                    $set: {
                        password: hashPassword
                    }
                }
            );

            // If successful, we find the updated User in the database
            const updatedUser = await this.user.findOne({ _id: user._id });

            // If we found an Updated User, then we return it to the User
            return updatedUser;
        } catch (error: any) {
            // Server Error
            throw new Error('Unable to change password');
        }
    }

    /**
     * Update My Profile (For Authorized User)
     */
     public async updateMyProfile(
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

        // Additional Data
        comment: string,

        statusChangeFile: any,

        images: any,
        req: any,
    ): Promise<string | object | null | Error> {
        try {
            // We are looking for the User in the Database 
            // (Determining if he is the owner of the Profile?)
            const user = await this.user.findOne({ _id: userId });

            // If we did not find the User in the database, then we give an error
            if (!user) {
                throw new Error('Something went wrong...');
            }

            // We are looking for a User with the same Email that was specified in the request body
            const userPhoneNumber = await this.user.findOne({ _id: { $ne: user._id }, phoneNumber });

            // If the User with such phone number already exists, then we display an error
            if (userPhoneNumber) {
                throw new Error('User Phone Number already exists!');
            }

            // We are looking for a User with the same Email that was specified in the request body
            const usernameIsExist = await this.user.findOne({ _id: { $ne: user._id }, username });

            // If the User with such phone number already exists, then we display an error
            if (usernameIsExist) {
                throw new Error('Username already exists!');
            }

            // All fields from the request body, 
            // the values of which we want to update for the database in the fields of the User, 
            // are added to one object
            const userFields: any = {
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

                // Additional Data
                comment,
            };

            if (Boolean(statusChangeFile) === false && images === undefined) {
                userFields.images = [];
            }

            if (images && Boolean(statusChangeFile) === true) {
                // Link generation for subsequent access to the product's image
                const fileLinks = images.map((file: any) => `${req.protocol}://${req.headers.host
                }/files/images/attachments/${file.path.split("\\").pop()}`);

                console.log("fileLinks: ", fileLinks);

                userFields.images = fileLinks.map((link: any) => link.split("/src/public/files/images/attachments/").join("/"));
            }

            // Update all entered fields in the request body in the database for the user
            if (userFields) {
                await this.user.updateOne(
                    { _id: user._id },
                    {
                        $set: userFields
                    }
                );
            }
            
            // If successful, we find the updated User in the database
            const updatedUser = await this.user.findOne({ _id: user._id }).select('-password');

            // If we found an Updated User, then we return it to the User
            return updatedUser;
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }
}

export default UserService;
