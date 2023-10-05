// Import Competitions Resources For Stable Work
import CompetitionsModel from '@/resources/competitions/competitions.model';

// Import Competitions Student Resources For Stable Work
import CompetitionsStudentModel from '@/resources/competitions/competitionsStudent/competitionsStudent.model';

// Import Clients Resources For Stable Work
import ClientModel from '@/resources/client/client.model';

// Create Competitions Service
class CompetitionsService {
    private competitions = CompetitionsModel;
    private competitionsStudent = CompetitionsStudentModel;
    private client = ClientModel;

    /**
     * Create a new competitions
     */
    public async create(
        // Required Data
        name: string,
        dateFrom: Date,
        dateTo: Date,

        // Additional Data
        comment: string,
    ): Promise<string | object | Error> {
        try {
            const competitions = await this.competitions.create({
                // Required Data
                name,
                dateFrom,
                dateTo,

                // Additional Data
                comment,
            });

            return competitions;
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }

    /**
     * Get all competitions
     */
     public async getCompetitions(): Promise<string | object | Error> {
        try {
            // Accessing the Database to Get All Competitions
            const competitions = await this.competitions.find({}).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });

            // Checking if there are competitions in the database
            if (!competitions) {
                throw new Error('Competitions Not Found!');
            }

            // If successful, we return competitionss
            return competitions;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get competitions by ID
     */
    public async getCompetitionsById(
        competitionsId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a Competitions by ID in the database
            const competitions = await this.competitions.findOne({ _id: competitionsId }).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });

            // Checking if a group exists in the database
            if (!competitions) {
                throw new Error('Competitions Not Found!');
            }

            // If successful, return the Competitions
            return competitions;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get competitions students by ID
     */
    public async getCompetitionsStudentsById(
        competitionsId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a Competitions by ID in the database
            const competitionsStudents = await this.competitionsStudent.find({ competitions: competitionsId }).populate('client');

            // Checking if a competitions exists in the database
            if (!competitionsStudents) {
                throw new Error('Competitions Students Not Found!');
            }

            // If successful, return the competitions
            return competitionsStudents;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Add students to competitions by ID
     */
    public async addStudents(
        competitionsId: string | object,
        // Required Data
        client: string | object,
        disciplines: string,

        // Additional Data
        comment: string,
    ): Promise<string | object | null | Error> {
        try {
            const competitions = await this.competitions.findOne({ _id: competitionsId });

            if (!competitions) {
                throw new Error('Competitions not found!');
            }

            const clientExists = await this.client.findOne({ _id: client });

            if (!clientExists) {
                throw new Error('Client not found!');
            }

            const competitionsStudent = await this.competitionsStudent.create({
                // Required Data
                competitions: competitions._id,
                client: clientExists._id,
                disciplines,

                // Additional Data
                comment,
            });

            await this.competitions.findOneAndUpdate(
                { _id: competitions._id },
                {
                    $addToSet: {
                        students: competitionsStudent._id
                    }
                }
            );

            return competitionsStudent.populate({
                path: 'client'
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search Competitions
     */
    public async findCompetitions(content: string): Promise<string | object | Error> {
        try {
            // Created a regular expression to search for keywords
            const keywordRegExp = new RegExp(content, 'i');

            const competitions = await this.competitions.find({ $or: [
                { name: keywordRegExp }
            ]}).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });

            // Checking if there are competitions in the database
            if (!competitions) {
                throw new Error('Competitions Not Found!');
            }

            // If successful, we return competitions
            return competitions;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update Information For competitions by ID
     */
    public async updateCompetitions(
        competitionsId: object | string,
        // Required Data
        name: string,
        dateFrom: Date,
        dateTo: Date,

        // Additional Data
        comment: string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a competitions by ID in the database
            const competitions = await this.competitions.findOne({ _id: competitionsId });

            // Checking if a competitions exists in the database
            if (!competitions) {
                throw new Error('Competitions Not Found!');
            }

            // For custom fields that we need to update,
            // we create a separate object where we add them.
            const competitionsFields = {
                // Required Data
                name,
                dateFrom,
                dateTo,

                // Additional Data
                comment,
            };

            // If we want to change any of the fields or all fields,
            // then we update those fields that passed in the request body
            if (competitionsFields) {
                // Group Update
                await this.competitions.updateOne(
                    { _id: competitions._id },
                    {
                        $set: competitionsFields
                    }
                );
            }
            
            // Search for updated competitions
            const competitionsUpdate = await this.competitions.findOne({ _id: competitions._id }).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });
            
            // Return updated competitions
            return competitionsUpdate;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete competitions by ID
     */
    public async deleteCompetitions(
        competitionsId: object | string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a Competitions by ID in the database
            const competitions = await this.competitions.findOne({ _id: competitionsId });

            // Checking if a Competitions exists in the database
            if (!competitions) {
                throw new Error('Competitions Not Found!');
            }

            // If we have found the competitions we want to delete in the database,
            // then we delete it from the database
            await this.competitions.deleteOne({ _id: competitionsId });

            // In case of successful deletion, 
            // we return the response as a string: Competitions with ID Deleted
            return `Competitions with ${competitionsId} Deleted`;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default CompetitionsService;
