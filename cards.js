
$(document).ready(function(){

const rank_set = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
const suit_set = ['S','C','H','D'];
let discardlist = [];

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
    i = Math.floor(Math.random() * (m+1));
    // And swap it with the current element.
    [this.deck[m], this.deck[i]] = [this.deck[i], this.deck[m]];
  }
  return this;
}

function PlayerConstructor(name, initCardCount, deckName){
    this.name = name;
    this.hand = this.initializeHand(initCardCount, deckName);
}

PlayerConstructor.prototype.initializeHand = function(initCardCount, deckName){
    let hand = [], i;
    for (i = 0; i < initCardCount; i++){
        hand[i] = deckName.deal();
    }
    return hand;
}

PlayerConstructor.prototype.updateHand = function(deckName, action = 'hit', discardIndicies = []){
    if (action === 'hit'){
        this.hand.push(deckName.deal())
    }
    if (action === 'draw'){
        for (let i = 0; i < discardIndicies.length; i++){
            this.hand.splice(i,1,deckName.deal());
        }
    }
}

let mydeck = new DeckConstructor();

mydeck.shuffle();

$('.player').submit(function(){
    var player = new PlayerConstructor($('input').val(), 5, mydeck);
    $('#welcome').html('');
    $('#welcome').append(`<h4>Welcome ${player.name}.  Your hand as delt is :`);
    for (let i = 0; i < player.hand.length; i++){
        $('#welcome').append(` <button id='${i}'>${player.hand[i].name}</button> `);
    }
    $('#welcome').append(`<h4>There are ${mydeck.deck.length} cards remaining in the deck.</h4><h4> You can discard as many as three cards from your hand.  Click on the cards above you would like to discard and hit the Draw button.</h4><form  class="draw" action="" method="post"><input class='draw' type="submit" name="Draw" value='Draw'></form>`);
    return false;
})

$(document.body).on('click', 'button' ,function(){
    $(this).addClass('discard');
    console.log($(this).attr('id'));
    console.log(Number($(this).attr('id')));
    discardlist.push(Number($(this).attr('id')))
    console.log(discardlist);
})

$(document.body).on('click', '.draw' ,function(){
    event.preventDefault();
    player.updateHand(mydeck,'draw',discardlist)
    console.log(player.hand);
    $('#welcome').html('');
    $('#welcome').append(`<h4>Welcome ${player.name}.  Your hand after your draw is :`);
    for (let i = 0; i < player.hand.length; i++){
        $('#welcome').append(` <button id='${i}'>${player.hand[i].name}</button> `);
    }
    $('#welcome').append(`<h4>There are ${mydeck.deck.length} cards remaining in the deck.</h4>`);
})

});
