let numOfLikes= 0;
let numOfDislikes= 0;
const likeDisplay= document.getElementById("likes");
likeDisplay.innerHTML=numOfLikes;
const dislikeDisplay= document.getElementById("dislikes");
dislikeDisplay.innerHTML= numOfDislikes;
const thumbsUp = document.getElementById("thumbs-up");
const thumbsDown = document.getElementById("thumbs-down");
let likeExecuted=false;
let dislikeExecuted=false;

let likeDatabaseValue=0;
const likeValueToDb= ()=>{
  likeDatabaseValue= numOfLikes + numOfDislikes;
  if(likeDatabaseValue==1 && numOfDislikes==1){
    likeDatabaseValue=-1;

  }
  console.log(`likeDatabaseValue = ${likeDatabaseValue}`);
  sendToDb();
}
//adds 1 each time you click like
let likable=0;
//modulo determines whether its a like or unlike
let likeModulo = 0;
//adds 1 each time you click dislike
let dislikable=0;
//modulo determines whether its a dislike or undislike
let dislikeModulo = 0;
//this value determines if its the first opinion or subsequent opinion
// i.e insert to database or update database. updated after each action
let insertOrUpdateCounter= likable+dislikable;


//shows on webpage number of likes
const showLike=()=>{
  likeDisplay.innerHTML=numOfLikes;
}
const blueLike=()=>{
  thumbsUp.style.color="blue";
}
const unBlueLike=()=>{
  thumbsUp.style.color="black";
}

//shows on webpage number of dislikes
const showDislike=()=>{
  dislikeDisplay.innerHTML= numOfDislikes;
}
const redDislike=()=>{
  thumbsDown.style.color="red";
}
const unRedDislike=()=>{
  thumbsDown.style.color="black";
}
const addLike =()=>{
  likeExecuted=true;
  numOfLikes++;
  showLike();
  blueLike();
}

const addDislike =()=>{
  dislikeExecuted=true;
  numOfDislikes++;
  showDislike();
  redDislike();
}
const removeLike =()=>{
  likeExecuted=false;
  numOfLikes--;
  showLike();
  unBlueLike();
}
const removeDislike =()=>{
  dislikeExecuted=false;
  numOfDislikes--;
  showDislike();
  unRedDislike();
}
/**like only happens if like.executed= false.
if i like, like.executed= true and i cant like again, then add 1 to likes.
if dislike is true (meaning they had first disliked), make dislike.executed=false;
and if dislike.executed is true at that point then subtract 1 from dislikes and set it to false
display dislike- basically do nothing
if dislike.executed is not true then that means they haven't disliked before
liking and so i don't have to subtract from the dislike.
*/
const like=()=>{
  //add to like
  if(likeExecuted==false){
    addLike();
  }
  //remove dislike
  if(dislikeExecuted==true){
    removeDislike();
  }
  insertOrUpdateCounter++;
  console.log(insertOrUpdateCounter);
  likeValueToDb();
}

/**dislike only happens if dislike.executed=false.
 if i dislike, set dislike.executed=true and add 1 to dislike.

 in that instance of disliking, if they had already liked, i.e like.executed= true
 then set like.executed=false and subtract 1 from likes and then display it.
 if like.executed=false then they havent liked it prior and no subtraction is
 necessary from the num of liked
 */
const dislike=()=>{
  //dislike
  if(dislikeExecuted==false){
    addDislike();
  }

  //remove like
  if(likeExecuted==true){
    //unlike();
    removeLike();
  }
  insertOrUpdateCounter++;
  console.log(insertOrUpdateCounter);
  likeValueToDb();
}
/*you can only unlike if it has been liked
i.e likeExecuted=true
*/
const unlike=()=>{
  if(likeExecuted==true){
    removeLike();
  }
  insertOrUpdateCounter++;
  console.log(insertOrUpdateCounter);
  likeValueToDb();
}
/*You can only undislike if you have disliked
*/
const unDislike=()=>{
  if(dislikeExecuted==true){
    removeDislike();
  }
  insertOrUpdateCounter++;
  console.log(insertOrUpdateCounter);
  likeValueToDb();
}

const likeOrNot=()=>{
  if(likeModulo == 1){
    unlike();
  }
  else if (likeModulo == 0){
    like();
  }
  likable++;
  likeModulo= likable % 2;
}

//increases likable each time it is clicked so we know is it a like or unlike
const dislikeOrNot=()=>{
  if(dislikeModulo == 1){
    unDislike();
  }
  else if (dislikeModulo == 0){
    dislike();
  }
  dislikable++;
  dislikeModulo= dislikable % 2;
}
//fetch sends to server-handler.js 'opinion'
const sendToDb=()=>{
  fetch('/node/opinion/',{
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    //Todo:storyID must be changed to dynamic value, and also userId
    body: `firstLike=${insertOrUpdateCounter}&userId=11&likeDatabaseValue=${likeDatabaseValue}&storyID=${14}`
  }).then(res =>{
    console.log(res);
  })
}

/*UPDATE Views
        SET Views.like_story =1
        WHERE Views.user_Id =11 and Views.story_Id=14`*/
/*
* INSERT INTO Views (Views.user_Id,Views.story_Id,Views.like_story,view_count)
VALUES(11,'14',1,6)*/