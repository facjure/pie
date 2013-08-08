$( function () {
    var titles_template = '\
        <span class="date"> {{ post_date }}&nbsp;&nbsp;</span>\
        <span><a href="#/blog/{{ name }}"><span class="post-title">{{ title }}</a></span><br/>'

    function load_posts(context) {
        context.app.swap('');
        data = data.sort( function(a,b) {return a['post_date'] < b['post_date'] } );
        var html = ""
        for (var i =0; i < data.length; i++) {
            if (data[i].type === "blog")
                html += Mustache.to_html(titles_template, data[i])
        }
        context.$element().prepend( "<div class='post-titles'>" + html + "</div>")
    }

    var app = $.sammy(function() {
        this.element_selector = '#main';
        this.get(config.relative_path, function (context) {
            if (config.first_page === "") {
                load_posts(context)
            }
            else {
                for (var i =0; i < data.length; i++) {
                    if (data[i]['name'] === config.first_page) {
                        break;
                    }
                }
                context.app.swap(data[i]['html'])
            }
        });
        this.get(config.relative_path + '#/page' + '/(.*)', function (context) {
            var dhash = document.location.hash;
            post_name = dhash.substring(7);
            for (var i =0; i < data.length; i++) {
                if (data[i]['name'] === post_name) {
                    break;
                }
            }
            context.app.swap('');
            context.$element().html(data[i]['html'])
        });
         this.get(config.relative_path + '#/blog', function (context) {
            load_posts(context)
        });
        this.get(config.relative_path + '#/blog' + '/(.*)', function (context) {
            var dhash = document.location.hash;
            post_name = dhash.substring(7);
            for (var i =0; i < data.length; i++) {
                if (data[i]['name'] === post_name) {
                    break;
                }
            }
            context.app.swap('');
            context.$element().html(data[i]['html'])
        });
    });
    app.run()
});
