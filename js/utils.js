var utils = {};

/*
 * Add the filters string to the header view, but only
 *   if filters (excluding day) have been selected.
 */
utils.display_filter_string = function(element) {
    var filter_string = get_filter_string();
    if ( filter_string != null ) {
        element.html("<small>Filters: " + filter_string + "</small>").show();
    } else {
        element.hide();
    }
};

utils.sort_companies = function(a, b) {
    if (data[a].name < data[b].name)
        return -1;
    else if (data[a].name > data[b].name)
        return 1;
    else
        return 0;
};

// clears/resets all the badges in the map dropdown
function clear_badges(){
    $('.badge').text('');    
}

function get_company_for_table(table_id) {

    for (var company_id in data) {
        company = data[company_id];
        for (var i = 0; i < company.tables.length; i ++) {
            if (table_id == company.tables[i])
                return company;
        }
    }

    console.log("no company assigned to table: "+table_id);

}

function get_day_string(day) {

    if ( day == 0 )
        return "Monday, Sept. 19";
    if ( day == 1 )
        return "Wednesday, Sept. 21";
    if ( day == 2 )
        return "Wednesday, Sept. 28";

    return "No Map Data";
}

function get_map_string(map) {

    if ( window.innerWidth < 320 ) {

        if ( map == 0 )
            return "Outdoor Map";
        if ( map == 1 )
            return "Mech. Engineering 1st Fl.";
        if ( map == 2 )
            return "Mech. Engineering 2nd Fl.";
        if ( map == 3 )
            return "Engineering Centers Bldg.";        
        if ( map == 4 )
            return "Engineering Hall 1st Fl.";
        if ( map == 5 )
            return "Engineering Hall 2nd Fl.";

    } else {

        if ( map == 0 )
            return "Outdoor Map";
        if ( map == 1 )
            return "Mechanical Engineering (ME) 1st Floor";
        if ( map == 2 )
            return "Mechanical Engineering (ME) 2st Floor";
        if ( map == 3 )
            return "Engineering Centers Building (ECB) 1st Floor";        
        if ( map == 4 )
            return "Engineering Hall (EH) 1st Floor";
        if ( map == 5 )
            return "Engineering Hall (EH) 2nd Floor";

    }           

    return "No Map Data";
}

// fills the dropdown with the correct id and text
function fill_maps_dropdown() {

    var dropdownHtml = "<button id=\"map-dropdown\" class=\"btn btn-default btn-block dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">Change Map <span class=\"glyphicon glyphicon-menu-down pull-right\"></span></button><ul class=\"dropdown-menu\">";
    

    for (var i = 0; i < MAP_METADATA_NAMES.length; i++) {
        var dropdown_item = "<li><a href=\"#\" value=\"" + 
                                    i.toString() + "\">" + get_map_string(i) + 
                                    "  <span class=\"badge\" id=\"badge" +
                                    i.toString() + "\"></span></a></li>";
        dropdownHtml = dropdownHtml + dropdown_item;
    }

    dropdownHtml = dropdownHtml + "</ul>";

    //$('#change-map-dropdown').innerHTML = dropdownHtml;
    document.getElementById('change-map-dropdown').innerHTML = dropdownHtml;
}

function get_filter_string() {

	// loop through form elements, if element is checked, add it to the return string
	var filters = document.getElementById("filter");
    var ret_array = [];

    ATTRIBUTES.forEach(function(attribute) {
        var attribute_index = ATTRIBUTE_INDEXES[attribute];
        if (filters.elements[attribute + '_input'].checked) {
            ret_array.push(ATTRIBUTE_STRINGS[attribute]);
        }
    });

    console.log(ret_array);

    if (ret_array.length != 0)
        return ret_array.join(", ");

    // return null if no filters selected.
    return null;

}
