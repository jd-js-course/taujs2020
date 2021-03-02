//הגדרת מערך שמכיל את מאגר המילים למשחק
var hardWords = [
    "קונספט",
    "פרזנטציה",
    "אוטוקאד",
    "סקצאפ",
    "סקצבוק",
    "פרומרקר",
    "אריסטו",
    "פלדיו",
    "ברניני",
    "ברונלסקי",
    "מיכאלנגלו",
    "גאודי",
    "קורבוזייה"
];
//הגדרת משתנה שיקבל לתוכו את המילה שצריך לנחש מתוך המערך שהגדרנו
let answer = '';
let newAnswer = '';
//הגדרת משתנה למספר טעויות מקסימלי
let maxwrong = 3;
//הגדרת משתנה שסופר את הטעויות בניחוש
let mistakes = 0;
// הגדרת משתנה שיקבל לתוכו מערך של אותיות אותן השחקן מנחש
let guessed = [];
//הגדרת משתנה שמציג לנו את הקווקווים והאותיות שניחשנו נכון
let wordStatus = null;
let win = 'ניצחת !!';
let lose = 'הפסדת !!';
//פונקציה שמגרילה מילה רנדומלית מתוך המאגר ומכניסה את הערך שלה למשתנה שהגדרנו
function randomWord() {
    answer = hardWords[Math.floor(Math.random() * hardWords.length)];
    newAnswer = answer.slice();
}

//פונקציה שמייצרת את כפתורי המקלדת, מקבלת מערך של אותיות בעברית ומפרידה כל אות במערך לכפתור משלה
function generateButtons() {
    let buttonsHtml = 'אבגדהוזחטיכלמנסעפצקרשתןםךףץ'.split('').map(letter =>
        `
        <button
        class="btn btn-lg btn-primary m-2"
        id='`+ letter +`'
        onClick="handleGuess('`+ letter +`')"
        >
        `+ letter +`
        </button>
        `
    ).join('');
    document.getElementById('keyboard').innerHTML = buttonsHtml;
}

/*פונקציה שמקבלת משתנה של האות שהשחקן לחץ עליה ובודקת האם היא נמצאת במערך האותיות שהשחקן ניחש
 אם לא- האות תיכנס למערך, אחרת האות לא תיכנס למערך. בנוסף הפונקציה מבטלת את הכפתורים של האותיות שהשחקן ניחש
 לאחר מכן היא בודקת האם האות שהשחקן ניחש היא נכונה אז קוראים לפונקציה שמעדכנת את התצוגה של הניחוש, ולפונקציה שבודקת אם ההשחקן ניצח
 אם האות אינה נכונה קוראים לפונקציה שמעדכנת את הטעויות, לפונקציה שבודקת אם השחקן הפסיד, ולפונקציה שמעדכנת את התמונה*/
function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute('disabled', true);

    if (answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        while (newAnswer.indexOf(chosenLetter)>=0){
            newAnswer = newAnswer.replace(chosenLetter,'');
        }
        checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
        mistakes++;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

/* פונקציה שמשנה את התמונה של האיש התלוי בהתאם לכמות הטעויות שהשחקן צבר
כאשר השמות של התמונות מתאימים למספר הטעויות שמתעדכן בתוך המשתנה*/
function updateHangmanPicture() {
    document.getElementById('hangmanPic').src = './images/hard' + mistakes + '.PNG';
}

/* פונקציה שלוקחת את המילה שצריך לנחש ומכניסה אותה למערך שכל איבר בו הוא אות אחרת של המילה
הפונקציה עוברת על כל אות במערך ובודקת אם השחקן ניחש אותה, במידה וכן היא מחזירה את האות שהשחקן ניחש נכון
ובמידה ולא היא מחזירה קו תחתון*/
function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : "  _  ")).join('');
    document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

//פונקציה שמעדכנת את ספירת הטעויות בפינת המסך
function updateMistakes() {
    document.getElementById('mistakes').innerHTML = mistakes;
}

//פונקציה שבודקת אם הערכים במערך האותיות שהשחקן ניחש זהים לתשובה הנכונה ומחזירה הודעת ניצחון 
function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById('keyboard').innerHTML = win;

    }
}

/* פונקציה שבודקת אם מספר הטעויות שהשחקן צבר זהה למסםר הטעויות המקסימלי
אם כן הפונקציה מחזירה הודעת הפסד ואת התשובה הנכונה*/
function checkIfGameLost() {
    if (mistakes === maxwrong) {
        document.getElementById('wordSpotlight').innerHTML = 'התשובה היא: ' + answer
        document.getElementById('keyboard').innerHTML = lose;
        document.getElementById("clueBtn").disabled = true;

    }
}

//פונקציה שמאפסת את המשחק
function reset() {
    mistakes = 0;
    guessed = [];
    document.getElementById('hangmanPic').src = './images/hard/0.PNG';
    document.getElementById("clueBtn").disabled = false;
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

//עדכון מספר הטעויות המקסימלי לפי המשתנה שהגדרנו
document.getElementById('maxWrong').innerHTML = maxwrong;

//פונקציה שמחזירה את השחקן למסך הבית של המשחק
function homePage(){

}


/*פונקציה שנוותנת רמז למילה 
מגרילה אות רנדומלית מתוך המילה 
ניתן לקבל רק רמז אחד ולאחר מכן לא יהיה ניתן ללחוץ על הכפתור שוב*/
function getClue(clue){
clue = newAnswer.charAt(Math.floor(Math.random()*newAnswer.length));
document.getElementById("clueBtn").disabled = true;
alert(clue);
   }
   

document.getElementById('hangmanPic').src = './images/hard/0.PNG';
randomWord();
generateButtons();
guessedWord();

