import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { FriendDto, FriendRequestDto, MatchDto, AchievementDto, StatisticsDto, PrivateProfileDto, PublicProfileDto } from '../dtos/profile.dtos';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ProfileService
{
    @Inject(AuthService)
    private readonly authService: AuthService

    async authentificate(data: any)
    {
        return(await this.authService.authentificateSession(data));
    }

    friendList: FriendDto[] = [];
    friendRequests: FriendRequestDto[] = [];
    matchHistory: MatchDto[] = [];
    achievements: AchievementDto[] = [];

    insertFriend(user: string, photo: string, status: string)
    {
        const newFriend = new FriendDto(user, photo, status);
        this.friendList.push(newFriend);
    }

    insertFriendRequest(from: string, photo: string)
    {
        const newFriendRequest = new FriendRequestDto(from, photo);
        this.friendRequests.push(newFriendRequest);
    }

    insertMatch(matchNum: number, leftPlayer: string, leftPhoto: string, leftScore: number,
        rightPlayer: string, rightPhoto: string, rightScore: number,
        winner: string)
    {
        const newMatch = new MatchDto(matchNum, leftPlayer, leftPhoto, leftScore, rightPlayer,
            rightPhoto, rightScore, winner);
        this.matchHistory.push(newMatch);
    }

    insertAchievement(title: string)
    {
        const newAchievement = new AchievementDto(title);
        this.achievements.push(newAchievement);
    }

    async getProfilePublic(login42: string): Promise<PublicProfileDto>
    {
        // Create prisma client and look if the username exist in the database
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
            where: {
                login42: login42,
            },
        });

        //  If he dosen't exist, return error true and everything at null
        if (!user)
        {
            await prisma.$disconnect();
            return new PublicProfileDto(true, null, null, null, null, null, null, null);
        }

        //  Free the array's from previous values
        this.friendList = [];
        this.friendRequests = [];
        this.achievements = [];
        this.matchHistory = [];

        //  Free the array's from previous values
        this.friendList = [];
        this.friendRequests = [];
        this.achievements = [];
        this.matchHistory = [];

        //  Build the response

        //  Get friends of user
        const friendSent = await prisma.friendRequest.findMany({
            where: {
                sender: user.login42,
                status: 'accepted',
            }
        })

        const friendReceived = await prisma.friendRequest.findMany({
            where: {
                receiver: user.login42,
                status: 'accepted',
            }
        })

        if (friendSent)
        {
            for (let i in friendSent)
            {
                const friendUser = await prisma.user.findFirst({
                    where: {
                        login42: friendSent[i].receiver,
                    }
                })
                if (friendUser)
                    this.insertFriend(friendUser.username, friendUser.imagePath, friendUser.userStatus);
            }
        }

        if (friendReceived)
        {
            for (let i in friendReceived)
            {
                const friendUser = await prisma.user.findFirst({
                    where: {
                        login42: friendReceived[i].sender,
                    }
                })
                if (friendUser)
                    this.insertFriend(friendUser.username, friendUser.imagePath, friendUser.userStatus);
            }
        }

        // Get the match history and stats of the user
        const matchLeft = await prisma.game.findMany({
            where: {
                leftPlayer: user.login42,
                active: false,
            },
        })

        const matchRight = await prisma.game.findMany({
            where: {
                rightPlayer: user.login42,
                active: false,
            },
        })

        var leftPlayed = matchLeft.length;
        var leftWin = 0;
        var rightPlayed = matchRight.length;
        var rightWin = 0;

        if (matchLeft)
        {
            for (let i in matchLeft)
            {
                if (matchLeft[i].winner == user.login42)
                    leftWin = leftWin + 1;
                const adversaire = await prisma.user.findFirst({
                    where: {
                        login42: matchLeft[i].rightPlayer,
                    },
                })
                if (adversaire)
                {
                    this.insertMatch(matchLeft[i].gameNumber, user.username, user.imagePath,
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
                        login42: matchRight[i].leftPlayer,
                    },
                })
                if (adversaire)
                {
                    this.insertMatch(matchRight[i].gameNumber, adversaire.username,
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

        const stats = new StatisticsDto(played, win, winRatio, rightPlayed,
                rightWin, rightWinRatio, leftPlayed, leftWin, letfWinRatio);

        // Order match in chronologic order
        var x = 0;
        var longeur = this.matchHistory.length;
        while (x < longeur)
        {
            if (x !== longeur - 1 && this.matchHistory[x].matchNum < this.matchHistory[x + 1].matchNum)
            {
                var temp = this.matchHistory[x];
                this.matchHistory[x] = this.matchHistory[x + 1];
                this.matchHistory[x + 1] = temp;
                x = 0;
            }
            else
            {
                x = x + 1;
            }
        }

        // Get all accomplished achievements
        const achievement = await prisma.achievement.findUnique({
            where: {
                userID: user.userID,
            },
        });

        //  Sorry for the spaguethi guys, time is an issue lol
        if (achievement)
        {
            if (achievement.achiev1 == true)
            {
                this.insertAchievement("achievement-1");
            }
            if (achievement.achiev2 == true)
            {
                this.insertAchievement("achievement-2");
            }
            if (achievement.achiev3 == true)
            {
                this.insertAchievement("achievement-3");
            }
            if (achievement.achiev4 == true)
            {
                this.insertAchievement("achievement-4");
            }
            if (achievement.achiev5 == true)
            {
                this.insertAchievement("achievement-5");
            }
            if (achievement.achiev6 == true)
            {
                this.insertAchievement("achievement-6");
            }
            if (achievement.achiev7 == true)
            {
                this.insertAchievement("achievement-7");
            }
            if (achievement.achiev8 == true)
            {
                this.insertAchievement("achievement-8");
            }
            if (achievement.achiev9 == true)
            {
                this.insertAchievement("achievement-9");
            }
            if (achievement.achiev10 == true)
            {
                this.insertAchievement("achievement-10");
            }
            if (achievement.achiev11 == true)
            {
                this.insertAchievement("achievement-11");
            }
            if (achievement.achiev12 == true)
            {
                this.insertAchievement("achievement-12");
            }
            if (achievement.achiev13 == true)
            {
                this.insertAchievement("achievement-13");
            }
            if (achievement.achiev14 == true)
            {
                this.insertAchievement("achievement-14");
            }
            if (achievement.achiev15 == true)
            {
                this.insertAchievement("achievement-15");
            }
            if (achievement.achiev16 == true)
            {
                this.insertAchievement("achievement-16");
            }
            if (achievement.achiev17 == true)
            {
                this.insertAchievement("achievement-17");
            }
            if (achievement.achiev18 == true)
            {
                this.insertAchievement("achievement-18");
            }
            if (achievement.achiev19 == true)
            {
                this.insertAchievement("achievement-19");
            }
            if (achievement.achiev20 == true)
            {
                this.insertAchievement("achievement-20");
            }
            if (achievement.achiev21 == true)
            {
                this.insertAchievement("achievement-21");
            }
            if (achievement.achiev22 == true)
            {
                this.insertAchievement("achievement-22");
            }
            if (achievement.achiev23 == true)
            {
                this.insertAchievement("achievement-23");
            }
            if (achievement.achiev24 == true)
            {
                this.insertAchievement("achievement-24");
            }
            if (achievement.achiev25 == true)
            {
                this.insertAchievement("achievement-25");
            }
            if (achievement.achiev26 == true)
            {
                this.insertAchievement("achievement-26");
            }
            if (achievement.achiev27 == true)
            {
                this.insertAchievement("achievement-27");
            }
            if (achievement.achiev28 == true)
            {
                this.insertAchievement("achievement-28");
            }
            if (achievement.achiev29 == true)
            {
                this.insertAchievement("achievement-29");
            }
            if (achievement.achiev30 == true)
            {
                this.insertAchievement("achievement-30");
            }
        }

        // At last, return the ProfileResponse
        await prisma.$disconnect();
        return new PublicProfileDto(false, user.username, user.userStatus, user.imagePath,
            this.friendList, this.matchHistory, this.achievements , stats);
    }

    async getProfileEdit(login42: string): Promise<PrivateProfileDto>
    {
        // Create prisma client and look if the username exist in the database
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where: {
                login42: login42
            },
        });

        //  If he dosen't exist, return error true and everything at null
        if (!user)
        {
            await prisma.$disconnect();
            return new PrivateProfileDto(true, null, null, null, null, null, null, null, null, null);
        }

        //  Free the array's from previous values
        this.friendList = [];
        this.friendRequests = [];
        this.achievements = [];
        this.matchHistory = [];

        //  Build the response

        //  Get friends of user
        const friendSent = await prisma.friendRequest.findMany({
            where: {
                sender: user.login42,
                status: 'accepted',
            }
        })

        const friendReceived = await prisma.friendRequest.findMany({
            where: {
                receiver: user.login42,
                status: 'accepted',
            }
        })

        if (friendSent)
        {
            for (let i in friendSent)
            {
                const friendUser = await prisma.user.findFirst({
                    where: {
                        login42: friendSent[i].receiver,
                    }
                })
                if (friendUser)
                    this.insertFriend(friendUser.username, friendUser.imagePath, friendUser.userStatus);
            }
        }

        if (friendReceived)
        {
            for (let i in friendReceived)
            {
                const friendUser = await prisma.user.findFirst({
                    where: {
                        login42: friendReceived[i].sender,
                    }
                })
                if (friendUser)
                    this.insertFriend(friendUser.username, friendUser.imagePath, friendUser.userStatus);
            }
        }

        // Get friend request's received by the user

        const friendReqs = await prisma.friendRequest.findMany({
            where:
            {
                receiver: user.login42,
                status: 'pending',
            },
        })

        if (friendReqs)
        {
            for (let i in friendReqs)
            {
                const senderUser = await prisma.user.findFirst({
                    where: {
                        login42: friendReqs[i].sender,
                    }
                })
                if (senderUser)
                    this.insertFriendRequest(senderUser.username, senderUser.imagePath);
            }
        }


        // Get the match history and stats of the user
        const matchLeft = await prisma.game.findMany({
            where: {
                leftPlayer: user.login42,
                active: false,
            },
        })

        const matchRight = await prisma.game.findMany({
            where: {
                rightPlayer: user.login42,
                active: false,
            },
        })

        var leftPlayed = matchLeft.length;
        var leftWin = 0;
        var rightPlayed = matchRight.length;
        var rightWin = 0;

        if (matchLeft)
        {
            for (let i in matchLeft)
            {
                if (matchLeft[i].winner == user.login42)
                    leftWin = leftWin + 1;
                const adversaire = await prisma.user.findFirst({
                    where: {
                        login42: matchLeft[i].rightPlayer,
                    },
                })
                if (adversaire)
                {
                    this.insertMatch(matchLeft[i].gameNumber, user.username, user.imagePath,
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
                        login42: matchRight[i].leftPlayer,
                    },
                })
                if (adversaire)
                {
                    this.insertMatch(matchRight[i].gameNumber, adversaire.username,
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

        const stats = new StatisticsDto(played, win, winRatio, rightPlayed,
                rightWin, rightWinRatio, leftPlayed, leftWin, letfWinRatio);

        // Order match in chronologic order
        var x = 0;
        var longeur = this.matchHistory.length;
        while (x < longeur)
        {
            if (x !== longeur - 1 && this.matchHistory[x].matchNum < this.matchHistory[x + 1].matchNum)
            {
                var temp = this.matchHistory[x];
                this.matchHistory[x] = this.matchHistory[x + 1];
                this.matchHistory[x + 1] = temp;
                x = 0;
            }
            else
            {
                x = x + 1;
            }
        }

        // Get all accomplished achievements
        const achievement = await prisma.achievement.findUnique({
            where: {
                userID: user.userID,
            },
        });

        //  Sorry for the spaguethi guys, time is an issue lol
        if (achievement)
        {
            if (achievement.achiev1 == true)
            {
                this.insertAchievement("achievement-1");
            }
            if (achievement.achiev2 == true)
            {
                this.insertAchievement("achievement-2");
            }
            if (achievement.achiev3 == true)
            {
                this.insertAchievement("achievement-3");
            }
            if (achievement.achiev4 == true)
            {
                this.insertAchievement("achievement-4");
            }
            if (achievement.achiev5 == true)
            {
                this.insertAchievement("achievement-5");
            }
            if (achievement.achiev6 == true)
            {
                this.insertAchievement("achievement-6");
            }
            if (achievement.achiev7 == true)
            {
                this.insertAchievement("achievement-7");
            }
            if (achievement.achiev8 == true)
            {
                this.insertAchievement("achievement-8");
            }
            if (achievement.achiev9 == true)
            {
                this.insertAchievement("achievement-9");
            }
            if (achievement.achiev10 == true)
            {
                this.insertAchievement("achievement-10");
            }
            if (achievement.achiev11 == true)
            {
                this.insertAchievement("achievement-11");
            }
            if (achievement.achiev12 == true)
            {
                this.insertAchievement("achievement-12");
            }
            if (achievement.achiev13 == true)
            {
                this.insertAchievement("achievement-13");
            }
            if (achievement.achiev14 == true)
            {
                this.insertAchievement("achievement-14");
            }
            if (achievement.achiev15 == true)
            {
                this.insertAchievement("achievement-15");
            }
            if (achievement.achiev16 == true)
            {
                this.insertAchievement("achievement-16");
            }
            if (achievement.achiev17 == true)
            {
                this.insertAchievement("achievement-17");
            }
            if (achievement.achiev18 == true)
            {
                this.insertAchievement("achievement-18");
            }
            if (achievement.achiev19 == true)
            {
                this.insertAchievement("achievement-19");
            }
            if (achievement.achiev20 == true)
            {
                this.insertAchievement("achievement-20");
            }
            if (achievement.achiev21 == true)
            {
                this.insertAchievement("achievement-21");
            }
            if (achievement.achiev22 == true)
            {
                this.insertAchievement("achievement-22");
            }
            if (achievement.achiev23 == true)
            {
                this.insertAchievement("achievement-23");
            }
            if (achievement.achiev24 == true)
            {
                this.insertAchievement("achievement-24");
            }
            if (achievement.achiev25 == true)
            {
                this.insertAchievement("achievement-25");
            }
            if (achievement.achiev26 == true)
            {
                this.insertAchievement("achievement-26");
            }
            if (achievement.achiev27 == true)
            {
                this.insertAchievement("achievement-27");
            }
            if (achievement.achiev28 == true)
            {
                this.insertAchievement("achievement-28");
            }
            if (achievement.achiev29 == true)
            {
                this.insertAchievement("achievement-29");
            }
            if (achievement.achiev30 == true)
            {
                this.insertAchievement("achievement-30");
            }
        }

        // At last, return the ProfileResponse
        await prisma.$disconnect();
        return new PrivateProfileDto(false, user.username, user.userStatus, user.imagePath,
            this.friendList, this.friendRequests, this.matchHistory, this.achievements, stats, user.authentificator);
    }

    async updateUsername(newUsername: string, login42: string) : Promise<any>
    {
        const prisma = new PrismaClient();

        //  Change this part here for user authentification

        const user = await prisma.user.findUnique({
            where: {
                login42: login42,
            },
        })

        if (!user)
        {
            await prisma.$disconnect();
            return (false);
        }

        try
        {
            await prisma.user.update({
                where: {
                    login42: login42
                },
                data: {
                    username: newUsername,
                }
            })
        }
        catch
        {
            await prisma.$disconnect();
            return ({error: "prisma update username error"})
        }

        await prisma.$disconnect();
        return (true);
    }

    async updatePhoto(newFilePath: string, login42: string) : Promise<any>
    {
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
            where:{
                login42: login42,
            },
        })
        
        if (!user)
        {
            await prisma.$disconnect();
            return ({error: "authentification failed"});
        }
        const path = "/" + newFilePath;
        try
        {
            await prisma.user.update({
                where: {
                    login42: login42,
                },
                data: {
                    imagePath: path,
                }
            })
        }
        catch
        {
            return ({error: "update failed"});
        }
        await prisma.$disconnect();
        return ({success: "sucess"});
    }
}
