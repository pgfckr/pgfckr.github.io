
/**
 * Converts Text input into source alias
 * 
 * 
 */

function convert(){
    var raw = document.getElementById("inputArea").value;
    var ref = findBreaks(raw);
    document.getElementById("outputArea").value = ref;

}

function findBreaks(raw){
    var ref = [];
    ref.push("line");
    ref.push(raw);
    ref.push("line")
    return ref;
}

