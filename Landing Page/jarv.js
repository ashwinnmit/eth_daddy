var latitude;
var longitude;
var address; 
let mes;

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const synth = window.speechSynthesis;

// Start recognition immediately after the object is created
recognition.start();

const utter = new SpeechSynthesisUtterance("Hi!");
utter.onend = () => {
    recognition.start();
}

recognition.onresult = (e) =>{
    const transcript = e.results[e.results.length - 1][0].transcript.trim();
    if(transcript === "hello"){
        recognition.stop();
        utter.text = "Hi! How are you?";
        console.log(transcript);
        synth.speak(utter);
    }
    else if(transcript === "help"){
        recognition.stop();
        utter.text = "Help is on the way!";
        console.log(transcript);
        getLocation();
        sendMessage();
        synth.speak(utter);
    }
    else if(transcript === "goodbye"){
        recognition.stop();
        utter.text = "Hope to see you soon";
        console.log(transcript);
        synth.speak(utter);
    }
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            // Get latitude and longitude
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            // Call TomTom Search API to get address based on coordinates
            const apiKey = 'Fuo1DjGuXeQrkBtk2gKIeIJx3bBQyLv0';
            const url = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${apiKey}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Extract the address from the response
                    address = data.addresses[0].address.freeformAddress;
                    console.log(address,longitude,latitude);
                    mes = `${address}${latitude}${longitude}`;
                    console.log(mes);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function sendMessage () {
    // Twilio API credentials
    const accountSid = 'AC731e4f6c136823210c883224a7f511a9';
    const authToken = '0096272e3899f698db563fac60180ba5';

    // Recipient's phone number and Twilio phone number
    const toPhoneNumber = '+919686755431';
    const fromPhoneNumber = '+12293674550';

    // Message body
    const messageBody = mes;

    // Twilio API endpoint
    const apiUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

    // Create an XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Open a POST request to the Twilio API endpoint
    xhr.open('POST', apiUrl, true);
    xhr.setRequestHeader('Authorization', 'Basic ' + btoa(accountSid + ':' + authToken));
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Set the request payload
    const params = `To=${encodeURIComponent(toPhoneNumber)}&From=${encodeURIComponent(fromPhoneNumber)}&Body=${encodeURIComponent(messageBody)}`;
    
    // Send the request
    xhr.send(params);

    // Handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log('SMS sent successfully!');
        } else {
            console.error('Failed to send SMS. Status code: ' + xhr.status);
        }
    };
}