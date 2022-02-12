import init, {js_start} from './pkg/sigrilib.js'

    await init()

var filename = '/tmp/output_sigri.csv'

export function readFile(input) {
    let file = input.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function() {
        let csv_content = js_start(reader.result)
        var blob = new Blob([csv_content], {type: 'text/plain;charset=utf-8'});
        var a = document.getElementById('downloadCSV');
        a.href = URL.createObjectURL(blob);
    };
}

export function download(text, name, type) {
    var a = document.getElementById('a');
    var file = new Blob([text], {type: type});
    a.href = URL.createObjectURL(file);
    a.download = name;
}

var configFile = document.getElementById('configFile')
configFile.onchange =
    evt => {
        readFile(configFile)
    }

// var saveFile = document.getElementById('downloadButton')
// saveFile.onclick = evt => {
//     console.log(evt)
//     console.log(filename)
//
//     let reader = new FileReader();
//     reader.readAsText(filename);
//
//     var a = document.getElementById('a');
//     var file = new Blob([reader.result], {type: 'text/plain'});
//     a.href = URL.createObjectURL(file);
//     a.download = filename;
// }
