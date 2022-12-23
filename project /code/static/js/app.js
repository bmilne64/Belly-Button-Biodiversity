

d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function(data){ 
   
    // show data in console
    console.log(data);

    // Create an array of each id name
    let ids = data.names;
    var selecter = d3.select('#selDataset')
    
    // Append an option in the dropdown
    ids.forEach(function(id) {
        selecter
        .append('option')
        .text(id)
        .property('value', id)
        });
    
    // show id in console
    console.log(id);

    // create variable to hold only first id 
    var id = ids[0]
    graphs(id);
    demographics(id);

});
    // create graphs function and pass in id variable 
    function graphs(id) {
    
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
    
    // create variable for all samples
    var samplesAll = data.samples;

    // filter samples based on id 
    var samplesFiltered = samplesAll.filter(var1=> var1.id == id);

    // show filtered sampels in console 
    console.log(samplesFiltered)

    // select first item from filtered object 
    var samplesSelect = samplesFiltered[0];

    // Create arrays for sample_values, OTU ids, and OTU labels        
    var sample_values = samplesSelect.sample_values;
    var otu_ids = samplesSelect.otu_ids;
    var otu_labels = samplesSelect.otu_labels;

    // show array in console
    console.log(sample_values);

    // sort values to get values highest to lowest
    let values_10 = sample_values.slice(0,10).reverse();
    console.log(values_10);

    // sort ids to get values highest to lowest
    let ids_10 = otu_ids.slice(0,10).reverse().map(ids_10 => `OTU ${ids_10}`);
    console.log(ids_10);

     // sort labels to get values highest to lowest
     let labels_10 = otu_labels.slice(0,10).reverse();
     console.log(labels_10);

    //  create first graph 
    let trace1 = {
        x: values_10,
        y: ids_10,
        text: labels_10,
        type: "bar",
        orientation : 'h',
        width: .75,
        }
    
    let traceData = [trace1];
                
    let layout = {
        title: "Top 10 OTUs"
        };
                
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", traceData, layout);

    // create second graph 
    let trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
                size: sample_values,
                color: otu_ids
              }
            };

    let traceData2 = [trace2];
                
    let layout2 = {
        title: "OTU Bubble Chart"
        };
                        
    // Render the plot to the div tag with id "plot"
    Plotly.newPlot('bubble', traceData2, layout2);

});}

    // create demographics function and pass in id 
    function demographics(id) {

    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {

    // Get the first ID to display on page
    let firstID = data.metadata[0]
    let sampleMetadata = d3.select("#sample-metadata").selectAll('h1')

    // demographic info 
    let demoInfo = sampleMetadata.data(d3.entries(firstID))

    // Get the key and value in pairs for the chart 
    console.log(demoInfo);
        demoInfo.enter()
                .append('h1')
                // .merge(sampleMetadata)
                .text(row => `${row.key} : ${row.value}`)
                .style('font-size','13px');
    });}

// Function when id number is changed in dropdown 
function optionChanged(newid) {

    graphs(newid);
    demographics(newid);
    };
  
init();