
$(document).ready(Origin);

function Origin() {
	// Collapser
	$(".section .content-block-holder.head").on('click',function(){
		$(this).parent().toggleClass("collapsed");
	});
}

// Quest Boost
// Global Drop Boost
// Spare Part Boost
function CalculateCostRhodiumQuestBoost(i) {
	$(i + " .content-return .return").hide()
	$(i + " .content-return .return-error").hide()
	if ( $(i + "-Input-Current").val() == '' || $(i + "-Input-Wanted").val() == '' ) {
		return ReturnError(i,"Empty values!");
	}
	var Current = unDo( $(i + "-Input-Current").val() );
	var Wanted = unDo( $(i + "-Input-Wanted").val() );
	var Result = 0;
	if (Current.length == 0 || Wanted.length == 0) {
		return ReturnError(i,"Invalid values!");
	}
	if (! isNumber(Current) && isNumber(Wanted) ) {
		return ReturnError(i,"Invalid values!");
	}
	Current = Number(Current)
	Wanted = Number(Wanted)
	while (Current < Wanted) {
		Current++;
		Result += Math.round(Current * 2);
	}
	$(i + " .content-return").show()
	$(i + " .content-return .return").text(Comma(Result) + " Rhodium Required")
	$(i + " .content-return .return").show()
}

// Global Exp Boost
function CalculateCostRhodiumGlobalExpBoost(i) {
	$(i + " .content-return .return").hide()
	$(i + " .content-return .return-error").hide()
	if ( $(i + "-Input-Current").val() == '' || $(i + "-Input-Wanted").val() == '' ) {
		return ReturnError(i,"Empty values!");
	}
	var Current = unDo( $(i + "-Input-Current").val() );
	var Wanted = unDo( $(i + "-Input-Wanted").val() );
	var Result = 0;
	if (Current.length == 0 || Wanted.length == 0) {
		return ReturnError(i,"Invalid values!");
	}
	if (! isNumber(Current) && isNumber(Wanted) ) {
		return ReturnError(i,"Invalid values!");
	}
	Current = Number(Current)
	Wanted = Number(Wanted)
	while (Current < Wanted) {
		Current++;
		Result += 2;
		Result += Math.floor(Current / 10 - 0.01);
	}
	$(i + " .content-return").show()
	$(i + " .content-return .return").text(Comma(Result) + " Rhodium Required")
	$(i + " .content-return .return").show()
}

// Quint Chance
function CalculateCostSparePartQuintChance() {
	$("#Cost-SparePart-QuintChance .content-return .return").hide()
	$("#Cost-SparePart-QuintChance .content-return .return-error").hide()
	if ( $("#Cost-SparePart-QuintChance-Input-Current").val() == '' || $("#Cost-SparePart-QuintChance-Input-Wanted").val() == '' || $("#Cost-SparePart-QuintChance-Input-Scrapyard").val() == '' ) {
		return ReturnError("#Cost-SparePart-QuintChance","Empty values!");
	}
	var Current = unDo( $("#Cost-SparePart-QuintChance-Input-Current").val() );
	var Wanted = unDo( $("#Cost-SparePart-QuintChance-Input-Wanted").val() );
	var Scrapyard = unDo( $("#Cost-SparePart-QuintChance-Input-Scrapyard").val() );
	if (Current.length == 0 || Wanted.length == 0 || Scrapyard.length == 0) {
		return ReturnError("#Cost-SparePart-QuintChance","Improper Lengths!!");
	}
	if (! isNumber(Current) && isNumber(Wanted) && isNumber(Scrapyard) ) {
		return ReturnError("#Cost-SparePart-QuintChance","Invalid values!");
	}
	Current = Number(Current);
	Wanted = Number(Wanted);
	Scrapyard = Number(Scrapyard);
	Scrapyard = Math.pow(0.99,Scrapyard);
	var Result = 0;
	Current *= 10;
	Wanted *= 10;
	Wanted = (Wanted - Current);
	Result = Math.round(((spBaseCost(Current+Wanted,15)+spCostGrowthModifierSum(Current+Wanted,"Quint"))-(spBaseCost(Current,15)+spCostGrowthModifierSum(Current,"Quint")))*Scrapyard);
	$("#Cost-SparePart-QuintChance .content-return").show();
	$("#Cost-SparePart-QuintChance .content-return .return").text(Comma(Result) + " Spare Parts Required");
	$("#Cost-SparePart-QuintChance .content-return .return").show();
}

function spCostGrowthModifierSum(amount, type){
	var tmpAmount = amount;
	var tmpGrowth = 0.01;
	if(type == "Quint"){
		tmpGrowth = 0.02;
	}
	if(type == "Satchel"){
		tmpGrowth = 1; 
	}
	if(type != "Satchel"){
		var growthModifierSum = ((Math.pow(amount,3)/3)+Math.pow(amount,2)+(amount*2/3))*tmpGrowth/2;
	} else {
		var growthModifierSum = 0;
	}
	var tmpAmountThousands = 1;
	var increasedGrowth = 0;

	while (tmpAmount > 1000) {
	var addedGrowth = ((Math.pow((amount-(tmpAmountThousands*1000)),3)*1/3)+Math.pow((amount-(tmpAmountThousands*1000)),2)+((amount-(tmpAmountThousands*1000))*2/3)) * tmpGrowth/2;

	if(type == "Satchel"){
		addedGrowth *=50;
	}

	tmpAmount -= 1000;
	tmpGrowth *= 2;
	tmpAmountThousands++;

	increasedGrowth += addedGrowth;
	}

	growthModifierSum += increasedGrowth;
	return growthModifierSum;
  
}

function spBaseCost(level, costPerLevel){
	return (level * (level + 1) / 2) * costPerLevel;
};

// Resource Boost
function CalculateCostSparePartResourceBoost() {
	$("#Cost-SparePart-ResourceBoost .content-return .return").hide()
	$("#Cost-SparePart-ResourceBoost .content-return .return-error").hide()
	if ( $("#Cost-SparePart-ResourceBoost-Input-Current").val() == '' || $("#Cost-SparePart-ResourceBoost-Input-Wanted").val() == '' || $("#Cost-SparePart-ResourceBoost-Input-Scrapyard").val() == '' ) {
		return ReturnError("#Cost-SparePart-ResourceBoost","Empty values!");
	}
	var Current = unDo( $("#Cost-SparePart-ResourceBoost-Input-Current").val() );
	var Wanted = unDo( $("#Cost-SparePart-ResourceBoost-Input-Wanted").val() );
	var Scrapyard = unDo( $("#Cost-SparePart-ResourceBoost-Input-Scrapyard").val() );
	var Result = 0;
	if (Current.length == 0 || Wanted.length == 0 || Scrapyard.length == 0) {
		return ReturnError("#Cost-SparePart-ResourceBoost","Improper Lengths!!");
	}
	if (! isNumber(Current) && isNumber(Wanted) && isNumber(Scrapyard) ) {
		return ReturnError("#Cost-SparePart-ResourceBoost","Invalid values!");
	}
	Current = Number(Current);
	Wanted = Number(Wanted);
	Scrapyard = Number(Scrapyard);
	Scrapyard = Math.pow(0.99,Scrapyard);
	var Result = 0;
	Current *= 10;
	Wanted *= 10;
	Wanted = (Wanted - Current);
	Result = Math.round(((spBaseCost(Current+Wanted,8)+spCostGrowthModifierSum(Current+Wanted,""))-(spBaseCost(Current,8)+spCostGrowthModifierSum(Current,"")))*Scrapyard);
	$("#Cost-SparePart-ResourceBoost .content-return").show()
	$("#Cost-SparePart-ResourceBoost .content-return .return").text(Comma(Result) + " Spare Parts Required")
	$("#Cost-SparePart-ResourceBoost .content-return .return").show()
}

/*

// ORIGINAL QUINT CHANCE
function CalculateCostSparePartQuintChance() {
	$("#Cost-SparePart-QuintChance .content-return .return").hide()
	$("#Cost-SparePart-QuintChance .content-return .return-error").hide()
	if ( $("#Cost-SparePart-QuintChance-Input-Current").val() == '' || $("#Cost-SparePart-QuintChance-Input-Wanted").val() == '' || $("#Cost-SparePart-QuintChance-Input-Scrapyard").val() == '' ) {
		return ReturnError("#Cost-SparePart-QuintChance","Empty values!");
	}
	var Current = unDo( $("#Cost-SparePart-QuintChance-Input-Current").val() );
	var Wanted = unDo( $("#Cost-SparePart-QuintChance-Input-Wanted").val() );
	var Scrapyard = unDo( $("#Cost-SparePart-QuintChance-Input-Scrapyard").val() );
	if (Current.length == 0 || Wanted.length == 0 || Scrapyard.length == 0) {
		return ReturnError("#Cost-SparePart-QuintChance","Improper Lengths!!");
	}
	if (! isNumber(Current) && isNumber(Wanted) && isNumber(Scrapyard) ) {
		return ReturnError("#Cost-SparePart-QuintChance","Invalid values!");
	}
	Current = Number(Current);
	Wanted = Number(Wanted);
	var Result = 0;
	Current *= 10;
	Wanted *= 10;
	while (Current < Wanted) {
		Current++;
		Result += Math.round(Math.pow(0.99,Scrapyard) * Current * 20);
	}
	$("#Cost-SparePart-QuintChance .content-return").show()
	$("#Cost-SparePart-QuintChance .content-return .return").text(Comma(Result) + " Spare Parts Required")
	$("#Cost-SparePart-QuintChance .content-return .return").show()
}

// ORIGINAL RESOURCE BOOST
function CalculateCostSparePartResourceBoost() {
	$("#Cost-SparePart-ResourceBoost .content-return .return").hide()
	$("#Cost-SparePart-ResourceBoost .content-return .return-error").hide()
	if ( $("#Cost-SparePart-ResourceBoost-Input-Current").val() == '' || $("#Cost-SparePart-ResourceBoost-Input-Wanted").val() == '' || $("#Cost-SparePart-ResourceBoost-Input-Scrapyard").val() == '' ) {
		return ReturnError("#Cost-SparePart-ResourceBoost","Empty values!");
	}
	var Current = unDo( $("#Cost-SparePart-ResourceBoost-Input-Current").val() );
	var Wanted = unDo( $("#Cost-SparePart-ResourceBoost-Input-Wanted").val() );
	var Scrapyard = unDo( $("#Cost-SparePart-ResourceBoost-Input-Scrapyard").val() );
	var Result = 0;
	if (Current.length == 0 || Wanted.length == 0 || Scrapyard.length == 0) {
		return ReturnError("#Cost-SparePart-ResourceBoost","Improper Lengths!!");
	}
	if (! isNumber(Current) && isNumber(Wanted) && isNumber(Scrapyard) ) {
		return ReturnError("#Cost-SparePart-ResourceBoost","Invalid values!");
	}
	Current = Number(Current);
	Wanted = Number(Wanted);
	Current *= 10;
	Wanted *= 10;
	while (Current < Wanted) {
		Current++;
		Result += Math.round(Math.pow(0.99,Scrapyard) * Current * 10);
		//ORIGINAL RESOURCE BOOST
		//Old math for the resource boost made by Zampa
		//Math.round(Math.pow(0.99,Scrapyard) * Current * 10);
	}
	$("#Cost-SparePart-ResourceBoost .content-return").show()
	$("#Cost-SparePart-ResourceBoost .content-return .return").text(Comma(Result) + " Spare Parts Required")
	$("#Cost-SparePart-ResourceBoost .content-return .return").show()
}

*/

// Ingot Drop Rate
function CalculateDropRateRhodiumIngots() {
	$("#DropRate-RhodiumIngots .content-return .return").hide()
	$("#DropRate-RhodiumIngots .content-return .return-error").hide()
	if ( $("#DropRate-RhodiumIngots-Input-DropBoost").val() == '' || $("#DropRate-RhodiumIngots-Input-WishingWell").val() == '' ) {
		return ReturnError("#DropRate-RhodiumIngots","Empty values!");
	}
	var DropBoost = unDo( $("#DropRate-RhodiumIngots-Input-DropBoost").val() );
	var WishingWell = unDo( $("#DropRate-RhodiumIngots-Input-WishingWell").val() );
	if (DropBoost.length == 0 || WishingWell.length == 0) {
		return ReturnError("#DropRate-RhodiumIngots","Improper Lengths!!");
	}
	if (! isNumber(DropBoost) && isNumber(WishingWell) ) {
		return ReturnError("#DropRate-RhodiumIngots","Invalid values!");
	}
	var Result = 6;
	DropBoost = Number(DropBoost) / 100 + 1;
	WishingWell = Number(WishingWell) / 100 + 1;
	Result /= DropBoost;
	Result /= WishingWell;
	Result *= 1000;
	Result = Math.round(Result);
	$("#DropRate-RhodiumIngots .content-return").show()
	$("#DropRate-RhodiumIngots .content-return .return").text("One Rhodium Ingot Per " + Comma(Result) + " Actions.")
	$("#DropRate-RhodiumIngots .content-return .return").show()
}

// Upgrade Point Boost
function CalculateCostGuildUpgradePointBoost() {
	$("#Cost-Guild-UpgradePointBoost .content-return .return").hide()
	$("#Cost-Guild-UpgradePointBoost .content-return .return-error").hide()
	if ( $("#Cost-Guild-UpgradePointBoost-Input-Current").val() == '' || $("#Cost-Guild-UpgradePointBoost-Input-Wanted").val() == '' ) {
		return ReturnError("#Cost-Guild-UpgradePointBoost","Empty values!");
	}
	var Current = unDo( $("#Cost-Guild-UpgradePointBoost-Input-Current").val() );
	var Wanted = unDo( $("#Cost-Guild-UpgradePointBoost-Input-Wanted").val() );
	if (Current.length == 0 || Wanted.length == 0) {
		return ReturnError("#Cost-Guild-UpgradePointBoost","Improper Lengths!!");
	}
	if (! isNumber(Current) && isNumber(Wanted) ) {
		return ReturnError("#Cost-Guild-UpgradePointBoost","Invalid values!");
	}
	Current = Number(Current);
	Wanted = Number(Wanted);
	var Result = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0};
	Current /= 5;
	Wanted /= 5;
	if ( isNotWhole(Current) || isNotWhole(Wanted) ) {
		return ReturnError("#Cost-Guild-UpgradePointBoost","Values must be multiples of 5!");
	}
	while (Current < Wanted) {
		Result["1"] += 50000000*Current;
		if (Result["1"] < 0) { Result["1"] = 0 }
		Result["1"] += 50000000;
		Current++;
	}
	var Mult = ((Current) * 5) / 100;
	console.log(Mult)
	Result["2"] = Math.round(100 * Mult);
	Result["3"] = Math.round(225 * Mult);
	Result["4"] = Math.round(400 * Mult);
	Result["5"] = Math.round(550 * Mult);
	Result["6"] = Math.round(690 * Mult);
	Result["7"] = Math.round(970 * Mult);
	Result["8"] = Math.round(1200 * Mult);
	$("#Cost-Guild-UpgradePointBoost .content-return").show();
	$("#Cost-Guild-UpgradePointBoost .content-return .return.one").text(Comma(Result["1"]) + " Gold Required");
	$("#Cost-Guild-UpgradePointBoost .content-return .return.two").text("10k Task Rewards 100 (+" + Comma(Result["2"]) + ") Points");
	$("#Cost-Guild-UpgradePointBoost .content-return .return.three").text("25k Task Rewards 225 (+" + Comma(Result["3"]) + ") Points");
	$("#Cost-Guild-UpgradePointBoost .content-return .return.four").text("50k Task Rewards 400 (+" + Comma(Result["4"]) + ") Points");
	$("#Cost-Guild-UpgradePointBoost .content-return .return.five").text("75k Task Rewards 550 (+" + Comma(Result["5"]) + ") Points");
	$("#Cost-Guild-UpgradePointBoost .content-return .return.six").text("100k Task Rewards 690 (+" + Comma(Result["6"]) + ") Points");
	$("#Cost-Guild-UpgradePointBoost .content-return .return.seven").text("150k Task Rewards 970 (+" + Comma(Result["7"]) + ") Points");
	$("#Cost-Guild-UpgradePointBoost .content-return .return.eight").text("200k Task Rewards 1200 (+" + Comma(Result["8"]) + ") Points");
	$("#Cost-Guild-UpgradePointBoost .content-return .return").show();
}

function ReturnError(i,t) {
	$(i + " .content-return .return").hide();
	$(i + " .content-return .return").text('');
	$(i + " .content-return .return-error").text(t);
	$(i + " .content-return .return-error").show();
	$(i + " .content-return").show();
	return false
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function Comma(x) {
    var t = x.toString().split(".");
    t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return t.join(".");
}

function unDo(n) {
	n = String(n)
	n = n.replace(/,/g,'')
	n = n.replace(/%/g,'')
	return n
}

function isNotWhole(value) {
  if (value % 1 === 0) {
    return false
  } else {
    return true
  }
}