import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';

// For Admins
import AdminUserController from './resources/user/admin/admin.user.controller';
import ClientController from './resources/client/client.controller';
import BranchController from './resources/branch/branch.controller';
import GroupController from './resources/group/group.controller';
import CertificationController from './resources/certification/certification.controller';

// For Users
import UserController from '@/resources/user/user.controller';


validateEnv();

const app = new App(
    [
        // For Admins
        new AdminUserController(),
        new ClientController(),
        new BranchController(),
        new GroupController,
        new CertificationController(),

        // For Users
        new UserController(),
    ],
    Number(process.env.PORT)
);

app.listen();
