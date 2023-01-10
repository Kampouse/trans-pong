import { PrismaClient } from "@prisma/client";
import { exit } from 'process';

//  Create a seed which will create data in our database for testing
async function main()
{
    const prisma = new PrismaClient();
    console.log("Starting seed script.")

    var     evaluatorUsername = process.env.LOGIN;

    //  Look if the seed already has been called, exit if it does
    try {
        var test = await prisma.user.findUnique({
            where: {
                login42: 'jvigneau'
            }
        })

        if (test != undefined)
        {
            exit (0);
        }
    }
    catch{}

    //  Create 9 users for test's
    console.log("Creating 9 users")

    try
    {
        var user0 = await prisma.user.create({
            data: {
                login42: 'jvigneau',
                username: 'jvigneau',
                userStatus: 'playing',
                imagePath: '/jvigneauPhoto.jpeg',
            },
        })
    }
    catch{}

    try
    {
        var user1 = await prisma.user.create({
        data: {
                login42: 'mleblanc',
                username: 'mleblanc',
                userStatus: 'playing',
                imagePath: '/mleblancPhoto.jpeg',
            },
        })
    }
    catch{}

    try
    {
        var user2 = await prisma.user.upsert({
            where: {
                login42: 'gcollet',
            },
            update: {},
            create: {
                login42: 'gcollet',
                username: 'gcollet',
                userStatus: 'online',
                imagePath: '/gcolletPhoto.jpeg',
            },
        })
    }
    catch{}

    try
    {
        var user3 = await prisma.user.upsert({
            where: {
                login42: 'alvachon',
            },
            update: {},
            create: {
                login42: 'alvachon',
                username: 'alvachon',
                userStatus: 'offline',
                imagePath: '/alvachonPhoto.jpeg',
            },
        })
    }
    catch{}

    try
    {
        var user4 = await prisma.user.upsert({
            where: {
                login42: 'jbadia',
            },
            update: {},
            create: {
                login42: 'jbadia',
                username: 'jbadia',
                userStatus: 'playing',
                imagePath: '/jbadiaPhoto.jpeg',
            },
        })
    }
    catch{}

    try
    {
        var user5 = await prisma.user.upsert({
            where: {
                login42: 'gehebert',
            },
            update: {},
            create: {
                login42: 'gehebert',
                username: 'gehebert',
                userStatus: 'offline',
                imagePath: '/gehebertPhoto.jpeg',
            },
        })
    }
    catch{}

    try
    {
        var user6 = await prisma.user.upsert({
            where: {
                login42: 'tberube',
            },
            update: {},
            create: {
                login42: 'tberube',
                username: 'tberube',
                userStatus: 'playing',
                imagePath: '/tberubePhoto.jpeg',
            },
        })
    }
    catch{}

    try
    {
        var user7 = await prisma.user.upsert({
            where: {
                login42: 'jvillefr',
            },
            update: {},
            create: {
                login42: 'jvillefr',
                username: 'jvillefr',
                userStatus: 'online',
                imagePath: '/jvillefrPhoto.jpeg',
            },
        })
    }
    catch{}

    try
    {
        var user8 = await prisma.user.upsert({
            where: {
                login42: 'bperron',
            },
            update: {},
            create: {
                login42: 'bperron',
                username: 'bperron',
                userStatus: 'playing',
                imagePath: '/bperronPhoto.jpeg',
            },
        })
    }
    catch{}

    //  Create a bunch of friend request's

    console.log("Creating a bunch of friend request's")

    try
    {
        var friendRequest0 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'bperron',
                receiver: 'jvillefr',
                status: 'declined',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest1 = await prisma.friendRequest.upsert({
            where: { },
            update: {},
            create: {
                sender: 'jvigneau',
                receiver: 'gehebert',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest2 = await prisma.friendRequest.upsert({
            where: { },
            update: {},
            create: {
                sender: 'gehebert',
                receiver: 'gcollet',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest3 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'tberube',
                receiver: 'jvillefr',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest4 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'tberube',
                receiver: 'mleblanc',
                status: 'pending',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest5 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'gcollet',
                receiver: 'tberube',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest6 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'tberube',
                receiver: 'bperron',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest7 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'bperron',
                receiver: 'jvigneau',
                status: 'declined',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest8 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'jbadia',
                receiver: 'gcollet',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest9 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'gcollet',
                receiver: 'mleblanc',
                status: 'pending',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest10 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'mleblanc',
                receiver: 'alvachon',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest11 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'alvachon',
                receiver: 'jvillefr',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        var friendRequest12 = await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: 'jvillefr',
                receiver: 'jbadia',
                status: 'accepted',
            },
        })
    }
    catch{}

    //  Creating a bunch of game's

    console.log("Creating a bunch of games")

    try
    {
        var game0 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'jbadia',
                leftPlayerScore: 5,
                rightPlayer: 'gcollet',
                rightPlayerScore: 2,
                active: false,
                winner: 'jbadia',
            },
        })
    }
    catch{}

    try
    {
        var game1 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'jvigneau',
                leftPlayerScore: 200,
                rightPlayer: 'tberube',
                rightPlayerScore: 1,
                active: false,
                winner: 'jvigneau',
            },
        })
    }
    catch{}

    try
    {
        var game2 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'tberube',
                leftPlayerScore: 1,
                rightPlayer: 'jvigneau',
                rightPlayerScore: 3,
                active: false,
                winner: 'jvigneau',
            },
        })
    }
    catch{}

    try
    {
        var game3 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'tberube',
                leftPlayerScore: 2,
                rightPlayer: 'gcollet',
                rightPlayerScore: 6,
                active: false,
                winner: 'gcollet',
            },
        })
    }
    catch{}

    try
    {
        var game4 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'bperron',
                leftPlayerScore: 1,
                rightPlayer: 'jvigneau',
                rightPlayerScore: 3,
                active: false,
                winner: 'jvigneau',
            },
        })
    }
    catch{}

    try
    {
        var game5 = await prisma.game.create({
            data: {
                leftPlayer: 'bperron',
                leftPlayerScore: 45,
                rightPlayer: 'jvigneau',
                rightPlayerScore: 8000,
                active: false,
                winner: 'jvigneau',
            },
        })
    }
    catch{}

    try
    {
        var game6 = await prisma.game.create({
            data: {
                leftPlayer: 'mleblanc',
                leftPlayerScore: 5,
                rightPlayer: 'gcollet',
                rightPlayerScore: 1,
                active: false,
                winner: 'mleblanc',
            },
        })
    }
    catch{}

    try
    {
        var game7 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'mleblanc',
                leftPlayerScore: 2,
                rightPlayer: 'jbadia',
                rightPlayerScore: 12,
                active: false,
                winner: 'jbadia',
            },
        })
    }
    catch{}

    try
    {
        var game8 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'alvachon',
                leftPlayerScore: 2,
                rightPlayer: 'gcollet',
                rightPlayerScore: 4,
                active: false,
                winner: 'gcollet',
            },
        })
    }
    catch{}

    try
    {
        var game9 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'jbadia',
                leftPlayerScore: 2,
                rightPlayer: 'alvachon',
                rightPlayerScore: 5,
                active: false,
                winner: 'alvachon',
            },
        })
    }
    catch{}

    try
    {
        var game10 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'gehebert',
                leftPlayerScore: 2,
                rightPlayer: 'mleblanc',
                rightPlayerScore: 12,
                active: false,
                winner: 'mleblanc',
            },
        })
    }
    catch{}

    try
    {
        var game11 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'gehebert',
                leftPlayerScore: 1,
                rightPlayer: 'jvigneau',
                rightPlayerScore: 2,
                active: false,
                winner: 'jvigneau',
            },
        })
    }
    catch{}

    try
    {
        var game12 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'jvillefr',
                leftPlayerScore: 2,
                rightPlayer: 'gehebert',
                rightPlayerScore: 1,
                active: false,
                winner: 'jvillefr',
            },
        })
    }
    catch{}

    try
    {
        var game13 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'gehebert',
                leftPlayerScore: 5,
                rightPlayer: 'jvillefr',
                rightPlayerScore: 4,
                active: false,
                winner: 'gehebert',
            },
        })
    }
    catch{}

    try
    {
        var game14 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'jvillefr',
                leftPlayerScore: 12,
                rightPlayer: 'gehebert',
                rightPlayerScore: 5,
                active: false,
                winner: 'jvillefr',
            },
        })
        
    }
    catch{}

    try
    {
        var game15 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'bperron',
                leftPlayerScore: 5,
                rightPlayer: 'gcollet',
                rightPlayerScore: 1,
                active: false,
                winner: 'bperron',
            },
        })
    }
    catch{}

    try
    {
        var game16 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'jbadia',
                leftPlayerScore: 1,
                rightPlayer: 'bperron',
                rightPlayerScore: 5,
                active: false,
                winner: 'bperron',
            },
        })
    }
    catch{}

    try
    {
        var game17 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'bperron',
                leftPlayerScore: 2,
                rightPlayer: 'tberube',
                rightPlayerScore: 4,
                active: false,
                winner: 'tberube',
            },
        })
    }
    catch{}

    try
    {
        var game18 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'mleblanc',
                leftPlayerScore: 4,
                rightPlayer: 'alvachon',
                rightPlayerScore: 1,
                active: false,
                winner: 'mleblanc',
            },
        })
    }
    catch{}

    try
    {
        var game19 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'alvachon',
                leftPlayerScore: 2,
                rightPlayer: 'mleblanc',
                rightPlayerScore: 3,
                active: false,
                winner: 'mleblanc',
            },
        })
    }
    catch{}

    try
    {
        var game20 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'mleblanc',
                leftPlayerScore: 6,
                rightPlayer: 'gcollet',
                rightPlayerScore: 1,
                active: false,
                winner: 'mleblanc',
            },
        })
    }
    catch{}

    try
    {
        var game21 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'gcollet',
                leftPlayerScore: 2,
                rightPlayer: 'jbadia',
                rightPlayerScore: 5,
                active: false,
                winner: 'jbadia',
            },
        })
    }
    catch{}

    try
    {
        var game22 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'tberube',
                leftPlayerScore: 12,
                rightPlayer: 'jbadia',
                rightPlayerScore: 10,
                active: false,
                winner: 'tberube',
            },
        })
    }
    catch{}

    try
    {
        var game23 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'tberube',
                leftPlayerScore: 5,
                rightPlayer: 'jvigneau',
                rightPlayerScore: 12,
                active: false,
                winner: 'jvigneau',
            },
        })
    }
    catch{}

    try
    {
        var game24 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'jvigneau',
                leftPlayerScore: 12,
                rightPlayer: 'mleblanc',
                rightPlayerScore: 6,
                active: false,
                winner: 'jvigneau',
            },
        })
    }
    catch{}

    try
    {
        var game25 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'mleblanc',
                leftPlayerScore: 5,
                rightPlayer: 'gehebert',
                rightPlayerScore: 4,
                active: false,
                winner: 'mleblanc',
            },
        })
    }
    catch{}

    try
    {
        var game26 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'mleblanc',
                leftPlayerScore: 4,
                rightPlayer: 'gehebert',
                rightPlayerScore: 5,
                active: false,
                winner: 'gehebert',
            },
        })
    }
    catch{}

    try
    {
        var game27 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'mleblanc',
                leftPlayerScore: 12,
                rightPlayer: 'bperron',
                rightPlayerScore: 11,
                active: false,
                winner: 'mleblanc',
            },
        })
    }
    catch{}

    try
    {
        var game28 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'bperron',
                leftPlayerScore: 11,
                rightPlayer: 'jvigneau',
                rightPlayerScore: 12,
                active: false,
                winner: 'jvigneau',
            },
        })
    }
    catch{}

    try
    {
        var game29 = await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: 'jvigneau',
                leftPlayerScore: 25,
                rightPlayer: 'gehebert',
                rightPlayerScore: 24,
                active: false,
                winner: 'jvigneau',
            },
        })
    }
    catch{}


    //  Add friend request's for test's
    try
    {
        await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: evaluatorUsername,
                receiver: "jvigneau",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: "mleblanc",
                receiver: evaluatorUsername,
                status: "pending"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: "gcollet",
                receiver: evaluatorUsername,
                status: "pending"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: "alvachon",
                receiver: evaluatorUsername,
                status: "pending"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: evaluatorUsername,
                receiver: "jbadia",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: evaluatorUsername,
                receiver: "gehebert",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: evaluatorUsername,
                receiver: "tberube",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: evaluatorUsername,
                receiver: "jvillefr",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.upsert({
            where: {},
            update: {},
            create: {
                sender: evaluatorUsername,
                receiver: "bperron",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: evaluatorUsername,
                leftPlayerScore: 5,
                rightPlayer: "jvigneau",
                rightPlayerScore: 4,
                winner: evaluatorUsername,
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: evaluatorUsername,
                leftPlayerScore: 3,
                rightPlayer: "jvigneau",
                rightPlayerScore: 4,
                winner: "jvigneau",
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: "jvillefr",
                leftPlayerScore: 5,
                rightPlayer: evaluatorUsername,
                rightPlayerScore: 3,
                winner: "jvillefr",
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: evaluatorUsername,
                leftPlayerScore: 3,
                rightPlayer: "tberube",
                rightPlayerScore: 1,
                winner: evaluatorUsername,
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: "tberube",
                leftPlayerScore: 5,
                rightPlayer: evaluatorUsername,
                rightPlayerScore: 4,
                winner: "tberube",
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: evaluatorUsername,
                leftPlayerScore: 5,
                rightPlayer: "jvigneau",
                rightPlayerScore: 4,
                winner: evaluatorUsername,
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: "bperron",
                leftPlayerScore: 2,
                rightPlayer: evaluatorUsername,
                rightPlayerScore: 4,
                winner: evaluatorUsername,
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: evaluatorUsername,
                leftPlayerScore: 5,
                rightPlayer: "gehebert",
                rightPlayerScore: 4,
                winner: evaluatorUsername,
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: "gehebert",
                leftPlayerScore: 2,
                rightPlayer: evaluatorUsername,
                rightPlayerScore: 1,
                winner: "gehebert",
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: evaluatorUsername,
                leftPlayerScore: 4,
                rightPlayer: "gcollet",
                rightPlayerScore: 3,
                winner: evaluatorUsername,
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: "mleblanc",
                leftPlayerScore: 5,
                rightPlayer: evaluatorUsername,
                rightPlayerScore: 4,
                winner: "mleblanc",
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: "mleblanc",
                leftPlayerScore: 3,
                rightPlayer: evaluatorUsername,
                rightPlayerScore: 1,
                winner: "mleblanc",
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: evaluatorUsername,
                leftPlayerScore: 4,
                rightPlayer: "alvachon",
                rightPlayerScore: 1,
                winner: evaluatorUsername,
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: "alvachon",
                leftPlayerScore: 5,
                rightPlayer: evaluatorUsername,
                rightPlayerScore: 4,
                winner: "alvachon",
                active: false
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.upsert({
            where: {},
            update: {},
            create: {
                leftPlayer: evaluatorUsername,
                leftPlayerScore: 4,
                rightPlayer: "bperron",
                rightPlayerScore: 1,
                winner: evaluatorUsername,
                active: false
            }
        })
    }
    catch{}

    await prisma.$disconnect();

}

//  Call the script then disconect prisma client after.
main()
    .catch((e) =>
    {
        console.error(e);
        process.exit(1);
    }).finally(async () =>{});
