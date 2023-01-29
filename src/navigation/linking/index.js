

import { routes } from "../../services";




const config = {
    screens: {
        auth: {
            path: routes.auth,
            screens: {
                resetPassword: {
                    path: `${routes.resetPassword}/:code`,
                    parse: {
                        id: (id) => `${id}`,
                    },
                },
            },

        },
    },
};

const linking = {
    prefixes: ["aleronkong://",],
    config,
};

export default linking;