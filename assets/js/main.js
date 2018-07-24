// whether user agrees with terms displayed in disclaimer, maniupalted with buttons in disclaimer
let user_agree = null;
// last clicked button, reference
let user_button_clicked = null;

// listener for click on button,
// because function is callback, event is passed as first argument
function buttonClicked(e, specified_id = "nothing"){
	// show disclaimer
	if(user_agree === null || !user_agree)
		$("#disclaimermodal").modal();

	// remember which button was clicked, so click event can be triggered manually with correct id
	user_button_clicked = $(this).attr('id');;

	// stop, if user does not agree with terms
	if(!user_agree)
		return;

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
				// element should be intended for patients and curated in order to be displayed
				// ---------- NOT GOOD, send requests and filter that on API ----------
				if(element.intended != 0 && element.curated !== "approved"){
					// console.log("not good");
					return;
				}

				const tr = document.createElement("tr");
				tbody.appendChild(tr);
				tr.classList.add("tr-graphTable");

				// keys: id, author, created, description, graph_data, intended, modified,
				// modified_by, name, type, curated

				// name of disease
				let td = document.createElement("td");
			    td.innerText = element.name;
			    tr.appendChild(td);

			    // button for diagnose
			    let button = document.createElement("button");
			    button.innerHTML = "Prikaži";
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
			console.log("#of elements:", i);
		}
	);
}

// show disclaimer at the start
$(function(){
	start();

	$("#patient-agree").click(function(){
		user_agree = true;
		buttonClicked("mouse hehehe", user_button_clicked);
		console.log("agree");
	});

	$("#patient-disagree").click(function(){
		user_agree = false;
		console.log("disagree");

	});
});