import mongoose from "mongoose";

const Schema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    users: {
        type: Array
    },
    owner: {
        type: String,
    },
    contributors: {
        type: Array
    },
}
);

const project = mongoose.model("project", Schema);

export default project;