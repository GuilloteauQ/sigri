import init, {js_start} from './pkg/sigrilib.js'

    await init()

var configFile = document.getElementById('configFile')
configFile.onchange =
    evt => {
        let file = configFile.files[0];
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function() {
            document.getElementById('configArea').value = reader.result;
        };
    }

var buttonRun = document.getElementById('buttonRun')
buttonRun.onclick = evt => {
    let config = document.getElementById('configArea').value;
    let csv_content = js_start(config)
    var blob = new Blob([csv_content], {type: 'text/plain;charset=utf-8'});
    var a = document.getElementById('downloadCSV');
    a.href = URL.createObjectURL(blob);
}

