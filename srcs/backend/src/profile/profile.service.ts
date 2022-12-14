import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { match } from 'assert';
import { ProfileResponse, Friend, FriendRequest, Match, Achievement, Statistics} from './profile.model';

@Injectable()
export class ProfileService
{

    insertFriend(friendList: Friend[], user: string, photo: string, status: string)
    {
        const newFriend = new Friend(user, photo, status);
        friendList.push(newFriend);
    }

    insertFriendRequest(friendRequests: FriendRequest[], from: string, photo: string)
    {
        const newFriendRequest = new FriendRequest(from, photo);
       friendRequests.push(newFriendRequest);
    }

    insertMatch(matchHistory: Match[], matchNum: number, leftPlayer: string, leftPhoto: string, leftScore: number,
        rightPlayer: string, rightPhoto: string, rightScore: number,
        winner: string)
    {
        const newMatch = new Match(matchNum, leftPlayer, leftPhoto, leftScore, rightPlayer,
            rightPhoto, rightScore, winner);
        matchHistory.push(newMatch);
    }

    insertAchievement(achievements: Achievement[], title: string)
    {
        const newAchievement = new Achievement(title);
        achievements.push(newAchievement);
    }

    async getProfile(usernameParam: string): Promise<ProfileResponse>
    {
        // Create prisma client and look if the username exist in the database
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where: {
                username: usernameParam,
            },
        });

        //  If he dosen't exist, return error true and everything at null
        if (!user)
            return new ProfileResponse(true, null, null, null, null, null, null, null, null, null, null);

        //  Build the response

        //  Look if the profile is the client connected
        //  TODO: EDIT after auth done
        var clientPro = false;

        //  Get friends of user
        const friendSent = await prisma.friendRequest.findMany({
            where: {
                sender: user.username,
                status: 'accepted',
            }
        })

        const friendReceived = await prisma.friendRequest.findMany({
            where: {
                receiver: user.username,
                status: 'accepted',
            }
        })

        const friendList = new Friend[friendSent.length + friendReceived.length];

        if (friendSent)
        {
            for (let i in friendSent)
            {
                const friendUser = await prisma.user.findFirst({
                    where: {
                        username: friendSent[i].receiver,
                    }
                })
                if (friendUser)
                    this.insertFriend(friendList, friendSent[i].receiver, friendUser.imagePath, friendUser.userStatus);
            }
        }

        if (friendReceived)
        {
            for (let i in friendReceived)
            {
                const friendUser = await prisma.user.findFirst({
                    where: {
                        username: friendReceived[i].sender,
                    }
                })
                if (friendUser)
                    this.insertFriend(friendList, friendReceived[i].sender, friendUser.imagePath, friendUser.userStatus);
            }
        }

        // Get friend request's received by the user
        const friendReqs = await prisma.friendRequest.findMany({
            where:
            {
                receiver: user.username,
                status: 'pending',
            },
        })

        const friendReuests = new FriendRequest[friendReqs.length];

        if (friendReqs)
        {
            for (let i in friendReqs)
            {
                const senderUser = await prisma.user.findFirst({
                    where: {
                        username: friendReqs[i].sender,
                    }
                })
                if (senderUser)
                    this.insertFriendRequest(friendReuests, senderUser.username, senderUser.imagePath);
            }
        }

        // Get the match history and stats of the user
        const matchLeft = await prisma.game.findMany({
            where: {
                leftPlayer: user.username,
                active: false,
            },
        })

        const matchRight = await prisma.game.findMany({
            where: {
                rightPlayer: user.username,
                active: false,
            },
        })

        const matchHistory = new Match[matchLeft.length + matchRight.length];

        var leftPlayed = matchLeft.length;
        var leftWin = 0;
        var rightPlayed = matchRight.length;
        var rightWin = 0;

        if (matchLeft)
        {
            for (let i in matchLeft)
            {
                if (matchLeft[i].winner == user.username)
                    leftWin = leftWin + 1;
                const adversaire = await prisma.user.findFirst({
                    where: {
                        username: matchLeft[i].rightPlayer,
                    },
                })
                if (adversaire)
                {
                    this.insertMatch(matchHistory, matchLeft[i].gameNumber, user.username, user.imagePath,
                        matchLeft[i].leftPlayerScore, adversaire.username,
                        adversaire.imagePath, matchLeft[i].rightPlayerScore,
                        matchLeft[i].winner);
                }
            }
        }

        if (matchRight)
        {
            for (let i in matchRight)
            {
                if (matchRight[i].winner == user.username)
                    rightWin = rightWin + 1;
                const adversaire = await prisma.user.findFirst({
                    where: {
                        username: matchRight[i].leftPlayer,
                    },
                })
                if (adversaire)
                {
                    this.insertMatch(matchHistory, matchRight[i].gameNumber, adversaire.username,
                        adversaire.imagePath, matchRight[i].leftPlayerScore, user.username, user.imagePath,
                        matchRight[i].rightPlayerScore, matchRight[i].winner);
                }
            }
        }

        var played = leftPlayed + rightPlayed;
        var win = leftWin + rightWin;
        var winRatio = win / played;
        var letfWinRatio = leftWin / leftPlayed;
        var rightWinRatio = rightWin / rightPlayed;

        const stats = new Statistics(played, win, winRatio, rightPlayed,
                rightWin, rightWinRatio, leftPlayed, leftWin, letfWinRatio);

        // Order match in chronologic order
        var x = 0;
        var longeur = matchHistory.length;
        while (x < longeur)
        {
            if (x !== longeur - 1 && matchHistory[x].matchNum < matchHistory[x + 1].matchNum)
            {
                var temp = matchHistory[x];
                matchHistory[x] = matchHistory[x + 1];
                matchHistory[x + 1] = temp;
                x = 0;
            }
            x = x + 1;
        }

        // Get all accomplished achievements
        const achievement = await prisma.achievement.findUnique({
            where: {
                userID: user.userID,
            },
        });

        const achievements = new Achievement[30];

        //  Sorry for the spaguethi guys, time is an issue lol
        if (achievement)
        {
            if (achievement.achiev1 == true)
            {
                this.insertAchievement(achievements, "achievement-1");
            }
            if (achievement.achiev2 == true)
            {
                this.insertAchievement(achievements, "achievement-2");
            }
            if (achievement.achiev3 == true)
            {
                this.insertAchievement(achievements, "achievement-3");
            }
            if (achievement.achiev4 == true)
            {
                this.insertAchievement(achievements, "achievement-4");
            }
            if (achievement.achiev5 == true)
            {
                this.insertAchievement(achievements, "achievement-5");
            }
            if (achievement.achiev6 == true)
            {
                this.insertAchievement(achievements, "achievement-6");
            }
            if (achievement.achiev7 == true)
            {
                this.insertAchievement(achievements, "achievement-7");
            }
            if (achievement.achiev8 == true)
            {
                this.insertAchievement(achievements, "achievement-8");
            }
            if (achievement.achiev9 == true)
            {
                this.insertAchievement(achievements, "achievement-9");
            }
            if (achievement.achiev10 == true)
            {
                this.insertAchievement(achievements, "achievement-10");
            }
            if (achievement.achiev11 == true)
            {
                this.insertAchievement(achievements, "achievement-11");
            }
            if (achievement.achiev12 == true)
            {
                this.insertAchievement(achievements, "achievement-12");
            }
            if (achievement.achiev13 == true)
            {
                this.insertAchievement(achievements, "achievement-13");
            }
            if (achievement.achiev14 == true)
            {
                this.insertAchievement(achievements, "achievement-14");
            }
            if (achievement.achiev15 == true)
            {
                this.insertAchievement(achievements, "achievement-15");
            }
            if (achievement.achiev16 == true)
            {
                this.insertAchievement(achievements, "achievement-16");
            }
            if (achievement.achiev17 == true)
            {
                this.insertAchievement(achievements, "achievement-17");
            }
            if (achievement.achiev18 == true)
            {
                this.insertAchievement(achievements, "achievement-18");
            }
            if (achievement.achiev19 == true)
            {
                this.insertAchievement(achievements, "achievement-19");
            }
            if (achievement.achiev20 == true)
            {
                this.insertAchievement(achievements, "achievement-20");
            }
            if (achievement.achiev21 == true)
            {
                this.insertAchievement(achievements, "achievement-21");
            }
            if (achievement.achiev22 == true)
            {
                this.insertAchievement(achievements, "achievement-22");
            }
            if (achievement.achiev23 == true)
            {
                this.insertAchievement(achievements, "achievement-23");
            }
            if (achievement.achiev24 == true)
            {
                this.insertAchievement(achievements, "achievement-24");
            }
            if (achievement.achiev25 == true)
            {
                this.insertAchievement(achievements, "achievement-25");
            }
            if (achievement.achiev26 == true)
            {
                this.insertAchievement(achievements, "achievement-26");
            }
            if (achievement.achiev27 == true)
            {
                this.insertAchievement(achievements, "achievement-27");
            }
            if (achievement.achiev28 == true)
            {
                this.insertAchievement(achievements, "achievement-28");
            }
            if (achievement.achiev29 == true)
            {
                this.insertAchievement(achievements, "achievement-29");
            }
            if (achievement.achiev30 == true)
            {
                this.insertAchievement(achievements, "achievement-30");
            }
        }

        // At last, return the ProfileResponse
        return new ProfileResponse(false, clientPro, user.username, user.userStatus, user.imagePath,
            friendList, friendReuests, matchHistory, achievements, stats, user.authentificator);
    }
}
