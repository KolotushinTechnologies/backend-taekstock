// Import Certifications Resources For Stable Work
import CertificationModel from '@/resources/certification/certification.model';

// Import Certifications Student Resources For Stable Work
import CertificationStudentModel from '@/resources/certification/certificationStudent/certificationStudent.model';

// Import Clients Resources For Stable Work
import ClientModel from '@/resources/client/client.model';

// Create Certification Service
class CertificationService {
    private certification = CertificationModel;
    private certificationStudent = CertificationStudentModel;
    private client = ClientModel;

    /**
     * Create a new certification
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
            const certification = await this.certification.create({
                // Required Data
                name,
                dateFrom,
                dateTo,

                // Additional Data
                comment,
            });

            return certification;
        } catch (error: any) {
            // Server Error
            throw new Error(error.message);
        }
    }

    /**
     * Get all certifications
     */
     public async getCertifications(): Promise<string | object | Error> {
        try {
            // Accessing the Database to Get All Certifications
            const certifications = await this.certification.find({}).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });

            // Checking if there are certifications in the database
            if (!certifications) {
                throw new Error('Certifications Not Found!');
            }

            // If successful, we return Certifications
            return certifications;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get certification by ID
     */
    public async getCertificationById(
        certificationId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a Certification by ID in the database
            const certification = await this.certification.findOne({ _id: certificationId }).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });

            // Checking if a group exists in the database
            if (!certification) {
                throw new Error('Certification Not Found!');
            }

            // If successful, return the Certification
            return certification;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Get certification students by ID
     */
    public async getCertificationStudentsById(
        certificationId: object | string,
    ): Promise<string | object | Error> {
        try {
            // Search for a Certification by ID in the database
            const certificationStudents = await this.certificationStudent.find({ certification: certificationId }).populate('client');

            // Checking if a group exists in the database
            if (!certificationStudents) {
                throw new Error('Certification Students Not Found!');
            }

            // If successful, return the Certification
            return certificationStudents;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Add students to certification by ID
     */
    public async addStudents(
        certificationId: string | object,
        // Required Data
        client: string | object,
        gipFrom: string,
        gipTo: string,

        // Additional Data
        comment: string,
    ): Promise<string | object | null | Error> {
        try {
            const certification = await this.certification.findOne({ _id: certificationId });

            if (!certification) {
                throw new Error('Сertification not found!');
            }

            const clientExists = await this.client.findOne({ _id: client });

            if (!clientExists) {
                throw new Error('Client not found!');
            }

            const certificationStudent = await this.certificationStudent.create({
                // Required Data
                certification: certification._id,
                client: clientExists._id,
                gipFrom,
                gipTo,

                // Additional Data
                comment,
            });

            await this.certification.findOneAndUpdate(
                { _id: certification._id },
                {
                    $addToSet: {
                        students: certificationStudent._id
                    }
                }
            );

            return certificationStudent.populate({
                path: 'client'
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Search Certifications
     */
    public async findCertifications(content: string): Promise<string | object | Error> {
        try {
            // Created a regular expression to search for keywords
            const keywordRegExp = new RegExp(content, 'i');

            const certifications = await this.certification.find({ $or: [
                { name: keywordRegExp }
            ]}).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });

            // Checking if there are certifications in the database
            if (!certifications) {
                throw new Error('Certifications Not Found!');
            }

            // If successful, we return certifications
            return certifications;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Update Information For certification by ID
     */
    public async updateCertification(
        certificationId: object | string,
        // Required Data
        name: string,
        dateFrom: Date,
        dateTo: Date,

        // Additional Data
        comment: string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a certification by ID in the database
            const certification = await this.certification.findOne({ _id: certificationId });

            // Checking if a certification exists in the database
            if (!certification) {
                throw new Error('Certification Not Found!');
            }

            // For custom fields that we need to update,
            // we create a separate object where we add them.
            const certificationFields = {
                // Required Data
                name,
                dateFrom,
                dateTo,

                // Additional Data
                comment,
            };

            // If we want to change any of the fields or all fields,
            // then we update those fields that passed in the request body
            if (certificationFields) {
                // Group Update
                await this.certification.updateOne(
                    { _id: certification._id },
                    {
                        $set: certificationFields
                    }
                );
            }
            
            // Search for updated group
            const certificationUpdate = await this.certification.findOne({ _id: certification._id }).populate({
                path: 'students',
                populate: {
                  path: 'client'
                },
            });
            
            // Return updated group
            return certificationUpdate;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    /**
     * Delete certification by ID
     */
    public async deleteCertification(
        certificationId: object | string,
    ): Promise<string | object | null | Error> {
        try {
            // Search for a Certification by ID in the database
            const certification = await this.certification.findOne({ _id: certificationId });

            // Checking if a Certification exists in the database
            if (!certification) {
                throw new Error('Certification Not Found!');
            }

            // If we have found the certification we want to delete in the database,
            // then we delete it from the database
            await this.certification.deleteOne({ _id: certificationId });

            // In case of successful deletion, 
            // we return the response as a string: Certification with ID Deleted
            return `Certification with ${certificationId} Deleted`;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

export default CertificationService;
