import { validate, errors } from "com";
const { SystemError, ContentError } = errors;
import session from "./session";

function deleteUser(userId) {
    if (typeof userId !== "string") {
        throw new ContentError("userId must be a string");
    }

    const req = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session.token}`,
        },
    };

    return fetch(`${import.meta.env.VITE_API_URL}/users/${encodeURIComponent(userId)}`, req)
        .catch((error) => {
            throw new SystemError(error.message);
        })
        .then((res) => {
            if (!res.ok) {
                return res.json()
                    .catch((error) => {
                        throw new SystemError(error.message);
                    })
                    .then((body) => {
                        throw new errors[body.error](body.message);
                    });
            }
        });
}

export default deleteUser;
