/* eslint-disable @typescript-eslint/no-var-requires */
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  ActiveGameDto,
  FriendDto,
  FriendRequestDto,
  MatchDto,
  StatisticsDto,
  PrivateProfileDto,
  PublicProfileDto,
  Game,
} from '../dtos/profile.dtos';
import { AuthService } from 'src/auth/auth.service';
import { prisma } from 'src/main';
import {
  responseDefault,
  responseUploadPhoto,
} from 'src/dtos/responseTools.dtos';
import { UserDto } from 'src/dtos/user.dtos';
import { User, UserStatus } from '@prisma/client';

@Injectable()
export class ProfileService {
  @Inject(forwardRef(() => AuthService))
  private readonly authService: AuthService;

  async authentificate(data: Request): Promise<string> {
    return await this.authService.authentificateSession(data);
  }

  friendList: FriendDto[] = [];
  friendRequests: FriendRequestDto[] = [];
  matchHistory: MatchDto[] = [];

  insertFriend(user: string, photo: string, status: string) {
    const newFriend = new FriendDto(user, photo, status);
    this.friendList.push(newFriend);
  }

  insertFriendRequest(from: string, photo: string) {
    const newFriendRequest = new FriendRequestDto(from, photo);
    this.friendRequests.push(newFriendRequest);
  }

  insertMatch(
    leftPlayer: string,
    leftPhoto: string,
    leftScore: number,
    rightPlayer: string,
    rightPhoto: string,
    rightScore: number,
    winner: string,
    updated: Date,
  ) {
    const newMatch = new MatchDto(
      leftPlayer,
      leftPhoto,
      leftScore,
      rightPlayer,
      rightPhoto,
      rightScore,
      winner,
      updated,
    );
    this.matchHistory.push(newMatch);
  }

  async getProfilePublic(login42: string): Promise<PublicProfileDto> {
    // Create prisma client and look if the username exist in the database

    let user;

    try {
      user = await prisma.user.findUnique({
        where: {
          username: login42,
        },
      });
    } catch {}

    //  If he dosen't exist, return error true and everything at null
    if (!user) {
      return new PublicProfileDto(true, null, null, null, null, null, null);
    }

    //  Free the array's from previous values
    this.friendList = [];
    this.friendRequests = [];
    this.matchHistory = [];

    //  Free the array's from previous values
    this.friendList = [];
    this.friendRequests = [];
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
            user.username,
            user.imagePath,
            matchLeft[i].leftPlayerScore,
            adversaire.username,
            adversaire.imagePath,
            matchLeft[i].rightPlayerScore,
            matchLeft[i].winner,
            matchLeft[i].updatedAt,
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
            adversaire.username,
            adversaire.imagePath,
            matchRight[i].leftPlayerScore,
            user.username,
            user.imagePath,
            matchRight[i].rightPlayerScore,
            matchRight[i].winner,
            matchRight[i].updatedAt,
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
        this.matchHistory[x].updatedAt < this.matchHistory[x + 1].updatedAt
      ) {
        const temp = this.matchHistory[x];
        this.matchHistory[x] = this.matchHistory[x + 1];
        this.matchHistory[x + 1] = temp;
        x = 0;
      } else {
        x = x + 1;
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
      stats,
    );
  }

  async getProfileEdit(login42: string): Promise<PrivateProfileDto> {
    // Create prisma client and look if the username exist in the database
    let user;

    try {
      user = await prisma.user.findUnique({
        where: {
          login42: login42,
        },
      });
    } catch {}

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
      );
    }

    //  Free the array's from previous values
    this.friendList = [];
    this.friendRequests = [];
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
            user.username,
            user.imagePath,
            matchLeft[i].leftPlayerScore,
            adversaire.username,
            adversaire.imagePath,
            matchLeft[i].rightPlayerScore,
            matchLeft[i].winner,
            matchLeft[i].updatedAt,
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
            adversaire.username,
            adversaire.imagePath,
            matchRight[i].leftPlayerScore,
            user.username,
            user.imagePath,
            matchRight[i].rightPlayerScore,
            matchRight[i].winner,
            matchRight[i].updatedAt,
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
        this.matchHistory[x].updatedAt < this.matchHistory[x + 1].updatedAt
      ) {
        const temp = this.matchHistory[x];
        this.matchHistory[x] = this.matchHistory[x + 1];
        this.matchHistory[x + 1] = temp;
        x = 0;
      } else {
        x = x + 1;
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
      stats,
      user.authenticator,
    );
  }

  async updateUsername(
    newUsername: string,
    login42: string,
  ): Promise<responseDefault> {
    const response = new responseDefault(
      true,
      'Username change to ' + newUsername + ' successful.',
    );

    //  Find the user to update to
    const user = await prisma.user.findUnique({
      where: {
        login42: login42,
      },
    });
    if (!user) {
      response.message = 'Update username Error 00: Unauthorised client.';
      return response;
    }

    //  Parse username for valid entry
    if (newUsername.length < 5) {
      response.message =
        "Update username Error 01: Username must have more than 4 character's.";
      return response;
    }

    if (newUsername.length > 12) {
      response.message =
        "Update username Error 02: Username max number of character's is 12.";
      return response;
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
      response.message =
        'Update username Error 04: Username change failed due to database update error.';
      return response;
    }

    response.error = false;
    return response;
  }

  async getPhoto(login42: string): Promise<responseDefault> {
    const response = new responseDefault(true, '/defaultPhoto.png');
    let user;

    try {
      user = await prisma.user.findUnique({
        where: { login42: login42 },
      });
    } catch {}

    if (user != undefined) {
      response.message = user.imagePath;
      response.error = false;
    }
    return response;
  }

  async getAuth(login42: string): Promise<responseDefault> {
    const response = new responseDefault(false, 'inactive');
    let user;

    try {
      user = await prisma.user.findUnique({
        where: { login42: login42 },
      });
    } catch {}

    if (user != undefined) {
      if (user.authenticator == true) {
        console.log('auth is active');
        response.message = 'active';
        return response;
      }
    }
    return response;
  }

  async getActiveGames(): Promise<ActiveGameDto> {
    const array: Game[] = [];
    let games;
    let leftPlayer;
    let rightPlayer;

    //  Get every active games
    //  TODO: change active to true after tests
    try {
      games = await prisma.game.findMany({
        where: {
          active: true,
        },
      });
    } catch {}

    //  If there is some active games, insert them in an array of games
    if (games) {
      for (const i in games) {
        //  Set both player to undefined

        leftPlayer = undefined;
        rightPlayer = undefined;

        //  Try to Find left Player
        try {
          leftPlayer = await prisma.user.findUnique({
            where: {
              login42: games[i].leftPlayer,
            },
          });
        } catch {}

        //  Try to find right player
        try {
          rightPlayer = await prisma.user.findUnique({
            where: {
              login42: games[i].rightPlayer,
            },
          });
        } catch {}

        //  Add the game to the array if both player are found in the database
        if (leftPlayer != undefined && rightPlayer != undefined) {
          const newGame = new Game(
            leftPlayer.username,
            leftPlayer.imagePath,
            rightPlayer.username,
            rightPlayer.imagePath,
            games[i].gameRoomID,
          );
          array.push(newGame);
        }
      }
    }

    //  Create the Active game data object with the array and return it.
    const response = new ActiveGameDto(array);
    return response;
  }

  async updatePhoto(
    newFilePath: string,
    login42: string,
  ): Promise<responseUploadPhoto> {
    const response = new responseUploadPhoto(
      true,
      'Photo upload successful',
      'not changed',
    );

    const user = await prisma.user.findUnique({
      where: {
        login42: login42,
      },
    });

    if (!user) {
      response.message = 'Upload photo Error 00: Unauthorised client';
      return response;
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
      response.error = false;
      response.photo = path;
      return response;
    } catch {
      response.message =
        'Upload photo Error 01: Upload photo in database failed.';
      return response;
    }
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
      const requestExist = await prisma.friendRequest.findUnique({
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
        const requestExist = await prisma.friendRequest.findUnique({
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

        await prisma.friendRequest.create({
          data: {
            sender: login42,
            receiver: user.login42,
          },
        });
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
      const otAuth = authentificator.generateTotpUri(
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

      const otAuth = authentificator.generateTotpUri(
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

    const authenticator = require('authenticator');

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

    const status = authenticator.verifyToken(user.authKey, formattedToken);

    if (status != null) {
      try {
        await prisma.user.update({
          where: {
            login42: login42,
          },
          data: {
            authenticator: true,
          },
        });
      } catch {}
    }
    return status;
  }

  async removeAuth(login42: string, token: string) {
    'use strict';

    const authenticator = require('authenticator');

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

    const status = authenticator.verifyToken(user.authKey, formattedToken);

    if (status != null) {
      try {
        await prisma.user.update({
          where: {
            login42: login42,
          },
          data: {
            authenticator: false,
            authKey: 'none',
          },
        });
      } catch {}
    }
    return status;
  }

  async getUserId(login42: string) {
    let user;

    try {
      user = await prisma.user.findUnique({
        where: { login42: login42 },
      });
    } catch {}

    if (user != undefined) {
      return { userid: user.userID };
    }
    return undefined;
  }

  async getSinglePlayerData(login42: string) {
    let user;

    try {
      user = await prisma.user.findUnique({
        where: { login42: login42 },
      });
    } catch {}

    if (user != undefined) {
      const login = user.username;
      const photo = user.imagePath;
      return {
        login: login,
        photo: photo,
      };
    }
    return undefined;
  }

  // Utility Method to get dto from entity
  private entityToDto(user: User): UserDto {
    const userDto = new UserDto();

    userDto.userID = user.userID;
    userDto.login42 = user.login42;
    userDto.username = user.username;
    userDto.userStatus = user.userStatus;
    userDto.friends = user.friendsofthisuser
      ? user.friendsofthisuser.map((x) => this.entityToDto(x))
      : [];
    userDto.blocked = user.blockedbythisuser
      ? user.blockedbythisuser.map((x) => this.entityToDto(x))
      : [];
    //userDto.friends = user.userFriends.map;
    //userDto.blocked = null;

    //userDto.friends = (await user.friends).map((x) => this.entityToDto(x));
    //userDto.blocked = (await user.blocked).map((x) => this.entityToDto(x));
    userDto.authenticator = user.authenticator;
    userDto.imagePath = user.imagePath;
    return userDto;
  }

  // Find one user by id
  public async findOneById(id: string) {
    const user: User = await prisma.user.findUnique({
      where: { userID: id },
      //include: { userFriends: true },
    });
    if (!user) return null;
    const userDto: UserDto = this.entityToDto(user);
    return userDto;
  }

  public async setStatus(id: string, status: UserStatus): Promise<UserDto> {
    const user = await prisma.user.findUnique({ where: { userID: id } });
    if (!user) {
      return null;
    }
    const updatedUser = await prisma.user.update({
      where: { userID: id },
      data: { userStatus: status },
    });
    // convert the updated user object to a DTO
    const userDto = this.entityToDto(updatedUser);
    return userDto;
  }
}
