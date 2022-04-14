var lipion=[0,0,0,0,0,0,0,0,0]; //liste stockant les cases (si il y a une croix:1 un rond:-1 ou vide:0)
var niveau=0 //niveau de l'ia (0 si le joueur est entrain de choisir
var score= [0,0]

//variables pour les images:
var caseV='<img src="../images/MoVide.png"/> '
var caseX='<img src="../images/MoCroix.png"/> '
var caseO='<img src="../images/MoRond.png"/> '

var nivD='<img src="../images/NiveauDemande.png"/> '
var niv1='<img src="../images/Niveau1.png"/> '
var niv2='<img src="../images/Niveau2.png"/> '
var niv3='<img src="../images/Niveau3.png"/> '

memoire=[0,0,0,0,0,0,0,0,0] //memoire de l'IA

alignement=[[5,6,7],[4,0,8],[3,2,1],[5,4,3],[6,0,2],[7,8,1],[5,0,1],[7,0,3]] //tout les alignements possibles

special=[[1,-1,0,0,0,1,0,0,0,7],[1,0,0,-1,0,0,0,1,0,1],[1,1,0,0,0,-1,0,0,0,7],[1,0,0,1,0,0,0,-1,0,1], //état du jeu speciaux où l'ia devra jouer specialement pour gagner ou ne pas perdre
[-1,-1,0,0,0,1,0,0,1,2],[-1,0,1,-1,0,0,0,1,0,4],[-1,1,0,0,1,-1,0,0,0,6],[-1,0,0,1,0,0,1,-1,0,8]]

// on recupere les elements pour toute les cases:
let mo0=document.getElementById("mo0");
let mo1=document.getElementById("mo1");
let mo2=document.getElementById("mo2");
let mo3=document.getElementById("mo3");
let mo4=document.getElementById("mo4");
let mo5=document.getElementById("mo5");
let mo6=document.getElementById("mo6");
let mo7=document.getElementById("mo7");
let mo8=document.getElementById("mo8");

//et on les mets dans un tableau:
var tableid=[mo0,mo1,mo2,mo3,mo4,mo5,mo6,mo7,mo8];

// recuperation pour le bouton recommencer et abandonner en associant la fonction correspondante:
let recommencer=document.getElementById("recommencer")
recommencer.addEventListener("click",f_recommencer)

let abandonner=document.getElementById("abandonner")
abandonner.addEventListener("click",f_abandonner)

//recuperation pour le score:
let score_affiche=document.getElementById("score")


// initie la partie:
f_recommencer()

//On associe un l'évènement de cliquer sur les cases à la fonctions principal motouche() avec en variable le joueur et l'endroit:
mo0.onclick = motouche0;
function motouche0(){//2
motouche(0,1)};
mo1.onclick = motouche1;
function motouche1(){
motouche(1,1)};
mo2.onclick = motouche2;
function motouche2(){
motouche(2,1)};
mo3.onclick = motouche3;
function motouche3(){
motouche(3,1)};
mo4.onclick = motouche4;
function motouche4(){//1
motouche(4,1)};
mo5.onclick = motouche5;
function motouche5(){
motouche(5,1)};
mo6.onclick = motouche6;
function motouche6(){
motouche(6,1)};
mo7.onclick = motouche7;
function motouche7(){
motouche(7,1)};
mo8.onclick = motouche8;
function motouche8(){//3
motouche(8,1)};





function motouche(n,j){ //fonction principal, quand le joueur où l'ia joue dans une case
	if (niveau!=0){//regarde si le joueur est entrain de choisir le niveau
		if (lipion[n]===0){ //regarde si la case est déjà prise
			lipion[n]=j;
			momaj();
			moregarde();
			if (j===1){tourIA()} //si c'est le joueur qui à jouer, c'est le tour de l'ia
		};
	}
	else {f_niveau(n)}
};

function momaj(){ // met à jouer l'interface graphique utilisateur
	for (let i = 0; i < 9; i++) {
		if (lipion[i]===1){tableid[i].innerHTML=caseX;}
		else if(lipion[i]===-1){tableid[i].innerHTML=caseO;}
		else{tableid[i].innerHTML=caseV;}
	};
	score_affiche.value=score[0]+"/"+score[1]
};

function moregarde(){ //regarde si il y a une victoire, une défaite ou une fin de partie
	for (ligne_possible of alignement ){
		n=0
		for(let i=0; i<3; i++){	
			n+=lipion[ligne_possible[i]]
		};
		if (n===3){								//victoire du joueur
			score[0]+=1;
			lipion=[0,0,0,0,0,0,0,0,0];
		};
		if (n===-3){  							// victoire de l'IA
			score[1]+=1;
			lipion=[0,0,0,0,0,0,0,0,0];
		};
	};
	c=0;
	for (donnee of lipion){
		if (donnee!=0){ c+=1 };
	};
	if (c===9){ lipion=[0,0,0,0,0,0,0,0,0] }; 	//égalité
	momaj()
};



function f_recommencer(){ //fonction pour recommencer et mettre à l'état de début du jeu
	lipion=[0,0,0,0,0,0,0,0,0];
	score=[0,0];
	momaj();
	niveau=0;
	tableid[6].innerHTML=nivD;
	tableid[4].innerHTML=niv1;
	tableid[0].innerHTML=niv2;
	tableid[8].innerHTML=niv3;

};

function f_abandonner(){ //fonction pour abandonner
	if (niveau!=0){
		lipion=[0,0,0,0,0,0,0,0,0];
		score[1]+=1;
		momaj();
	};
};

function tourIA(){ //facon dont l'IA joue
//niveau 1: loi 1 2 5
//niveau 2: loi 1 2 3 5
//niveau 3: loi 1 2 3 4 5

	if (lipion[0]===0){motouche(0,-1)} 							//première loi: l'ia doit jouer au centre si possible
	else {
		f=futurvictoire() 										//2eme loi: jouer où la victoire est possible
		if(niveau>1 && f[0]!=1){f=futurdefaite()}  				//3eme loi: jouer où la defaite est possible
		if(f[0]!=0){motouche(f[1],-1)}
		else{
			ps=position_special();
			if (niveau===3 && ps[0]===1){motouche(ps[1],-1)}  	//4eme loi: jouer à un certain endroit selon 2 position spécial (8 en tout avec les orientations)
			else{  												//5eme loi: jouer à droite de l'adversaire par rapport au centre (ou à droite de de la droite si déjà pris etc.) (la droite du centre étant le coin bas gauche)
																		//(les positions des cases ne sont pas dans le même ordre que pour lipion pour cette loi)
				e=1;
				for (let i=0;i<9;i++){ 		//l'IA regarde quel est le nouveau coup du joueur en comparant la position actuel et celle qu'elle a en memoire
					if (e===1&&(memoire[i]!=lipion[i])){
						x=1;
						while (x<9){
							if (lipion[(i+x)%9]===0){
								motouche(((i+x)%9),-1);
								e=0;
								break;
							};
							x+=1;
						};
					};
				};
			};
		};
	};
	for (let i=0;i<9;i++){memoire[i]=lipion[i]}	//on met à jour sa memoire
};

function futurvictoire(){ //regarde si une victoire est possible et renvoi si c'est possible et la position
	for (ligne_possible of alignement ){
		n=0;
		for(let i=0; i<3; i++){
			n+=lipion[ligne_possible[i]];
		};
		if (n===-2){
			for(let i=0; i<3; i++){
				if(0===lipion[ligne_possible[i]]){
				return [1,ligne_possible[i]]
				};
			}
		}
	};
	return [0,0]
};

function futurdefaite(){ //pareil que pour la fonction victoire mais pour une défaite, (on pourrait fusionner les deux en ajoutant une variable car c'est juste la copie de l'autre)
	for (ligne_possible of alignement ){
		n=0;
		for(let i=0; i<3; i++){
			n+=lipion[ligne_possible[i]];
		};
		if (n===2){
			for(let i=0; i<3; i++){
				if(0===lipion[ligne_possible[i]]){
				return [-1,ligne_possible[i]]
				};
			};
		};
	};
	return [0,0]
};

function position_special(){ //regarde si le plateau est dans une ^position spécial et renvoi la position à jouer si c'est le cas
	for(let p=0;p<8;p++){
		c=0;
		for(let i=0;i<9;i++){
			if(lipion[i]===special[p][i]){c+=1};
		};
		if (c===9){return [1,special[p][9]]}
	};
	return [0,0]
};


function f_niveau(n){ //change le niveau de l'ia
	if (n===4){
		niveau=1
		momaj()
	}
	else if(n===0){
		niveau=2
		momaj()
	}
	else if(n===8){
		niveau=3
		momaj()
	}
}