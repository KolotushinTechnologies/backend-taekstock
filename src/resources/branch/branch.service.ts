// Import Users Resources For Stable Work
import BranchModel from '@/resources/branch/branch.model';

// Create Branch Service
class BranchService {
    private branch = BranchModel;

    /**
     * Create a new branch
     */
    public async create(
        // Required Data
        name: string,
        typeRent: string,
        priceRent: string | number,

        // Additional Data
        comment: string,
    ): Promise<string | Error> {
        try {
            const branch = await this.branch.create({
                // Required Data
                name,
                typeRent,
                priceRent,

                // Additional Data
                comment,
            });

            return "Филиал успешно создан!"
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }

    /**
     * Get all branch
     */
     public async getBranchs(): Promise<string | object | Error> {
        try {
            // Accessing the Database to Get All Branchs
            const branchs = await this.branch.find({});

            // Checking if there are branchs in the database
            if (!branchs) {
                throw new Error('Branchs Not Found!');
            }

            // If successful, we return Branchs
            return branchs;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get branch by ID
     */
    public async getBranchById(
        branchId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a branch by ID in the database
            const branch = await this.branch.findOne({ _id: branchId });

            // Checking if a branch exists in the database
            if (!branch) {
                throw new Error('Branch Not Found!');
            }

            // If successful, return the branch
            return branch;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search branchs
     */
    public async findBranchs(content: string): Promise<string | object | Error> {
        try {
            // Created a regular expression to search for keywords
            const keywordRegExp = new RegExp(content, "i");

            const branchs = await this.branch.find({ $or: [
                { name: keywordRegExp },
                { typeRent: keywordRegExp },
                { priceRent: keywordRegExp },
            ]});

            // Checking if there are branchs in the database
            if (!branchs) {
                throw new Error('Branchs Not Found!');
            }

            // If successful, we return branchs
            return branchs;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update Information For branch by ID
     */
    public async updateBranch(
        branchId: object | string,
        // Required Data
        name: string,
        typeRent: string,
        priceRent: string | number,

        // Additional Data
        comment: string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a branch by ID in the database
            const branch = await this.branch.findOne({ _id: branchId });

            // Checking if a branch exists in the database
            if (!branch) {
                throw new Error('Branch Not Found!');
            }

            // For custom fields that we need to update,
            // we create a separate object where we add them.
            const branchFields = {
                // Required Data
                name,
                typeRent,
                priceRent,

                // Additional Data
                comment,
            };

            // If we want to change any of the fields or all fields,
            // then we update those fields that passed in the request body
            if (branchFields) {
                // Branch Update
                await this.branch.updateOne(
                    { _id: branch._id },
                    {
                        $set: branchFields
                    }
                );
            }
            
            // Search for updated branch
            const branchUpdate = await this.branch.findOne({ _id: branch._id });
            
            // Return updated branch
            return branchUpdate;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete branch by ID
     */
    public async deleteBranch(
        branchId: object | string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a branch by ID in the database
            const branch = await this.branch.findOne({ _id: branchId });

            // Checking if a branch exists in the database
            if (!branch) {
                throw new Error('Branch Not Found!');
            }

            // If we have found the branch we want to delete in the database,
            // then we delete it from the database
            await this.branch.deleteOne({ _id: branchId });

            // In case of successful deletion, 
            // we return the response as a string: branch with ID Deleted
            return `Branch with ${branchId} Deleted`;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default BranchService;
