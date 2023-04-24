//
// f_Symbolize_AddFrames
//


var doc=fl.getDocumentDOM();
var tl = fl.getDocumentDOM().getTimeline();
var cl = tl.currentLayer;
var cFrame=tl.currentFrame;
var totalFrames=tl.frameCount-1;
	


function coso() {
	//*THIS IS FROM THE SYMBOLIZER THING//A little help from Symbolizer v_2
	sel = fl.getDocumentDOM().selection;
	itemScene = new Array();
	
	res = prompt("Name");
	if(res == null) { return; }
	
	//for(i in sel){
	//	if( sel[i].elementType == "shape" || sel[i].isGroup ) itemScene.push(sel[i]);
	//}
	
	//for(i in itemScene){
	//	fl.getDocumentDOM().selectNone();
	//	fl.getDocumentDOM().selection = [itemScene[i]];
		
	//	if(!fl.getDocumentDOM().selection.length) continue;
		//Name Stuff
		name = res;
		
		ok = false;
		while(!ok){
			if(fl.getDocumentDOM().library.itemExists(name)){
				pos = name.lastIndexOf("_");
				if(pos==-1 || !parseInt(name.substring(pos+1,10000))){
					name += "_1";
				}else{
					name = name.substring(0,pos+1)+(parseInt(name.substring(pos+1,10000))+1);
				}
			}else ok = true;
		}
		

		//Convert it to Symbol, Graphic, and Play once
		//fl.getDocumentDOM().breakApart();
		var newGraphic = fl.getDocumentDOM().convertToSymbol('graphic', name, 'center');
		if(newGraphic)
		{
			fl.getDocumentDOM().setElementProperty('loop', 'play once');
		}
		
		var lib = fl.getDocumentDOM().library;
		if (lib.getItemProperty('linkageImportForRS') == true) {
			lib.setItemProperty('linkageImportForRS', false);
		}
		else {
			lib.setItemProperty('linkageExportForAS', false);
			lib.setItemProperty('linkageExportForRS', false);
		}
		lib.setItemProperty('scalingGrid',  false);
	//}
		
		var theNewSymbol=fl.getDocumentDOM().getTimeline();
		//Enter Edit Mode
		fl.getDocumentDOM().enterEditMode('inPlace');

		//Add same amount of frames as parent layer
		fl.getDocumentDOM().getTimeline().insertFrames(totalFrames)
		//Exit edit mode
		fl.getDocumentDOM().exitEditMode()
	
		
}

coso();



//


an.getDocumentDOM().enterEditMode('inPlace');



an.getDocumentDOM().selectAll();


an.getDocumentDOM().distributeToLayers();



var dom = an.getDocumentDOM();
var tl = dom.getTimeline();
var layer = tl.layers[ tl.currentLayer ];

var myFilter = {
	"name": "adjustColorFilter",
	"enabled": true,
};


// In order to keep the filters already applied to the frame,
// first we get the existing filters array.
var filters = layer.getFiltersAtFrame( tl.currentFrame ) || [];

// Put the new filter to the array
filters.push( myFilter );

// And apply modified array back to the frame
layer.setFiltersAtFrame( tl.currentFrame, filters );

// Set the blend mode
layer.setBlendModeAtFrame( tl.currentFrame, "Erase" );


an.getDocumentDOM().exitEditMode();
 

var dom = an.getDocumentDOM();
var tl = dom.getTimeline();
var layer = tl.layers[ tl.currentLayer ];


// Set the blend mode
layer.setBlendModeAtFrame( tl.currentFrame, "Layer" );
