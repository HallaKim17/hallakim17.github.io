var Delay = function(context, reverbOutput, parameters) {

	this.context = context;
	this.parameters = parameters;

	// create nodes
	this.input = context.createGain();
	this.delayLine = context.createDelay();
	this.feedbackGain = context.createGain();
	this.wetGain = context.createGain(); 
	this.dryGain = context.createGain();

	// connect 
	this.input.connect(this.delayLine);
	this.delayLine.connect(this.feedbackGain);
	this.feedbackGain.connect(this.wetGain);
	this.feedbackGain.connect(this.delayLine);

	this.input.connect(this.dryGain);
	
	this.dryGain.connect(reverbOutput);
	this.wetGain.connect(reverbOutput);

	this.delayLine.delayTime.value = parameters.delayTime;
	this.feedbackGain.gain.value = parameters.delayFeedbackGain;

	this.wetGain.gain.value = parameters.delayWetDry;
	this.dryGain.gain.value = (1-parameters.delayWetDry);

}


Delay.prototype.updateParams = function (params, value) {

	switch (params) {
		case 'delay_time': 
			this.parameters.delayTime = value;
			this.delayLine.delayTime.value = value;
			break;		
		case 'delay_feedback_gain': 
			this.parameters.delayFeedbackGain = value;
			this.feedbackGain.gain.value = value;
			break;		
		case 'delay_dry_wet':
			this.parameters.delayWetDry = value;
			this.wetGain.gain.value = value;
			this.dryGain.gain.value = 1 - value;
			break;		
	}
}





