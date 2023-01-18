import { UserDto } from "utils/user.dto";

export class UserAPI
{
    public static async isLoggedIn(): Promise<{loggedIn: boolean}> {
        const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/auth/isLogged`, {
          credentials: "include",
          method: "GET"
        });
        
        return (resp.ok? resp.json() : {loggedIn: false});
    }
    public static async getUserProfile(): Promise<UserDto | null> {
        const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/profile`, {
            credentials: "include",
            method: "GET"
        });
          
          return (resp.ok? resp.json() : null);
    }
    public static async addBlock(blockedId: string): Promise<UserDto | null> {
        const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/blocked`, {
          credentials: "include",
          method: "POST",
          headers: {'Content-Type': 'application/json'},
          body: blockedId,
        });
    
        return (resp.ok? resp.json() : null);
      }
    
      public static async removeBlock(blockedId: string): Promise<UserDto | null> {
        const resp = await fetch(`http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/users/blocked`, {
          credentials: "include",
          method: "DELETE",
          headers: {'Content-Type': 'application/json'},
          body: blockedId,
        });
    
        return (resp.ok? resp.json() : null);
      }

}