const rank_set = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const suit_set = ['S','C','H','D'];

function CardConstructor(suit = suit_set[Math.floor(Math.random() * suit_set.length)], rank = rank_set[Math.floor(Math.random() * rank_set.length)]){
    this.suit = suit;
    this.rank = rank;
    this.name = this.rank + this.suit;
};

function DeckConstructor(){
    this.deck = makeDeck();
    function makeDeck(){
        let i, j, ordered_deck = [];
        for (i in suit_set){
            for (j in rank_set){
                ordered_deck.push(new CardConstructor(suit_set[i],rank_set[j]));
            }
        }
        return ordered_deck
    }
}

DeckConstructor.prototype.deal = function(){
    return this.deck.pop();
}

DeckConstructor.prototype.shuffle = function(){
  let m, i;
  // While there remain elements to shuffle…
  for (m = this.deck.length - 1; m > 0; m--) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m);
    // And swap it with the current element.
    [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
  }
  console.log('this.deck just before leaving shuffle()');
  console.log(this.deck);
  return this;
}

let myFirstDeck = new DeckConstructor();
let my2ndDeck = new DeckConstructor();

console.log('myFirstDeck just after creation');
console.log(myFirstDeck);


console.log(myFirstDeck);

myFirstDeck.shuffle();

console.log(myFirstDeck);
console.log("my2ndDeck");
console.log(my2ndDeck);

var deltcard = my2ndDeck.deal();
console.log(deltcard);
console.log('2nd deak post deal');
console.log(my2ndDeck);
myFirstDeck.deal();
console.log(myFirstDeck);
myFirstDeck.deal();
console.log(myFirstDeck);
