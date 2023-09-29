// Import Groups Resources For Stable Work
import GroupModel from '@/resources/group/group.model';

// Import Branchs Resources For Stable Work
import BranchModel from '@/resources/branch/branch.model';

// Import Users Resources For Stable Work
import UserModel from '@/resources/user/user.model';

// Create Branch Service
class GroupService {
    private group = GroupModel;
    private branch = BranchModel
    private user = UserModel;

    /**
     * Create a new group
     */
    public async create(
        // Required Data
        branch: string | object,
        name: string,
        coach: string | number,
        timetable: string[] | string,
        potential: string,

        // Additional Data
        comment: string,
    ): Promise<string | object | Error> {
        try {
            const branchExists = await this.branch.findOne({ _id: branch });

            if (!branchExists) {
                throw new Error('Филиал не найден!');
            }

            const coachExists = await this.user.findOne({ _id: coach });

            if (!coachExists) {
                throw new Error('Инструктор не найден!');
            }

            const group = await this.group.create({
                // Required Data
                branch: branchExists._id,
                name,
                coach: coachExists._id,
                timetable, // Нужно продумать логику посещений
                potential,

                // Additional Data
                comment,
            });

            await this.branch.findOneAndUpdate(
                { _id: branchExists._id },
                {
                    $addToSet: {
                        groups: group._id
                    }
                }
            );

            return group;
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }

    /**
     * Get all groups
     */
     public async getGroups(): Promise<string | object | Error> {
        try {
            // Accessing the Database to Get All Groups
            const groups = await this.group.find({});

            // Checking if there are groups in the database
            if (!groups) {
                throw new Error('Groups Not Found!');
            }

            // If successful, we return Branchs
            return groups;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get group by ID
     */
    public async getGroupById(
        groupId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a Group by ID in the database
            const group = await this.group.findOne({ _id: groupId });

            // Checking if a group exists in the database
            if (!group) {
                throw new Error('Group Not Found!');
            }

            // If successful, return the group
            return group;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search groups
     */
    public async findGroups(content: string): Promise<string | object | Error> {
        try {
            // Created a regular expression to search for keywords
            const keywordRegExp = new RegExp(content, "i");

            const groups = await this.group.find({ $or: [
                { name: keywordRegExp },
                { potential: keywordRegExp },
            ]});

            // Checking if there are groups in the database
            if (!groups) {
                throw new Error('Groups Not Found!');
            }

            // If successful, we return groups
            return groups;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update Information For group by ID
     */
    public async updateGroup(
        groupId: object | string,
        // Required Data
        branch: string | object,
        name: string,
        coach: string | number,
        timetable: string[] | string,
        potential: string,

        // Additional Data
        comment: string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a group by ID in the database
            const group = await this.group.findOne({ _id: groupId });

            // Checking if a group exists in the database
            if (!group) {
                throw new Error('Group Not Found!');
            }

            const branchExists = await this.branch.findOne({ _id: branch });

            if (!branchExists) {
                throw new Error('Филиал не найден!');
            }

            const coachExists = await this.user.findOne({ _id: coach });

            if (!coachExists) {
                throw new Error('Инструктор не найден!');
            }

            // For custom fields that we need to update,
            // we create a separate object where we add them.
            const groupFields = {
                // Required Data
                branch: branchExists._id,
                name,
                coach: coachExists._id,
                timetable, // Нужно продумать логику посещений
                potential,

                // Additional Data
                comment,
            };

            // If we want to change any of the fields or all fields,
            // then we update those fields that passed in the request body
            if (groupFields) {
                // Group Update
                await this.group.updateOne(
                    { _id: group._id },
                    {
                        $set: groupFields
                    }
                );
            }
            
            // Search for updated group
            const groupUpdate = await this.group.findOne({ _id: group._id });
            
            // Return updated group
            return groupUpdate;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete group by ID
     */
    public async deleteGroup(
        groupId: object | string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a group by ID in the database
            const group = await this.group.findOne({ _id: groupId });

            // Checking if a group exists in the database
            if (!group) {
                throw new Error('Group Not Found!');
            }

            // If we have found the group we want to delete in the database,
            // then we delete it from the database
            await this.group.deleteOne({ _id: groupId });

            // In case of successful deletion, 
            // we return the response as a string: group with ID Deleted
            return `group with ${groupId} Deleted`;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default GroupService;
