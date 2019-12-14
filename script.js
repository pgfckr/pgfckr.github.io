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
    var maxChars = 120;
    var maxVariation = 15;

    while (rawInput.length > maxChars) {

        var tempString = rawInput.substring(0, maxChars);
        var bestBreakpoint = maxChars;
        var criticalArea = rawInput.substring(maxChars - maxVariation, maxChars);
        var worstString = rawInput.substring(0, maxChars);

        if (criticalArea.includes("\n")) {
            var pushString = rawInput.substring(0, worstString.lastIndexOf("\n")).replace("\n", "");
            ref.push(pushString);
            rawInput = rawInput.substring(pushString.length + 1);
        } else if (criticalArea.includes(".")) {
            var pushString = rawInput.substring(0, worstString.lastIndexOf(".")).replace("\n", "");
            ref.push(pushString);
            rawInput = rawInput.substring(pushString.length + 1);
        } else if (criticalArea.includes(" ")) {
            var pushString = rawInput.substring(0, worstString.lastIndexOf(" ")).replace("\n", "")
            ref.push(pushString);
            rawInput = rawInput.substring(pushString.length + 1);
        } else {
            ref.push(rawInput.substring(0, maxChars));
            rawInput = rawInput.substring(maxChars);
        }

    }

    if (rawInput.length > 0) {
        ref.push(rawInput);
    } else {
        ref.push("no input found");
    }
    return ref;
}

function makeAlias(stringArray) {
    var aliasString = "alias line;\n";
    var lastLine = 0;
    if (Array.isArray(stringArray)) {
        for (var i = 0; i < stringArray.length - 1; i++) {
            lastLine = i;
            aliasString += "alias line" + i + "\"say " + stringArray[i] +
                "; alias line line" + (i + 1) + "\";\n";
        }
        aliasString += "alias line" + i + "\"say " + stringArray[lastLine + 1] +
            "; alias line line" + (0) + "\";\n";
        aliasString += "alias line line0;\n";
    } else {
        aliasString += "alias line0" + "\"say " + stringArray +
            "; alias line line" + (0) + "\";\n";
        aliasString += "alias line line0;\n";
    }

    if (document.getElementById("checkboxMouseInput").checked == true) {
        aliasString += "bind mouse" + document.getElementById("bindInput").value.toLowerCase() + " line";
    } else {
        aliasString += "bind " + document.getElementById("bindInput").value.toLowerCase() + " line";
    }
    return aliasString;
}

function copyTextToClipboard() {
    var text = document.getElementById("outputArea").value;
    navigator.clipboard.writeText(text).then(
        function() {
            console.log("Copying to clipboard");
        },
        function(err) {
            console.error("Could not copy: ", err);
        }
    );
}
