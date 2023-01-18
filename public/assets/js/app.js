$('.year').html(new Date().getFullYear());

    $('.retry').on('click', function(e) {
        e.preventDefault();
        $('.ratingform').removeClass("hidden");
        $('.checked').addClass("hidden");
        $('.submitted').addClass("hidden");

    });

    $('button[name="submit"]').on('click', function(e) {
        let svg = "<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" xml:space=\"preserve\" viewBox=\"0 0 100 100\">\r\n  <circle cx=\"6\" cy=\"50\" r=\"6\" class=\"circle\">\r\n    <animate attributeName=\"opacity\" begin=\".1\" dur=\"1s\" repeatCount=\"indefinite\" values=\"0;1;0\"\/>\r\n  <\/circle>\r\n  <circle cx=\"26\" cy=\"50\" r=\"6\" class=\"circle\">\r\n    <animate attributeName=\"opacity\" begin=\".2\" dur=\"1s\" repeatCount=\"indefinite\" values=\"0;1;0\"\/>\r\n  <\/circle>\r\n  <circle cx=\"46\" cy=\"50\" r=\"6\" class=\"circle\">\r\n    <animate attributeName=\"opacity\" begin=\".3\" dur=\"1s\" repeatCount=\"indefinite\" values=\"0;1;0\"\/>\r\n  <\/circle>\r\n<\/svg>";
        let text = "Request rating";
        $('button[name="submit"]').html(svg);
        e.preventDefault();

        $.ajax({
            url: 'backend.php',
            type: 'POST',
            data: {
                barcode: $('input[name="barcode"]').val()
            },
            error: function() {
                $('button[name="submit"]').html(text);
                $('.ratingform').addClass("shake");
                setTimeout(
                    function() {
                        $('.ratingform').removeClass("shake");
                    }, 600);
            },
            success: function(result) {
                $('button[name="submit"]').html(text);
                if (!result) {
                    $('.ratingform').addClass("hidden");
                    $('.submitted').removeClass("hidden");
                } else {
                    $('.productname').html(result.name);
                    $('.productrating').html(result.grade);
                    $('.ratingform').addClass("hidden");
                    $('.checked').removeClass("hidden");
                }
            }
        });
    });