var views = {
    load_company_profile: function(company_id) {
        var company = data[company_id];

        // display the company name in the jumbotron div
        $("#company_profile_name").text(company.name);    // display the company description
        $("#company_profile_description > h4").text("More about " + company.name);
        $("#company_profile_description_text").text("Loading, please wait...");

        // Asynchronously load the profile description
        company.get_profile_description(function(data) {
          // TODO: this code should not be executed if the user has excited
          //   the current profile and vistied a new profile. (that is, if
          //   network delay causes the result to be returned late.)
          $('#company_profile_description_text').html(data);
        });

        // display the company website. If no website, then hide the link
        if ( company.website != null ) {
            $( "#company_profile_website" ).attr('href', company.website).show();
        } else {
            $( "#company_profile_website" ).hide();
        }

        // create day_company_booth list with buttons to trigger the map view with the corresponding booth highlighted
        function create_link(table_ids, day) {
            return $("<a/>", {
                href: "#",
                class: "list-group-item"})
                .click(
                    {
                        table_ids: table_ids,
                        day: day
                    },
                    function(e) {
                        view("view_map_highlight_table", e.data);
                        e.preventDefault();
                    })
                .html('<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>' +
                      get_day_string(day) +
                      '<span class="glyphicon glyphicon-menu-right pull-right"></span>');
        }

        $("#company_profile_day_list").empty();
        for (var day = 0; day < 3; day++) {
            if (company.tables[day] != null) {
                create_link(company.tables[day], day)
                    .appendTo("#company_profile_day_list");
            }
        }

        // Populate tags
        var tag_html = '';
        company.get_tags().forEach(function(tag) {
            tag_html += '<span class="label label-default">' + tag + '</span>';
        });
        $("#company_tags").html(tag_html);


        $(".view").addClass('hidden');
        $("#company_profile").removeClass('hidden');
    },

    /*
     * view_options: {
     *   day: 1,
     *   company_ids: [1,2,3],
     *   search: false,
     *   source: SOURCE_SEARCH | SOURCE_FILTER
     * }
     */
    display_companies_list: function(view_options) {
        var div = document.createElement("div");
        div.className = "list-group";

        // Create list elements for all companies
        view_options.company_ids.forEach(function(company_id, index, array) {
            var company = data[company_id];

            var a = $("<a/>", {
                href: "#",
                class: "list-group-item"
            }).click(company_id, function(e) {
                company_id = e.data;
                view("load_company_profile", company.id);
                e.preventDefault();
            }).html('<h4 class="list-group-item-heading">' + company.name + '</h4>' +
                    '<p>' + company.description + '</p>')
                    .appendTo(div);
        });

        // If no results, display a message
        if (view_options.company_ids.length === 0)
            $(div).html("<p>No results found.</p>");

        // Add the results to the DOM
        $("#company_list").empty().append(div);

        // Add the "show on map" button when results are tied to a day
        if ("day" in view_options) {
            $("#show_on_map_button")
                .off()
                .click(
                    view_options,
                    function(e) {
                        view("display_companies_map", e.data);
                        e.preventDefault();
                    })
                .show();
        } else {
          $("#show_on_map_button").hide();
        }

        // Add a heading to the view
        if ("source" in view_options) {
            switch (view_options.source) {
              case SOURCE_FILTER:
                  $("#company_list_view_header").text(get_day_string(view_options.day));
                  $("#company_list_view_header_subtext").show();
                  utils.display_filter_string($("#company_list_view_header_filter_list"));
                  break;
              case SOURCE_SEARCH:
              default:
                  $("#company_list_view_header_filter_list").hide();
                  $("#company_list_view_header").text("Search");
                  $("#company_list_view_header_subtext").hide();
                  //$("#company_list_view_header").html("Search: <small>" + $("#searchterm").val() + "</small>");
            }
        } else {
            $("#company_list_view_header").text(get_day_string(view_options.day));
            $("#company_list_view_header_subtext").show();
            $("#company_list_view_header_filter_list").hide();
        }

        // Display the view
        $(".view").addClass("hidden");
        $("#company_list_view").removeClass("hidden");
    },

    /*
     * view_options: {
     *   day: 1,
     *   company_ids: [1,2,3]
     * }
     */
    display_companies_map: function(view_options) {
        map.resetTables(view_options.day);
        map.highlightCompanies({
            company_ids: view_options.company_ids,
            day: view_options.day
        });
        map.showMap(view_options.day);
        $("#map_view_title").text(get_day_string(view_options.day));

        // Add a heading to the view
        if ("source" in view_options) {
            switch (view_options.source) {
              case SOURCE_FILTER:
                  utils.display_filter_string($("#map_view_header_filter_list"));
                  break;
              case SOURCE_SEARCH:
              default:
                  $("#map_view_header_filter_list").hide();
                  //$("#company_list_view_header").html("Search: <small>" + $("#searchterm").val() + "</small>");
            }
        } else {
            $("#map_view_header_filter_list").hide();
        }

        $(".view").addClass("hidden");
        $("#map_view").removeClass("hidden");
    },

    load_companies: function() {
        var view_options = {
            day: 0,
            company_ids: Object.keys(data)
        };
        views.display_companies_list(view_options);
    },

    /*
     * options = {
     *   table_id: 1,
     *   day: 1
     * }
     */
    view_map_highlight_table: function(options) {
        map.resetTables(options.day);
        map.highlightTables(options.day, options.table_ids);
        map.showMap(options.day);
        $("#map_view_title").text(get_day_string(options.day));
        $("#map_view_header_filter_list").hide();

        $(".view").addClass("hidden");
        $("#map_view").removeClass("hidden");
    },

    search_page: function() {
        $(".view").addClass("hidden");
        $("#search_and_filter").removeClass("hidden");
    },

    maps_page: function() {
        map.resetTables(DEFAULT_DAY_ID);
        map.showMap(DEFAULT_DAY_ID);
        $("#map_view_title").text(get_map_string(DEFAULT_MAP_ID));
        $("#map_view_header_filter_list").hide();

        $(".view").addClass("hidden");
        $("#map_view").removeClass("hidden");
    },

    switch_map: function(map_id) {
        //map.resetTables(options.map);
        //map.resetAllTables();
        //map.highlightTables(options.map, options.table_ids);
        map.showMap(map_id);
        $("#map_view_title").text(get_map_string(map_id));
        $("#map_view_header_filter_list").hide();

        $(".view").addClass("hidden");
        $("#map_view").removeClass("hidden");
    },     

    info_page: function() {
        $(".view").addClass("hidden");
        $("#info").removeClass("hidden");
    }


};
