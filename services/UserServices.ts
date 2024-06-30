import Api from "@/util/Api";
import { Users } from "@/util/Interfaces";

export default function EndPoints() {

    const getUserById = async (id: number): Promise<Users> => {
        const response = await Api.get("/users");
        const user = response.data as Users[];
        const userById = user.filter((u) => u.id === id);
        return userById[0];
    }

    return { getUserById };
}
