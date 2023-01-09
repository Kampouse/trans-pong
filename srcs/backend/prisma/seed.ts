import { PrismaClient } from "@prisma/client";
import { exit } from "process";

//  Create a seed which will create data in our database for testing
async function main()
{
    const prisma = new PrismaClient();
    console.log("Starting seed script.")

    //  Add evaluator login42 here for seed data
    var     evaluatorUsername = 'evaluator'

    //  { is for hide all the code to be abble to add friend to the evaluator user
    {
    //  Create 9 users for test's
    console.log("Creating 9 users")

    try
    {
        var user0 = await prisma.user.upsert({
            where: {
                login42: 'jvigneau',
            },
            update: {},
            create: {
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
        var user1 = await prisma.user.upsert({
            where: {
                login42: 'mleblanc',
            },
            update: {},
            create: {
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
            where: {
                friendRequestNumber: 0,
            },
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
            where: {
                friendRequestNumber: 1,
            },
            update: {},
            create: {
                friendRequestNumber: 1,
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
            where: {
                friendRequestNumber: 2,
            },
            update: {},
            create: {
                friendRequestNumber: 2,
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
            where: {
                friendRequestNumber: 3,
            },
            update: {},
            create: {
                friendRequestNumber: 3,
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
            where: {
                friendRequestNumber: 4,
            },
            update: {},
            create: {
                friendRequestNumber: 4,
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
            where: {
                friendRequestNumber: 5,
            },
            update: {},
            create: {
                friendRequestNumber: 5,
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
            where: {
                friendRequestNumber: 6,
            },
            update: {},
            create: {
                friendRequestNumber: 6,
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
            where: {
                friendRequestNumber: 7,
            },
            update: {},
            create: {
                friendRequestNumber: 7,
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
            where: {
                friendRequestNumber: 8,
            },
            update: {},
            create: {
                friendRequestNumber: 8,
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
            where: {
                friendRequestNumber: 9,
            },
            update: {},
            create: {
                friendRequestNumber: 9,
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
            where: {
                friendRequestNumber: 10,
            },
            update: {},
            create: {
                friendRequestNumber: 10,
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
            where: {
                friendRequestNumber: 11,
            },
            update: {},
            create: {
                friendRequestNumber: 11,
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
            where: {
                friendRequestNumber: 12,
            },
            update: {},
            create: {
                friendRequestNumber: 12,
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
            where: {
                gameNumber: 0,
            },
            update: {},
            create: {
                gameNumber: 0,
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
            where: {
                gameNumber: 1,
            },
            update: {},
            create: {
                gameNumber: 1,
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
            where: {
                gameNumber: 2,
            },
            update: {},
            create: {
                gameNumber: 2,
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
            where: {
                gameNumber: 3,
            },
            update: {},
            create: {
                gameNumber: 3,
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
            where: {
                gameNumber: 4,
            },
            update: {},
            create: {
                gameNumber: 4,
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
        var game5 = await prisma.game.upsert({
            where: {
                gameNumber: 5,
            },
            update: {},
            create: {
                gameNumber: 5,
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
        var game6 = await prisma.game.upsert({
            where: {
                gameNumber: 6,
            },
            update: {},
            create: {
                gameNumber: 6,
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
            where: {
                gameNumber: 7,
            },
            update: {},
            create: {
                gameNumber: 7,
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
            where: {
                gameNumber: 8,
            },
            update: {},
            create: {
                gameNumber: 8,
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
            where: {
                gameNumber: 9,
            },
            update: {},
            create: {
                gameNumber: 9,
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
            where: {
                gameNumber: 10,
            },
            update: {},
            create: {
                gameNumber: 10,
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
            where: {
                gameNumber: 11,
            },
            update: {},
            create: {
                gameNumber: 11,
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
            where: {
                gameNumber: 12,
            },
            update: {},
            create: {
                gameNumber: 12,
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
            where: {
                gameNumber: 13,
            },
            update: {},
            create: {
                gameNumber: 13,
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
            where: {
                gameNumber: 14,
            },
            update: {},
            create: {
                gameNumber: 14,
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
            where: {
                gameNumber: 15,
            },
            update: {},
            create: {
                gameNumber: 15,
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
            where: {
                gameNumber: 16,
            },
            update: {},
            create: {
                gameNumber: 16,
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
            where: {
                gameNumber: 17,
            },
            update: {},
            create: {
                gameNumber: 17,
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
            where: {
                gameNumber: 18,
            },
            update: {},
            create: {
                gameNumber: 18,
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
            where: {
                gameNumber: 19,
            },
            update: {},
            create: {
                gameNumber: 19,
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
            where: {
                gameNumber: 20,
            },
            update: {},
            create: {
                gameNumber: 20,
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
            where: {
                gameNumber: 21,
            },
            update: {},
            create: {
                gameNumber: 21,
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
            where: {
                gameNumber: 22,
            },
            update: {},
            create: {
                gameNumber: 22,
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
            where: {
                gameNumber: 23,
            },
            update: {},
            create: {
                gameNumber: 23,
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
            where: {
                gameNumber: 24,
            },
            update: {},
            create: {
                gameNumber: 24,
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
            where: {
                gameNumber: 25,
            },
            update: {},
            create: {
                gameNumber: 25,
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
            where: {
                gameNumber: 26,
            },
            update: {},
            create: {
                gameNumber: 26,
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
            where: {
                gameNumber: 27,
            },
            update: {},
            create: {
                gameNumber: 27,
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
            where: {
                gameNumber: 28,
            },
            update: {},
            create: {
                gameNumber: 28,
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
            where: {
                gameNumber: 29,
            },
            update: {},
            create: {
                gameNumber: 29,
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
    }

    var user;

    try
    {
        user = await prisma.user.findUnique({
            where: {
                login42: evaluatorUsername
            }
        })
    }
    catch
    {}

    if (!user)
    {
        exit(0);
    }
    //  Add everyone as friend
    try
    {
        await prisma.friendRequest.upsert({
            where: {
                friendRequestNumber: 13,
            },
            update: {},
            create: {
                friendRequestNumber: 13,
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
            where: {
                friendRequestNumber: 14,
            },
            update: {},
            create: {
                friendRequestNumber: 14,
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
            where: {
                friendRequestNumber: 15,
            },
            update: {},
            create: {
                friendRequestNumber: 15,
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
            where: {
                friendRequestNumber: 16,
            },
            update: {},
            create: {
                friendRequestNumber: 16,
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
            where: {
                friendRequestNumber: 17,
            },
            update: {},
            create: {
                friendRequestNumber: 17,
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
            where: {
                friendRequestNumber: 18,
            },
            update: {},
            create: {
                friendRequestNumber: 18,
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
            where: {
                friendRequestNumber: 19,
            },
            update: {},
            create: {
                friendRequestNumber: 19,
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
            where: {
                friendRequestNumber: 20,
            },
            update: {},
            create: {
                friendRequestNumber: 20,
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
            where: {
                friendRequestNumber: 21,
            },
            update: {},
            create: {
                friendRequestNumber: 21,
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
            where: {
                gameNumber: 30,
            },
            update: {},
            create: {
                gameNumber: 30,
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
            where: {
                gameNumber: 31,
            },
            update: {},
            create: {
                gameNumber: 31,
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
            where: {
                gameNumber: 32,
            },
            update: {},
            create: {
                gameNumber: 32,
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
            where: {
                gameNumber: 33,
            },
            update: {},
            create: {
                gameNumber: 33,
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
            where: {
                gameNumber: 34,
            },
            update: {},
            create: {
                gameNumber: 34,
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
            where: {
                gameNumber: 35,
            },
            update: {},
            create: {
                gameNumber: 35,
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
            where: {
                gameNumber: 36,
            },
            update: {},
            create: {
                gameNumber: 36,
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
            where: {
                gameNumber: 37,
            },
            update: {},
            create: {
                gameNumber: 37,
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
            where: {
                gameNumber: 38,
            },
            update: {},
            create: {
                gameNumber: 38,
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
            where: {
                gameNumber: 39,
            },
            update: {},
            create: {
                gameNumber: 39,
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
            where: {
                gameNumber: 40,
            },
            update: {},
            create: {
                gameNumber: 40,
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
            where: {
                gameNumber: 41,
            },
            update: {},
            create: {
                gameNumber: 41,
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
            where: {
                gameNumber: 42,
            },
            update: {},
            create: {
                gameNumber: 42,
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
            where: {
                gameNumber: 43,
            },
            update: {},
            create: {
                gameNumber: 43,
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
            where: {
                gameNumber: 44,
            },
            update: {},
            create: {
                gameNumber: 44,
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
