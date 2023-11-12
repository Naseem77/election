import mongoose from "mongoose"

const VoterSchema = new mongoose.Schema(
    {
        VoterId: {
            type: String,
            unique: true,
            // required: true,
            min: 8,
            max: 9
        },
        name: {
            type: String,
            required: true,
            max: 50
        },
        voted: {
            type: Boolean,
            default: false
        },
        box: {
            type: String,
            required: true,
        },
        votedBy: [
            {
                id: String,
                name: String,
                email: String
            }
        ]
    }, {timestamps: true}
)

const Voter = mongoose.model("Voter", VoterSchema)
export default Voter;