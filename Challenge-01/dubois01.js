//Title: DuBois Challenge 2025 #1: Value of Land Owned By Georgia Negroes. 
//Author: Kate Miller
//Description: Create money bags stacked along a central implied y-axis (sorted by year ascending down 1875-1899) sized relative to the corresponding $land value.

// Add formatting for the dollar values
var formatNumber = d3.format(",");

d3.csv("data.csv", function(d) {
    return {
        year: +d["Year"],  // Convert to number
        value: +d["Land Value (Dollars)"],  // Convert to number
        formattedValue: `$${formatNumber(d["Land Value (Dollars)"])}` // Store formatted version separately
    };
}).then(function(data) {
    
    // Sort data by year (ascending)
    data.sort((a, b) => a.year - b.year);

    // Set up initial SVG container size based on window size
    let width = window.innerWidth, height = window.innerHeight;

    // Create the SVG element
    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Function to generate random brown shades
    function randomBrown() {
        let r = Math.floor(Math.random() * 50) + 150; 
        let g = Math.floor(Math.random() * 50) + 100;  
        let b = Math.floor(Math.random() * 50) + 50;   
        return `rgb(${r}, ${g}, ${b})`;  
    }

    // Function to handle resizing and re-render bags
    function resize() {
        // Update width and height based on current window size
        width = window.innerWidth;
        height = window.innerHeight;
        svg.attr("width", width).attr("height", height);
        renderBags(data);
    }

    // Listen for window resize events
    window.addEventListener("resize", resize);

    // Set up the Y-axis scale (for years)
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.year))  // Use years as categories
        .range([75, height - 20])  // Adjust for SVG height
        .padding(0.5);  // Adds space between the years

    // Set up scale for bags' sizes
    const sizeScale = d3.scaleSqrt()
        .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
        .range([30, width / 10]);  // Scale based on window width

    // Function to render the sacks and values
    function renderBags(data) {
        svg.selectAll("*").remove();  

        const bags = svg.selectAll(".money-bag")
            .data(data)
            .enter()
            .append("g")  
            .attr("class", "money-bag")
            .attr("transform", d => `translate(${width / 2}, ${yScale(d.year) - 7})`);  // Center horizontally and adjust vertically

        //Draw the lumpy bags
        bags.append("path")
            .attr("d", d => {
                let w = sizeScale(d.value) * 2.6,  
                    h = sizeScale(d.value) * 1.1;  

                //Function to introduce randomness into the pen path
                const wiggle = (value, frequency = 0.3, amplitude = 5) => {
                        return value + Math.sin(value * frequency) * amplitude;
        };

        // Money bag-shaped path
        return `
                M ${-w / 2}, ${h} 
                C ${wiggle(-w * 0.6)}, ${wiggle(h * 0.2)} ${wiggle(-w * 0.5)}, ${wiggle(h * 0.6)} ${0}, 0
                C ${wiggle(w * 0.2)}, ${wiggle(h * -0.3)} ${wiggle(w * -0.2)}, ${wiggle(h * -0.3)} ${0}, 0
                C ${wiggle(w * 0.5)}, ${wiggle(h * 0.6)} ${wiggle(w * 0.6)}, ${wiggle(h * 0.2)} ${w / 2}, ${h} 
                L ${w / 2}, ${h}
                Z
        `;
            })
            .attr("fill", d => randomBrown())
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        // Add text inside the bags (formatted money values)
        bags.append("text")
            .attr("class", "value-text")
            .attr("x", d => 0)  // Center text horizontally
            .attr("y", d => sizeScale(d.value) / 1.2)  // Position text in the middle of the bag
            .attr("text-anchor", "middle")
            .style("font-family", "Rubik")
            .style("font-size", "12px")
            .style("fill", "black")
            .text(d => d.formattedValue);  

        // Add the year labels below each sack
        svg.selectAll(".year-label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "year-label")
            .attr("x", width / 2)  
            .attr("y", d => yScale(d.year) + sizeScale(d.value) + 15)  
            .attr("text-anchor", "middle")
            .style("font-family", "Rubik")
            .style("font-size", "16px")
            .style("fill", "black")
            .text(d => d.year);  
    }

    renderBags(data);  // Initial render
});