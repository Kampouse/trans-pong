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
        await prisma.user.create({
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
        await prisma.user.create({
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
        await prisma.user.create({
            data: {
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
        await prisma.user.create({
            data: {
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
        await prisma.user.create({
            data: {
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
        await prisma.user.create({
            data: {
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
        await prisma.user.create({
            data: {
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
        await prisma.user.create({
            data: {
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
        await prisma.user.create({
            data: {
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
        await prisma.friendRequest.create({
            data: {
                sender: 'bperron',
                receiver: 'jvillefr',
                status: 'declined',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'jvigneau',
                receiver: 'gehebert',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'gehebert',
                receiver: 'gcollet',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'tberube',
                receiver: 'jvillefr',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'tberube',
                receiver: 'mleblanc',
                status: 'pending',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'gcollet',
                receiver: 'tberube',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'tberube',
                receiver: 'bperron',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'bperron',
                receiver: 'jvigneau',
                status: 'declined',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'jbadia',
                receiver: 'gcollet',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'gcollet',
                receiver: 'mleblanc',
                status: 'pending',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'mleblanc',
                receiver: 'alvachon',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: 'alvachon',
                receiver: 'jvillefr',
                status: 'accepted',
            },
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData0',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData1',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData2',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData3',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData4',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData5',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData6',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData7',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData8',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData9',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData10',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData11',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData12',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData13',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData14',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData15',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData16',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData17',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData18',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData19',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData20',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData21',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData22',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData23',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData24',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData25',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData26',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData27',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData28',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData29',
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
        await prisma.friendRequest.create({
            data: {
                sender: evaluatorUsername,
                receiver: "jvigneau",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: "mleblanc",
                receiver: evaluatorUsername,
                status: "pending"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: "gcollet",
                receiver: evaluatorUsername,
                status: "pending"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: "alvachon",
                receiver: evaluatorUsername,
                status: "pending"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: evaluatorUsername,
                receiver: "jbadia",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: evaluatorUsername,
                receiver: "gehebert",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: evaluatorUsername,
                receiver: "tberube",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: evaluatorUsername,
                receiver: "jvillefr",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.friendRequest.create({
            data: {
                sender: evaluatorUsername,
                receiver: "bperron",
                status: "accepted"
            }
        })
    }
    catch{}

    try
    {
        await prisma.game.create({
            data: {
                gameRoomID: 'testData30',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData31',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData32',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData33',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData34',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData35',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData36',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData37',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData38',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData39',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData40',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData41',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData42',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData43',
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
        await prisma.game.create({
            data: {
                gameRoomID: 'testData44',
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
