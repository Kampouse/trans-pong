import { PrismaClient } from "@prisma/client";
import { create } from "domain";

const prisma = new PrismaClient();

//  Create a seed which will create data in our database for testing
async function main(){
/*

console.log("starting seed script")

//  Create 9 users for test's
console.log("Creating 9 users")

const user0 = await prisma.user.create({

    data: {
        userNumber: 0,
        login42: 'jvigneau',
        username: 'jvigneau',
        userStatus: 'online',
        imagePath: '/jvigneauPhoto.jpeg',
    },
})

const user1 = await prisma.user.upsert({
    where: {
        userNumber: 1,
    },
    update: {},
    create: {
        userNumber: 1,
        login42: 'mleblanc',
        username: 'mleblanc',
        userStatus: 'playing',
        imagePath: '/mleblancPhoto.jpeg',
    },
})

const user2 = await prisma.user.upsert({
    where: {
        userNumber: 2,
    },
    update: {},
    create: {
        userNumber: 2,
        login42: 'gcollet',
        username: 'gcollet',
        userStatus: 'online',
        imagePath: '/gcolletPhoto.jpeg',
    },
})

const user3 = await prisma.user.upsert({
    where: {
        userNumber: 3,
    },
    update: {},
    create: {
        userNumber: 3,
        login42: 'alvachon',
        username: 'alvachon',
        userStatus: 'offline',
        imagePath: '/alvachonPhoto.jpeg',
    },
})

const user4 = await prisma.user.upsert({
    where: {
        userNumber: 4,
    },
    update: {},
    create: {
        userNumber: 4,
        login42: 'jbadia',
        username: 'jbadia',
        userStatus: 'playing',
        imagePath: '/jbadiaPhoto.jpeg',
    },
})

const user5 = await prisma.user.upsert({
    where: {
        userNumber: 5,
    },
    update: {},
    create: {
        userNumber: 5,
        login42: 'gehebert',
        username: 'gehebert',
        userStatus: 'offline',
        imagePath: '/gehebertPhoto.jpeg',
    },
})

const user6 = await prisma.user.upsert({
    where: {
        userNumber: 6,
    },
    update: {},
    create: {
        userNumber: 6,
        login42: 'tberube',
        username: 'tberube',
        userStatus: 'playing',
        imagePath: '/tberubePhoto.jpeg',
    },
})

const user7 = await prisma.user.upsert({
    where: {
        userNumber: 7,
    },
    update: {},
    create: {
        userNumber: 7,
        login42: 'jvillefr',
        username: 'jvillefr',
        userStatus: 'online',
        imagePath: '/jvillefrPhoto.jpeg',
    },
})

const user8 = await prisma.user.upsert({
    where: {
        userNumber: 8,
    },
    update: {},
    create: {
        userNumber: 8,
        login42: 'bperron',
        username: 'bperron',
        userStatus: 'playing',
        imagePath: '/bperronPhoto.jpeg',
    },
})

//  Create a bunch of friend request's

console.log("Creating a bunch of friend request's")

const friendRequest0 = await prisma.friendRequest.upsert({
    where: {
        friendRequestNumber: 0,
    },
    update: {},
    create: {
        friendRequestNumber: 0,
        sender: 'bperron',
        receiver: 'jvillefr',
        status: 'declined',
    },
})

const friendRequest1 = await prisma.friendRequest.upsert({
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

const friendRequest2 = await prisma.friendRequest.upsert({
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

const friendRequest3 = await prisma.friendRequest.upsert({
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

const friendRequest4 = await prisma.friendRequest.upsert({
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

const friendRequest5 = await prisma.friendRequest.upsert({
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

const friendRequest6 = await prisma.friendRequest.upsert({
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

const friendRequest7 = await prisma.friendRequest.upsert({
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

const friendRequest8 = await prisma.friendRequest.upsert({
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

const friendRequest9 = await prisma.friendRequest.upsert({
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

const friendRequest10 = await prisma.friendRequest.upsert({
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

const friendRequest11 = await prisma.friendRequest.upsert({
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

const friendRequest12 = await prisma.friendRequest.upsert({
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

//  Creating a bunch of game's

console.log("Creating a bunch of games")

const game0 = await prisma.game.upsert({
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

const game1 = await prisma.game.upsert({
    where: {
        gameNumber: 1,
    },
    update: {},
    create: {
        gameNumber: 1,
        leftPlayer: 'jvigneau',
        leftPlayerScore: 2,
        rightPlayer: 'tberube',
        rightPlayerScore: 1,
        active: false,
        winner: 'jvigneau',
    },
})

const game2 = await prisma.game.upsert({
    where: {
        gameNumber: 2,
    },
    update: {},
    create: {
        gameNumber: 2,
        leftPlayer: 'tberube',
        leftPlayerScore: 4,
        rightPlayer: 'jvigneau',
        rightPlayerScore: 3,
        active: false,
        winner: 'jvigneau',
    },
})

const game3 = await prisma.game.upsert({
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

const game4 = await prisma.game.upsert({
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

const game5 = await prisma.game.upsert({
    where: {
        gameNumber: 5,
    },
    update: {},
    create: {
        gameNumber: 5,
        leftPlayer: 'bperron',
        leftPlayerScore: 45,
        rightPlayer: 'jvigneau',
        rightPlayerScore: 1,
        active: false,
        winner: 'bperron',
    },
})

const game6 = await prisma.game.upsert({
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

const game7 = await prisma.game.upsert({
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

const game8 = await prisma.game.upsert({
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

const game9 = await prisma.game.upsert({
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

const game10 = await prisma.game.upsert({
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

const game11 = await prisma.game.upsert({
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

const game12 = await prisma.game.upsert({
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

const game13 = await prisma.game.upsert({
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

const game14 = await prisma.game.upsert({
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

const game15 = await prisma.game.upsert({
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

const game16 = await prisma.game.upsert({
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

const game17 = await prisma.game.upsert({
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

const game18 = await prisma.game.upsert({
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

const game19 = await prisma.game.upsert({
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

const game20 = await prisma.game.upsert({
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

const game21 = await prisma.game.upsert({
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

const game22 = await prisma.game.upsert({
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

const game23 = await prisma.game.upsert({
    where: {
        gameNumber: 23,
    },
    update: {},
    create: {
        gameNumber: 23,
        leftPlayer: 'tberube',
        leftPlayerScore: 5,
        rightPlayer: 'jvigneau',
        rightPlayerScore: 2,
        active: false,
        winner: 'tberube',
    },
})

const game24 = await prisma.game.upsert({
    where: {
        gameNumber: 24,
    },
    update: {},
    create: {
        gameNumber: 24,
        leftPlayer: 'jvigneau',
        leftPlayerScore: 4,
        rightPlayer: 'mleblanc',
        rightPlayerScore: 6,
        active: false,
        winner: 'mleblanc',
    },
})

const game25 = await prisma.game.upsert({
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

const game26 = await prisma.game.upsert({
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

const game27 = await prisma.game.upsert({
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

const game28 = await prisma.game.upsert({
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

const game29 = await prisma.game.upsert({
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
*/
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
