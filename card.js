// Basic values
var A = 14, J = 11, Q = 12, K = 13;
var originalDeck = {
	1:[A,2,3,4,5,6,7,8,9,10,J,Q,K],
	2:[A,2,3,4,5,6,7,8,9,10,J,Q,K],
	4:[A,2,3,4,5,6,7,8,9,10,J,Q,K],
	8:[A,2,3,4,5,6,7,8,9,10,J,Q,K]
};

var deck = [], board = [];
var players = [];
var maxPlayerCard = [];
// Reset Game
function reset() {
	deck = [];
	board = [];
	players = [];
}

// Main function
function newGame(numberOfPlayers) {
	let i, p1BestCard, p2BestCard;
	deck = originalDeck;
	setPlayerCards(numberOfPlayers);
	// Flop
	board = [draw(), draw(), draw(), draw()]
	// Turn
	board.push(draw());
	// River
	board.push(draw());
//	console.log(board);
	let count;
	for(i=0;i<board.length;i++)
		$("#communityCards").append(printCard(board[i][0],board[i][1], "class='cards'"));
	for(count = 0; count<numberOfPlayers;count++)
		for(i=0;i<2;i++)
			$("#playerCards").append(printCard(players[count][i][0],players[count][i][1],"class='cards' id='player'"));
}

function setPlayerCards(num) {
	let i;
	for(i=0;i<num;i++) {
		players[i] = [draw(), draw()];
	}
}

function setMaxPlayerCards(num) {
	let i;
	for(i=0;i<num;i++) {
		maxPlayerCard[i] = Math.max(players[i][0][0], players[i][1][0]);
	}
}

// function winner(arr) {
// 	let i, winner, maxScore = 0;
// 	for(i=0; i<arr.length; i++)
// }

function draw() {
	let suits;
	do {
		var chosenSuit = Object.keys(deck)[Math.floor(Math.random()*4)]
		suits = deck[chosenSuit]
	} while(suits.length == 0);
	var face = Math.floor(Math.random()*suits.length);
	var box = suits[suits.length - 1];
	suits[suits.length - 1] = suits[face];
	suits[face] = box;
	var card = suits.pop();
	return [card, parseInt(chosenSuit)];
}

function score(communityCards, hand) {
	let score = 0, a, b, c, d, e, allCombi = [], counter = 0;
	let totalCards = communityCards.slice(0);

		totalCards.push(hand[0])
		totalCards.push(hand[1])
// To find all the combinations.
	for(a = 0; a < totalCards.length-4;a+=1)
	for(b = a+1; b < totalCards.length-3;b+=1)
	for(c = b+1; c < totalCards.length-2;c+=1)
	for(d = c+1; d < totalCards.length-1;d+=1)
	for(e = d+1; e < totalCards.length;e+=1,counter++)
		allCombi[counter] = [totalCards[a],totalCards[b],totalCards[c],totalCards[d],totalCards[e]];
// To find the maximum score in all of the combinations
	for(a = 0; a < 21; a++) {
		score =	Math.max(score, rankPokerHand([
						allCombi[a][0][0],
						allCombi[a][1][0],
						allCombi[a][2][0],
						allCombi[a][3][0],
						allCombi[a][4][0]],[
						allCombi[a][0][1],
						allCombi[a][1][1],
						allCombi[a][2][1],
						allCombi[a][3][1],
						allCombi[a][4][1]]));
	}
	return score;
}

// Factorial function
function factorial(num) {
	if(num>0)
		return num * factorial(num - 1)		
	else
		return 1;
}

function winningHand(scoreArray) {

}

//Calculates the Rank of a 5 card Poker hand using bit manipulations.
function rankPokerHand(face,suit) {
 	var v, i, o, s = 1<<face[0]|1<<face[1]|1<<face[2]|1<<face[3]|1<<face[4];
 	for (i=-1, v=o=0; i<5; i++, o=Math.pow(2,face[i]*4)) {v += o*((v/o&15)+1);}
 	v = v % 15 - ((s/(s&-s) == 31) || (s == 0x403c) ? 3 : 1);
 	v -= (suit[0] == (suit[1]|suit[2]|suit[3]|suit[4])) * ((s == 0x7c00) ? -5 : 1);
 	let scoreArray = [8,9,5,6,1,2,3,10,4,7];
 	return scoreArray[v];
}

// Return the hand rank based on the score
function printHand(rank) {
	let handRanks = ["", "High Card", "Pair", "Two Pair", "Three of a Kind", "Straight", "Flush", "Full House", "Four of a Kind", "Straight Flush", "Royal Flush"];
	return handRanks[rank];
}

// Print the card
function printCard(face, suit, id = "") {
	let cardFaces = ["", "", "2","3","4","5","6","7","8","9","10","jack","queen","king","ace"]
	let cardSuits = ["", "clubs", "hearts", "", "spades", "", "", "", "diamonds"];
	var cardAddress = "<img ".concat(id," src='images/card-", cardFaces[face],"-", cardSuits[suit], ".png'", " />");
	// console.log(cardAddress);
	return cardAddress;
}


newGame(5);