import { PrismaClient } from "@prisma/client";
import { create } from "domain";

const prisma = new PrismaClient();

//  Create a seed which will craete data in our database for testing
async function main(){


console.log("starting seed script")
/*
    Create 8 users with upsert to avoid creating them two time
*/
const user0 = await prisma.user.upsert({
    where: {
        userNumber: 0,
    },
    update: {},
    create: {
        userNumber: 0,
        profile: {
            create: {
                username: 'jvigneau',
                login42: 'jvigneau',
            },
        },
    },
})

const user1 = await prisma.user.upsert({
    where: {
        userNumber: 1,
    },
    update: {},
    create: {
        userNumber: 1,
        profile: {
            create: {
                login42: 'mleblanc',
                username: 'mleblanc',
            },
        },
    },
})

const user2 = await prisma.user.upsert({
    where: {
        userNumber: 2,
    },
    update: {},
    create: {
        userNumber: 2,
        profile: {
            create: {
                login42: 'gcollet',
                username: 'gcollet',
            },
        },
    },
})

const user3 = await prisma.user.upsert({
    where: {
        userNumber: 3,
    },
    update: {},
    create: {
        userNumber: 3,
        profile: {
            create: {
                login42: 'alvachon',
                username: 'alvachon',
            },
        },
    },
})

const user4 = await prisma.user.upsert({
    where: {
        userNumber: 4,
    },
    update: {},
    create: {
        userNumber: 4,
        profile: {
            create: {
                login42: 'jbadia',
                username: 'jbadia',
            },
        },
    },
})

const user5 = await prisma.user.upsert({
    where: {
        userNumber: 5,
    },
    update: {},
    create: {
        userNumber: 5,
        profile: {
            create: {
                login42: 'gehebert',
                username: 'gehebert',
            },
        },
    },
})

const user6 = await prisma.user.upsert({
    where: {
        userNumber: 6,
    },
    update: {},
    create: {
        userNumber: 6,
        profile: {
            create: {
                login42: 'tberube',
                username: 'tberube',
            },
        },
    },
})

const user7 = await prisma.user.upsert({
    where: {
        userNumber: 7,
    },
    update: {},
    create: {
        userNumber: 7,
        profile: {
            create: {
                login42: 'jvillefr',
                username: 'jvillefr',
            },
        },
    },
})

const user8 = await prisma.user.upsert({
    where: {
        userNumber: 8,
    },
    update: {},
    create: {
        userNumber: 8,
        profile: {
            create: {
                login42: 'bperron',
                username: 'bperron',
            },
        },
    },
})

console.log({ user1, user2, user3, user4, user5, user6, user7, user8 });
}

//  Call the script then disconect prisma client after.
main()
    .catch((e) =>
    {
        console.error(e);
        process.exit(1);
    }).finally(async () =>
    {
        await prisma.$disconnect();
    });
