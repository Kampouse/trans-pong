export interface User {
	username: string;
	id: string;
	blockedUsers: Array<User>;
	status: string; // online, playing or offline
	matchHistory: Array<Matches>;
	friendList: Array<User>;
	friendRequests: Array<User>;
	achievements: Array<Achievement>;
	firstname: string;
	lastname: string;
}

export interface Matches {
	scoreUser: number;
	scoreOpp: number;
	opponent: User;
	result: string; // wn or loss
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

export interface Achievement {
	id: string;
	name: string;
	description: string;
	achieved: boolean;
}

export function initAchievement(): Achievement[] {
	return (
		[ 
			{id: 'FirstSteps', name: 'First steps', description: 'Welcome to the game!', achieved: true},
			{id: 'UploadImage', name: 'Upload image', description: 'Change your profile pic', achieved: true},
			{id: 'FirstMessage', name: 'First message', description: 'Write your first message in the chat', achieved: true},
			{id: 'FirstFriend', name: 'First friend', description: 'Add someone to your friend list', achieved: true},
			{id: 'ChangeSettings', name: 'Change settings', description: 'Customize your game', achieved: true},
			{id: 'FirstWin', name: 'First win', description: 'Win your first match', achieved: true},
			{id: 'WonByGiveUp', name: 'Won by give up', description: 'Your opponent withdrew from the game', achieved: true},
			{id: 'Wins5', name: '5 wins', description: 'Win 5 matches', achieved: true},
			{id: 'Wins10', name: '10 wins', description: 'Win 10 matches', achieved: true},
			{id: 'Wins25', name: '25 wins', description: 'Win 25 matches', achieved: true},
			{id: 'Wins50', name: '50 wins', description: 'Win 50 matches', achieved: true},
			{id: 'Wins100', name: '100 wins', description: 'Win 100 matches', achieved: true},
			{id: 'Row3', name: '3 in a row', description: 'Win 3 matches in a row', achieved: true},
			{id: 'Row5', name: '5 in a row', description: 'Win 5 matches in a row', achieved: true},
			{id: 'Row10', name: '10 in a row', description: 'Win 10 matches in a row', achieved: true},
			{id: 'Row15', name: '15 in a row', description: 'Win 15 matches in a row', achieved: true},
			{id: 'Row20', name: '20 in a row', description: 'Win 20 matches in a row', achieved: true},
			{id: 'Shut5', name: 'Shut 5 times', description: 'Win 5-0 5 times', achieved: true},
			{id: 'Shut10', name: 'Shut 10 times', description: 'Win 5-0 10 times', achieved: true},
			{id: 'Shut15', name: 'Shut 15 times', description: 'Win 5-0 15 times', achieved: true},
			{id: 'Shut20', name: 'Shut 20 times', description: 'Win 5-0 20 times', achieved: true},
			{id: 'Shut25', name: 'Shut 25 times', description: 'Win 5-0 25 times', achieved: true},
			{id: 'Points25', name: '25 points', description: 'Score 25 points', achieved: true},
			{id: 'Points50', name: '50 points', description: 'Score 50 points', achieved: true},
			{id: 'Points100', name: '100 points', description: 'Score 100 points', achieved: true},
			{id: 'Points250', name: '250 points', description: 'Score 250 points', achieved: true},
			{id: 'Points500', name: '500 points', description: 'Score 500 points', achieved: true},
			{id: 'Diamond', name: 'Diamond trophy', description: 'Get all achievements', achieved: true}
		]
	);
}

// = {name: 'First Steps', description: 'Welcome to the game!', achieved: false}