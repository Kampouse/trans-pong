export interface User {
	username: string;
	id: string;
	blockedUsers: Array<User>;
	status?: string;
	matchHistory?: Array<Matches>;
	friendList?: Array<User>;
	achievements?: Achievements;
	firstname?: string;
	lastname?: string;
}

export interface Matches {
	scoreUser: number;
	scoreOpp: number;
	opponent: User;
}

export interface Messages {
	message: string;
	user: User;
}

export interface ChatRoom {
	code: string;
	name: string;
	users: Array<User>;
	owner: User;
	admins: Array<User>;
	status: string; // public, private or password protected
	password: string;
	messages: Array<Messages>;
	image: HTMLImageElement | null;
}

export interface Achievements {
	FirstSteps: boolean;
	UploadImage: boolean;
	FirstMessage: boolean;
	FirstFriend: boolean;
	ChangeSettings: boolean;
	FirstWin: boolean;
	WonByGiveUp: boolean;
	Wins5: boolean;
	Wins10: boolean;
	Wins25: boolean;
	Wins50: boolean;
	Wins100: boolean;
	Row3: boolean;
	Row5: boolean;
	Row10: boolean;
	Row15: boolean;
	Row20: boolean;
	Shut5: boolean;
	Shut10: boolean;
	Shut15: boolean;
	Shut20: boolean;
	Shut25: boolean;
	Points25: boolean;
	Points50: boolean;
	Points100: boolean;
	Points250: boolean;
	Points500: boolean;
	Diamond: boolean;
}