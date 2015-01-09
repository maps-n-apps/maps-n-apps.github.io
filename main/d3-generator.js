var createErrorHandlingWrapper = function(context, delegate) {
    return function() {
        try {
            delegate.apply(context, arguments);
        } catch (ex) {
            errorHandler.onError(ex);
        }
    };
};

mixpanel.track = createErrorHandlingWrapper(mixpanel, mixpanel.track);
mixpanel.track_funnel = createErrorHandlingWrapper(mixpanel, mixpanel.track_funnel);
mixpanel.track_links = createErrorHandlingWrapper(mixpanel, mixpanel.track_links);
mixpanel.register = createErrorHandlingWrapper(mixpanel, mixpanel.register);
mixpanel.register_once = createErrorHandlingWrapper(mixpanel, mixpanel.register_once);
mixpanel.register_funnel = createErrorHandlingWrapper(mixpanel, mixpanel.register_funnel);
mixpanel.identify = createErrorHandlingWrapper(mixpanel, mixpanel.identify);

var createThrottledTracker = function(milliseconds, trackingFunction, enabled) {

    var hasBeenTracked = false;

    var resetTrackingStatus = function() {
        hasBeenTracked = false;
    }

    return {
        'track': function() {
            if (hasBeenTracked || !enabled) {
                return;
            }

            hasBeenTracked = true;
            trackingFunction();
            setInterval(resetTrackingStatus, milliseconds);
        },

        'setEnabled': function(newState) {
            enabled = newState;
        }
    };
}

var csvChangeTracker = createThrottledTracker(60 * 1000, function() {
    mixpanel.track("csv_change");
}, false);

var sourceCodeTracker = createThrottledTracker(60 * 1000, function() {
    mixpanel.track("source_change");
}, true);

mixpanel.register({
    'Browser + Version' : BrowserDetect.browser + " " + BrowserDetect.version,
    'Screen Resolution' : screen.width + " x " + screen.height
});

mixpanel.track_links("#introduction a", "external link", {
    'screen_region': 'introduction'
});
mixpanel.track_links("#csv a", "external link", {
    'screen_region': 'csv'
})
mixpanel.track_links("#source a", "external link", {
    'screen_region': 'source'
});
mixpanel.track_links("#footer a", "external link", {
    'screen_region': 'footer'
});

mixpanel.track("pageload", {
    'URL': window.location.href
});

ZeroClipboard.setMoviePath('/js/zeroclipboard/ZeroClipboard.swf');
var clip = new ZeroClipboard.Client();
clip.addEventListener('onComplete', function(client, text) {
    mixpanel.track("export_html_copied_to_clipboard");

    var btn = $('#clipButton');
    btn.removeClass("btn-primary");
    btn.addClass("btn-success");
    btn.html("Copied successfully!");
    setTimeout(function() {
        btn.removeClass("btn-success");
        btn.addClass("btn-primary");
        btn.html("Copy to clipboard");
    }, 3 * 1000);
});

window.data = [];
window.editorContent = "";

updateChartGeneratorState();

function generateChartButtonClicked() {
    if ($('#buttonGenerateCode').hasClass('disabled')) {
        return;
    }

    $('#generateButtonSection').hide();
    if (window.editorContent != window.sourceEditor.getSession().getValue()) {
        $('#sourceCodeOverrideAlert').show();
    } else {
        doCallCodeGenerator();
    }
} 

function closeHtmlExportDialog() {
    mixpanel.track("export_html_close_dialog");
    $('#htmlExportDialog').modal('toggle');
}

function openHtmlExportDialog() {
    if ($('#htmlExportButton').hasClass('disabled')) {
        return;
    }

    mixpanel.track("export_html_open_dialog");
    $('#htmlExportDialog').modal('toggle');
    clip.glue('clipButton', 'clipContainer');
}

function abortCodeGeneration() {
    $('#sourceCodeOverrideAlert').hide();
    $('#generateButtonSection').show();
}

function doCallCodeGenerator() {
    $('#sourceCodeOverrideAlert').hide();
    callCodeGenerator(
        $('#inputCategoryColumn').val(),
        $('#inputMeasureColumn').val(),
        $('input[name=order]:checked').val(),
        $('#measureOperation').val()
    );
}

function callCodeGenerator(categoryColumn, measureColumn, orderColumn, measureOperation) {
    
    var categoryColumn = $('#inputCategoryColumn').val();
    var measureColumn = $('#inputMeasureColumn').val();
    var orderColumn = $('input[name=order]:checked').val();
    var measureOperation = $('#measureOperation').val(); 


    mixpanel.track("generate_chart", {
        'order': orderColumn,
        'measureOperation': measureOperation
    });

    var url = location.href + '/chart.js';

    

    var serviceCallTime = new Date().getTime();
    d3.text(url, function(generatedCode) {
        mixpanel.track("generate_chart_response", {
            'response_time': new Date().getTime() - serviceCallTime
        });

        sourceCodeTracker.setEnabled(false);
        window.editorContent = generatedCode;
        $('#chart').empty();
        window.sourceEditor.getSession().setValue(generatedCode);
        window.sourceEditor.resize();
        redrawChart();
        $('#generateButtonSection').show();
        sourceCodeTracker.setEnabled(true);
    });
}

function openHtmlExportPage() {
    mixpanel.track("export_html_open_page");
    window.open('','_blank').document.writeln(window.htmlCode);
}

function parseCsv(csv) {
    window.data = d3.csv.parse(csv);
    redrawChart();
    updateChartGeneratorState();
}

function onCsvChange() {
    csvChangeTracker.track();
    parseCsv(window.csvEditor.getSession().getValue());
    window.csvEditor.resize();
    updateExportButton();
};

function onSourceChange() {
    sourceCodeTracker.track();
    redrawChart();
    updateExportButton();
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function updateChartGeneratorState() {
    if (window.data !== undefined && window.data.length > 0) {
        $('#warning-no-columns').hide();

        var columns = _.map(window.data[0], function(value, key) {
            return [value, key];
        });

        var optionAssembler = function(memo, column) {
            return memo + '<option value="' + column[1] + '">' + column[1] + '</option>';
        };

        var numericColumns = _.filter(columns, function(d) {
            return isNumber(d[0]);
        });

        var allColumnOptions = _.reduce(columns, optionAssembler, '');
        var numericColumnOptions = _.reduce(numericColumns, optionAssembler, '');

        $('#inputCategoryColumn').html(allColumnOptions);
        $('#inputMeasureColumn').html(numericColumnOptions);
        $('#orderColumn').html('<option value="">no order</option>' + numericColumnOptions);

        $('#inputCategoryColumn').attr('disabled', false);

        if (numericColumns.length > 0) {
            $('#inputMeasureColumn').attr('disabled', false);
            $('#measureOperation').attr('disabled', false);

            $('#orderOriginal').attr('disabled', false);
            $('#orderValueAscending').attr('disabled', false);
            $('#orderValueDescending').attr('disabled', false);
            $('#orderLabelAlphabetical').attr('disabled', false);

            $('#buttonGenerateCode').removeClass('disabled');
            $('#warning-no-numerical-columns').hide();
        } else {
            $('#inputMeasureColumn').attr('disabled', true);
            $('#measureOperation').attr('disabled', true);

            $('#orderOriginal').attr('disabled', true);
            $('#orderValueAscending').attr('disabled', true);
            $('#orderValueDescending').attr('disabled', true);
            $('#orderLabelAlphabetical').attr('disabled', true);

            $('#buttonGenerateCode').addClass('disabled');
            $('#warning-no-numerical-columns').show();
        }
    } else {
        $('#inputCategoryColumn').html('');
        $('#inputMeasureColumn').html('');

        $('#inputCategoryColumn').attr('disabled', true);
        $('#inputMeasureColumn').attr('disabled', true);
        $('#measureOperation').attr('disabled', true);

        $('#orderOriginal').attr('disabled', true);
        $('#orderValueAscending').attr('disabled', true);
        $('#orderValueDescending').attr('disabled', true);
        $('#orderLabelAlphabetical').attr('disabled', true);

        $('#buttonGenerateCode').addClass('disabled');

        $('#warning-no-numerical-columns').hide();
        $('#warning-no-columns').show();
    }
}

function redrawChart() {

    var code = window.sourceEditor.getSession().getValue();
    var label = $('#inputCategoryColumn').val();
    var variable = $('#inputMeasureColumn').val();
    var sorting = $('input[name=order]:checked').val();
    var sum = $('#measureOperation').val();
    var colour = $('#inputColour').val();

    // update code export
    if (canExport()) {
        try {
            var csv = window.csvEditor.getSession().getValue();

            window.htmlCode = _.template(window.html_export_template, {
                'code': code,
                'csv': csv,
                'label': label,
                'variable': variable,
                'sorting': sorting,
                'sum': sum,
                'colour': colour
                
            });

            clip.setText(window.htmlCode);
            $('#exportHtml').text(window.htmlCode).error(function() {
                alert( "Ooops... something isn't quite right!" )
              });
        } catch (error) {
            $('#renderError').show().error(function() {
                alert( "Handler for .error() called." )
              });
        }
    }

    // update chart
    if (code !== "") {
        $('#chart').empty();
        $('#chart').show();
        $('#emptyChart').hide();
        $('#noChartYet').hide();
        $('#renderError').hide();

        try {
            eval('(function() {\n' + code + '\n}());');
        } catch (error) {
            $('#chart').hide();
            $('#renderError').show().error(function() {
                alert( "Handler for .error() called." )
              });
        }
    }
}

var JavascriptMode = require("ace/mode/javascript").Mode;
window.sourceEditor = ace.edit("sourceEditor");
window.sourceEditor.getSession().setMode(new JavascriptMode());
window.sourceEditor.setShowPrintMargin(false);
window.sourceEditor.getSession().on('change', onSourceChange);

window.csvEditor = ace.edit("csvEditor");
window.csvEditor.setShowPrintMargin(false);
window.csvEditor.getSession().on('change', onCsvChange);

function canExport() {
    var templateLoaded = window.html_export_template !== undefined;
    var dataAvailable = window.data !== undefined && window.data.length > 0;
    var sourceAvailable = window.sourceEditor.getSession().getValue() !== "";

    return templateLoaded && dataAvailable && sourceAvailable;
}

function updateExportButton() {
    if (canExport()) {
        $('#htmlExportButton').removeClass('disabled');
    } else {
        $('#htmlExportButton').addClass('disabled');
    }
}

window.onResize = function() {
    window.csvEditor.resize();
    window.sourceEditor.resize();
};
    
d3.text('templates/html_export.template', function(template) {
    window.html_export_template = template;
    updateExportButton();
});

d3.text('data/countries.csv', function(csv) {
    window.csvEditor.getSession().setValue(csv);
    csvChangeTracker.setEnabled(true);
});
