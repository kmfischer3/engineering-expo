var map = {
    MIN_TABLE_NUMBER: 0,
    MAX_TABLE_NUMBER: 75  // TODO: update
};

map.resetTables = function(day) {
	for (i = map.MIN_TABLE_NUMBER; i <= map.MAX_TABLE_NUMBER; i++) {
	    var table = document.getElementById("table" + i.toString());
        console.assert(table != null, "Table with id=%i does not exist.", i);
	    table.classList.remove("highlight");
	}

    // TODO: update to hide companies across all days
};

map.highlightTables = function(day, table_ids) {

    table_ids.forEach(function(table_id) {

	    var table = document.getElementById("table" + table_id.toString());
        console.assert(table != null, "Table with id=%i does not exist.", table_id);
	    table.classList.add("highlight");

    });  

};

/*
 * options = {
 *   company_ids: [1,2,3],
 *   day: 0
 * }
 */
map.highlightCompanies = function(options) {
    map.resetTables(options.day);

    // initialize map result counts
    var map_results_count = {};
    for (var i = 0; i < MAP_METADATA_NAMES.length; i++)
        map_results_count[i] = 0;    

    options.company_ids.forEach(function(company_id, index, array) {
        var company = data[company_id];
        var tables_on_day = company.tables_on_day(options.day);
        map.highlightTables(options.day, tables_on_day);

        // increment result count for the map containing table id
        for (var j = 0; j < tables_on_day.length; j ++){
            map_results_count[map.tableIdToMapIndex(tables_on_day[j])] ++;
        }

    });

    // fill badges on map dropdown with results count
    for (var key in map_results_count){

        if (map_results_count[key] == '0')
            continue;

        var id = "#badge" + key.toString();
        $(id).text(map_results_count[key]);

    } 

};

/*
 * Load the map files in the background.
 */
map.loadMaps = function() {
    var map_svgs = $("#map_svgs");
    
    for (var i = 0; i < MAP_METADATA_NAMES.length; i++) {
        var elm = $("<div/>", {
            id: "map_svg_" + i.toString(),
            class: "map_svg",
            appendTo: map_svgs
        }).load("/static/maps/" + MAP_METADATA_NAMES[i]);

        if (i > 0) {
            elm.addClass('hidden');
        }
    }
};

/*
 * Show the correct map for a given day, hiding the others.
 */
map.showMap = function(map) {
    $(".map_svg").addClass("hidden");
    $("#map_svg_" + map.toString()).removeClass("hidden");
};

/*
 * Return the index of the map containing the given table id.
 * Returns -1 if the map could not be determined.
 */
map.tableIdToMapIndex = function(tableid) {
    for (var i = 0; i < MAP_METADATA_NAMES.length; i++) {
        if (tableid >= MAP_METADATA_STARTS[i] &&
            tableid < MAP_METADATA_STARTS[i+1]) {
            return i;
        }
    }

    console.log('Could not find map file for tableid: ' + tableid.toString());
    return -1;
};
