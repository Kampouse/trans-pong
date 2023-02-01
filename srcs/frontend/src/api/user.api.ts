import { PrivateProfileDto } from "utils/user.dto";

export class UserAPI
{
    public static async isLoggedIn(): Promise<{loggedIn: boolean}> {
        const resp = await fetch(`http://localhost:3000/auth/isLogged`, {
          credentials: "include",
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          }
        });
        
      return (resp.ok? resp.json() : {loggedIn: false});
    }

    public static async getUserProfile(): Promise<PrivateProfileDto | null> {
        const resp = await fetch(`http://localhost:3000/auth/who`, {
            credentials: "include",
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': 'true',
            }
        });
          
        return (resp.ok? resp.json() : null);
    }
    public static async addBlock(blockedId: string): Promise<PrivateProfileDto | null> {
        const resp = await fetch(`http://localhost:3000/profile/blocks/${blockedId}`, {
          credentials: "include",
          method: "POST",
          body: blockedId,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          }
        });
        return (resp.ok? resp.json() : null);
      }
    
      public static async removeBlock(blockedId: string): Promise<PrivateProfileDto | null> {
        const resp = await fetch(`http://localhost:3000/profile/unblocks/${blockedId}`, {
          credentials: "include",
          method: "DELETE",
          body: blockedId,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
          }
        });
    
        return (resp.ok? resp.json() : null);
      }

}

/*
export function Fetch(url: string, method?: string, body?: string) {
  let header = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  }
  if(method != ""){
    return fetch(url, {headers: header, credentials: 'include', method: method, body: body})
  }
  return fetch(url, { headers: header, credentials: 'include', body:body })

const check = async () =>
  // {
  //   Fetch('http://localhost:3000/auth/who')
  //     .then((response) => response.status)
  //     .then((status) =>
  //     {
  //       if (status == 200)
  //       {
  //           console.log("User is authentificated, proceed to open the dashboard")
  //           setLogin('login')
  //           socket.emit("userUpdate")
  //       }
  //       else
  //       {
  //         navigate('/')
  //           console.log("No user logged, please login.")
  //       }
  //     })
  // }
}
*/