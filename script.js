var id;
var length;
var photoID;
var galleryLength;
var zoomedImg;
var callbackForm;


var slides;
var currentSlide;
var slideInterval;


window.onload = function () {
    //$('#colors li').click(function (event) {
    //    $('#colors li').removeClass('active');
    //    $(this).addClass('active');
    //    var index = $("div").index(this);
    //});

    $("#colors li").click(function () {
        var index = $("#colors li").index(this);
        $('#colors li').removeClass('active');
        $(this).addClass('active');

        var kek = $('#productColors li');
        $('#productColors li').removeClass('active');
        kek[index].classList.add('active');
    });

    $("#callbackPhone").mask("+7(999) 999-9999");
    $("#customerPhone").mask("+7(999) 999-9999");
    $("#customerPhone2").mask("+7(999) 999-9999");

    //initialize();

    attachClickHandler("show-callback-form", showCallbackForm);
    attachClickHandler("close-callback-form", hideCallbackForm);
    attachClickHandler("send-callback", sendCallback);
    attachClickHandler("send-callback", sendCallback);

    $(".buy.button").click(function () {
        showOrderForm();
    });

    initEmailJs();

    var closeBtn = document.getElementById("close");
    id = 1;
    length = document.getElementById("carousel").getElementsByTagName("li").length;
    document.getElementById("carousel").getElementsByTagName("li")[id - 1].style.visibility = "visible";
    galleryLength = document.getElementById("gallery").getElementsByTagName("li").length;
    gallery = document.getElementById("gallery");

    callbackForm = document.getElementById("callback");

    setInterval(random, 5000);


    var ul = document.getElementById('gallery'); // Parent
    var zoomed = document.getElementById("zoomed");
    zoomedImg = document.getElementById("zoomed-content");

    closeBtn.addEventListener('click', function () {
        zoomed.style.display = "none";
    });

    ul.addEventListener('click', function zoomPhoto (e) {
        var target = e.target; // Clicked element
        //while (target && target.parentNode !== ul) {
        //    target = target.parentNode; // If the clicked element isn't a direct child
        //    if (!target) { return; } // If element doesn't exist
        //}
        if (target.tagName === 'LI') {
            photoID = target.id; // Check if the element is a LI
            zoomed.style.display = "flex";
            zoomed.targetLI = target;
            zoomedImg.style.backgroundImage = "url(gallery/" + photoID + ".jpg)";
        }
    });



    var gallery = document.getElementById("gallery").getElementsByTagName("li").length;

    for (var i = 0; i < gallery; i++) {
        var li = document.getElementById("gallery").getElementsByTagName("li")[i];
        li.style.backgroundImage = "url(gallery/" + (i + 1) + ".jpg)";
        li.id = i + 1;
    }

    slides = document.querySelectorAll('.slides .slide');
    currentSlide = 0;
    slideInterval = setInterval(nextSlide, 4000);
}

function nextImage() {
    var zoomed = document.getElementById('zoomed');
    var current = zoomed.targetLI;
    var next = current.nextElementSibling;
    if (!next) {
        next = current.parentElement.firstElementChild;
    }

    zoomed.targetLI = next;
    zoomedImg.style.backgroundImage = "url(gallery/" + next.id + ".jpg)";
}

function prevImage() {
    var zoomed = document.getElementById('zoomed');
    var current = zoomed.targetLI;
    var next = current.previousElementSibling;
    if (!next) {
        next = current.parentElement.lastElementChild;
    }

    zoomed.targetLI = next;
    zoomedImg.style.backgroundImage = "url(gallery/" + next.id + ".jpg)";
}

function nextSlide() {
    for (var i = 0; i < slides.length; i++) {
        var slide = slides[i];
        if (!slide.classList.contains('showing')) {
            continue;
        }

        slide.classList.remove('showing');
        var next = slide.nextElementSibling;
        i++;
        if (!next) {
            next = slide.parentElement.firstElementChild;
        }
        next.classList.add('showing');
    }
}

function getValidImputValue(id) {
    var input = document.getElementById(id);
    var value = input.value;

    //if (input.dataset.pattern) {
    //    var regex = new RegExp(input.dataset.pattern);
    //    if (!regex.test(value)) {
    //        input.style.borderColor = "red";
    //        return "";
    //    }
    //}

    if (input.dataset.minLength) {
        var minLength = parseInt(input.dataset.minLength);
        if (minLength && minLength > value.length) {
            input.style.borderColor = "red";
            return "";
        }
    }

    if (input.dataset.maxLength) {
        var maxLength = parseInt(input.dataset.maxLength);
        if (maxLength && maxLength < value.length) {
            input.style.borderColor = "red";
            return "";
        }
    }

    input.style.borderColor = "";
    return value;
}

function showPivacyPolicy() {
    show("privacy-policy", "flex")
}

function hidePivacyPolicy() {
    hide("privacy-policy");
}

//function lookForSize() {
//    var timer = document.getElementById("timer");

//    if (window.innerWidth < 900) {
//        //document.write('<h4 id="mobileTimer"><script src="http://megatimer.ru/s/330203b996cb1bee68ba985ca791eebb.js"></script></h4>');
//        var timer = document.getElementById("timer");
//        timer.innerHTML = "";
//        timer.innerHTML = '<script src="http://megatimer.ru/s/330203b996cb1bee68ba985ca791eebb.js"></script>';
//    }
//}

function leaveReview() {
    var reviewerName = getValidImputValue("reviewerName");
    var reviewerCity = getValidImputValue("reviewerCity");
    var reviewerMessage = getValidImputValue("reviewerMessage");

    //if (!reviewerName || !reviewerCity || reviewerMessage) {
    //    return;
    //}

    if (!reviewerName || !reviewerMessage) {
        document.getElementsByClassName("alert")[1].style.opacity = "1";
        setTimeout(function () {
            document.getElementsByClassName("alert")[1].style.opacity = "0";
        }, 1500);
        return;
    }

    var result = emailjs.send("gmail", "review", {
        "reviewerName": reviewerName,
        "reviewerCity": reviewerCity,
        "reviewerMessage": reviewerMessage
    });


    showAlert();
    setTimeout(hideAlert, 7000);
    hideReviewFrom();
}


function showOrder() {
    show('order', 'flex');
}



function handleImageClick(event) {
    var image = $(event.target);

    $(".slider-for img").attr("src", image.attr("src"));
}

function handleGalleryClick(event) {
    var image = $(event.target);
    //alert(image.attr("src"));
    //$(".slider-for img").attr("src", image.attr("src"));
    $("#lightbox img").attr("src", image.attr("src"));
    show("lightbox", "flex");
}

function hideLightBox() {
    hide("lightbox");
}


function showOrderForm() {
    var color = $('#colors li.active').text();
    var name = "Диван LAMZAC(" + color + ")";
    var price = $('#price').text().match(/\d+/);
    price = parseInt(price);
    var quantity = 1;
    

    $("#orderForm .price").text(price);
    $("#orderForm .name").text(name);

    $("#orderForm .send.button").click(handlSendOrderCLick);

    $("#orderForm #minus").off().click(decQuantity);
    $("#orderForm #plus").off().click(incQuantity);

    

    updateAmount();

    show('orderForm', 'flex');

    function updateAmount() {
        var amount = price * quantity;

        $("#orderForm #quantity").text(quantity);

        var amountString = (amount / 1000).toFixed(3).replace(".", " ");
        if (amount < 1000) {
            amountString = amountString.replace("0 ", "");
        }

        $("#orderForm #amount").text(amountString);
    }

    function incQuantity() {
        quantity++;
        updateAmount();
    }

    function decQuantity() {
        if (quantity > 1) {
            quantity--;
            updateAmount();
        }
    }

    function handlSendOrderCLick() {
        if (sendOrder()) {
            showAlert();
            setTimeout(hideAlert, 7000);
            hideOrderForm();
        }
    }

    function sendOrder() {
        event.preventDefault();

        var customerName = getValidImputValue("customerName");
        var customerPhone = getValidImputValue("customerPhone");
        var customerAddress = document.getElementById("customerAddress").value;

        if (!customerName || !customerPhone) {
            document.getElementsByClassName("alert")[3].style.opacity = "1";
            setTimeout(function () {
                document.getElementsByClassName("alert")[3].style.opacity = "0";
            }, 1500);
            return false;
        }

        var result = emailjs.send("gmail", "order", {
            "customerName": customerName,
            "customerPhone": customerPhone,
            "customerAddress": customerAddress,
            "itemName": name,
            "itemColor": color, 
            "price": price + " руб.",
            "quantity": quantity + "шт.",
            "amount": amount
        });

        return true;
    }
}

function hideOrderForm() {
    hide('orderForm');
}

function hideOrder() {
    hide('order');
}

function showReviewForm() {
    show('reviewForm', 'flex');
}

function hideReviewFrom() {
    hide('reviewForm');
}

function showCallbackForm() {
    //callbackForm.style.display = "flex";  // отут писало "callbackForm is undefined"
    show('callback', 'flex');
}

function hideCallbackForm() {
    hide('callback');
}

function show(id, display) {
    var element = document.getElementById(id);
    if (!element) {
        console.error("Element #" + element + " is not found by show()");
        return;
    }
    if (!display) {
        display = "block";
    }

    element.style.display = display;
}

function hide(id) {
    var element = document.getElementById(id);
    if (!element) {
        console.error("Element #" + id + " is not found by hide()");
        return;
    }

    element.style.display = "none";
}

function initEmailJs() {
    if (!emailjs) {
        console.error("emailjs is " + emailjs);
        return;
    }

    emailjs.init("user_cpCtyzwMGXeDab1KAcA1T");
}

function sendCallback() {
    if (!emailjs) {
        console.error("emailjs is " + emailjs);
        return;
    }

    var callbackName = getValidImputValue("callbackName");
    var callbackPhone = getValidImputValue("callbackPhone");

    if (!callbackName || !callbackPhone) {
        document.getElementsByClassName("alert")[0].style.opacity = "1";
        setTimeout(function () {
            document.getElementsByClassName("alert")[0].style.opacity = "0";
        }, 1500);
        return;
    }

    var result = emailjs.send("gmail", "callback", { "name": callbackForm.getElementsByTagName("input")[0].value, "phone": callbackForm.getElementsByTagName("input")[1].value });
    console.log("Email send result = " + result);


    showAlert();
    setTimeout(hideAlert, 5000);
    hide('callback');
    return true;
}

// function startVideoLoading() {
// var id = "video-container";

// var container = document.getElementById(id);
// if (!container) {
// console.error("Element #" + id + " is not found by startVideoLoading()");
// return;
// }

// setTimeout(function () {

// var iframe = document.createElement("iframe");
// iframe.width = 470;
// iframe.height = 250;
// iframe.src = "https://www.youtube.com/embed/lnErU8nwQm4";

// container.appendChild(iframe);
// }, 11);
// }

function attachClickHandler(id, handler) {
    var element = document.getElementById(id);
    if (!element) {
        console.error("Element #" + id + " is not found by attachClick()");
        return;
    }

    element.addEventListener("click", handler)
    console.log("Click handler is attached to #" + id);
}

//function nextImage() {
//    var zoomed = document.getElementById('zoomed');
//    var current = zoomed.targetLI;
//    var next = current.nextElementSibling;
//    if (!next) {
//        next = current.parentElement.firstElementChild;
//    }

//    zoomed.targetLI = next;
//    zoomedImg.style.backgroundImage = "url(gallery/" + next.id + ".jpg)";
//}

//function prevImage() {
//    var zoomed = document.getElementById('zoomed');
//    var current = zoomed.targetLI;
//    var next = current.previousElementSibling;
//    if (!next) {
//        next = current.parentElement.lastElementChild;
//    }

//    zoomed.targetLI = next;
//    zoomedImg.style.backgroundImage = "url(gallery/" + next.id + ".jpg)";
//}



function random() {
    var number = Math.floor((Math.random() * 100) + 1);
    if (number <= 10) {
        showMessage();
    }
    else {
        return;
    }
}

function showAlert() {
    var alert = document.getElementById("alert");
    alert.style.visibility = "visible";
    alert.style.opacity = "1";
}

function hideAlert() {
    var alert = document.getElementById("alert");
    alert.style.visibility = "invisible";
    alert.style.opacity = "0";
}

function showMessage() {
    var messageBox = document.getElementById("message");
    messageBox.style.visibility = "visible";
    messageBox.style.opacity = "1";

    setTimeout(hideMessage, 2000);
}

function hideMessage() {
    var messageBox = document.getElementById("message");
    messageBox.style.visibility = "invisible";
    messageBox.style.opacity = "0";
}

function turnRight() {
    if (id >= length) {
        id = 1;
        document.getElementById("carousel").getElementsByTagName("li")[length - 1].style.opacity = "0";
        document.getElementById("carousel").getElementsByTagName("li")[length - 1].style.visibility = "hidden";
        document.getElementById("carousel").getElementsByTagName("li")[id - 1].style.visibility = "visible";
        document.getElementById("carousel").getElementsByTagName("li")[id - 1].style.opacity = "1";
    }

    else {
        document.getElementById("carousel").getElementsByTagName("li")[id - 1].style.opacity = "0";
        document.getElementById("carousel").getElementsByTagName("li")[id - 1].style.visibility = "hidden";
        document.getElementById("carousel").getElementsByTagName("li")[id].style.visibility = "visible";
        document.getElementById("carousel").getElementsByTagName("li")[id].style.opacity = "1";

        id++;
    }
}

function turnLeft() {
    if (id <= 1) {
        id = length;
        document.getElementById("carousel").getElementsByTagName("li")[0].style.opacity = "0";
        document.getElementById("carousel").getElementsByTagName("li")[0].style.visibility = "hidden";
        document.getElementById("carousel").getElementsByTagName("li")[id - 1].style.visibility = "visible";
        document.getElementById("carousel").getElementsByTagName("li")[id - 1].style.opacity = "1";
    }

    else {
        document.getElementById("carousel").getElementsByTagName("li")[id - 1].style.opacity = "0";
        document.getElementById("carousel").getElementsByTagName("li")[id - 1].style.visibility = "hidden";
        document.getElementById("carousel").getElementsByTagName("li")[id - 2].style.visibility = "visible";
        document.getElementById("carousel").getElementsByTagName("li")[id - 2].style.opacity = "1";

        id--;
    }
}