  //var deck = ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "hj", "hq", "hk", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "cj", "cq", "ck", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "dj", "dq", "dk","s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "sj", "sq", "sk"]
  
  var suit;
  var deck=[];
  var playerTotal=0;
  var dealerTotal=0;
  var playerCardsTurned = 2;
  
  //get started
  initaliseGame();
  
  function initaliseGame(){
  document.getElementById("console").innerHTML = "";
  var playerCardsTurned = 2;
  document.getElementById("deal").disabled = false;
  document.getElementById("stick_dealer").disabled = false;
  playerTotal=0;
  dealerTotal=0;
  clearTheDecks();
  createDeck();
  initialDeal();
  }
  
  function clearTheDecks(){
  document.getElementById("player").innerHTML = "";
  document.getElementById("dealer").innerHTML = "";
  document.getElementById("playerTotal").innerHTML = "";
  document.getElementById("dealerTotal").innerHTML = "";
  }
  
  function createDeck(){
  
  createCardObject("clubs");
  createCardObject("diamonds");
  createCardObject("spades");
  createCardObject("hearts");
  
  }
  
  function createCardObject(suit){
  
  for (i=1; i<14; i++)
  {
  initialiseCards(i, suit);
  }
  }
  
  function initialiseCards(x, s){
  switch(x) {
  case 1:
  var card = {
  name:"ace of "+s,
  value: 11,
  isAce:true
  }; 
  break;
  case 11:
  var card = {
  name:"jack of "+s,
  value: 10,
  isAce:false
  }; 
  break;
  case 12:
  var card = {
  name:"queen of "+s,
  value: 10,
  isAce:false
  };
  break;
  case 13:
  var card = {
  name:"king of "+s,
  value: 10,
  isAce:false
  }; 
  break;			
  default:
  var card = {
  name:i+" of "+s,
  value: i,
  isAce:false
  }; 
  } 
  deck.push(card);
  }  
  
  function initialDeal(){
  
  //player
  document.getElementById("player").innerHTML = playerDeal()+", "+playerDeal();
  
  //dealer
  document.getElementById("dealer").innerHTML = dealerDeal();
  
  if (playerTotal>21){
  document.getElementById("console").innerHTML = "You lose as you've gone over 21. Dealer wins.";
  buttonDisable();
  }
  
  
  }
  
  function playerDeal(){
  var deckIndex = Math.floor(Math.random() * deck.length);
  var dealtCard = deck[deckIndex].name;
  if (deck[deckIndex].isAce){
  var r = confirm("ACE DRAWN. Aces are currently high. Click OK to keep ace high or CANCEL to make ace low");
  if (r == true) {
  playerTotal+=11;
  document.getElementById("playerTotal").innerHTML = playerTotal;
  } else {
  playerTotal+=1;
  document.getElementById("playerTotal").innerHTML = playerTotal;
  }
  }else{
  playerTotal += deck[deckIndex].value;
  document.getElementById("playerTotal").innerHTML = playerTotal;
  }
  deck.splice(deckIndex,1);
  return dealtCard;
  }
  
  function dealerDeal(){
  var deckIndex = Math.floor(Math.random() * deck.length);
  var dealtCard = deck[deckIndex].name;
  if (deck[deckIndex].isAce){
  //dealer 'selects' aces to be high or low
  if (Math.floor(Math.random() * 2) <1) {
  //aces remain high
  dealerTotal+=11;
  document.getElementById("dealerTotal").innerHTML = dealerTotal;
  } else {
  //aces lo=w
  dealerTotal+=1;
  document.getElementById("dealerTotal").innerHTML = dealerTotal;
  }
  }else{
  dealerTotal += deck[deckIndex].value;
  document.getElementById("dealerTotal").innerHTML = dealerTotal;
  }
  deck.splice(deckIndex,1);
  return dealtCard;
  }
  
  function hit(){
  if(playerCardsTurned<6){
  document.getElementById("player").innerHTML += ", "+playerDeal();
  playerCardsTurned++;
  if(playerTotal>21)
  {
  document.getElementById("console").innerHTML = "You lose as you've gone over 21. Dealer wins. Click 'New game' to restart.";
  buttonDisable()
  }
  }else{
  document.getElementById("console").innerHTML = "You have drawn your maximum number of 5 cards. Click 'stick/dealer deal' to continue";
  document.getElementById("deal").disabled = true;
  }
  }
  
  function stick(){
  document.getElementById("deal").disabled = true;
  document.getElementById("dealer").innerHTML += ", "+dealerDeal();
  if(dealerTotal>playerTotal && dealerTotal <21)
  {
  buttonDisable();
  document.getElementById("console").innerHTML = "Dealer's cards beat yours. You lose. Click 'New game' to restart.";
  buttonDisable();
  }else if (dealerTotal==21)
  {
  buttonDisable();
  document.getElementById("console").innerHTML = "Dealer wins. Click 'New game' to restart.";
  buttonDisable()
  }else if (dealerTotal>21){
  document.getElementById("console").innerHTML = "You win as dealer has gone over 21. Dealer loses. Click 'New game' to restart.";
  buttonDisable();
  }
  }
  
  function buttonDisable()
  {
  document.getElementById("deal").disabled = true;
  document.getElementById("stick_dealer").disabled = true;
  }
  
  
