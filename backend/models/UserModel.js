import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 20
        },
        email: {
            type: String,
            required: true,
            unique: true,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 5
        },
        rights: {
           type: String,
           required: true,
           default: 1
        }
    }, {timestamps: true}
)

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", UserSchema)
export default User;