import init, {js_start} from './pkg/sigrilib.js';
// await init();
//

let configArea = document.getElementById('configArea');
let editor = CodeMirror.fromTextArea(
    configArea,
    {lineNumbers: true, indentUnit: 2, theme: 'monokai', mode: 'text/x-yaml'});

window.onload = function onloadas() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('config')) {
        let configStr64 = urlParams.get('config');
        let configStr = atob(configStr64);
        let configArea = document.getElementById('configArea')
        configArea.value = configStr;
        editor.setValue(configStr);
    }
    editor.setSize(400, 600);
    editor.setOption('extraKeys', {
        'Ctrl-Enter': function(cm) {
            document.getElementById('buttonRun').click();
        }
    });
    init();
};

var configFile = document.getElementById('configFile')
configFile.onchange =
    evt => {
        let file = configFile.files[0];
        let reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function() {
            document.getElementById('configArea').value = reader.result;
            editor.setValue(reader.result);
        };
    }

let csv_results = null;
let times = null;
let running = null;
let waiting = null;
let sub_sizes = null;
let load = null;

configArea.onchange = evt => {
    editor.save();
};

editor.on('change', evt => {
    editor.save();
});

var buttonShare = document.getElementById('buttonShare')
buttonShare.onclick = evt => {
    // Getting the config
    let configArea = document.getElementById('configArea');
    let config = configArea.value;

    editor.refresh();
    console.log(editor.getTextArea());

    editor.options.value = config;
    editor.refresh();

    // Changing the url
    let encodedConfig = btoa(config);
    let shareableUrl = window.location.origin + window.location.pathname +
        '?config=' + encodedConfig;
    alert(shareableUrl);
};

var buttonRun = document.getElementById('buttonRun')
buttonRun.onclick = evt => {
    // Getting the config
    let config = document.getElementById('configArea').value;
    // Running the simulation
    let csv_content = js_start(config)
    // Uploading the CSV
    var blob = new Blob([csv_content], {type: 'text/plain;charset=utf-8'});
    var a = document.getElementById('downloadCSV');
    a.href = URL.createObjectURL(blob);
    // Read the CSV
    csv_results = Papa.parse(csv_content).data;

    times = csv_results.map(function(value) {
        return value[0];
    });
    times.shift();

    sub_sizes = csv_results.map(function(value) {
        return value[1];
    })
    sub_sizes.shift();

    waiting = csv_results.map(function(value) {
        return value[3];
    })
    waiting.shift();

    running = csv_results.map(function(value) {
        return value[4];
    })
    running.shift();

    load = csv_results.map(function(value) {
        return value[5];
    })
    load.shift();

    document.getElementById('loadedSimu').innerHTML =
        'Simulation ready to be plotted!';


    document.getElementById('loadedSimu').style.color = 'green';
    document.getElementById('buttonPlotLoad').click();
};

document.getElementById('buttonPlotLoad').onclick = evt => {
    draw_plot('mainPlot', times, load, 'File-System Load', 'loadavg');
};

document.getElementById('buttonPlotRunning').onclick = evt => {
    draw_plot('mainPlot', times, running, 'Running Jobs', 'Nb of Jobs');
};

document.getElementById('buttonPlotWaiting').onclick = evt => {
    draw_plot('mainPlot', times, waiting, 'Waiting Jobs', 'Nb of Jobs');
};

document.getElementById('buttonPlotSubsize').onclick = evt => {
    draw_plot(
        'mainPlot', times, sub_sizes, 'CiGri Submission Size', 'Nb of Jobs');
};


function draw_plot(id, x_data, y_data, title, yaxis) {
    let plot = document.getElementById(id);
    Plotly.newPlot(
        plot, [{
            x: x_data,

            y: y_data,
            line: {shape: 'hv'},
        }],
        {title: title, xaxis: {title: 'Time (s)'}, yaxis: {title: yaxis}});
}
