// ? Chrome browswer is caching info from old app.js version, why?
// Have to reload into new icognito window (not tab) to reload new files
function buildMetadata(sample) {
  // @TODO: Complete the following function that builds the metadata panel
  // Use `d3.json` to fetch the metadata for a sample
  console.log("buildMetadata function is working!")
  var metaURL = `/metadata/${sample}`;
    d3.json(metaURL).then(function(data) {
      // Use d3 to select the panel with id of `#sample-metadata`
      var metaData = d3.select("#sample-metadata");
      // Fetch the JSON data and console log it
      console.log(data);
      // Use `.html("") to clear any existing metadata
      metaData.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(data).forEach(function([key, value]) { 
        var row = metaData.append("p");
        row.text(`${key}: ${value}`);
      }) 
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  console.log("buildCharts function is working!")
  var plotURL =`/samples/${sample}`;
  d3.json(plotURL).then(function(sampleData){
    console.log(sampleData);
    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: sampleData.otu_ids,
      y: sampleData.sample_values,
      mode: "markers",
      marker: {
        size: sampleData.sample_values,
        color: sampleData.otu_ids
      },
      text: sampleData.otu_labels
    };
// ?? for some reason the pie chart is resetting with new drop down selection, 
// but the bubble chart is adding more data to chart upon each search, why?
// ?? Also the sample name in the bubble chart title isn't changing with menu selection
    var layout1 = {
      title: `${sample} Belly Button Microbiome`,
      showlegend: false,
      xaxis:  { title: "OTU ID" },
      yaxis: {title: "Number of Times Found"}
    };
    Plotly.plot('bubble', [trace1], layout1);
  }
    // @TODO: Build a Pie Chart, use slice to get 1st 10
    d3.json(plotURL).then(function(sampleData){  
    var pieData = [{
      values: sampleData.sample_values.slice(0,10),
      labels: sampleData.otu_ids.slice(0,10),
      type: "pie",
      hovertext: sampleData.otu_labels.slice(0,10)
    }];

    var layout2 = {
      height: 400,
      width: 500
    }
    Plotly.newPlot('pie', pieData, layout2);
    });
  }

function init() {
  console.log("init function is working!")
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
