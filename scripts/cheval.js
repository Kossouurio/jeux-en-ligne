var point1 = 0
var point2 = 0
var img = document.createElement("img");
img.src = "./images/victory.jpg";
var block = document.getElementById("terminer");
var img2 = document.createElement("img");
img2.src = "./images/gameover.jpg";

var imageCase1 = document.createElement("img");
imageCase1 = "./image/case1.jpg" 
var imageCase1Cheval = document.createElement("img");
imageCase1Cheval = "./image/case1cheval.jpg"
var imageCase2 = document.createElement("img");
imageCase2 = "./image/case2.jpg" 
var imageCase2Cheval = document.createElement("img");
imageCase2Cheval = "./image/case2cheval.jpg"




function reset(){
    point1 = 0;
    point2 = 0;
    document.getElementById("terminer").innerHTML = "";
    document.getElementById("deJoueur").innerHTML = "";
    document.getElementById("deOrdi").innerHTML = "";
    afficherScore();
}


function afficherScore(){
    var chaine = "votre cheval est sur la case numéro " + point1;
    var chaine2 = "le cheval adverse est sur la case numéro " + point2;
    document.getElementById("score").innerHTML = chaine;
    document.getElementById("score2").innerHTML = chaine2;
}

function lanceDe(){
    var resultatDe = Math.floor(1+ 6*Math.random());
    return resultatDe;
}


function lancerJoueur(){
    if (point1 < 20 && point2 < 20)
    {var lancer = lanceDe();
    point1 += lancer;
    document.getElementById("deJoueur").innerHTML = "vous avez obtenu un " + lancer
    afficherScore();
    placerCheval1(lancer);
    terminer();
    if (point1 < 20){lancerOrdi();}
    }
}

function lancerOrdi(){
    var lancer = lanceDe();
    point2 += lancer;
    document.getElementById("deOrdi").innerHTML = "votre adversaire a obtenu un  " + lancer
    afficherScore();
    placerCheval2(lancer);
    terminer();
}

function placerCheval1(x){
    var id2 = "case1."+String(point1-x)
    if (point1 >20){point1 = 20}
    var id= "case1."+String(point1)
    document.getElementById(id2).src="./images/case1.jpg";
    document.getElementById(id).src="./images/case1cheval.jpg";
}

function placerCheval2(x){
    var id2 = "case2."+String(point2-x)
    if (point2 >20){point2 = 20}
    var id= "case2."+String(point2)
    document.getElementById(id2).src="./images/case2.jpg";
    document.getElementById(id).src="./images/case2cheval.jpg";
}

function terminer(){
if (point1 >= 20){
    block.appendChild(img);
}
if (point2 >= 20){
    block.appendChild(img2);
}
}

document.getElementById("jouer").addEventListener("click",reset);
document.getElementById("lancerDe").addEventListener("click",lancerJoueur);