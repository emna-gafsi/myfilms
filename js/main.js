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
if (document.getElementById("filmForm") != null) {
    document.getElementById("filmForm").addEventListener("submit", (e) => {
        var name = document.getElementById("films-name").value;
        var synopsis = document.getElementById("synopsis-film").value;
        var genre = document.getElementById("genre_film").value;
        var image = document.getElementById("image-film-url").value;
        e.preventDefault();
        ajoutfilm(name, synopsis, genre, image);
        window.alert('Submission Done!');
        getdata();

    });
}
var filmRef = database.ref('/films');

function ajoutfilm(namefilm, synopsis, genre, image) {
    var newfimlRef = filmRef.push();
    newfimlRef.set({
        name: namefilm,
        synopsis: synopsis,
        genre: genre,
        image: image
    })
}

function getdata() {
    filmRef.once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            document.getElementById("filmAjout").innerHTML +=
                '<div class="ajout__film col-12 col-sm-4 col-md-3 pt-2 m-2">' +
                '<img src="' + childData["image"] + '" height="312" width="230" class="img-fluid">' +
                '<h3 class="film-title">' + childData["name"] + '</h3>' +
                '<p class="genre-film">' + childData["genre"] + '</p>' +
                '<div class="film-desc"> <p>' + childData["synopsis"] + '</p> </div>' + ' <a href="#" class="btn btn-warning text_white stretched-link text-center my-2">Go somewhere</a>' + '</div>';

        });
    });
}