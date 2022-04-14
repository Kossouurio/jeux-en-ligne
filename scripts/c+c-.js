
var nb_random = Math.floor(Math.random() * 101);
var bouton = document.getElementById('clickme');
var score = 0;
 
 
bouton.addEventListener('click', function(e){
	e.preventDefault();
	var valeur_saisie = document.getElementById('nb');
	var saisie = parseInt(valeur_saisie.value);
	 
	 
	 
		  if(score < 10)
		  {
			if(saisie < nb_random)
			{
				document.getElementById('res').innerHTML = "Trop petit.";
				score++;				
			}
			else if(saisie > nb_random)
			{
				document.getElementById('res').innerHTML = "Trop grand.";
				score++;
			 }
			else
			{
				document.getElementById('res').innerHTML = "Gagné, bravo à toi !";
				var score_final = 10 - score;
				alert('Le nombre tirer au hasard était : ' + nb_random + '. Votre score est de : ' + score_final);
			}
		  }
		  else
		  {
			alert('Oh, tu as perdu. Votre score est de 0.');
		  }
}, false);
