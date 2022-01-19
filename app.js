const form = document.querySelector('form');
//form input
const input = document.querySelector('form input');
const liste = document.querySelector('ul');
let toutesLesTaches = [];

form.addEventListener('submit', event => {
  event.preventDefault();
 //enlève espace vides avant et après
  const text = input.value.trim();
  //si l'input n'est pas vide
  if(text !== ''){
    rajouterUneTache(text);
    //on clean le texte de l'input
    input.value = '';
  }
})

//fonction contenant les valeurs de text
function rajouterUneTache(text){

  const todo = {
    text,
    /*La méthode Dat.now() renvoie le nb de millisecondes écoulées depuis le 1er janvier 1970 =
    permert de remplir un Id*/
    id: Date.now()
  }
  afficherListe(todo);
}

//fonction contenant les valeurs de todo
function afficherListe(todo){

  const item = document.createElement('li');
  liste.appendChild(item);
  //prend comme attribut data-key l'id de l'input
  item.setAttribute('data-key', todo.id);

  const input = document.createElement('input');
  item.appendChild(input);
  input.setAttribute('type', 'checkbox');
  //lorsqu'on clique dessus cela déclenche une fonction tachefaite
  input.addEventListener('click', tacheFaite);
  

  const txt = document.createElement('span');
  item.appendChild(txt);
  txt.innerText = todo.text;

  const btn = document.createElement('button');
  item.appendChild(btn);
  btn.addEventListener('click', supprimerTache);

  const img = document.createElement('img');
  btn.appendChild(img);
  img.setAttribute('src', 'ressources/fermer.svg');
 
  //on rajoute le li au tableau toutesLesTaches
  toutesLesTaches.push(item);
  console.log(toutesLesTaches);
}

function tacheFaite(e){
  e.target.parentNode.classList.toggle('finDeTache')
}

//(e) = objet d'évènement
function supprimerTache(e) {
  //pour chaque élèment el du tableau "toutesLesTaches"
  toutesLesTaches.forEach(el => {
  /*si le parent "li" (parentNode) du bouton que j'ai cliqué (e.target) a le même attribut "data-key"
  que l'élément (el) du tableau "toutesLesTaches" on enlève le li du DOM avec remove mais reste dans le 
  tableau*/ 
    if(e.target.parentNode.getAttribute('data-key') === el.getAttribute('data-key')){
      el.remove();
      /*quand on supprime un élément et qu'on en recrée un nouveau va mettre le tableau "toutesLesTaches" 
      à jour en enlevant l'élèment supprimé
      le tableau va garder les li qui ont un Id strictement différent de celui qui vient d'être supprimé (el)*/
      //toutesLesTaches = toutesLesTaches.filter(li => li.dataset.key !== el.dataset.key);
    }

  })

}

/*Résumé :
Au submit du formulaire (touche entrée) on rajoute la valeur de l'input (text)
Si le formulaire n'est pas vide on envoit "text" dans une fonction "rajouterUneTache"
Cette fonction va créer un objet contenant "text" + un Id (todo)
"Todo" seront rajoutées à la fonction afficherListe
La fonction afficherListe sera utilisé pour créer des élèments (input checkbox, span texte, button supprimer, 
image) dans le DOM en prenant les valeurs de "todo"
On rajoute le li (item) au tableau toutesLesTaches
Parmi ces élèments au clic de l'input checkbox on déclenche la fonction "tacheFaite"
Parmi ces élèments au clic du bouton supprimer on déclenche la fonction "supprimerTache"
La fonction "tacheFaite" permet de mettre la classe "finDeTache" au parent li de l'input checkbox qui 
permet de cocher le texte
La fonction "supprimerTache", pour chaque élèment du tableau "toutesLesTaches"
*/
