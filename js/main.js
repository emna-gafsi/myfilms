var image = document.getElementsByClassName("thumbnail");
new simpleParallax(image, {
  scale: 1.5
});
var image = document.getElementsByClassName("thumbnail-2");
new simpleParallax(image, {
  scale: 1.5
});

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBEXw6i-88cKrb-pILsNXBk8ycVtdxdJMM",
    authDomain: "myfilms-ebe06.firebaseapp.com",
    databaseURL: "https://myfilms-ebe06.firebaseio.com",
    projectId: "myfilms-ebe06",
    storageBucket: "myfilms-ebe06.appspot.com",
    messagingSenderId: "363316339629",
    appId: "1:363316339629:web:2aa207e66034b0b40cb724",
    measurementId: "G-NBJ1HHTTXZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//Listening on the form
var database = firebase.database();
var i = 1;
document.getElementById("filmForm").addEventListener("submit", (e) => {
    var name = document.getElementById("films-name").value;
    var synopsis = document.getElementById("synopsis-film").value;
    var genre = document.getElementById("genre_film").value;
    e.preventDefault();
    ajoutfilm(name, synopsis ,genre);
    window.alert('Submission Done!');
    getdata();

});
var filmRef = database.ref('/films');

function ajoutfilm(namefilm, synopsis ,genre) {
    var newfimlRef = filmRef.push();
    newfimlRef.set({
        name: namefilm,
        synopsis: synopsis,
        genre: genre
    })
}
function getdata() {
    filmRef.once("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            document.getElementById("filmAjout").innerHTML =
                childData["name"] + "," + childData["synopsis"] + "," +childData["genre"] ;
        });
    });
}

