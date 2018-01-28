$(document).ready(function () {
    //create an array of 10 astrophyiscal items
    var topics = ["blackhole", "stars", "galaxies", "super nova", "neutron star", "space X", "voyager 1", "milky way", "andromeda galaxy"];
    //create an empty array to store objects in after generation
    var topicsApplied = [];
    // create variable to track number of buttons created
    var bttnCreated = 0;
    //populate the screen with 10 buttons based on those items
    function renderButtons() {
        $("#button-container").empty();
        // for each item create abutton
        for (i = 0; i < topics.length; i++) {
            console.log(topics[i]);
            // create button oject
            // create variable to assign the button to
            var btn = $("<button>");
            // attach attibutes to the variable
            btn.addClass("topics");
            btn.attr("name", topics[i]);
            btn.text(topics[i]);
            // attach attibutes to the variable
            $("#button-container").append(btn);
        }
    };
    //create event listener to grap new topic button
    $("#submitBtn").on("click", function (event) {
        event.preventDefault();
        var newTopic = $("#Astrophysics").val().trim();
        topics.push(newTopic);
        $("#topic-form")[0].reset();
        renderButtons();
    });

    //listening object to trigger
    // function displayGiffs() {
    $(document).on('click', '.topics', function (event) {
        //remove current items from container
        $(".item-group").empty();
        //create a variable for the attribute name to be passed into seach criteria
        var t = $(this).attr("name");
        console.log("looking for giphy" + t);
        // create link to giphy site using previous variable to pass into seach criteria
        //update search criteria to match the button name
        var query = "https://api.giphy.com/v1/gifs/search?q=" +
            t + "&api_key=R48TcGGK9bAT0E28hNZNRBHGCGVbgx5T&limit=10";
        // Performing our AJAX request
        $.ajax({
            url: query,
            method: "GET"
        })
            // put data returned into response variable
            .done(function (response) {
                // Storing an array of result objects in the results variable
                var results = response.data;
                //pull back 10 items
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i]);
                    //setup variables for attibutes
                    //still path
                    var still = results[i].images.original_still.url;
                    //moving path
                    var moving = results[i].images.original.url;
                    //set status = still
                    var status = "still";
                    //rating
                    var rated = results[i].rating;
                    // create object for the dom
                    var gifDiv = $("<div>");
                    // create image tag
                    var gifImage = $("<img>");
                    //create holder for rating
                    var ratingTag = $("<p>").text("Rating: " + rated);
                    //assign attributes to image
                    gifImage.attr("src", still)
                        .addClass("giff-Img")
                        .attr("still", still)
                        .attr("animate", moving)
                        .attr("state", status);
                    gifDiv.append(gifImage)
                        .append(ratingTag);
                    // append to the DOM
                    $("#gif-container").append(gifDiv);
                };
            });
    });

    //create function to change status of the giphy from current to other possible
    $(document).on('click', '.giff-Img', function (event) {
        event.preventDefault();
        //retrieve current status
        var crntState = $(this).attr("state")
        console.log("current State: " + crntState);
        //if still
        if (crntState === "still") {
            console.log("animate giff");
            $(this).attr("src", $(this).attr("animate"))
                .attr("state", "animate");
        } else {
            console.log("still giff");
            $(this).attr("src", $(this).attr("still"))
                .attr("state", "still");
        }
    });

    //intialize program
    renderButtons();
});

