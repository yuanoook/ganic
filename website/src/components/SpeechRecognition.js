import Ganic from 'ganic';
import {
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'ganic-usex';

const emptyFn = () => {};

const useRecognition = ({
  lang = 'en-US',
  onStart = emptyFn,
  onFinal = emptyFn,
  onInterim = emptyFn,
  onError = emptyFn,
}) => {
  const ref = useRef();
  ref.lang = lang;
  ref.onStart = onStart;
  ref.onFinal = onFinal;
  ref.onInterim = onInterim;
  ref.onError = onError;

  const [recognizing, setRecognizing] = useState(false);
  const toggle = useMemo(() => {
    let recognizing = false;
    let final = '';
    let ignore_onend;
    let start_timestamp;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
  
    recognition.onstart = function() {
      setRecognizing(recognizing = true);
      ref.onStart(recognition);
    };
    recognition.onerror = function(event) {
      ignore_onend = true;
      ref.onError({
        'not-allowed': Date.now() - start_timestamp < 100 ? 'blocked' : 'denied',
        'no-speech': 'no_speech',
        'audio-capture': 'no_microphone',
        'network': 'no_network',
      }[event.error] || event.error);
    };
    recognition.onend = function() {
      setRecognizing(recognizing = false);
      if (ignore_onend) {
        return;
      }
      if (!final) {
        return;
      }
    };
    recognition.onresult = function(event) {
      let interim = '';
      if (typeof event.results === 'undefined') {
        recognition.onend = null;
        recognition.stop();
        return;
      }
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      ref.onFinal(final);
      ref.onInterim(interim);
    };

    const turnOn = () => {
      final = '';
      recognition.lang = ref.lang;
      recognition.start();
      ignore_onend = false;
      start_timestamp = Date.now();
    };

    const turnOff = () => {
      recognition.stop();
    };

    return on => {
      if (on === recognizing) {
        return;
      }
      on ? turnOn() : turnOff();
    };
  });

  return [recognizing, toggle];
};

const SpeechRecognition = props => {
  const {
    lang,
    on,
    onStart,
    onFinal,
    onInterim,
    onError,
    style: styleProp,
    ...otherProps
  } = props || {};

  const [recognizing, toggle] = useRecognition({
    lang,
    onStart,
    onFinal,
    onInterim,
    onError,
  });

  useEffect(toggle, on);

  const style = {
    cursor: 'pointer',
    pointerEvents: (recognizing && !on) ? 'none' : 'initial',
    borderRadius: recognizing ? '25%' : '100%',
    transition: 'border-radius .6s',
    transitionTimingFunction: 'ease',
    ...styleProp,
  };

  return <img
    src={`./images/mic${ on ? '-animate' : '' }.gif`}
    alt='Click and say something!'
    title='Click and say something!'
    style={style}
    {...otherProps}
  />;
};

export default SpeechRecognition;
