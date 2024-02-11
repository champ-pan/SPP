import mongoose from 'mongoose';

const Schema = mongoose.Schema({
    id: {
        type: String,
        required: true},
    username: {
         type: String,
          required: true},
    location: {
        type: String},
    projects: {
        type: Array},
});

const user = mongoose.model('users', Schema);

export default user;
