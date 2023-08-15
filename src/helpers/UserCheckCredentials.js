import visitorModel from "../models/visitorModel";
import { matchPassword } from "./hash_match_password";

const checkCredentials = async (e, password) => {
	console.log(e)
    try {
        const user = await visitorModel.findOne({ email: e });
	console.log(user)
        if (user == null) {
            return null;
        }
        else {
            const isPasswordMatching = await matchPassword(password, user.password);
            if (isPasswordMatching) {
                return true;
            }
            else {
                console.log(user);
                return false;
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default checkCredentials;