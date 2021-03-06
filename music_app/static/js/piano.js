var white_keys = ["G2", "A2", "B2", "C3", "D3", "E3", "F3", "G3", "A3"];
var white_key_labels = ["G", "A", "B", "C", "D", "E", "F", "G", "A"];
var black_keys = ["G2_sharp", "A2_sharp", "C3_sharp", "D3_sharp", "F3_sharp", "G3_sharp"];
var black_key_labels = ["G#", "A#", "C#", "D#", "F#", "G#"];
var black_key_position = [75, 175, 375, 475, 675, 775];

// White Keys

var WHITE_KEY_WIDTH = 100;
var WHITE_KEY_HEIGHT = 200;

// Black Keys
var BLACK_KEY_WIDTH = 50;
var BLACK_KEY_HEIGHT = 100;

var PIANO_SVG_Y = 500;

function placeAnswer(d) {
    for (var j=0; j < USER_ANSWERS[CURRENT_MELODY.name].length; j++) {
        if (USER_ANSWERS[CURRENT_MELODY.name][j].active) {
            var active_answer = j;

            USER_ANSWERS[CURRENT_MELODY.name][j].answer = d;

            var target_answer_box_id = "#answer_box_"+j;

            var musical_note = (d.length === 2) ? d[0] : d[0]+"#";
            var x_offset = (d.length === 2) ? 20 : 13;

            d3.select(target_answer_box_id)
                .attr("x", x_offset)
                .attr("y", 47)
                .style("font-size", "40px")
                .text(musical_note);
        }
    }

    checkCurrentMelodyComplete();
}


function initializePianoBoard() {

    var main_svg = d3.select("#main_svg");

    var piano_g = main_svg.append("g").attr("id", "piano_g")
        .attr("transform", function() {
            var new_x = (MAIN_WIDTH - (white_keys.length*WHITE_KEY_WIDTH))/2.0;
            return "translate("+new_x+", "+PIANO_SVG_Y+")";
        });


    // WHITE KEYS
    var white_keys_g = piano_g.selectAll("g.white_keys_g")
        .data(white_keys).enter()
        .append("g")
        .attr("class", "white_keys_g")
        .style("cursor", "pointer")
        .on("click", function(d, i) {
            document.getElementById("audioElement_"+d).play();
            d3.select(this).select("rect")
                .style("fill", "blue")
                .style("opacity", 0.4);

            d3.select(this).select("rect")
                .transition().duration(500)
                .style("fill", function() {
                    return (d.length === 2) ? "white" : "black";
                })
                .style("opacity", 1.0);

            placeAnswer(d);
        });

    // Key rectangles
    white_keys_g.append("rect")
        .attr("class", "white_keys")
        .attr("id", function(d) { return d; })
        .attr("height", WHITE_KEY_HEIGHT)
        .attr("width", WHITE_KEY_WIDTH)
        .attr("x", function(d, i) {
            return i*WHITE_KEY_WIDTH;
        })
        .style("fill", "white")
        .style("stroke", "black");


    // White Key labels
    white_keys_g.append("text")
        .attr("x", function(d, i) {
            return i * WHITE_KEY_WIDTH + WHITE_KEY_WIDTH*0.4;
        })
        .attr("y", WHITE_KEY_HEIGHT-20)
        .style("font-size", "36px")
        .text(function(d, i) {
            return white_key_labels[i];
        });



    // BLACK KEYS
    var black_keys_g = piano_g.selectAll("g.black_keys_g")
        .data(black_keys).enter()
        .append("g")
        .attr("class", "black_keys_g")
        .style("cursor", "pointer")
        .on("click", function(d, i) {
            document.getElementById("audioElement_"+d).play();
            d3.select(this).select("rect")
                .style("fill", "#00ffff");
            d3.select(this).select("rect")
                .transition().duration(500)
                .style("fill", function() {
                    return (d.length === 2) ? "white" : "black";
                });

            placeAnswer(d)
        });

    // Key rectangles
    black_keys_g.append("rect")
        .attr("class", "black_keys")
        .attr("id", function(d) { return d; })
        .attr("height", BLACK_KEY_HEIGHT)
        .attr("width", BLACK_KEY_WIDTH)
        .attr("x", function(d, i) {
            return black_key_position[i];
        })
        .style("fill", "black")
        .style("stroke", "black");

    // Black Key labels
    black_keys_g.append("text")
        .attr("x", function(d, i) {
            return black_key_position[i] + 2;
        })
        .attr("y", BLACK_KEY_HEIGHT-20)
        .style("font-size", "36px")
        .style("fill", "white")
        .text(function(d, i) {
            return black_key_labels[i];
        });
}