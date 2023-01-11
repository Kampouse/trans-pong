import { AvatarDto } from "./dto/avatar.dto";
import { UserDto } from "./dto/user.dto";

export class UserAPI {
  
  public static async isLoggedIn(): Promise<{loggedIn: boolean}> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/auth/isLogged`, {
      credentials: "include",
      method: "GET"
    });
    
    return (resp.ok? resp.json() : {loggedIn: false});
  }
  
  public static async logout(): Promise<void> {
    await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/auth/logout`, {
      method: "DELETE", 
      credentials: "include",
    })
  }
  
  public static async getUserProfile(): Promise<UserDto | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/profile`, {
        credentials: "include",
        method: "GET"
      });
      
      return (resp.ok? resp.json() : null);
    }

  public static async getOneUserById(id: string): Promise<UserDto | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/${id}`, {
        credentials: "include",
        method: "GET"
      });
      
      return (resp.ok? resp.json() : null);
    }

  public static async getAllUsers(): Promise<{users: UserDto[]}> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/`, {
        credentials: "include",
        method: "GET"
      });
      
      return (resp.ok? resp.json() : {users: []});
    }

    public static async addAvatar(formData: FormData): Promise<void> {
      await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/avatar`, {
        credentials: "include",
        method: "POST",
        body: formData
    })
    
  }

  public static async getAllAvatars(): Promise<AvatarDto[] | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/avatars`, {
      credentials: "include",
      method: "GET"
    });

    return (resp.ok? resp.json() : null);
  }

  public static async removeAvatar(id: number): Promise<void> {
    await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/avatar/${id}`, {
        credentials: "include",
        method: "DELETE"
    })
  }

  public static async updateAvatar(id: number): Promise<UserDto | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/avatar/${id}`, {
      credentials: "include",
      method: "POST"
    });

    return (resp.ok? resp.json() : null);
  }

  public static async updateName(name: string): Promise<UserDto | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/updateName`, {
      credentials: "include",
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name: name})
    });
    
    return (resp.ok? resp.json() : null);
  }

  public static async disableTfa(): Promise<UserDto | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/turnOffTfa`, {
      credentials: "include",
      method: "POST",
    });
    
    return (resp.ok? resp.json() : null);
  }

  public static async generateQrCode(): Promise<Blob | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/auth/2fa/generate`, {
      credentials: "include",
      method: "GET",
    });

    return (resp.ok? resp.blob() : null);
  }

  public static async validateTfa(code: string): Promise<{valid: boolean}> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/auth/2fa/validate`, {
      credentials: "include",
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ code: code})
    });

    return (resp.ok? resp.json() : {valid: false});
  }

  public static async addFriend(friendId: number): Promise<UserDto | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/friend`, {
      credentials: "include",
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id: friendId})
    });

    return (resp.ok? resp.json() : null);
  }

  public static async removeFriend(friendId: number): Promise<UserDto | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/friend`, {
      credentials: "include",
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id: friendId})
    });

    return (resp.ok? resp.json() : null);
  }

  public static async addBlock(blockedId: number): Promise<UserDto | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/blocked`, {
      credentials: "include",
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id: blockedId})
    });

    return (resp.ok? resp.json() : null);
  }

  public static async removeBlock(blockedId: number): Promise<UserDto | null> {
    const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/blocked`, {
      credentials: "include",
      method: "DELETE",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ id: blockedId})
    });

    return (resp.ok? resp.json() : null);
  }
}