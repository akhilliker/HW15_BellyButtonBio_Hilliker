var url = `/metadata/${sample}`;

    d3.json(url).then(function(data) {
      // Use d3 to select the panel with id of `#sample-metadata`
      var sampleData = d3.select("#sample-metadata");
      // Fetch the JSON data and console log it
      console.log(data);
      // Use `.html("") to clear any existing metadata
      sampleData.html("");
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(obj).forEach(function([key, value]) { 
        var row = sampleData.append("p");
        row.text(`${key}: ${value}`);
      }) 
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
