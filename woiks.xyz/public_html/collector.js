function getConnection() {
  return (
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    navigator.msConnection
  );
}

const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)

staticPayload = {
  userAgent: navigator.userAgent,
  language: navigator.language,
  acceptCookies: navigator.cookieEnabled,
  allowJavascript: true, // TODO: figure this out manually
  allowImages: true, // TODO: figure this out manually
  allowCss: !StyleSheet.disabled, // TODO: figure this out manually
  screenDimension: `${screen.width}x${screen.height}`,
  windowDimension: `${window.innerWidth}x${window.innerHeight}`,
  networkConectionType: getConnection().effectiveType || getConnection().type || null,
};

fetch("/api/static", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(staticPayload),
})
  .then((response) => response.json())
  .then((data) => {
    // console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

//activity
var clickXY = [];
var scrollPos = [];
var key = [];
var idle = [];
var referrer = "";
var currPage = "";
var leftTime = 0;
var enterTime = 0;
var activityID = 0;

//payload update
var updateActivity = function () {
  activityPayload = {
    clickXY: clickXY,
    scroll: scrollPos,
    idle: idle,
    referrer: referrer,
    path: currPage,
    key: key,
    enterTime: enterTime,
    leftTime: leftTime,
    isMobile: isMobileDevice
  }
};

//keep track of idle
let timer, ctr = 0;
function resetTimer() {
    //log if idle more than 2 secs
    if(ctr>2) {
      idle.push(ctr);
      updateActivity();
    }
    clearInterval(timer);
    ctr = 0;
    timer = 
        setInterval(idleTimer, 1000);
}

// reset timer on conditions
window.onmousemove = resetTimer;
window.onmousedown = resetTimer;
window.ontouchstart = resetTimer;
window.onclick = resetTimer;
window.onkeypress = resetTimer;

function idleTimer() {
    ctr++;
}
//keep track of idle END

//before user leave page, update activity payload
window.addEventListener('beforeunload', function(e, activityId) {
  var d = new Date();
  var n = d.getTime();
  leftTime = n;
  updateActivity();
  // e.preventDefault(); //per the standard
  // e.returnValue = ''; //required for Chrome
  putActivity();
});

//onload send performance and activity
window.onload = function () {
  resetTimer;
  var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
  enterTime = window.performance.timing.domContentLoadedEventEnd;
  performancePayload = {
    loadTime: loadTime,
    url: document.URL,
    path: window.location.pathname,
  };
  
  //activity
  currPage = window.location.pathname;
  //keep track of keyboard
  document.addEventListener('keydown', keyDownHandler, false);
  function keyDownHandler(event) {
    key.push(event.keyCode);
    updateActivity();
  }

  //track scroll
  document.addEventListener('scroll', scrollHandler, false);
  function scrollHandler() {
    scrollPos.push(Math.round(window.scrollY));
    updateActivity();
  }

  //track mouse clicks
  document.body.onmousedown = function(event) { 
    clickXY.push([event.clientX, event.clientY,event.button]);
    updateActivity();
  }

  //get refferer url
  if (document.referrer) {
    referrer = document.referrer;
    updateActivity();
  }

  //update activity payload
  updateActivity();

  fetch("/api/performance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(performancePayload),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  fetch("/api/activity", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityPayload),
  })
    .then((response) => response.json())
    .then((data) => {
      activityID = data._id;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

}

//periodically update activity every 5 sec
var intervalId = setInterval(function() {
  putActivity();
}, 5000);

function putActivity(){
  var actURI = "/api/activity/";
  var activityURI = actURI.concat(activityID);
  fetch(activityURI, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityPayload),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}