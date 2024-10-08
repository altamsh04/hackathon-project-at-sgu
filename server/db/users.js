import { Schema, model } from 'mongoose';

const authSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Auth = model('Auth', authSchema);

export default Auth;