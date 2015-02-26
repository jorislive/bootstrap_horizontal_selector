/*
 * Jquery Horizontal Selector v0.4
 * 
 *
 * Copyright 2015, Joris Wenting
 * https://www.accow.nl/jquery_horizontal_selector/
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
*/

jQuery.fn.extend({
	
	horizontalSelector: function (){
		$(this).each(function(){
			$(this).buildSelector();
		});
	}
});

jQuery.fn.extend({
	
	buildSelector: function (){
		
		//$(this).hide();
		
		var selectorId = $(this).attr("id");
		var hashtagSelectorId = "#" + selectorId;
		$(hashtagSelectorId).addClass("hs-binded");
		var optionValueArray = optionValues($(this));
		var optionHtmlArray = optionHtmls($(this));
		var numberOfOptions = $(this).children().size();
		var parent = $(this).parent();
		var currentSelected = $(this).val();
		construct();
		setSelected(currentSelected);
		setSelected(currentSelected, selectorId)
			
		// Events
		$(function(){

			$("td.hole").click(function(){
				var destinationId = $(this).attr("selector-id");
				var previousSelected = "td.selected-hole[selector-id='" + destinationId + "']";
				$(previousSelected).removeClass("selected-hole");			
				$(this).addClass("selected-hole");
				var newValue = $(this).attr("option-id");
				originalSelect = "#" + destinationId;
				$(originalSelect).val(newValue);
			});
			
			$(".hs-binded").change(function(){	
				var destinationId = $(this).attr("id");		
				var previousSelected = "td.selected-hole[selector-id='" + destinationId + "']";
				$(previousSelected).removeClass("selected-hole");
				var newValue = $(this).val();
				var selectHole = "td[option-id='" + newValue + "'][selector-id='" + destinationId + "']";
				$(selectHole).addClass("selected-hole");
			});
			
		});		
	
		function construct(){
							
				// Create HTML for the new selector
				var newHtml = "<table><tr>";
				
				for(i=0; i < numberOfOptions; i++){
					
					var value = optionHtmlArray[i];
					newHtml += "<th class='fixedWidth'><h6>"+ value +"</h6></th>";
					newHtml += "<th class='sliderSpacerHeading'>&nbsp;</th>";
				
				}
				
				newHtml += "</tr>";
				
				newHtml += "<tr id='selectorOptions'>";
				
				var x = 0
				
				newHtml += "<td option-id='"+ optionValueArray[x] + "' selector-id='" + selectorId + "' class='hole first-hole'></td>";
				newHtml += "<td class='hole-spacer'></td>";
				
				x++;
				
				for(i=1; i < numberOfOptions - 1; i++){
								
						newHtml += "<td option-id='" + optionValueArray[i] + "' selector-id='" + selectorId + "' class='hole between-hole'></td>";
						newHtml += "<td class='hole-spacer'></td>";	
						x++;
				}
				
				newHtml += "<td option-id='"+ optionValueArray[x] + "' selector-id='" + selectorId + "' class='hole last-hole'></td>";
				
				newHtml += "</tr>";
				
				newHtml += "</table>";
				
				parent.append(newHtml);			
		};		
		
		function optionValues(element){
			var array = [];
			element.children().each(function(){
				// The $(this) selector below refers to the child element !!
				array.push($(this).attr("value"));	
			});
			return array;
		};
		
		function optionHtmls(element){
			var array = [];
			element.children().each(function(){
				// The $(this) selector below refers to the child element !!
				array.push($(this).html());	
			});
			return array;
		};
		
		function setSelected(selectedValue, destinationId){
			var selectHole = "td[option-id='" + selectedValue + "'][selector-id='" + destinationId + "']";
			$(selectHole).addClass("selected-hole");
		}	
	}
});


		

		
