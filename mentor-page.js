let activeFilters = [];

var mentors = [];

let colorsMap = new Map();
colorsMap.set("Product Management", "255, 0, 0, 0.6");
colorsMap.set("Software Engineering", "3, 174, 0,.7");
colorsMap.set("Entrepreneurship", "0, 102, 255,.6");
colorsMap.set("UI / UX Design", "109, 0, 148,.6");
colorsMap.set("VC / Investing", "255, 122, 0, 0.7");
colorsMap.set("Data Analytics / Science", "62, 182, 182,0.7");
colorsMap.set("Tech Consulting", "159,159,159,1"); 
colorsMap.set("Non-Technical", "204, 120, 38, 1")

$(document).ready(function() {
    $("img").unveil(200);
  });

$.getJSON("mentors.json", function(data) {
    mentors = data;

    var html = '';

    //randomize
    for (let i = mentors.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [mentors[i], mentors[j]] = [mentors[j], mentors[i]];
    }

    $.each(mentors, function(key, value){
        html += 
        `<a class= "mentor-card" id="${value.token}"  target="_blank" href="https://sherpamentors.typeform.com/to/mPjdCO?mentor=${value.name}">
            <img src="images/${value.token}.jpg"/>

            <div class="content">
            <div>
                <div class="name">${value.name}</div>
                <div class="school">${value.school}, ${value.year}</div>
                </div>
                <div class="bio">${value.bio}</div>
                <div class="tags">
        `;

        tags = value.tags.split(", ");
        tags.forEach(function(tag){
            var tagID = tag.replace(/ /g,"-");
            tagID = tagID.replace("/","-");
            html += `<div class="tag" id="${tagID}">${tag}</div>`;
        });

        html += '</div></div></a>';
    });

    $('#mentors').html(html);
});


function filter(tag){

    if(activeFilters.includes(tag)){ //deactivating

        var tagID = tag.replace(/ /g,"-");
        tagID = tagID.replace("/","-");

        $("#filter-tags #"+tagID).css("color", "black");
        $("#filter-tags #"+tagID).css("background-color", "white");
        $("#filter-tags #"+tagID).css("border", "1px solid #444");


        activeFilters.splice(activeFilters.indexOf(tag), 1)        


    } else { //activating

        var tagID = tag.replace(/ /g,"-");
        tagID = tagID.replace("/","-");


        $("#filter-tags #"+tagID).css("color", "white");
        $("#filter-tags #"+tagID).css("background-color", `rgba(${colorsMap.get(tag)})`);
        $("#filter-tags #"+tagID).css("border", "1px solid #fff");


        activeFilters.push(tag);
    }


    //refilter here
    mentors.forEach(function(mentor){
        var thisMentorTags = mentor.tags.split(", ");
        console.log("mentor tags" + thisMentorTags);
        console.log("active filter" + activeFilters);
        if(activeFilters.length === 0){
            $('#mentors #'+mentor.token).css("display", "flex");
        } else if(thisMentorTags.some(item => activeFilters.includes(item))){
            $('#mentors #'+mentor.token).css("display", "flex");
            console.log("match")
        } else {
            console.log("no match");
            $('#mentors #'+mentor.token).css("display", "none");
        }
    })

}