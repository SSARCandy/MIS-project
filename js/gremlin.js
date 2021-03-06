$(document).ready(function() {
	addGraphList($("#gremlin_graph_list"));
});

$("#gremlin_code_text").keydown(function(e) {
	if (e.keyCode == "13") {
		e.preventDefault();
	}
});

$("#gremlin_code_submit").on("click", function(e) {
	if ($("#gremlin_code_text").val().trim() != "") {
		$("button").attr("disabled", true);
		$("#gremlin_result").empty().hide();
		$(".loading").show();
		var func = executeGremlinScript($("#gremlin_graph_list").val(), $("#gremlin_code_text").val());
		func.done(function(response) {
			$("#gremlin_result").append(JSON.stringify(response["results"], null, "\t"));
		}).fail(function() {
			$("#gremlin_result").append("Wrong.");
		}).always(function() {
			$("button").attr("disabled", false);
			$("#gremlin_result").show();
			$(".loading").hide();
		});
	}
});
