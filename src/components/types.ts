export interface User {
	username: string;
	id: string;
	firstname?: string;
	lastname?: string;
}

export interface ChatRoom {
	code: string;
	users: Array<User>;
	owner: User;
	admins: Array<User>;
	status: string; // public, private or password protected
	password: string;
	// image?: HTMLImageElement | null;
}