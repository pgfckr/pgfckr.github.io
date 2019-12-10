
/**
 * Converts Text input into source alias
 * 
 * 
 */

function convert() {
    var raw = document.getElementById("inputArea").value;
    var ref = findBreaks(raw.replace(/\"/g, "''"));
    ref = makeAlias(ref);
    document.getElementById("outputArea").value = ref;
}

/**
 * Breaks the input into strings of a maximum lenght
 * the variance is the space in one of those strings where the script will look for the rightmost linebreaks colons or semicolons 
 * those ore considered better breakpoints than splitting whole words
 * @param {*} rawString Input from the textarea - " symbol
 * @returns array of strings
 */

function findBreaks(rawString) {
    var rawInput = rawString;
    var ref = [];
    var maxChars = 20;
    var maxVariation = 10;

    while (rawInput.length > maxChars) {
        
        var tempString = rawInput.substring(0, maxChars);
        var bestBreakpoint = maxChars;
        var criticalArea = rawInput.substring(maxChars - maxVariation, maxChars);

        if (criticalArea.includes("\n")) {
            ref.push(rawInput.substring(0, rawInput.lastIndexOf("\n")));
            rawInput = rawInput.substring(rawInput.lastIndexOf("\n"));
        }

        else if (criticalArea.includes(".")) {
            ref.push(rawInput.substring(0, rawInput.lastIndexOf(".")));
            rawInput = rawInput.substring(rawInput.lastIndexOf("."));
        }

        else if (criticalArea.includes(" ")) {
            ref.push(rawInput.substring(0, rawInput.lastIndexOf(" ")));
            rawInput = rawInput.substring(rawInput.lastIndexOf(" "));
        }

        else {
            ref.push(rawInput.substring(0, maxChars));
            rawInput = rawInput.substring(maxChars);
        }

    }

    if (rawInput.length > 0) {
        ref.push(rawInput);
    }
    return ref;
}

function makeAlias(stringArray) {
    var aliasString = stringArray.length;
    return aliasString;
}

function copyTextToClipboard() {    
    var text = document.getElementById("outputArea").value;
    navigator.clipboard.writeText(text).then(
      function() {
        console.log("Async: Copying to clipboard was successful!");
      },
      function(err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }

