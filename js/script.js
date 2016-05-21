 var mymap;
 var github;
 var apiKey = 'AIzaSyBjGcqGOm1dBMaMPRexxOgo9n81I5MhicE';
 
 $(document).ready(function(){
	 
			var popup = L.popup();
			mymap = L.map('mapid').setView([40.4112646, -3.694829], 13);
			L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
			    attribution: '&copy; <a href="http://osm.org/copyright>OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery Â© <a href="http://mapbox.com">Mapbox</a>'
			}).addTo(mymap);
			
			function show_accomodation(){
			  $("#indicators" ).empty();
			  $("#items" ).empty();
			  var accomodation = accomodations[$(this).attr('no')];
			  if (accomodation.geoData.latitude == undefined || accomodation.geoData.longitude == undefined){
				  alert("Hotel no disponible");
			  }
			  else{
				  var lat = accomodation.geoData.latitude;
				  var lon = accomodation.geoData.longitude;
				  mymap.setView([lat, lon], 15);
			  }
			  if (accomodation.basicData.web != undefined){
				  var url = accomodation.basicData.web;
			  } 
			  if (accomodation.basicData.name != undefined){
				var name = accomodation.basicData.name;
			  }
			  if (accomodation.basicData.body != undefined){
				   var desc = accomodation.basicData.body;
			  }
			  if (accomodation.extradata.categorias.categoria.item[1]['#text'] != undefined){  		
					var cat = accomodation.extradata.categorias.categoria.item[1]['#text'];
			  }	
			  if (accomodation.extradata.categorias.categoria.subcategorias != undefined){
				  var subcat = accomodation.extradata.categorias.categoria
			   .subcategorias.subcategoria.item[1]['#text'];
			  } 
			  L.marker([lat, lon]).addTo(mymap)
				 .bindPopup('<a href="' + url + '">' + name + '</a></br>')
				 .on("popupopen", function(){
					 var marker = this;
				    $(".leaflet-popup-close-button:visible").click(function () {
						mymap.removeLayer(marker);
				    });
				 })
				 .on("click", function(){
					 var hotel = document.getElementById(name);
					  change_accomodation(hotel);
				})	  
				 .openPopup();
			  $('#info').html('<h2>' + name + '</h2>'
			   + '<p>Type: ' + cat + ', subtype: ' + subcat + '</p>'
			   + desc);
			  $('#info-alojados').html('<h2 id="name-hotel">' + name + '</h2>'
			   + '<p>Type: ' + cat + ', subtype: ' + subcat + '</p>');
			  $('#select-vistos').html($('#select-vistos').html() +'<option>' + name + '</option>');
			  console.log($("#nombre-selecionado").text());
			  if($("#nombre-selecionado").text() == "vistos: "){
				$('#colecion-contenido-principal').html($('#colecion-contenido-principal').html() +'<option>' + name + '</option>');
			  }		
			  var id = "select-" + name;
			  var obj = document.getElementById(id);
			  if (obj != null){
				obj.style.display = "block";
			  }	
			  $($("#colecciones-alojados").html()).each(function (){
				  if($(this).attr('id') != id & $(this).attr('id') != undefined){
						   var obj = document.getElementById($(this).attr('id'));
						   obj.style.display = "none";	
					   }
			  });
			  var indicators = [];
			  var items = [];
			  if(accomodation.multimedia != undefined){
				for(i in accomodation.multimedia.media){
					console.log(accomodation.multimedia.media[i].url);
					if(i == 0){
						indicators.push('<li data-target="#myCarousel" data-slide-to="0" class="active"></li>')
						items.push('<div class="active item"><img  src="'+ accomodation.multimedia.media[i].url + '" alt="banner1" /></div>')
					}
					else{
						indicators.push('<li data-target="#myCarousel" data-slide-to="' + i + '"></li>');
						items.push('<div class="item"><img  src="' + accomodation.multimedia.media[i].url + '" alt="banner'+ i+1 + '" /></div>')
					}
					
				}
			  }
			  var obj1 = document.getElementById("indicators");
			  var obj2 = document.getElementById("items");
			  for(j in indicators){
				  obj1.innerHTML = obj1.innerHTML + indicators[j];
				  obj2.innerHTML = obj2.innerHTML + items[j];
			  } 
			};
			
			$("#nuevo-alojado").click(function(event) {
				var obj = document.getElementById("alojados");
			    var obj2 = document.getElementById("anadir-alojado");
			    var obj3 = document.getElementById("info-alojados");
			    obj.style.display = "none";
			    obj2.style.display = "block";
			    obj3.style.display = "none";
			});
			
			$("#nueva-coleccion").click(function(event) {
				var obj = document.getElementById("colecciones-principal");
			    var obj2 = document.getElementById("colecciones-crear");
			    obj.style.display = "none";
			    obj2.style.display = "block";
			});
			
			$("#save").click(function(event) {
				var obj = document.getElementById("save-form");
			    obj.style.display = "block";
			});
			
			$("#load").click(function(event) {
				var obj = document.getElementById("load-form");
			    obj.style.display = "block";
			});	
			
			$("#load-hotel").click(function(event) {
				$.getJSON("alojamiento.json", function(data) {
			    accomodations = data.serviceList.service
			    var obj = document.getElementById("load-hotel");
			    var obj2 = document.getElementById("select");
			    var obj3 = document.getElementById("colecciones-principal");
			    var obj4 = document.getElementById("alojados");
			    var obj5 = document.getElementById("colecciones-seleccionadas");
			    var obj6 = document.getElementById("save-load");
			    obj.style.display = "none";
			    obj2.style.display = "block";
			    obj3.style.display = "block";
			    obj4.style.display = "block";
			    obj5.style.display = "block";
			    obj6.style.display = "block";
			    var list;
			    for (var i = 0; i < accomodations.length; i++) {
			      list = list + '<option draggable="true" ondragstart="dragged(event)" no=' + i + ' id="'+ accomodations[i].basicData.title +'">' + accomodations[i].basicData.title + '</option>';
			    }
			    $('#select-hotel').html(list);
			    $('#select-hotel option').click(show_accomodation);
			  });
			}); 
			
		   
		});
		
			function change_accomodation(hotel){
				$("#indicators" ).empty();
				$("#items" ).empty();
				var accomodation = accomodations[$(hotel).attr('no')];
			  if (accomodation.geoData.latitude == "" || accomodation.geoData.longitude == ""){
				  alert("Hotel no disponible");
			  }
			  else{
				  var lat = accomodation.geoData.latitude;
				  var lon = accomodation.geoData.longitude;
				  mymap.setView([lat, lon], 15);
			  }
			  if (accomodation.basicData.web != undefined){
				  var url = accomodation.basicData.web;
			  } 
			  if (accomodation.basicData.name != undefined){
				var name = accomodation.basicData.name;
			  }
			  if (accomodation.basicData.body != undefined){
				   var desc = accomodation.basicData.body;
			  }
			  if (accomodation.extradata.categorias.categoria.item[1]['#text'] != undefined){  		
					var cat = accomodation.extradata.categorias.categoria.item[1]['#text'];
			  }	
			  if (accomodation.extradata.categorias.categoria.subcategorias != undefined){
				  var subcat = accomodation.extradata.categorias.categoria
			   .subcategorias.subcategoria.item[1]['#text'];
			  }
			  $('#info').html('<h2>' + name + '</h2>'
			   + '<p>Type: ' + cat + ', subtype: ' + subcat + '</p>'
			   + desc);
			  $('#info-alojados').html('<h2 id="name-hotel">' + name + '</h2>'
			   + '<p>Type: ' + cat + ', subtype: ' + subcat + '</p>'); 
			  var id = "select-" + name;
			  var obj = document.getElementById(id);
			  if (obj != null){
				obj.style.display = "block";
			  }	
			  $($("#colecciones-alojados").html()).each(function (){
				  if($(this).attr('id') != id & $(this).attr('id') != undefined){
						   var obj = document.getElementById($(this).attr('id'));
						   obj.style.display = "none";	
					   }
			  });
			  var indicators = [];
			  var items = [];
			  if(accomodation.multimedia != undefined){
				for(i in accomodation.multimedia.media){
					console.log(accomodation.multimedia.media[i].url);
					if(i == 0){
						indicators.push('<li data-target="#myCarousel" data-slide-to="0" class="active"></li>')
						items.push('<div class="active item"><img  src="'+ accomodation.multimedia.media[i].url + '" alt="banner1" /></div>')
					}
					else{
						indicators.push('<li data-target="#myCarousel" data-slide-to="' + i + '"></li>');
						items.push('<div class="item"><img  src="' + accomodation.multimedia.media[i].url + '" alt="banner'+ i+1 + '" /></div>')
					}
					
				}
			  }
			  var obj = document.getElementById("indicators");
			  var obj2 = document.getElementById("items");
			  for(j in indicators){
				  obj.innerHTML = obj.innerHTML + indicators[j];
				  obj2.innerHTML = obj2.innerHTML + items[j];
			  } 
				
			}
			
			function dragged(event) {
	            event.dataTransfer.effectAllowed = "copy";
	            event.dataTransfer.dropEffect = "copy";
	            event.dataTransfer.setData("text", event.target.value);
	            return false;
	        }
	        
	        function dropped(event) {
				var message = [];
	            event.stopPropagation();
	            event.preventDefault();
	            id = event.target.id;
	            var obj = document.getElementById(id);
	            console.log(id);
	            message.push('<option>' + event.dataTransfer.getData("text") + '</option>');
	            obj.innerHTML = obj.innerHTML + message[0];
	            $('#colecion-contenido-principal').html($('#colecion-contenido-principal').html() + '<option>' + event.dataTransfer.getData("text") + '</option>');
	            return false;
	        }
	        
	        function doNothing(event) {
	            event.stopPropagation();
	            event.preventDefault();
	            return false;
	        }
	        
	        function anadir(){
				var obj = document.getElementById("alojados");
			    var obj2 = document.getElementById("anadir-alojado");
			    var obj3 = document.getElementById("info-alojados");
			    obj.style.display = "block";
			    obj2.style.display = "none";
			    obj3.style.display = "block";
			    handleClientLoad();
			}
			function handleClientLoad() {
		        gapi.client.setApiKey(apiKey);
		        makeApiCall();
		    }
		    function makeApiCall() {
		        gapi.client.load('plus', 'v1', function() {
				var user = $("#usario-alojado").val();
				console.log(user);
		          var request = gapi.client.plus.people.get({
		            'userId': user
		          });
		          request.execute(function(resp) {
		            var alojado = resp.displayName;
		            var hotel = $("#name-hotel").text();
		            var id = "select-" + hotel;
		            var encontrado = false;
		            $($("#colecciones-alojados").html()).each(function (){
						if($(this).attr('id') == id){
							encontrado = true;
						}
					});
					var obj = document.getElementById(id);
					console.log(alojado);
					if (encontrado){
						if (alojado != undefined){
							obj.innerHTML = obj.innerHTML + '<option>' + alojado  + '</option>';
						}	
					}
					else{
						console.log(id);
						$("#colecciones-alojados").html($("#colecciones-alojados").html() + '<select id="'+ id + '" style="display:block;" multiple class="form-control"></select>');
						obj = document.getElementById(id);
						if (alojado != undefined){
							obj.innerHTML = obj.innerHTML + '<option>' + alojado  + '</option>';
						}
					}
		          });
			});
		}
	        
	        function publicar(){
				var message = [];
				var message2 = [];
				var obj = document.getElementById("nombre-coleccion");
				var obj2 = document.getElementById("collection");
				var obj3 = document.getElementById("colecciones-principal");
			    var obj4 = document.getElementById("colecciones-crear");
			    var obj5 = document.getElementById("colecciones-contenido");
				message.push('<option id="' + obj.value +  '" onclick=' + 'cambio("select-' + obj.value + '")' + '>' + obj.value + '</option>');
				message2.push('<select id="select-' + obj.value + '"style="display:none;" multiple class="form-control" dropzone="copy"  ondrop="dropped(event);" ondragenter="doNothing(event);" ondragleave="doNothing(event);"ondragover="doNothing(event);"></select>');
				obj2.innerHTML = obj2.innerHTML + message[0];
				obj5.innerHTML = obj5.innerHTML + message2[0];	
				obj3.style.display = "block";
			    obj4.style.display = "none";	
			}
			
			function load(){
				console.log("cargar");
				var message = [];
				var message2 = [];
				var obj = document.getElementById("load-form");
				var token = $("#token-load").val();
				var repouser = $("#repo-load").val();
				var obj1 = document.getElementById("collection");
				var obj2 = document.getElementById("colecciones-contenido");
				var obj4 = document.getElementById("colecciones-alojados");
				var fich = $("#fich-load").val();
				$("#collection" ).empty();
				$("#colecciones-contenido" ).empty();
				$("#colecciones-alojados" ).empty();
				obj.style.display = "none";
				github = new Github({
				  token: token,
				  auth: "oauth"
				});
				console.log(repouser);
				repo = github.getRepo('afernandezb92', repouser);
				repo.read('master', fich, function(err, data) {
					var json = $.parseJSON(data);
					var colecciones = json.colecciones;
					for (var i in colecciones) 
					{
						console.log(colecciones[i].nombre);
						message.push('<option id="' + colecciones[i].nombre +  '" onclick=' + 'cambio("select-' + colecciones[i].nombre + '")' + '>' + colecciones[i].nombre + '</option>');
						message2.push('<select id="select-' + colecciones[i].nombre + '"style="display:none;" multiple class="form-control" dropzone="copy"  ondrop="dropped(event);" ondragenter="doNothing(event);" ondragleave="doNothing(event);"ondragover="doNothing(event);"></select>');
						obj1.innerHTML = obj1.innerHTML + message[i];
						obj2.innerHTML = obj2.innerHTML + message2[i];
						for (var j in colecciones[i].contenido) 
						{
							$('#select-' + colecciones[i].nombre).html($('#select-' + colecciones[i].nombre).html() +'<option>' + colecciones[i].contenido[j] + '</option>');
						}
						
					}
					var obj3 = document.getElementById("select-vistos");
					obj3.style.display = "block";
					$('#nombre-selecionado').empty();
					$('#colecion-contenido-principal').empty();
					$('#nombre-selecionado').text("vistos: ");
					$($('#select-vistos').html()).each(function ()     
				     {
						$('#colecion-contenido-principal').html($('#colecion-contenido-principal').html() + '<option>' + this.value + '</option>')
				     });
				    var alojamientos = json.alojamientos;
				    for (var k in alojamientos) 
					{
						console.log(alojamientos[k].hotel);
						$("#colecciones-alojados").html($("#colecciones-alojados").html() + '<select id="'+ alojamientos[k].hotel + '" style="display:none;" multiple class="form-control"></select>');
						for (var l in alojamientos[k].alojados) 
						{
							obj4 = document.getElementById(alojamientos[k].hotel);
							obj4.innerHTML = obj4.innerHTML + '<option>' + alojamientos[k].alojados[l]  + '</option>';
							console.log(alojamientos[k].alojados[l]);
						}
					}
					var hotel = $("#name-hotel").text();
					var obj5 = document.getElementById("select-" + hotel);
					if (obj5 != undefined){
						obj5.style.display = "block";
					}  
				});
			}
			
			function save(){
				console.log("salvar");
				var colecciones = [];
				var alojamientos = [];
				var obj2;
				var text = [];
				var obj = document.getElementById("save-form");
				var token = $("#token").val();
				var repouser = $("#repo").val();
				var fich = $("#fich").val();
			    obj.style.display = "none";
			    github = new Github({
				  token: token,
				  auth: "oauth"
				});
				repo = github.getRepo('afernandezb92', repouser);
				
				$($("#collection").html()).each(function () 
			    { 
					if($(this).attr('id') != undefined){
						var hoteles = []; 
						var coleccion = [];
						obj2 = document.getElementById($(this).attr('id'));
						console.log(obj2.value);
						//coleccion.push(obj2.value);
						$($("#select-" + obj2.value).html()).each(function () 
					    { 
							console.log($(this).val());
							hoteles.push($(this).val());
					    });
					    colecciones.push('{"nombre": "' + obj2.value + '","contenido": ' + JSON.stringify(hoteles) + '}'); 
					}	
			     });
			    $($("#colecciones-alojados").html()).each(function () 
			    {
					if($(this).attr('id') != undefined){
						var hotel = [];
						var alojados = [];
						var id = $(this).attr('id');
						console.log(id);
						hotel.push(id);
						$($(this).html()).each(function () 
					    {
							console.log($(this).val());
							alojados.push($(this).val());
						});
						alojamientos.push('{"hotel": "' + id + '","alojados": ' + JSON.stringify(alojados) + '}');
					}
				});	
			     text.push('{"colecciones": [' + colecciones + '], "alojamientos" :[ ' + alojamientos + ']}');
			     repo.write('master', fich, text, 'GUARDANDO DATOS', function(err) {});	   
			};
			
			function cambio(id){
				var nombreselecionado = id.split("-");
				var obj = document.getElementById(id);
				obj.style.display = "block";
				$('#nombre-selecionado').empty();
				$('#colecion-contenido-principal').empty();
				$('#nombre-selecionado').text(nombreselecionado[1] + ":");
				$($("#colecciones-contenido").html()).each(function () 
			        { 
			           if($(this).attr('id') != id & $(this).attr('id') != undefined){
						   var obj = document.getElementById($(this).attr('id'));
						   obj.style.display = "none";	
					   }
			        });
			     $($('#' + id).html()).each(function ()     
			     {
					$('#colecion-contenido-principal').html($('#colecion-contenido-principal').html() + '<option>' + this.value + '</option>')
			     });
			            
				
			}

