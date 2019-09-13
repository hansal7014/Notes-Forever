const fs = new Filer.FileSystem();
var t; //variable to store time interval to save notes.
var noteCount = 0;
var rowCount = 1;

window.addEventListener('DOMContentLoaded', (event) => {
    fs.readFile('/note', 'utf8', function (err, data) {
        if (err) {
            document.querySelector('#note').innerHTML = 'Type Notes Here';
        }
        if (data) {
            document.querySelector('#note').innerHTML = data;
        }
    });
    function readData(fileName){
        fs.readFile(fileName, 'utf8', function (err, data) {
            if (err) {
                document.querySelector('#noteBody').innerHTML = 'Notes';
            }else if (data) {
                document.querySelector('#noteBody').innerHTML = data;
            }
        });
    }

    function saveData(fileName) {
        fs.writeFile("/" + fileName, document.querySelector('#noteBody').innerHTML);
        var body = document.querySelector('#noteBody').innerHTML;
        var title = document.getElementById(fileName).querySelector(".nTitle").innerHTML;
        document.querySelector("#" + fileName).setAttribute("data-title", title);
        var content = '<b class="nTitle">' + title + "</b><div class='nBody'>" + 
        (body.length > 42 ? (body.substring(0, 41) + "\n...") : body) + "</div>";
        document.querySelector("#" + fileName).innerHTML = content;
    }

    $('#noteModal').on('show.bs.modal', function (event) {
        var trigger = $(event.relatedTarget);
        var title = trigger.data('title');
        var file = trigger.data('file');
        var isNewNote = ( "BUTTON" == event.relatedTarget.nodeName);
        document.querySelector('#noteTitle').innerHTML = title;
        if(!isNewNote){
            readData("/" + file);
        }else{
            noteCount++;
            file = "/note" + noteCount;
            addNote("note" + noteCount, title, (noteCount % 3 == 1));
        }
        t = setInterval(() => { saveData(file) }, 2000);
    });

    $('#noteModal').on('hidden.bs.modal', function (e) {
        clearInterval(t);
      })
});

function addNote(noteId, title, isNewRow) {
    var noteGrid = "";
  /*  if(isNewRow){
        rowCount++;
       noteGrid = document.body.innerHTML;

        noteGrid += '<div class="container"><div class="row" id="noteGrid'
        + rowCount + '"><div class="col-sm" id="' 
        + noteId + '" data-toggle="modal" data-target="#noteModal" data-file="'
        + noteId + '" data-title="' + title + '">' 
        + '<b class="nTitle">' + title + '</b>'
        + '<div class="nBody">'
        + '</div> </div> </div> </div>';

        document.body.innerHTML = noteGrid;
    }else{  */
        noteGrid = document.querySelector('#noteGrid').innerHTML;

        noteGrid += '<div class="col-sm" id="' 
        + noteId + '" data-toggle="modal" data-target="#noteModal" data-file="'
        + noteId + '" data-title="' + title + '">' 
        + '<b class="nTitle">' + title + '</b>'
        + '<div class="nBody">'
        + '</div> </div>';

        document.querySelector('#noteGrid').innerHTML = noteGrid;
   // } 
}

function saveNote() {
    fs.writeFile('/note', document.querySelector('#note').innerHTML);
}

setInterval(() => { this.saveNote() }, 2500);




