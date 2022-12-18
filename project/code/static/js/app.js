

d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data){ 
console.log(data);

    // Create an array of each id name
    let ids = data.samples.map(row=>row.id)
    
    // Append an option in the dropdown
    ids.forEach(function(id) {
        d3.select('#selDataset')
            .append('option')
            .text(id)
        });

    console.log(ids);

    graphs(ids);
    demographics(ids);

    function graphs(id) {
    // Create arrays for sample_values, OTU ids, and OTU labels        
    let sample_values = data.samples.map(row => row.sample_values);
    let otu_ids = data.samples.map(row => row.otu_ids);
    let otu_labels = data.samples.map(row => row.otu_labels);
    console.log(sample_values);

    // sort values to get values highest to lowest
    let values_sorted = sample_values.sort(function compareFunction(firstNum, secondNum) {return secondNum - firstNum; });
    let values_10 = values_sorted.map(row => row.slice(0,10));
    console.log(values_10);

    // sort ids to get values highest to lowest
    let ids_sorted = otu_ids.sort(function compareFunction(firstNum, secondNum) {return secondNum - firstNum; });
    let ids_10 = ids_sorted.map(row => row.slice(0,10));
    console.log(ids_10);

     // sort labels to get values highest to lowest
     let labels_sorted = otu_labels.sort(function compareFunction(firstNum, secondNum) {return secondNum - firstNum; });
     let labels_10 = labels_sorted.map(row => row.slice(0,10));
     console.log(labels_10);

    let trace1 = {
    // .map(function(item) {return item.Name })
        x: values_10[0],
        y: ids_10[0].map(row => "OTU" + row),
        text: labels_10[0],
        type: "bar",
        orientation : 'h',
        width: .75,
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending',
          }],
        };
        
    
    let traceData = [trace1];
                
    let layout = {
        title: "Top 10 OTUs"
        };
                
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", traceData, layout);

    let trace2 = {
        // .map(function(item) {return item.Name })
            x: otu_ids[0],
            y: sample_values[0],
            mode: 'markers',
            text: otu_labels[0],
            marker: {
                size: sample_values[0],
                color: otu_ids[0]
              }
            };

    let traceData2 = [trace2];
                
    let layout2 = {
        title: "OTU Bubble Chart"
        };
                        
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot('bubble', traceData2, layout2);

    }


    function demographics(id) {

    // Get the first ID to display on page
    let firstID = data.metadata[0]
    let sampleMetadata = d3.select("#sample-metadata").selectAll('h1')

    // demographic info 
    let demoInfo = sampleMetadata.data(d3.entries(firstID))
    // Getting the key and value in pairs
    console.log(demoInfo);
        demoInfo.enter()
                .append('h1')
                // .merge(sampleMetadata)
                .text(row => `${row.key} : ${row.value}`)
                .style('font-size','12px');
    };

// On change to the DOM, call newData()
// d3.selectAll("#selDataset").on("change", optionChanged());

// Function called by DOM changes
function optionChanged(newid) {
    graphs(newid);
    demographics(newid);

};
// function optionChanged() {
//     let dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a letiable
//     let dataset = dropdownMenu.property("value");
//     // Initialize an empty array for the country's data
//     let data = [];
  
//     if (dataset == 'australia') {
//         data = australia;
//     }
//     else if (dataset == 'brazil') {
//         data = brazil;
//     }
//     else if (dataset == 'uk') {
//         data = uk;
//     }
//     else if (dataset == 'mexico') {
//       data = mexico;
//     }
//     else if (dataset == 'singapore') {
//         data = singapore;
//     }
//     else if (dataset == 'southAfrica') {
//       data = southAfrica;
//     }
//   // Call function to update the chart
//     updatePlotly(data);
//   }
  
//   // Update the restyled plot's values
//   function updatePlotly(newdata) {
//     Plotly.restyle("pie", "values", [newdata]);
//   }
  
//   init();
});
