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

// export interface Achievements {
// 	FirstSteps: AchievementsDsp;
// 	UploadImage: AchievementsDsp;
// 	FirstMessage: AchievementsDsp;
// 	FirstFriend: AchievementsDsp;
// 	ChangeSettings: AchievementsDsp;
// 	FirstWin: AchievementsDsp;
// 	WonByGiveUp: AchievementsDsp;
// 	Wins5: AchievementsDsp;
// 	Wins10: AchievementsDsp;
// 	Wins25: AchievementsDsp;
// 	Wins50: AchievementsDsp;
// 	Wins100: AchievementsDsp;
// 	Row3: AchievementsDsp;
// 	Row5: AchievementsDsp;
// 	Row10: AchievementsDsp;
// 	Row15: AchievementsDsp;
// 	Row20: AchievementsDsp;
// 	Shut5: AchievementsDsp;
// 	Shut10: AchievementsDsp;
// 	Shut15: AchievementsDsp;
// 	Shut20: AchievementsDsp;
// 	Shut25: AchievementsDsp;
// 	Points25: AchievementsDsp;
// 	Points50: AchievementsDsp;
// 	Points100: AchievementsDsp;
// 	Points250: AchievementsDsp;
// 	Points500: AchievementsDsp;
// 	Diamond: AchievementsDsp;
// }

export function initAchievement(): Achievement[] {
	return (
		[ 
			{id: 'FirstSteps', name: 'First steps', description: 'Welcome to the game!', achieved: false},
			{id: 'UploadImage', name: 'Upload image', description: 'Change your profile pic', achieved: false},
			{id: 'FirstMessage', name: 'First message', description: 'Write your first message in the chat', achieved: false},
			{id: 'FirstFriend', name: 'First friend', description: 'Add someone to your friend list', achieved: false},
			{id: 'ChangeSettings', name: 'Change settings', description: 'Customize your game', achieved: false},
			{id: 'FirstWin', name: 'First win', description: 'Win your first match', achieved: false},
			{id: 'WonByGiveUp', name: 'Won by give up', description: 'Your opponent withdrew from the game', achieved: false},
			{id: 'Wins5', name: '5 wins', description: 'Win 5 matches', achieved: false},
			{id: 'Wins10', name: '10 wins', description: 'Win 10 matches', achieved: false},
			{id: 'Wins25', name: '25 wins', description: 'Win 25 matches', achieved: false},
			{id: 'Wins50', name: '50 wins', description: 'Win 50 matches', achieved: false},
			{id: 'Wins100', name: '100 wins', description: 'Win 100 matches', achieved: false},
			{id: 'Row3', name: '3 in a row', description: 'Win 3 matches in a row', achieved: false},
			{id: 'Row5', name: '5 in a row', description: 'Win 5 matches in a row', achieved: false},
			{id: 'Row10', name: '10 in a row', description: 'Win 10 matches in a row', achieved: false},
			{id: 'Row15', name: '15 in a row', description: 'Win 15 matches in a row', achieved: false},
			{id: 'Row20', name: '20 in a row', description: 'Win 20 matches in a row', achieved: false},
			{id: 'Shut5', name: 'Shut 5 times', description: 'Win 5-0 5 times', achieved: false},
			{id: 'Shut10', name: 'Shut 10 times', description: 'Win 5-0 10 times', achieved: false},
			{id: 'Shut15', name: 'Shut 15 times', description: 'Win 5-0 15 times', achieved: false},
			{id: 'Shut20', name: 'Shut 20 times', description: 'Win 5-0 20 times', achieved: false},
			{id: 'Shut25', name: 'Shut 25 times', description: 'Win 5-0 25 times', achieved: false},
			{id: 'Points25', name: '25 points', description: 'Score 25 points', achieved: false},
			{id: 'Points50', name: '50 points', description: 'Score 50 points', achieved: false},
			{id: 'Points100', name: '100 points', description: 'Score 100 points', achieved: false},
			{id: 'Points250', name: '250 points', description: 'Score 250 points', achieved: false},
			{id: 'Points500', name: '500 points', description: 'Score 500 points', achieved: false},
			{id: 'Diamond', name: 'Diamond trophy', description: 'Get all achievements', achieved: false}
		]
	);
}

// = {name: 'First Steps', description: 'Welcome to the game!', achieved: false}