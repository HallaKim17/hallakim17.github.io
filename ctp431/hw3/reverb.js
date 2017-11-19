var Reverb = function(context, parameters) {

	this.context = context;
	this.input = context.createGain();
	this.reverbNode = context.createBufferSource();
	this.dryGain = context.createGain();
	this.wetGain = context.createGain();
	this.convolver = context.createConvolver();
	this.parameters = parameters;

	this.wetGain.gain.value = parameters.reverbWetDry;
	this.dryGain.gain.value = (1-parameters.reverbWetDry);

	var impulseResponse = 'minster1_000_ortf_48k.wav'

	this.loadImpulseResponse(this.convolver, impulseResponse);

	this.input.connect(this.convolver);
	this.input.connect(this.dryGain);

	this.convolver.connect(this.wetGain);
	this.wetGain.connect(this.context.destination);
	this.dryGain.connect(this.context.destination);
	this.input.connect(this.context.destination);


}	
	

Reverb.prototype.loadImpulseResponse = function(convolverNode, impulseResponse) {
	console.log('loading IF file..');

	var context = this.context;

	var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open('GET', impulseResponse, true);
    ajaxRequest.responseType = 'arraybuffer';
    	
    ajaxRequest.onload = function() {
    	context.decodeAudioData(this.response, function(buffer) {
    		convolverNode.buffer = buffer;
    	});
    }

    ajaxRequest.send();

}



Reverb.prototype.updateParams = function (params, value) {

	switch (params) {
		case 'reverb_dry_wet': 
			this.parameters.reverbWetDry = value;
			this.wetGain.gain.value = value;
			this.dryGain.gain.value = 1 - value;
			break;			
	}
}