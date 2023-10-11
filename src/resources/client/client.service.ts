// Import Users Resources For Stable Work
import ClientModel from '@/resources/client/client.model';

// Import Branchs Resources For Stable Work
import BranchModel from '@/resources/branch/branch.model';

// Import Groups Resources For Stable Work
import GroupModel from '@/resources/group/group.model';

// Import Student Groups Resources For Stable Work
import StudentGroupModel from '@/resources/studentGroup/studentGroup.model';


// Нужно сделать:
// 1. Добавление Клиента в группу
// 2. Удаление Клиента из группы
// 3. Отмечать Клиентов в группе на тех, кто пришел или не пришел на занятия

// Create Client Service
class ClientService {
    private client = ClientModel;
    private group = GroupModel;
    private branch = BranchModel;
    private studentGroup = StudentGroupModel;

    /**
     * Register a new user for agent
     */
    public async create(
        // Required Data
        fullname: string,
        branch: string | object,
        group: string | object,
        dateBirth: Date,
        clientStatus: string,

        // Optional Data
        firstName: string,
        firstPhoneNumber: string,
        secondName: string,
        secondPhoneNumber: string,
        gender: string,
        weight: string,
        gip: string,
        rank: string,
        certificateFrom: Date,
        insuranceUpTo: Date,
        athletePassport: string,
        userId: string | object,

        // Additional Data
        comment: string,
    ): Promise<string | Error> {
        try {
            const branchExists = await this.branch.findOne({ _id: branch });
            
            if (!branchExists) {
                throw new Error('Branch not found!');
            }

            const groupExists = await this.group.findOne({ _id: group });

            if (!groupExists) {
                throw new Error('Group not found!');
            }

            if (!branchExists.groups.includes(groupExists._id)) {
                throw new Error('Group not found!');
            }

            // If the User's Phone Number is not busy, then create a new User. Adding a User role
            const client = await this.client.create({
                // Required Data
                fullname,
                branch: branchExists._id,
                group: groupExists._id,
                dateBirth,
                clientStatus,

                // Optional Data
                firstName,
                firstPhoneNumber,
                secondName,
                secondPhoneNumber,
                gender,
                weight,
                gip,
                rank,
                certificateFrom,
                insuranceUpTo,
                athletePassport,
                userId,

                // Additional Data
                comment,
            });

            await this.group.findOneAndUpdate(
                { _id: groupExists._id },
                {
                    $addToSet: {
                        students: client._id
                    }
                }
            );

            // If everything is successful, 
            // then return the access token to the User Profile
            return "Клиент успешно зарегистрирован!"
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }

    /**
     * Get all users
     */
     public async getClients(): Promise<string | object | Error> {
        try {
            // Accessing the Database to Get All Clients
            const clients = await this.client.find({}).populate('userId branch group', '-password');

            // Checking if there are clients in the database
            if (!clients) {
                throw new Error('Clients Not Found!');
            }

            // If successful, we return Clients
            return clients;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get user by ID
     */
    public async getClientById(
        clientId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a client by ID in the database
            const client = await this.client.findOne({ _id: clientId }).populate('userId branch groups', '-password');

            // Checking if a client exists in the database
            if (!client) {
                throw new Error('Client Not Found!');
            }

            // If successful, return the client
            return client;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search users
     */
    public async findClients(content: string): Promise<string | object | Error> {
        try {
            // Created a regular expression to search for keywords
            const keywordRegExp = new RegExp(content, "i");

            // Accessing the Database to Get All Clients
            // For the fields:
            // name, lastname, email, roles
            // We substitute the value of the regular expression 
            // so that you can find Clients by the entered content
            const clients = await this.client.find({ $or: [
                { fullname: keywordRegExp },
                { clientStatus: keywordRegExp },
            ]}).populate('userId branch groups', '-password');

            // Checking if there are clients in the database
            if (!clients) {
                throw new Error('Clients Not Found!');
            }

            // If successful, we return clients
            return clients;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update Information For client by ID
     */
    public async updateClient(
        clientId: object | string,
        // Required Data
        fullname: string,
        branch: string | object,
        group: string | object,
        dateBirth: Date,
        clientStatus: string,

        // Optional Data
        firstName: string,
        firstPhoneNumber: string,
        secondName: string,
        secondPhoneNumber: string,
        gender: string,
        weight: string,
        gip: string,
        rank: string,
        certificateFrom: Date,
        insuranceUpTo: Date,
        athletePassport: string,
        userId: string | object,

        // Additional Data
        comment: string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a client by ID in the database
            // 1. Добавление Клиента в группу и филиал

            const branchExists = await this.branch.findOne({ _id: branch });
            
            if (!branchExists) {
                throw new Error('Branch not found!');
            }

            const groupExists = await this.group.findOne({ _id: group });

            if (!groupExists) {
                throw new Error('Group not found!');
            }

            if (!branchExists.groups.includes(groupExists._id)) {
                throw new Error('Group not found!');
            }

            const client = await this.client.findOne({ _id: clientId });

            // Checking if a client exists in the database
            if (!client) {
                throw new Error('Client Not Found!');
            }

            // For custom fields that we need to update,
            // we create a separate object where we add them.
            const clientFields = {
                // Required Data
                fullname,
                branch: branchExists._id,
                group: groupExists._id,
                dateBirth,
                clientStatus,

                // Optional Data
                firstName,
                firstPhoneNumber,
                secondName,
                secondPhoneNumber,
                gender,
                weight,
                gip,
                rank,
                certificateFrom,
                insuranceUpTo,
                athletePassport,
                userId,

                // Additional Data
                comment,
            };

            // If we want to change any of the fields or all fields,
            // then we update those fields that passed in the request body
            if (clientFields) {
                // Client Update
                await this.client.updateOne(
                    { _id: client._id },
                    {
                        $set: clientFields
                    }
                );
            }
            
            // Search for updated client
            const clientUpdate = await this.client.findOne({ _id: client._id });
            
            // Return updated client
            return clientUpdate;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete client by ID
     */
    public async deleteClient(
        clientId: object | string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a client by ID in the database
            const client = await this.client.findOne({ _id: clientId });

            // Checking if a client exists in the database
            if (!client) {
                throw new Error('Client Not Found!');
            }

            // If we have found the Client we want to delete in the database,
            // then we delete it from the database
            await this.client.deleteOne({ _id: clientId });

            // In case of successful deletion, 
            // we return the response as a string: Client with ID Deleted
            return `Client with ${clientId} Deleted`;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default ClientService;
