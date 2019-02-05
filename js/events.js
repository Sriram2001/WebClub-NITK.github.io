var events_data;
function load_events(month, year) {
	var event_cards = "", event_card, tc, title, time, venue,
		colors = ["#F92772", "#A7E22E", "#66D9EE"];
	events_data = events[year][month];
	if (events_data.length === 0) {
		console.log("hmm");
		$("#event-cards").html('<h1 class="no-events display-4">No events at this time</h1>');
		return;
	}
	events_data.sort(function(e1, e2) {
		return e1.timestamp - e2.timestamp;
	});
	events_data.forEach(function(event_element, index) {
		title = '<h1>' + event_element.title + '</h1>';
		tc = timeConverter(event_element.timestamp);
		time = '<p class="lead">' + tc[1] + ' on ' + tc[0] + '</p>';
		venue = '<p class="lead">' + event_element.venue + '</p>';
		event_card = '<div id="' + index + '" class="event" style="background-color: ' +
					  colors[index % 3] + '">' + title + time + venue + '</div>';
		event_cards += event_card;
	});
	$("#event-cards").html(event_cards);
	$('#event-cards > div').click(function() {
		var back_color = $(this).css('background-color');
		var event_element_details = events_data[parseInt($(this).attr('id'))];
		var close_button = '<i id="close-button" class="material-icons">&#xE5CD;</i>';
		var tc = timeConverter(event_element_details.timestamp);
		var title = '<h1 id="event-details-title" class="display-1">' + event_element_details.title + '</h1>';
		var terminal_like = '<div id="terminal-like"><p>Event Details</p><div id="black-screen"><p id="terminal-text">' +
							'Date: ' + tc[0] + '</br>Time: ' + tc[1] + '<br/>Venue: ' + event_element_details.venue +
							'</br></br>' + event_element_details.description + 
							'<br><br>' +

							// Add slides if it exists
							(event_element_details.link?
							('>>> Link to slides/event images : <a href="/slides/' + event_element_details.link + '">' + event_element_details.link + '</a>'):'') + 
							
							'</p></div></div>';
		console.log(event_element_details);
		var event_details = '<div class="event-details">' + close_button + title + terminal_like + '</div>';
		$('body').append(event_details);
		$('.event-details').css({
			'background-color': back_color,
		});
		$("#close-button").click(function() {
			$(".event-details").css({
				'opacity': 0.0,
			});
			setTimeout(function() {
				$(".event-details").remove();
			}, 500)
		});
		setTimeout(function() {
			$('.event-details').css({
				'opacity': 1.0,
			});
		}, 50);
	});
};

function timeConverter(UNIX_timestamp) {
	var a = new Date(UNIX_timestamp * 1000);
	var months = ['January', 'February', 'March', 'April',
				  'May', 'June', 'July', 'August', 'September',
				  'October', 'November', 'December'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = ("0" + a.getDate()).substr(-2);
	var hour = ("0" + a.getHours()).substr(-2);
	var min = ("0" + a.getMinutes()).substr(-2);
	var sec = ("0" + a.getSeconds()).substr(-2);
	var ddmonthyyyy = date + ' ' + month + ' ' + year;
	var time = hour + ':' + min + ':' + sec + ' ';
	return [ddmonthyyyy, time];
}

$(document).ready(function() {
	load_events($('#cal-months > div.active').text(), $('#cal-years > div.active').text());
	$('#cal-months > div').click(function() {
		$('#cal-months > div').removeClass("active");
		$(this).addClass("active");
		load_events($(this).text(), $('#cal-years > div.active').text());
	});
	$('#cal-years > div').click(function() {
		$('#cal-years > div').removeClass("active");
		$(this).addClass("active");
		load_events($('#cal-months > div.active').text(), $(this).text());
	});
	var hover_div;
	$('#cal > div > div').hover(function() {
		$(this).addClass("hovered");
	}, function() {
		$('#cal > div > div').removeClass("hovered");
	});
});