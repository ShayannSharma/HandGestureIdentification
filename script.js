Webcam.set({
    width:350,
    height:300,
    image_format: 'png',
    png_quality:90
})

camera = document.getElementById("camera")
Webcam.attach('#camera')

function TakePic(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'">'
    })
}

console.log('ml5 version:', ml5.version)
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/lI2jCtVFQ/model.json', modelLoaded)
function modelLoaded(){
    console.log('Model Loaded!')
}
function speak(){
    var synth = window.speechSynthesis
    speak_data_1 = "the first prediction is" + prediction_1
    speak_data_2 = "the second prediction is" + prediction_2
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2)
    synth.speak(utterThis)
}
prediction_1 = ""
prediction_2 = ""
function Predict(){
    Img = document.getElementById("capture_image")
    classifier.classify(Img, gotResult)
}
function gotResult(error, result){
    if (error) {
        console.error(error)
    } else {
        console.log(result)
        document.getElementById("emotion1").innerHTML = result[0].label
        document.getElementById("emotion2").innerHTML = result[1].label
        prediction_1 = result[0].label
        prediction_2 = result[1].label
        speak()
        if (prediction_1 == "Thumbs Up") {
            document.getElementById("emoji1").innerHTML = "&#128077;"
        }
        if (prediction_1 == "Thumbs Down") {
            document.getElementById("emoji1").innerHTML = "&#128078;"
        }
        if (prediction_1 == "Fistbump") {
            document.getElementById("emoji1").innerHTML = "&#128074;"
        }
        if (prediction_1 == "Peace") {
            document.getElementById("emoji1").innerHTML = "&#9996;"
        }
        if (prediction_2 == "Thumbs Up") {
            document.getElementById("emoji2").innerHTML = "&#128077;"
        }
        if (prediction_2 == "Thumbs Down") {
            document.getElementById("emoji2").innerHTML = "&#128078;"
        }
        if (prediction_2 == "Fistbump") {
            document.getElementById("emoji2").innerHTML = "&#128074;"
        }
        if (prediction_2 == "Peace") {
            document.getElementById("emoji2").innerHTML = "&#9996;"
        }
    }
}
    //https://teachablemachine.withgoogle.com/models/lI2jCtVFQ/