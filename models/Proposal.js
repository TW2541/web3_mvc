const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proposalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    contractaddress: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Proposal", proposalSchema);