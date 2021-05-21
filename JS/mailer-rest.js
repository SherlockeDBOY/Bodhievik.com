jQuery("#contactUsForm").on("submit", function (e) {
    jQuery("#msg").html("");
    jQuery("#submit").html("Please Wait");
    jQuery("#submit").attr("disabled", true);
    jQuery.ajax({
      url: "mailer-rest.php",
      type: "post",
      data: jQuery("#contactUsForm").serialize(),
      success: function (result) {
        jQuery("#msg").html(result);
        jQuery("#submit").html("Let's Talk");
        jQuery("#submit").attr("disabled", false);
        jQuery("#contactUsForm")[0].reset();
      },
    });
    e.preventDefault();
  });