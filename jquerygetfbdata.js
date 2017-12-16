$(document).ready(function() {
    $("#workneducation").hide();
    $("#placeslived").hide();
    $("#contactnbasicinfo").hide();
    $("#familynrelation").hide();
    $("#details").hide();
    $("#lifeevents").hide();
    $("#Timeline").hide();

    //getting fb token
    var token = 'EAACEdEose0cBAAD0D29UGRtUoNeX11Mn4nvbML6AC2YuWHvWs0wJIVOKxETnBBbZA3reik1EDEbDfPJ2JZCZCZA3kROkGHYhHJiwcmQ6D00tFe7KPXNAwyqcFc1Xo2jshE7ARja6wOvaABIVWxqIr1zTURGAgIhRQ6kwv9E5rZBnFrnr7y39xtiqDOAwzq5wZD';

    //Ajax call
    $.ajax({
        url: 'https://graph.facebook.com/me?fields=id,name,about,birthday,hometown,education,work,gender,languages,email,website,relationship_status,quotes,address,age_range,cover,inspirational_people,picture&access_token=' + token,
        type: 'GET',
        timeout: 3000,
        success: function(response, status, xhr) {
            $(".name").text(response.name);
            $("#bio").text(response.about);
            $("#birthday").text(response.birthday);
            $(".hometown").text(response.hometown.name);
            for (var edu in response.education) {
                var edu1 = $("<div></div>").text(response.education[edu].school.name);
                $(".education").prepend(edu1);
            }
            for (var wrk in response.work) {
                var wrk1 = $("<div></div>").text(response.work[wrk].employer.name);
                $(".work").append(wrk1);
            }
            $("#gender").text(response.gender);
            for (var lang in response.languages) {
                var lang1 = $("<div></div>").text(response.languages[lang].name);
                $("#languagesknown").prepend(lang1);
            }
            $("#email").text(response.email);
            $("#website").text(response.website);
            $("#relationship").text(response.relationship_status);
            $("#favquotes").text(response.quotes);
            var coverpic = $("#coverphoto").val(response.cover.source);
            $("#coverphoto").prepend("<img src=" + coverpic[0].value + " id=coverpicture />");
        },
        error: function(xhr, status, error) {
            alert("Please check console for error");
            console.log(status);
            console.log(error);
        }
    }); //ajax call end

    //function to get the feed post details
    var getPostDetails = function() {
        $("#feedPost").empty();
        //ajax call start
        $.ajax({
            url: 'https://graph.facebook.com/me?fields=posts&access_token=' + token,
            type: 'GET',
            timeout: 4000,
            success: function(response, status, xhr) {
                for (var feed in response.posts.data) {
                    var d = new Date((response.posts.data[feed].created_time));
                    var post1 = $("<div></div>").text(response.posts.data[feed].story);
                    var date1 = $("<div class='col-sm-6 col-md-6 col-lg-6 col-xs-6' style='text-align:right;border-right:3px solid #eee;padding:0 5px'></div>").text(d.toLocaleDateString("en-US"));
                    var time1 = $("<div class='col-sm-6 col-md-6 col-lg-6 col-xs-6' style='text-align:left;padding:0 5px'></div>").text(d.toLocaleTimeString("en-US"));
                    var newpost = $("<div class='row feedPost'></div>").append(post1, date1, time1);
                    $("#feedPost").append(newpost);
                }
            },
            error: function(xhr, status, error) {
                alert("Please check console for error");
                console.log(status);
                console.log(error);
            }
        }); //ajax call end
    }
    $("#timeline").on('click', function() {
        getPostDetails();
        $("#About").hide();
        $("#Timeline").show();
        $(this).addClass("activeTab");
        $("#aboutme").removeClass("activeTab");
    });
    $("#aboutme").on('click', function() {
        $(this).addClass("activeTab");
        $("#timeline").removeClass("activeTab");
        $("#About").show();
        $("#Over-view").show();
        $("#overview").show();
        $("#Timeline").hide();
    });

    $('#Over-view').on('click', function() {
        $('#overview').show();
        $("#workneducation").hide();
        $("#placeslived").hide();
        $("#contactnbasicinfo").hide();
        $("#familynrelation").hide();
        $("#details").hide();
        $("#lifeevents").hide();
    });

    $('#work-edu').on('click', function() {
        $('#workneducation').show();
        $("#overview").hide();
        $("#placeslived").hide();
        $("#contactnbasicinfo").hide();
        $("#familynrelation").hide();
        $("#details").hide();
        $("#lifeevents").hide();
    });

    $('#contact-info').on('click', function() {
        $('#contactnbasicinfo').show();
        $("#overview").hide();
        $("#workneducation").hide();
        $("#placeslived").hide();
        $("#familynrelation").hide();
        $("#details").hide();
        $("#lifeevents").hide();
    });

    $('#family').on('click', function() {
        $('#familynrelation').show();
        $("#overview").hide();
        $("#workneducation").hide();
        $("#placeslived").hide();
        $("#contactnbasicinfo").hide();
        $("#details").hide();
        $("#lifeevents").hide();
    });

    $('#deTail').on('click', function() {
        $('#details').show();
        $("#overview").hide();
        $("#workneducation").hide();
        $("#placeslived").hide();
        $("#contactnbasicinfo").hide();
        $("#familynrelation").hide();
        $("#lifeevents").hide();
    });

});