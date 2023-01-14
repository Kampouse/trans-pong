import { Header } from '@nestjs/common';
import { RequestWithUser } from 'src/dtos/auth.dtos';
import { Inject, Injectable } from '@nestjs/common';
import {
  FriendDto,
  FriendRequestDto,
  MatchDto,
  AchievementDto,
  StatisticsDto,
  PrivateProfileDto,
  PublicProfileDto,
} from '../dtos/profile.dtos';
import { AuthService } from 'src/auth/auth.service';
import { prisma } from 'src/main';
import { User } from '.prisma/client';

@Injectable()
export class ProfileService {
  @Inject(AuthService)
  private readonly authService: AuthService;

  async authentificate(
    data: RequestWithUser,
    header?: Headers,
  ): Promise<string> {
    const value = this.authService.authenticate(header);
    return value.username;
  }

  friendList: FriendDto[] = [];
  friendRequests: FriendRequestDto[] = [];
  matchHistory: MatchDto[] = [];
  achievements: AchievementDto[] = [];

  insertFriend(user: string, photo: string, status: string) {
    const newFriend = new FriendDto(user, photo, status);
    this.friendList.push(newFriend);
  }

  insertFriendRequest(from: string, photo: string) {
    const newFriendRequest = new FriendRequestDto(from, photo);
    this.friendRequests.push(newFriendRequest);
  }

  insertMatch(
    matchNum: number,
    leftPlayer: string,
    leftPhoto: string,
    leftScore: number,
    rightPlayer: string,
    rightPhoto: string,
    rightScore: number,
    winner: string,
  ) {
    const newMatch = new MatchDto(
      matchNum,
      leftPlayer,
      leftPhoto,
      leftScore,
      rightPlayer,
      rightPhoto,
      rightScore,
      winner,
    );
    this.matchHistory.push(newMatch);
  }

  insertAchievement(title: string) {
    const newAchievement = new AchievementDto(title);
    this.achievements.push(newAchievement);
  }

  async getProfilePublic(login42: string): Promise<PublicProfileDto> {
    // Create prisma client and look if the username exist in the database

    const user = await prisma.user.findUnique({
      where: {
        username: login42,
      },
    });

    //  If he dosen't exist, return error true and everything at null
    if (!user) {
      return new PublicProfileDto(
        true,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      );
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
      },
    });

    const friendReceived = await prisma.friendRequest.findMany({
      where: {
        receiver: user.login42,
        status: 'accepted',
      },
    });

    if (friendSent) {
      for (const i in friendSent) {
        const friendUser = await prisma.user.findFirst({
          where: {
            login42: friendSent[i].receiver,
          },
        });
        if (friendUser)
          this.insertFriend(
            friendUser.username,
            friendUser.imagePath,
            friendUser.userStatus,
          );
      }
    }

    if (friendReceived) {
      for (const i in friendReceived) {
        const friendUser = await prisma.user.findFirst({
          where: {
            login42: friendReceived[i].sender,
          },
        });
        if (friendUser)
          this.insertFriend(
            friendUser.username,
            friendUser.imagePath,
            friendUser.userStatus,
          );
      }
    }

    // Get the match history and stats of the user
    const matchLeft = await prisma.game.findMany({
      where: {
        leftPlayer: user.login42,
        active: false,
      },
    });

    const matchRight = await prisma.game.findMany({
      where: {
        rightPlayer: user.login42,
        active: false,
      },
    });

    const leftPlayed = matchLeft.length;
    let leftWin = 0;
    const rightPlayed = matchRight.length;
    let rightWin = 0;

    if (matchLeft) {
      for (const i in matchLeft) {
        if (matchLeft[i].winner == user.login42) leftWin = leftWin + 1;
        const adversaire = await prisma.user.findFirst({
          where: {
            login42: matchLeft[i].rightPlayer,
          },
        });
        if (adversaire) {
          this.insertMatch(
            matchLeft[i].gameNumber,
            user.username,
            user.imagePath,
            matchLeft[i].leftPlayerScore,
            adversaire.username,
            adversaire.imagePath,
            matchLeft[i].rightPlayerScore,
            matchLeft[i].winner,
          );
        }
      }
    }

    if (matchRight) {
      for (const i in matchRight) {
        if (matchRight[i].winner == user.username) rightWin = rightWin + 1;
        const adversaire = await prisma.user.findFirst({
          where: {
            login42: matchRight[i].leftPlayer,
          },
        });
        if (adversaire) {
          this.insertMatch(
            matchRight[i].gameNumber,
            adversaire.username,
            adversaire.imagePath,
            matchRight[i].leftPlayerScore,
            user.username,
            user.imagePath,
            matchRight[i].rightPlayerScore,
            matchRight[i].winner,
          );
        }
      }
    }

    const played = leftPlayed + rightPlayed;
    const win = leftWin + rightWin;
    const winRatio = win / played;
    const letfWinRatio = leftWin / leftPlayed;
    const rightWinRatio = rightWin / rightPlayed;

    const stats = new StatisticsDto(
      played,
      win,
      winRatio,
      rightPlayed,
      rightWin,
      rightWinRatio,
      leftPlayed,
      leftWin,
      letfWinRatio,
    );

    // Order match in chronologic order
    let x = 0;
    const longeur = this.matchHistory.length;
    while (x < longeur) {
      if (
        x !== longeur - 1 &&
        this.matchHistory[x].matchNum < this.matchHistory[x + 1].matchNum
      ) {
        const temp = this.matchHistory[x];
        this.matchHistory[x] = this.matchHistory[x + 1];
        this.matchHistory[x + 1] = temp;
        x = 0;
      } else {
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
    if (achievement) {
      if (achievement.achiev1 == true) {
        this.insertAchievement('achievement-1');
      }
      if (achievement.achiev2 == true) {
        this.insertAchievement('achievement-2');
      }
      if (achievement.achiev3 == true) {
        this.insertAchievement('achievement-3');
      }
      if (achievement.achiev4 == true) {
        this.insertAchievement('achievement-4');
      }
      if (achievement.achiev5 == true) {
        this.insertAchievement('achievement-5');
      }
      if (achievement.achiev6 == true) {
        this.insertAchievement('achievement-6');
      }
      if (achievement.achiev7 == true) {
        this.insertAchievement('achievement-7');
      }
      if (achievement.achiev8 == true) {
        this.insertAchievement('achievement-8');
      }
      if (achievement.achiev9 == true) {
        this.insertAchievement('achievement-9');
      }
      if (achievement.achiev10 == true) {
        this.insertAchievement('achievement-10');
      }
      if (achievement.achiev11 == true) {
        this.insertAchievement('achievement-11');
      }
      if (achievement.achiev12 == true) {
        this.insertAchievement('achievement-12');
      }
      if (achievement.achiev13 == true) {
        this.insertAchievement('achievement-13');
      }
      if (achievement.achiev14 == true) {
        this.insertAchievement('achievement-14');
      }
      if (achievement.achiev15 == true) {
        this.insertAchievement('achievement-15');
      }
      if (achievement.achiev16 == true) {
        this.insertAchievement('achievement-16');
      }
      if (achievement.achiev17 == true) {
        this.insertAchievement('achievement-17');
      }
      if (achievement.achiev18 == true) {
        this.insertAchievement('achievement-18');
      }
      if (achievement.achiev19 == true) {
        this.insertAchievement('achievement-19');
      }
      if (achievement.achiev20 == true) {
        this.insertAchievement('achievement-20');
      }
      if (achievement.achiev21 == true) {
        this.insertAchievement('achievement-21');
      }
      if (achievement.achiev22 == true) {
        this.insertAchievement('achievement-22');
      }
      if (achievement.achiev23 == true) {
        this.insertAchievement('achievement-23');
      }
      if (achievement.achiev24 == true) {
        this.insertAchievement('achievement-24');
      }
      if (achievement.achiev25 == true) {
        this.insertAchievement('achievement-25');
      }
      if (achievement.achiev26 == true) {
        this.insertAchievement('achievement-26');
      }
      if (achievement.achiev27 == true) {
        this.insertAchievement('achievement-27');
      }
      if (achievement.achiev28 == true) {
        this.insertAchievement('achievement-28');
      }
      if (achievement.achiev29 == true) {
        this.insertAchievement('achievement-29');
      }
      if (achievement.achiev30 == true) {
        this.insertAchievement('achievement-30');
      }
    }

    // At last, return the ProfileResponse
    return new PublicProfileDto(
      false,
      user.username,
      user.userStatus,
      user.imagePath,
      this.friendList,
      this.matchHistory,
      this.achievements,
      stats,
    );
  }

  async getProfileEdit(login42: string): Promise<PrivateProfileDto> {
    // Create prisma client and look if the username exist in the database
    console.log(login42);
    const user = await prisma.user.findUnique({
      where: {
        login42: login42,
      },
    });

    //  If he dosen't exist, return error true and everything at null
    if (!user) {
      return new PrivateProfileDto(
        true,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      );
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
      },
    });

    const friendReceived = await prisma.friendRequest.findMany({
      where: {
        receiver: user.login42,
        status: 'accepted',
      },
    });

    if (friendSent) {
      for (const i in friendSent) {
        const friendUser = await prisma.user.findFirst({
          where: {
            login42: friendSent[i].receiver,
          },
        });
        if (friendUser)
          this.insertFriend(
            friendUser.username,
            friendUser.imagePath,
            friendUser.userStatus,
          );
      }
    }

    if (friendReceived) {
      for (const i in friendReceived) {
        const friendUser = await prisma.user.findFirst({
          where: {
            login42: friendReceived[i].sender,
          },
        });
        if (friendUser)
          this.insertFriend(
            friendUser.username,
            friendUser.imagePath,
            friendUser.userStatus,
          );
      }
    }

    // Get friend request's received by the user

    const friendReqs = await prisma.friendRequest.findMany({
      where: {
        receiver: user.login42,
        status: 'pending',
      },
    });

    if (friendReqs) {
      for (const i in friendReqs) {
        const senderUser = await prisma.user.findFirst({
          where: {
            login42: friendReqs[i].sender,
          },
        });
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
    });

    const matchRight = await prisma.game.findMany({
      where: {
        rightPlayer: user.login42,
        active: false,
      },
    });

    const leftPlayed = matchLeft.length;
    let leftWin = 0;
    const rightPlayed = matchRight.length;
    let rightWin = 0;

    if (matchLeft) {
      for (const i in matchLeft) {
        if (matchLeft[i].winner == user.login42) leftWin = leftWin + 1;
        const adversaire = await prisma.user.findFirst({
          where: {
            login42: matchLeft[i].rightPlayer,
          },
        });
        if (adversaire) {
          this.insertMatch(
            matchLeft[i].gameNumber,
            user.username,
            user.imagePath,
            matchLeft[i].leftPlayerScore,
            adversaire.username,
            adversaire.imagePath,
            matchLeft[i].rightPlayerScore,
            matchLeft[i].winner,
          );
        }
      }
    }

    if (matchRight) {
      for (const i in matchRight) {
        if (matchRight[i].winner == user.username) rightWin = rightWin + 1;
        const adversaire = await prisma.user.findFirst({
          where: {
            login42: matchRight[i].leftPlayer,
          },
        });
        if (adversaire) {
          this.insertMatch(
            matchRight[i].gameNumber,
            adversaire.username,
            adversaire.imagePath,
            matchRight[i].leftPlayerScore,
            user.username,
            user.imagePath,
            matchRight[i].rightPlayerScore,
            matchRight[i].winner,
          );
        }
      }
    }

    const played = leftPlayed + rightPlayed;
    const win = leftWin + rightWin;
    const winRatio = win / played;
    const letfWinRatio = leftWin / leftPlayed;
    const rightWinRatio = rightWin / rightPlayed;

    const stats = new StatisticsDto(
      played,
      win,
      winRatio,
      rightPlayed,
      rightWin,
      rightWinRatio,
      leftPlayed,
      leftWin,
      letfWinRatio,
    );

    // Order match in chronologic order
    let x = 0;
    const longeur = this.matchHistory.length;
    while (x < longeur) {
      if (
        x !== longeur - 1 &&
        this.matchHistory[x].matchNum < this.matchHistory[x + 1].matchNum
      ) {
        const temp = this.matchHistory[x];
        this.matchHistory[x] = this.matchHistory[x + 1];
        this.matchHistory[x + 1] = temp;
        x = 0;
      } else {
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
    if (achievement) {
      if (achievement.achiev1 == true) {
        this.insertAchievement('achievement-1');
      }
      if (achievement.achiev2 == true) {
        this.insertAchievement('achievement-2');
      }
      if (achievement.achiev3 == true) {
        this.insertAchievement('achievement-3');
      }
      if (achievement.achiev4 == true) {
        this.insertAchievement('achievement-4');
      }
      if (achievement.achiev5 == true) {
        this.insertAchievement('achievement-5');
      }
      if (achievement.achiev6 == true) {
        this.insertAchievement('achievement-6');
      }
      if (achievement.achiev7 == true) {
        this.insertAchievement('achievement-7');
      }
      if (achievement.achiev8 == true) {
        this.insertAchievement('achievement-8');
      }
      if (achievement.achiev9 == true) {
        this.insertAchievement('achievement-9');
      }
      if (achievement.achiev10 == true) {
        this.insertAchievement('achievement-10');
      }
      if (achievement.achiev11 == true) {
        this.insertAchievement('achievement-11');
      }
      if (achievement.achiev12 == true) {
        this.insertAchievement('achievement-12');
      }
      if (achievement.achiev13 == true) {
        this.insertAchievement('achievement-13');
      }
      if (achievement.achiev14 == true) {
        this.insertAchievement('achievement-14');
      }
      if (achievement.achiev15 == true) {
        this.insertAchievement('achievement-15');
      }
      if (achievement.achiev16 == true) {
        this.insertAchievement('achievement-16');
      }
      if (achievement.achiev17 == true) {
        this.insertAchievement('achievement-17');
      }
      if (achievement.achiev18 == true) {
        this.insertAchievement('achievement-18');
      }
      if (achievement.achiev19 == true) {
        this.insertAchievement('achievement-19');
      }
      if (achievement.achiev20 == true) {
        this.insertAchievement('achievement-20');
      }
      if (achievement.achiev21 == true) {
        this.insertAchievement('achievement-21');
      }
      if (achievement.achiev22 == true) {
        this.insertAchievement('achievement-22');
      }
      if (achievement.achiev23 == true) {
        this.insertAchievement('achievement-23');
      }
      if (achievement.achiev24 == true) {
        this.insertAchievement('achievement-24');
      }
      if (achievement.achiev25 == true) {
        this.insertAchievement('achievement-25');
      }
      if (achievement.achiev26 == true) {
        this.insertAchievement('achievement-26');
      }
      if (achievement.achiev27 == true) {
        this.insertAchievement('achievement-27');
      }
      if (achievement.achiev28 == true) {
        this.insertAchievement('achievement-28');
      }
      if (achievement.achiev29 == true) {
        this.insertAchievement('achievement-29');
      }
      if (achievement.achiev30 == true) {
        this.insertAchievement('achievement-30');
      }
    }

    // At last, return the ProfileResponse
    return new PrivateProfileDto(
      false,
      user.username,
      user.userStatus,
      user.imagePath,
      this.friendList,
      this.friendRequests,
      this.matchHistory,
      this.achievements,
      stats,
      user.authentificator,
    );
  }

  async updateUsername(newUsername: string, login42: string): Promise<any> {
    //  Find the user to update to
    const user = await prisma.user.findUnique({
      where: {
        login42: login42,
      },
    });
    if (!user) {
      return false;
    }

    //  Parse username for valid entry
    if (newUsername.length < 5) {
      return false;
    }

    if (newUsername.length > 12) {
      return false;
    }

    //  Put the username with a capital first letter and the rest in lowercase
    newUsername = newUsername.toLowerCase();
    newUsername = newUsername.at(0).toUpperCase() + newUsername.substring(1);
    try {
      await prisma.user.update({
        where: {
          login42: login42,
        },
        data: {
          username: newUsername,
        },
      });
    } catch {
      return false;
    }

    return true;
  }

  async updatePhoto(newFilePath: string, login42: string): Promise<any> {
    const user = await prisma.user.findUnique({
      where: {
        login42: login42,
      },
    });

    if (!user) {
      return { error: 'authentification failed' };
    }
    const path = '/' + newFilePath;
    try {
      await prisma.user.update({
        where: {
          login42: login42,
        },
        data: {
          imagePath: path,
        },
      });
    } catch {
      return { error: 'update failed' };
    }
    return { success: 'sucess' };
  }

  async addFriend(login42: string, newFriend: string) {
    //  First, find the login42 linked with the newFriend username
    let user;

    try {
      user = await prisma.user.findUnique({
        where: {
          username: newFriend,
        },
      });

      //  If the user dosent exist, return
      if (!user) {
        return;
      }
    } catch {}

    //  Then look if the two user pair in friend request already exist
    try {
      var requestExist = await prisma.friendRequest.findUnique({
        where: {
          sender_receiver: {
            sender: login42,
            receiver: user.login42,
          },
        },
      });

      if (requestExist) {
        return;
      }

      if (!requestExist) {
        var requestExist = await prisma.friendRequest.findUnique({
          where: {
            sender_receiver: {
              sender: user.login42,
              receiver: login42,
            },
          },
        });

        if (requestExist) {
          await prisma.friendRequest.update({
            where: {
              sender_receiver: {
                sender: user.login42,
                receiver: login42,
              },
            },
            data: {
              status: 'accepted',
            },
          });
          requestExist.status = 'accepted';
          return;
        }
      }
    } catch {}

    //  If we are here, the request dosen't exist so lets create it
    try {
      await prisma.friendRequest.create({
        data: {
          sender: login42,
          receiver: user.username,
        },
      });
    } catch {}
  }

  async denyRequest(login42: string, sender: string) {
    //  First, find the login42 linked with the newFriend username
    let user;

    try {
      user = await prisma.user.findUnique({
        where: {
          username: sender,
        },
      });

      //  If the user dosent exist, return
      if (!user) {
        return;
      }
    } catch {}

    //  Then, we look for the request this username -> login42 has sent an deny it
    try {
      const requestExist = await prisma.friendRequest.findUnique({
        where: {
          sender_receiver: {
            sender: user.login42,
            receiver: login42,
          },
        },
      });

      //  Then we change the request status to denied
      if (requestExist) {
        await prisma.friendRequest.update({
          where: {
            sender_receiver: {
              sender: user.login42,
              receiver: login42,
            },
          },
          data: {
            status: 'declined',
          },
        });
      }
    } catch {}
    return;
  }

  async blockUser(login42: string, userToBlock: string) {
    //  First, find the user associated with userToBlock
    let user;

    try {
      user = await prisma.user.findUnique({
        where: {
          username: userToBlock,
        },
      });

      //  If the user dosent exist, return
      if (!user) {
        return;
      }
    } catch {}

    //  Create a block rule in the database
    try {
      await prisma.block.create({
        data: {
          blocker: login42,
          blocked: user.login42,
        },
      });

      //  Remove friend request if they were friends
      let request = await prisma.friendRequest.findUnique({
        where: {
          sender_receiver: {
            sender: login42,
            receiver: user.login42,
          },
        },
      });

      if (request) {
        await prisma.friendRequest.delete({
          where: {
            sender_receiver: {
              sender: login42,
              receiver: user.login42,
            },
          },
        });
      }

      if (!request) {
        request = await prisma.friendRequest.findUnique({
          where: {
            sender_receiver: {
              sender: user.login42,
              receiver: login42,
            },
          },
        });
      }

      if (request) {
        await prisma.friendRequest.delete({
          where: {
            sender_receiver: {
              sender: user.login42,
              receiver: login42,
            },
          },
        });
      }
    } catch {}
  }

  async createAuth(login42: string) {
    'use strict';

    const authentificator = require('authenticator');

    //  Look if the user already has a key generated

    let user;

    try {
      user = await prisma.user.findUnique({
        where: {
          login42: login42,
        },
      });
    } catch {}

    //  If the user already has a key, load a qr code associated
    if (user.authKey != 'none') {
      console.log('Key already exist');
      var otAuth = authentificator.generateTotpUri(
        user.authKey,
        login42 + '@42qc.ca',
        'Trans-Pong',
        'SHA1',
        6,
        30,
      );
      return { QRcode: otAuth };
    }

    //  Else, create a new key

    const formattedKey = authentificator.generateKey();

    try {
      user = await prisma.user.findUnique({
        where: {
          login42: login42,
        },
      });

      if (!user || user.authenticator == true) {
        return { QRcode: 'failed' };
      }

      await prisma.user.update({
        where: {
          login42: login42,
        },
        data: {
          authKey: formattedKey,
        },
      });

      var otAuth = authentificator.generateTotpUri(
        formattedKey,
        login42 + '@42qc.ca',
        'Trans-Pong',
        'SHA1',
        6,
        30,
      );
      return { QRcode: otAuth };
    } catch {}
  }

  async creationValidation(login42: string, token: string) {
    'use strict';

    const authentificator = require('authenticator');

    //  Validate token entered and format it
    token.trim();
    if (token.length != 6 && !(token.length == 7 && token[3] == ' ')) {
      return null;
    }

    let formattedToken;

    if (token.length == 7) {
      formattedToken = token.substring(0, 3) + token.substring(4, 7);
    } else {
      formattedToken = token;
    }

    let user;

    //  Get user and protection
    try {
      user = await prisma.user.findUnique({
        where: {
          login42: login42,
        },
      });

      if (!user || !user.authKey) {
        return null;
      }
    } catch {}

    const status = authentificator.verifyToken(user.authKey, formattedToken);

    if (status != null) {
      try {
        await prisma.user.update({
          where: {
            login42: login42,
          },
          data: {
            authentificator: true,
          },
        });
      } catch {}
    }
    return status;
  }

  async removeAuth(login42: string, token: string) {
    const authentificator = require('authenticator');

    //  Validate token entered and format it
    token.trim();
    if (token.length != 6 && !(token.length == 7 && token[3] == ' ')) {
      return null;
    }

    let formattedToken;

    if (token.length == 7) {
      formattedToken = token.substring(0, 3) + token.substring(4, 7);
    } else {
      formattedToken = token;
    }

    let user;

    //  Get user and protection
    try {
      user = await prisma.user.findUnique({
        where: {
          login42: login42,
        },
      });

      if (!user || !user.authKey) {
        return null;
      }
    } catch {}

    console.log(user.authKey, formattedToken);

    const status = authentificator.verifyToken(user.authKey, formattedToken);

    if (status != null) {
      try {
        await prisma.user.update({
          where: {
            login42: login42,
          },
          data: {
            authentificator: false,
            authKey: 'none',
          },
        });
      } catch {}
    }
    return status;
  }

  public async findAll() {
    const users: User[] = await prisma.user.findMany({
      where: {
        username: {
          not: null,
        },
      },
    });
    return users;
  }

  //  Find one user by id.
  public async findOneById(id: string) {
    const user: User = await prisma.user.findUnique({
      where: { userID: id },
    });

    if (!user) {
      return null;
    }
    return user;
  }
}
