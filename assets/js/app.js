$(document).ready(function(){
			
			get_data(1);
			
		});
		
		window.addEventListener("hashchange", get_data, false);
		
		function get_data(fadein){
			
			if(fadein=='1'){
			$('main').hide();
			}
			
			var page = get_page();
			
			window.page = page;
			
			$.getJSON( "data/"+page+".json", function( data ) {
				
			  json = data; // set globally
				
			  var items = [];
				
			  $.each( data, (function( index ) {
				  
				  var item = data[index];
				  if(data[index]['template']!==undefined){
					 var templ_id = data[index]['template'];
				  }
				  else{
					 var templ_id = 'default';
				  }
				  
				  items.push( '<section id="'+data[index]['id']+'" data-template="'+templ_id+'" class="edit"><div class="container">' );
				  
				  
				  var source   = document.getElementById(templ_id).innerHTML;  
				  var template = Handlebars.compile(source);
				  var html    = template(item);
				  
					items.push(html);
				  
				 
				  items.push( '</div></section>' );
			  }));

			  var posts = $( "<div/>", {
				"class": "my-new-list",
				html: items.join( "" )
			  });
				
			if(fadein=='1'){
				
				$('main').html(posts).fadeIn();	
				
				
			}
			else{
				$('main').html(posts);	
			}
			
			
			// check if function exists
			if(typeof init === "function"){

				init();
			}
				
			});
		}

		function get_page(){
			
			var page = window.location.hash.substr(1).replace('/', ''); // set globally
			
			if(page==''){
			   page = 'index';
			}
			
			return page;
			
		}