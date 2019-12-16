
document.addEventListener('DOMContentLoaded', function() {
    for (let i = 0; i < list.length; i++) {
        addEntry(list[i].username, list[i].id, list[i].date);
    }
});

function addEntry(username, id, date) {

    let newListing = [];

    newListing[0] = document.createElement('div');
    newListing[0].className = "listing";

    newListing[1] = document.createElement('div');
    newListing[1].className = "header";
    newListing[1].appendChild(document.createTextNode(username));
    newListing[0].appendChild(newListing[1]);

    newListing[2] = document.createElement('div');
    newListing[2].className = "under";
    newListing[0].appendChild(newListing[2]);

    newListing[3] = document.createElement('ul');

    newListing[4] = document.createElement('li');
    newListing[4].appendChild(document.createTextNode("ID: " + id));
    newListing[3].appendChild(newListing[4]);

    newListing[5] = document.createElement('li');
    newListing[5].appendChild(document.createTextNode("AKA: " + aka));
    newListing[3].appendChild(newListing[5]);

    newListing[0].appendChild(newListing[3]);
    document.getElementById("content").appendChild(newListing[0]);

}

function redirect() {
    window.location = window.location.origin;
}