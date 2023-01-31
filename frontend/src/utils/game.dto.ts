export class Game
{
    constructor(
    public leftPlayer:          string,
    public leftPlayerPhoto:     string,
    public rightPlayer:         string,
    public rightPlayerPhoto:    string,
    public gameID:              string 
    ){};
}

export class ActiveGameDto
{
    constructor(
        public  games:   Game[],
    ){}
    
}