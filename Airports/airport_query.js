				$("form").submit(function() {
				  if ($("input:first").val() == "lhr") {
				    $("#topdest").text("New York JFK, Dubai, Mumbai, Dublin, Hong Kong.").show();
				    return false;
				  }		
				  if ($("input:first").val() == "lgw") {
				    $("#topdest").text("Geneva, Dublin, Dubai, Amsterdam, Madrid.").show();
				    return false;
		  		  }	
				   if ($("input:first").val() == "man") {
				    $("#topdest").text("Dubai, Tenerife, Amsterdam, Dublin, Paris (CDG).").show();
				    return false;
				  }
				  if ($("input:first").val() == "stn") {
				    $("#topdest").text("Dublin, Rome (Ciampino), Bergamo, Budapest, Warsaw.").show();
				    return false;
				  }
		          if ($("input:first").val() == "ltn") {
				    $("#topdest").text("Geneva, Budapest, Warsaw, Amsterdam, Bucharest.").show();
				    return false;
				  }
		          if ($("input:first").val() == "edi") {
				    $("#topdest").text("Amsterdam, Dublin, Geneva, Paris (CDG), Tenerife.").show();
				    return false;
				  }
				  if ($("input:first").val() == "bhx") {
				    $("#topdest").text("Dubai, Dublin, Amsterdam, Paris (CDG), Tenerife.").show();
				    return false;
				  }
				  if ($("input:first").val() == "gla") {
				    $("#topdest").text("Dubai, Amsterdam, Tenerife, Dublin, Arrecife (Lanzarote).").show();
				    return false;
				  }
				  if ($("input:first").val() == "brs") {
				    $("#topdest").text("Innsbruck, Salzburg, Brussels, Sofia, Paphos.").show();
				    return false;
				  }
				  if ($("input:first").val() == "lpl") {
				    $("#topdest").text("Geneva, Dublin, Amsterdam, Barcelona, Alicante.").show();
				    return false;
				  }
				  if ($("input:first").val() == "ncl") {
				    $("#topdest").text("Amsterdam, Dubai, Tenerife, Paris (CDG), Dublin.").show();
				    return false;
				  }
				  if ($("input:first").val() == "bfs") {
				    $("#topdest").text("Geneva, Amsterdam, Tenerife, Paris (CDG), New york (NEWARK).").show();
				    return false;
				  }
				  if ($("input:first").val() == "ema") {
				    $("#topdest").text("Tenerife, Dublin, Arrecife (Lanzarote), Alicante, Malaga.").show();
				    return false;
				  }
				  if ($("input:first").val() == "abz") {
				    $("#topdest").text("Amsterdam, Stavanger, Paris (CDG), Frankfurt, Copenhagen.").show();
				    return false;
				  }
				  if ($("input:first").val() == "lcy") {
				    $("#topdest").text("Zurich, Amsterdam, Geneva, Frankfurt, Luxembourg.").show();
				    return false;
				  }
				  $
				  ("#topdest").text("Please enter a valid IATA airport code!").show();
				  return true;
				});

