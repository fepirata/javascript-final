// THINGS FROM THE PART 1 - NOT BEEN USED


// ARRAY OF USER IMAGES
// let listUserImages = [];


// INITIAL LOOP
// for (i=0; i < listUserImages.length; i++) {
//     $(".images-wrapper").prepend(imageDecorator);

    // IMAGE DECORATOR TO LOOP THROUGH ARRAY
    // let imageDecorator = `
    // // <div class="user-image">
    // // <i class="fas fa-times" id="delete-image"></i>
    // // <img src="${listUserImages[i].storedUrl}" alt="">
    // // <p>${listUserImages[i].storedCaption}</p>
    // // </div>`
// };// END of loop



$(function() {
    // CONNECTING FIREBASE
    const imgRef = firebase.database().ref('/image-list');



    console.log("jquery working :)")

    $("#submit-button").on("click", function() {
        event.preventDefault();

        // MAIN VARIABLES
        let userUrl = $("#url-user").val();
        let userCaption = $("#caption-user").val();
        //
        // let storedValues = {
        //     storedUrl: userUrl,
        //     storedCaption: userCaption
        // };
        console.log(storedValues);

        if(userUrl=='') {
            window.alert("IMAGE URL field is required")
        } else if(userCaption=='') {
            window.alert("CAPTION needs to be filled")
        } else if (userUrl.indexOf("http") != 0){
            window.alert("The IMAGE URL needs to be a link")
        } else {

            // PUSHING OBJECT TO THE ARRAY
            // listUserImages.push(storedValues);

            // PUSHING TO THE FIREBASE DATABASE
            imgRef.push( {storedUrl: userUrl, storedCaption: userCaption} );


            // CLEARING AND FOCUSING
            $("#url-user").val("").focus();
            $("#caption-user").val("");
        }
    });//END of submit action


    imgRef.on('child_added', function(data) {
        const dataId = data.key;
        const dataContent = data.val();

        let databaseUserUrl = dataContent.storedUrl;
        let databaseUserCaption = dataContent.storedCaption;

        // IMAGE DECORATOR STANDARD
        let imageDecorator = `
        <div class="user-image">
        <i class="fas fa-times" id="delete-image"></i>
        <a href="${databaseUserUrl}"><img src="${databaseUserUrl}" alt=""></a>
        <p>${databaseUserCaption}</p>
        </div>`

        let newsDecorator = `
        <div class="news-box">
            <p>${databaseUserCaption}, has been added to this page</p>
        </div>
        `

        // PRINTING ITEM ON THE SCREEN
        $(".images-wrapper").prepend(imageDecorator);

        // PRINTING THE NEWS ABOUT THE NEW IMAGE
        $(".news-box-wrapper").prepend(newsDecorator);

        $("#delete-image").click(function(event) {
            event.preventDefault();
            console.log("clicked")
            $(this).parent().fadeOut(function() {
                firebase.database().ref(`image-list/${dataId}`).remove();
            })

            // PRINTING THE NEWS ABOUT REMOVING AN ITEM
            $(".news-box-wrapper").prepend(
                `<div class="news-box">
                    <p>${$(this).next().next().html()}, has been deleted from this page</p>
                </div>`

            )
        })

    })


});// END of function
