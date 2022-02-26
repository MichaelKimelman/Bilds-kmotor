search();

function search() {

    let searchinput = document.querySelector('#searchinput');
    let searchform = document.querySelector('#searchform');
    let pagenumber = document.querySelector('#pagenumber');

    let colorbutton = document.querySelector('#btn');
    let selectColor = document.querySelector('#colorSelect');
    let color = '';
    pagenumber.innerHTML = '1';
    let searchvalue = '';
    let lowest = 0;
    let highest = 10;

    selectColor.onchange = event =>{
        color = selectColor.value;
    }
    
    searchform.onsubmit = event => {
        event.preventDefault();
        searchvalue = searchinput.value;
        start(searchvalue, color)
    }

    start(searchvalue, color)
    async function start(input, colorinput) {

        lowest = 0;
        highest = 10;
        let testbutton = document.querySelector('#testbutton');
        let previousbutton = document.querySelector('#previousbutton');

        //Next button
        testbutton.onclick = event => {

            let difference = (amountOfPics - highest);

            if (difference < 10 && difference > 0) {
                pagenumber.innerHTML = (highest + 10) / 10;
                /* alert(pagenumber.innerHTML); */
                lowest += 10;
                highest += 10;

                if (highest >= amountOfPics) {
                    testbutton.style.display = "none";
                }
                if ((highest / 10) > 1) {
                    previousbutton.style.display = "block";
                }

                GetPix(lowest, amountOfPics, json, difference)

            }
            if (highest < amountOfPics) {
                lowest += 10;
                highest += 10;

                if ((highest / 10) > 1) {
                    previousbutton.style.display = "block";
                }

                if (highest >= amountOfPics) {
                    testbutton.style.display = "none";
                }

                pagenumber.innerHTML = highest / 10;

                GetPix(lowest, highest, json, 11)

            }

        }

        //Previous button
        previousbutton.onclick = event => {

            if (lowest != 0) {
                lowest -= 10;
                highest -= 10;

                if ((highest / 10) == 1) {
                    previousbutton.style.display = "none";
                }
                if (highest < amountOfPics) {
                    testbutton.style.display = "block";
                }

                pagenumber.innerHTML = highest / 10;
                GetPix(lowest, highest, json, 11)

            }
        }

        let params = new URLSearchParams({
            key: '25701107-2f93026c2be42c226215c928d',
            q: input,
            colors: colorinput,
            image_type: 'photo',
            per_page: 200,

        });
        //Default page
        testbutton.style.display = "block";
        previousbutton.style.display = "none";

        pagenumber.innerHTML = '1';

        let result = await fetch('https://pixabay.com/api/?' + params.toString());

        let json = await result.json();
        //Default page with no hits
        let amountOfPics = json.hits.length;
        GetPix(lowest, highest, json, 11);

    }




}
function GetPix(lowest, highest, json, difference) {
    let pictures = [];
    let listOfTags = [];
    let listOfAuthors = [];
    let testbutton = document.querySelector('#testbutton');
    //Antalet hits är mellan 10 och 0
    if (json.hits.length > 0 && json.hits.length < 10) {

        testbutton.style.display = "none";
        for (let i = lowest; i < json.hits.length; i++) {

            let picture = json.hits[i].largeImageURL;
            pictures.push(picture);

            let tag = json.hits[i].tags;
            listOfTags.push(tag);

            let author = json.hits[i].user;
            listOfAuthors.push(author);

        }
        let allli = document.querySelectorAll('#entertest li');
        for (let i = 0; i < 10; i++) {

            if (i > (json.hits.length - 1)) {
                let li = allli[i];
                li.innerHTML = '';
            }
            else {

                let addpicture = pictures[i];
                let addTags = listOfTags[i];
                let addAuthor = listOfAuthors[i];
                let li = allli[i];
                li.innerHTML = '<img src="' + addpicture + '">' + '<p id="tags" > Tags: ' + addTags + '</p>' + '<p id="author"> Author: ' + addAuthor + '</p>';
            }

        }
    }
    //Inga hits
    if (json.hits.length == 0) {
        testbutton.style.display = "none";
        let allli = document.querySelectorAll('#entertest li');
        for (let i = 0; i < 10; i++) {
            let li = allli[i];
            if (i == 0) {
                li.innerHTML = " No results";
            }
            if (i > 0) {
                li.innerHTML = " ";
            }

        }
        //Antalet hits är större eller lika med 10
    } if (json.hits.length >= 10) {


        for (let i = lowest; i < highest; i++) {

            let picture = json.hits[i].largeImageURL;
            pictures.push(picture);

            let tag = json.hits[i].tags;
            listOfTags.push(tag);

            let author = json.hits[i].user;
            listOfAuthors.push(author);

        }
        let allli = document.querySelectorAll('#entertest li');



        if (difference < 10 && difference > 0) {
            for (let i = 0; i < 10; i++) {
                if (i > (difference - 1)) {
                    let li = allli[i];
                    li.innerHTML = '';
                }
                else {
                    let addpicture = pictures[i];
                    let addTags = listOfTags[i];
                    let addAuthor = listOfAuthors[i];
                    let li = allli[i];
                    li.innerHTML = '<img src="' + addpicture + '">' + '<p id="tags" > Tags: ' + addTags + '</p>' + '<p id="author"> Author: ' + addAuthor + '</p>';
                }
            }
        } else {
            for (let i = 0; i < 10; i++) {

                let addpicture = pictures[i];
                let addTags = listOfTags[i];
                let addAuthor = listOfAuthors[i];
                let li = allli[i];
                li.innerHTML = '<img src="' + addpicture + '">' + '<p id="tags" > Tags: ' + addTags + '</p>' + '<p id="author"> Author: ' + addAuthor + '</p>';

            }
        }
    }

}




