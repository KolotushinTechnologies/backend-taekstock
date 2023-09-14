import Joi from 'joi';

// name: string;
// lastname: string;
// surname: string;
// dateBirth: string;
// speciality: string;
// phoneNumber: string;
// city: string;
// balance: string;
// // documentAttachments: string[];
// password: string;

const register = Joi.object({
    name: Joi.string().max(150).required(),

    lastname: Joi.string().max(150).required(),

    surname: Joi.string().max(150).required(),

    dateBirth: Joi.string().max(150).required(),

    speciality: Joi.string().max(150).required(),

    phoneNumber: Joi.string().max(150).required(),

    city: Joi.string().max(150).required(),

    password: Joi.string().max(150).required(),
});

const login = Joi.object({
    phoneNumber: Joi.string().required(),

    password: Joi.string().required(),
});

const forgotPassword = Joi.object({
    phoneNumber: Joi.string().required(),
});

const changePassword = Joi.object({
    phoneNumber: Joi.string().required(),

    secretCode: Joi.string().required(),

    newPassword: Joi.string().required(),
});

const changePasswordForProfile = Joi.object({
    newPassword: Joi.string().required(),

    confirmNewPassword: Joi.string().required(),
});

export default { register, login, forgotPassword, changePassword, changePasswordForProfile };
