(function() {
  var sequenceElement = document.getElementById("sequence1");
  if (sequenceElement == null) {
    return;
  }

  var options = {
    animateCanvas: false,
    keyNavigation: true,
    fadeStepWhenSkipped: false,
    reverseWhenNavigatingBackwards: true,
    nextButton: '#sequence1 .seq-prev',
    prevButton: '#sequence1 .seq-next',
    preloader: '#sequence1 .seq-preloader',
    // reverseTimingFunctionWhenNavigatingBackwards: true,
  }

  var mySequence = sequence(sequenceElement, options);
})();
