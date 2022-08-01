prediction_1 = "";
prediction_2 = "";

Webcam.set({

  width:350,
  height:300,
image_format:'png',
png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
  Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img src=' "+data_uri+" ' id='captured_image'/>";
  });
}
console.log("ml5.version = " , ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/kwltXpFUE/model.json" , modalLoaded);
function modalLoaded(){
  console.log("Modal Loaded");
}
function speak(){
var synth = window.speechSynthesis;
speak_data_1 = "The first prediction is " + prediction_1;
speak_data_2 = "And the second prediction is" + prediction_2;
utter_this = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
synth.speak(utter_this); 
}
function check(){
  img = document.getElementById("captured_image");
  classifier.classify(img , gotResult);
}
function gotResult(error , result){
  if(error){
    console.log(error)
  }
  else {
    console.log(result);
    document.getElementById("result_emotion_name").innerHTML = result[0].label;
    document.getElementById("result_emotion_name2").innerHTML = result[1].label;
    prediction_1 = result[0].label;
    prediction_2 = result[1].label;
    speak();
    if(result[0].label = "happy"){
      document.getElementById("update_emoji").innerHTML = "&#128522;";
    }
    if(result[0].label = "sad"){
      document.getElementById("update_emoji").innerHTML = "&#128546;";
    }
    if(result[0].label = "angry"){
      document.getElementById("update_emoji").innerHTML = "&#128545;";
    }
    if(result[1].label = "happy"){
      document.getElementById("update_emoji2").innerHTML = "&#128522;";
    }
    if(result[1].label = "sad"){
      document.getElementById("update_emoji2").innerHTML = "&#128546;";
    }
    if(result[1].label = "angry"){
      document.getElementById("update_emoji2").innerHTML = "&#128545;";
    }
  }
}