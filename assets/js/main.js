// whether user agrees with terms displayed in disclaimer, maniupalted with buttons in disclaimer
let user_agree = null;
// last clicked button, reference
let user_button_clicked = null;

// listener for click on button,
// because function is callback, event is passed as first argument
function buttonClicked(e, specified_id = "nothing"){
	// make modal a little bit bigger if screen widht > 1920px
	if($(window).width() > 1921){
		// console.log("LARGE FUCKING MODAL!");
		document.getElementById("make-big").classList.add("modal-lg");
	}

	// show disclaimer
	if(user_agree === null || !user_agree)
		$("#disclaimermodal").modal();

	// remember which button was clicked, so click event can be triggered manually with correct id
	user_button_clicked = $(this).attr('id');
	// console.log("USER FUCKING CLICKED", user_button_clicked);

	// stop, if user does not agree with terms
	if(!user_agree)
		return;

	// blur everything except modal
	document.getElementById("bodi").classList.add("blur");
	// display loader in center of user's viewport
	$('#loader').css({position: 'absolute', top: $(window).scrollTop() + $(window).height() / 2, left: $(window).scrollLeft() + $(window).width() / 2 });
	document.getElementById("loader").style.display = "";

	// get id of graph 
   	const id_graph = specified_id !== "nothing" ? specified_id : $(this).attr('id');

   	// load the graph on invisible canvas
   	$.get("/api/algorithms",
	{
		id: id_graph
	},
	function(data, status){
   		// console.log(data, status);
		const myArray = data["data"][0]["graph_data"];
		// console.log(myArray);

		const podatki = $.parseJSON(myArray);
		// console.log(podatki, podatki["data"]);
		loadGraph(podatki, true);

		// hide loading
		document.getElementById("loader").style.display = "none";

		

		// and display modal for it	
   		setModal(); 
	});
}

// send async request to get algorithms and populate table
function start() {
	$.get("/api/algorithms", {},
		function(data, status){
			// console.log(data["data"], status);
			// json array
			const data_array = data["data"];

			// find first tbody and append table row to it
			const tbody = document.getElementById("pacientTable").tBodies.item(0);
			let i=0;
			data_array.forEach(function(element) {
				// element should be intended for patients and curated in order to be displayed, also it should not be private
				// ---------- NOT GOOD, send requests and filter that on API ----------
				if(element.intended != 0 || element.curated != 1 || element.private != 0){
					// console.log("not good");
					return;
				}

				const tr = document.createElement("tr");
				tbody.appendChild(tr);
				tr.classList.add("tr-graphTable");

				// keys: id, author, created, description, graph_data, intended, modified,
				// modified_by, name, type, curated

				// sequence number
				let td = document.createElement("td");
				td.innerText = i + 1;
				td.classList.add("nowrap");
				tr.appendChild(td);

				// name of disease
				td = document.createElement("td");
			    td.innerText = element.name;
			    tr.appendChild(td);

			    // type of algorithm (diagnostic, treatment, other)
				td = document.createElement("td");
			    td.innerText = getType(element.type);
			    tr.appendChild(td);

			    // 'modified date', if algorithm wasn't modified yet show 'created date' instead
				td = document.createElement("td");
			    td.innerText = parseDate(chooseDate(element.created, element.modified));
			    tr.appendChild(td);

			    // button for diagnose
			    let button = document.createElement("button");
			    button.innerHTML = "Check";
			    button.id = element.id;
			    // add classes to button
			    let classes = ["btn", "btn-block", "btn-primary", "dpacient-button"];
			    classes.forEach(function(c){
			    	button.classList.add(c);
			    });
			  	// add click listener for button
			  	button.addEventListener("click", buttonClicked);

			    // create cell with button
			    let td_button = document.createElement("td");
			    td_button.appendChild(button);
			    td_button.classList.add("pacient-button");
			    tr.appendChild(td_button);
			    i++;
			});
			// console.log("#of elements:", i);
		}
	);
}

// return type of algorithm based on its number
function getType(type){
	if(type === '1')
	    return 'Diagnostic';
	else if(type === '2')
	    return 'Treatment';
	else if(type === '3')
	    return 'Diagnostic, Treatment';
	else if(type === '4')
	    return 'Other';
	else if(type === '5')
	    return 'Diagnostic, Treatment';
	else if(type === '6')
	    return 'Treatment, Other';
	else if(type === '7')
	    return 'Diagnostic, Treatment, Other';

	return "-";
}

// prases date from PHP into dd.mm.yy
function parseDate(date){
	if(!date)
		return date;

	let dt = date.substring(0, date.lastIndexOf(" "));
	let date_array = dt.split("-");
	let slo_date = date_array[2] + "." + date_array[1] + "." + date_array[0];

	// console.log("date:", slo_date);
	return slo_date;
}

// function returns @created if @modified is null and @modified otherwise
function chooseDate(created, modified) {
	// console.log("returned:", modified === null ? "created" : "modified");
	return modified === null ? created : modified;
}

// show disclaimer at the start
$(function(){
	start();

	$("#patient-agree").click(function(){
		user_agree = true;
		$("#disclaimermodal").modal("hide");
		// buttonClicked("mouse hehehe", user_button_clicked);
		// console.log("agree");
	});

	// if user agreed only then proceed
	$("#disclaimermodal").on("hidden.bs.modal", function() {
		if(user_agree)
			buttonClicked("mouse hehehe", user_button_clicked);
	});

	$("#patient-disagree").click(function(){
		user_agree = false;
		// console.log("disagree");
		document.getElementById("bodi").classList.remove("blur");
	});

	// start blur when modal is shown to user
	$('#disclaimermodal').on('show.bs.modal', function () {
		// console.log("disclaimermodal modal show");
		document.getElementById("bodi").classList.add("blur");
	})

	$("#testmodal").on("show.bs.modal", function() {
		// console.log("test modal show");
		document.getElementById("bodi").classList.add("blur");
	});

	// remove blur when modal is hidden from user
	$("#disclaimermodal").on("hide.bs.modal", function() {
		if(!user_agree)
			document.getElementById("bodi").classList.remove("blur");
	});
	$("#testmodal").on("hide.bs.modal", function() {
		document.getElementById("bodi").classList.remove("blur");
	});
});
