// Import Camps Resources For Stable Work
import CampModel from '@/resources/camps/camps.model';

// Import Camps Student Resources For Stable Work
import CampStudentModel from '@/resources/camps/campStudent/campStudent.model';

// Import Clients Resources For Stable Work
import ClientModel from '@/resources/client/client.model';

// Create Camp Service
class CampService {
    private camp = CampModel;
    private campStudent = CampStudentModel;
    private client = ClientModel;

    /**
     * Create a new camp
     */
    public async create(
        // Required Data
        name: string,

        // Additional Data
        comment: string,
    ): Promise<string | object | Error> {
        try {
            const camp = await this.camp.create({
                // Required Data
                name,

                // Additional Data
                comment,
            });

            return camp;
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }

    /**
     * Get all camps
     */
     public async getCamps(): Promise<string | object | Error> {
        try {
            // Accessing the Database to Get All Camps
            const camps = await this.camp.find({}).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });

            // Checking if there are camps in the database
            if (!camps) {
                throw new Error('Camps Not Found!');
            }

            // If successful, we return Camps
            return camps;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get camp by ID
     */
    public async getCampById(
        campId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a Camp by ID in the database
            const camp = await this.camp.findOne({ _id: campId }).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });

            // Checking if a camp exists in the database
            if (!camp) {
                throw new Error('Certification Not Found!');
            }

            // If successful, return the Camp
            return camp;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get camp students by ID
     */
    public async getCampStudentsById(
        campId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a Camp by ID in the database
            const campStudents = await this.campStudent.find({ camp: campId }).populate('client');

            // Checking if a camp exists in the database
            if (!campStudents) {
                throw new Error('Camp Students Not Found!');
            }

            // If successful, return the Camp
            return campStudents;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Add students to camp by ID
     */
    public async addStudents(
        campId: string | object,
        // Required Data
        client: string | object,
        externalClient: string,
        dateBirth: string,
        phoneNumber: string,

        // Additional Data
        comment: string,
    ): Promise<string | object | null | Error> {
        try {
            const camp = await this.camp.findOne({ _id: campId });

            if (!camp) {
                throw new Error('Camp not found!');
            }

            const clientExists = await this.client.findOne({ _id: client });

            if (!clientExists) {
                throw new Error('Client not found!');
            }

            const campStudent = await this.campStudent.create({
                // Required Data
                camp: camp._id,
                client: clientExists._id,
                externalClient,
                dateBirth,
                phoneNumber,

                // Additional Data
                comment,
            });

            await this.camp.findOneAndUpdate(
                { _id: camp._id },
                {
                    $addToSet: {
                        students: campStudent._id
                    }
                }
            );

            return campStudent.populate({
                path: 'client'
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search Camps
     */
    public async findCamps(content: string): Promise<string | object | Error> {
        try {
            // Created a regular expression to search for keywords
            const keywordRegExp = new RegExp(content, 'i');

            const camps = await this.camp.find({ $or: [
                { name: keywordRegExp }
            ]}).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });

            // Checking if there are camps in the database
            if (!camps) {
                throw new Error('Camps Not Found!');
            }

            // If successful, we return camps
            return camps;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update Information For camp by ID
     */
    public async updateCamp(
        campId: object | string,
        // Required Data
        name: string,

        // Additional Data
        comment: string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a camp by ID in the database
            const camp = await this.camp.findOne({ _id: campId });

            // Checking if a camp exists in the database
            if (!camp) {
                throw new Error('Camp Not Found!');
            }

            // For custom fields that we need to update,
            // we create a separate object where we add them.
            const campFields = {
                // Required Data
                name,

                // Additional Data
                comment,
            };

            // If we want to change any of the fields or all fields,
            // then we update those fields that passed in the request body
            if (campFields) {
                // Group Update
                await this.camp.updateOne(
                    { _id: camp._id },
                    {
                        $set: campFields
                    }
                );
            }
            
            // Search for updated camp
            const campUpdate = await this.camp.findOne({ _id: camp._id }).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });
            
            // Return updated camp
            return campUpdate;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete camp by ID
     */
    public async deleteCamp(
        campId: object | string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a Camp by ID in the database
            const camp = await this.camp.findOne({ _id: campId });

            // Checking if a Camp exists in the database
            if (!camp) {
                throw new Error('Camp Not Found!');
            }

            // If we have found the camp we want to delete in the database,
            // then we delete it from the database
            await this.camp.deleteOne({ _id: campId });

            // In case of successful deletion, 
            // we return the response as a string: Camp with ID Deleted
            return `Camp with ${campId} Deleted`;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default CampService;
