export interface User {
	username: string;
	id: string;
	blockedUsers: Array<User>;
	firstname?: string;
	lastname?: string;
}

export interface Messages {
	message: string;
	user: User;
}

export interface ChatRoom {
	code: string;
	users: Array<User>;
	owner: User;
	admins: Array<User>;
	status: string; // public, private or password protected
	password: string;
	messages: Array<Messages>;
	image: HTMLImageElement | null;
}