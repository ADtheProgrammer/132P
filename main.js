prediction_1 = "";
prediction_2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

//create your model and store it in var classifier 

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/8BCChyCI9/model.json', modelLoaded);

//define function modelLoaded

function modelLoaded() {
    console.log('Model Loaded!');
}

//define function check()

function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}

//define function gotResult(error, results)

function gotResult(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results);
        document.getElementById("output").innerHTML = "Prediction 1 -" + results[0].label;
        document.getElementById("output2").innerHTML = "Prediction 2 -" + results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
    }

    if (results[0].label == "Proper Mask") {
        document.getElementById("output").innerHTML = "Prediction 1: " + results[0].label + "&#x1F637;";
    }

    if (results[0].label == "No Mask") {
        document.getElementById("output").innerHTML = "Prediction 1: " + results[0].label + "&#x26d4;";
    }

    if (results[0].label == "Improper Mask") {
        document.getElementById("output").innerHTML = "Prediction 1: " + results[0].label;
    }  




    if (results[1].label == "Proper Mask") {
        document.getElementById("output2").innerHTML = "Prediction 2: " + results[1].label + "&#x1F637;";
    }

    if (results[1].label == "No Mask") {
        document.getElementById("output2").innerHTML = "Prediction 2: " + results[1].label + "&#x26d4;";
    }

    if (results[1].label == "Improper Mask") {
        document.getElementById("output2").innerHTML = "Prediction 2: " + results[1].label + "&#x26d4;";
    }
}