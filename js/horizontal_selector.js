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
		selection = $(this);
		$(this).each(function(){
			$(this).buildSelector();
		});
		return selection;
	}

	


});

jQuery.fn.extend({
	
	buildSelector: function (){
		
		//$(this).hide();
		
		var selectorName = $(this).attr("name");
		$("select[name='" +  selectorName + "']").addClass("hs-binded");
		var optionValueArray = optionValues($(this));
		var optionHtmlArray = optionHtmls($(this));
		var numberOfOptions = $(this).children().length;
		var parent = $(this).parent();
		var currentSelected = $(this).val();
		construct();
		setSelected(currentSelected);
		setSelected(currentSelected, selectorName)
			
		// Events
		$(function(){

			$("td.hole").click(function(){
				var destinationName = $(this).attr("selector-name");
				var previousSelected = "td.selected-hole[selector-name='" + destinationName + "']";
				$(previousSelected).removeClass("selected-hole");			
				$(this).addClass("selected-hole");
				var newValue = $(this).attr("option-id");
				originalSelect = "select[name='" +  destinationName + "'";
				$(originalSelect).val(newValue).trigger('change');
			});
			
			$(".hs-binded").change(function(){	
				var destinationName = $(this).attr("name");		
				var previousSelected = "td.selected-hole[selector-name='" + destinationName + "']";
				$(previousSelected).removeClass("selected-hole");
				var newValue = $(this).val();
				var selectHole = "td[option-id='" + newValue + "'][selector-name='" + destinationName + "']";
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
				
				newHtml += "<td option-id='"+ optionValueArray[x] + "' selector-name='" + selectorName + "' class='hole first-hole'></td>";
				newHtml += "<td class='hole-spacer'></td>";
				
				x++;
				
				for(i=1; i < numberOfOptions - 1; i++){
								
						newHtml += "<td option-id='" + optionValueArray[i] + "' selector-name='" + selectorName + "' class='hole between-hole'></td>";
						newHtml += "<td class='hole-spacer'></td>";	
						x++;
				}
				
				newHtml += "<td option-id='"+ optionValueArray[x] + "' selector-name='" + selectorName + "' class='hole last-hole'></td>";
				
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
		
		function setSelected(selectedValue, destinationName){
			var selectHole = "td[option-id='" + selectedValue + "'][selector-name='" + destinationName + "']";
			$(selectHole).addClass("selected-hole");
		}	
	}
});


		

		
