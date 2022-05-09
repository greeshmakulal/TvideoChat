// replace these values with those generated in your TokBox Account
var apiKey = "";
var sessionId = "1_MX40NzQ5NjAzMX5-MTY1MTc3MzIxMzE2OX5yL3pJV21tVmtQL3kreWMzWGxvd3lRLzF-fg";
var token = "T1==cGFydG5lcl9pZD00NzQ5NjAzMSZzaWc9ZTg1OTRlN2M5YWE4MzRlZmUzYWNlZDhmOTZhYTI5NTM1YjIyMjYyNTpzZXNzaW9uX2lkPTFfTVg0ME56UTVOakF6TVg1LU1UWTFNVGMzTXpJeE16RTJPWDV5TDNwSlYyMXRWbXRRTDNrcmVXTXpXR3h2ZDNsUkx6Ri1mZyZjcmVhdGVfdGltZT0xNjUxNzczMjQ1Jm5vbmNlPTAuNzg3ODI3MzQwMDI5MDg0MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjU0MzY1MjQ0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
var isVideoActive=true;
var isAudioActive=true;

var username= document.getElementById('name').value;
 console.log(username)

// (optional) add server code heres

var SERVER_BASE_URL = 'https://t-vchatapp.herokuapp.com/';
fetch(SERVER_BASE_URL + '/session').then(function(res) {
  return res.json()
}).then(function(res) {
  apiKey = res.apiKey;
  sessionId = res.sessionId;
  token = res.token;
  initializeSession();
}).catch(handleError);

if(isAudioActive)
{
  document.getElementById('mic').classList.toggle('samples');
 
}
if(isVideoActive)
{
  document.getElementById('videocam').classList.toggle('samples');
}

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
function handleCallback(error) {
  if (error) {
    console.log("error: " + error.message);
  } else {
    console.log("callback success");
  }
}
  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
  
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber',{
          insertMode: 'append',
          name:'other',
          setStyle:{nameDisplayMode:'on',buttonDisplayMode:'off'},
 
        }, handleError);
    });
  
    // Create a publisher
    var publisher = OT.initPublisher('publisher',{name:'Greeshma'}, {
      insertMode: 'append',
      width: '300',
        height: '400',
    }, handleError);
    publisher.setStyle({buttonDisplayMode:'off'})

    //publishing
//     var publisherProperties = {resolution: ''};
//     var publisher = OT.initPublisher('publisher',
//                                  publisherProperties);
// publisher.on('streamCreated', function(event) {
//    console.log('Stream resolution: ' +
//      event.stream.videoDimensions.width +
//      'x' + event.stream.videoDimensions.height);
// });
    //var pubOptions = {publishAudio:true, publishVideo:true};
    // var publisher = OT.initPublisher('publisher',  {name:'Greeshma'} ,{
    //   insertMode: 'append',
    //   width: '100%',
    //   height: '100%'
    // }, handleError);
    // publisher.setStyle({buttonDisplayMode:'off'})

    var video=document.getElementById('videocam');
    video.addEventListener('click', ()=>{
      isVideoActive=!isVideoActive;
      publisher.publishVideo(isVideoActive);
      if(isVideoActive)
      {
        video.classList.toggle('samples');
      }
      else
      {
        video.classList.remove('samples');
      }

    })
    var sample=document.getElementById('mic');
    sample.addEventListener('click', ()=>{
      isAudioActive=!isAudioActive;
      publisher.publishAudio(isAudioActive); 
      if(isAudioActive)
      {
        sample.classList.toggle('samples');
      }
      else
      {
        sample.classList.remove('samples');
      }
    })

    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });

    const screenShare=document.getElementById("screen");
    const startShareBtn = document.getElementById("ScreenShare");

    startShareBtn.addEventListener("click", (event) => {
      OT.checkScreenSharingCapability(response => {
        if (!response.supported || response.extensionRegistered === false) {
          alert("Screen sharing not supported");
        } else if (response.extensionInstalled === false) {
          alert("Browser requires extension");
        } else {
        // Share screen code
          const screenSharePublisher = OT.initPublisher(
            "screen",
            {
              insertMode: "append",
              width: "100%",
              height: "100%",
              videoSource: "screen",
              publishAudio: true
            },
            handleCallback
          );
          session.publish(screenSharePublisher, handleCallback);
        
        // CSS classes when screen-sharing starts
          //  startShareBtn.classList.toggle("hidden");
           //stopShareBtn.classList.toggle("hidden");
          //  screenShare.classList.add("pub-active");
        }
      });
    });
    const hangUpBtn = document.getElementById('call');
    hangUpBtn.addEventListener('click', function (){
      session.disconnect();
      console.log("Disconnected");
    })
  }
 


//  var op= document.getElementById('mic').addEventListener('click',()=>
//   {
    
//   })

  
 //checking screen sharing capabilities
    
    //adding end call button
  
 

  