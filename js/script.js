$(document).ready(function() {
  //global variables
  var snd = new Audio("https://www.dropbox.com/s/p3wconux2o8hdbn/Air%20Horn-SoundBible.com-1561808001.wav?dl=1");
  var breakTime = 300;
  var workTime = 1500,
    currentTime = workTime,
    testPom = currentTime;
  var onDeck = "Break";
  var id = true;

  // Set session start time
  $("#testClock").text(secToTimeString(workTime));

  // Click handlers to adjust Session and Break times
  // Reduce Session time
  $("#decPom").click(function() {
    // Cannot reduce below 1
    if (testPom == workTime && $("#testPom").text() > 1) {
      var pom = $("#testPom").text();
      pom--;
      $("#testPom").text(pom);
      testPom =
        currentTime =
        workTime = eval(minToSec($("#testPom").text()));
      $("#testClock").text(secToTimeString(workTime));
    }
  });
  // Increase Session time
  $("#incPom").click(function() {
    if (testPom == workTime) {
      var pom = $("#testPom").text();
      pom++;
      $("#testPom").text(pom);
      testPom =
        currentTime =
        workTime = eval(minToSec($("#testPom").text()));
      $("#testClock").text(secToTimeString(workTime));
    }
  });
  // Reduce Break time
  $("#decBreak").click(function() {
    // Cannot reduce below 1
    if (testPom == workTime && $("#testBreak").text() > 1) {
      var brk = $("#testBreak").text();
      brk--;
      $("#testBreak").text(brk);
      breakTime = eval(minToSec($("#testBreak").text()));
    }
  });
  // Increase Break time
  $("#incBreak").click(function() {
    if (testPom == workTime) {
      var brk = $("#testBreak").text();
      brk++;
      $("#testBreak").text(brk);
      breakTime = eval(minToSec($("#testBreak").text()));
    }
  });

  // Click handlers for controlling flow of session
  $("#start").click(countdown);

  $("#pause").click(pauseCountdown);

  $("#stop").click(stopCountdown);

  $("#reset").click(resetCountdown);

  /* ------------Functions------------ */

  // Convert Break and Session time from minutes to seconds
  function minToSec(min) {
    return min * 60;
  }

  // Convert seconds to 00:00:00 format.
  function secToTimeString(second) {
    var hour = 0,
      minute = 0;

    hour = Math.floor(second / 3600);
    second = second - (3600 * hour);
    minute = Math.floor(second / 60);
    second = second - (60 * minute);

    return (hour > 0) ? n(hour) + ":" + n(minute) + ":" + n(second) : n(minute) + ":" + n(second);

    //function to add leading 0
    function n(n) {
      return n > 9 ? "" + n : "0" + n;
    }
  }

  // Start pomodoro
  function countdown() {
    if (id === true) {
      testPom = currentTime;
      id = setInterval(decrement, 1000);
    }

    // Timing function
    function decrement() {
      // Toggle between Session and Break
      if (testPom == 0) {
        snd.play();
        $("#activity").text(onDeck);
        switch (onDeck) {
          case "Break":
            testPom = breakTime;
            countPomodoro();
            onDeck = "Session";
            break;
          case "Session":
            testPom = workTime;
            onDeck = "Break";
            break;
        }
        $("#testClock").text(secToTimeString(testPom));
      }
      else {
        // Reduce time left by 1 second and display result in 00:00:00 format
        testPom--;
        $("#testClock").text(secToTimeString(testPom));
      }

      // Change color of clock based on percent of time left
      var percentLeft = Math.floor((testPom / workTime) * 100);
      if (percentLeft <= 10) {
        $("#testClock").css("color", "red");
      }
      else if (percentLeft <= 25) {
        $("#testClock").css("color", "yellow");
      }
      else {
        $("#testClock").css("color", "green");
      }
    }
  }

  function pauseCountdown() {
    clearInterval(id);
    id = true;
    currentTime = testPom;
  }

  function stopCountdown() {
    clearInterval(id);
    id = true;
    testPom = currentTime = workTime;
    $("#testClock").text(secToTimeString(workTime));
    $("#testClock").css("color", "white");
    $("#activity").text("Session");
    onDeck = "Break";
  }

  function resetCountdown() {
    clearInterval(id);
    id = true;
    testPom = currentTime = workTime = minToSec(25);
    breakTime = minToSec(5);
    pomCount = 0;

    $("#pomCount").text(pomCount);
    $("#testPom").text(25);
    $("#testBreak").text(5);
    $("#testClock").text(secToTimeString(testPom));
    $("#testClock").css("color", "white");
    $("#activity").text("Session");
    onDeck = "Break";
  }

  // Count pomodoro cycles in current session
  var pomCount = 0;
  function countPomodoro() {
    pomCount++;
    $("#pomCount").text(pomCount);
  }
});
