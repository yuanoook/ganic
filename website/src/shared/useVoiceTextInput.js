import Ganic from 'ganic';
import {
  useMemo,
  useState,
} from 'ganic-usex';

const langs = [
  ['English', ['en-US', 'United States']],
  ['中文', ['cmn-Hans-CN', '普通话 (中国大陆)'], ['yue-Hant-HK', '粵語 (香港)']],
];

const linebreak = s => s.replace(/\n\n/g, '<p></p>').replace(/\n/g, '<br>');

const setupRecognition = ({lang, setState}) => {
  let final = '';
  let recognizing = false;
  let ignore_onend;
  let start_timestamp;

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    recognizing = true;
    setState(s => ({
      ...s,
      info: 'speak_now',
      recognizing,
    }));
  };

  recognition.onerror = function(event) {
    console.log(event);
    ignore_onend = true;
    if (event.error == 'not-allowed') {
      setState(s => ({
        ...s,
        error: Date.now() - start_timestamp < 100 ? 'blocked' : 'denied',
      }));
    }
    if (event.error == 'no-speech') {
      setState(s => ({
        ...s,
        error: 'no_speech',
      }));
    }
    if (event.error == 'audio-capture') {
      setState(s => ({
        ...s,
        error: 'no_microphone',
      }));
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      setState(s => ({
        ...s,
        recognizing: false,
      }));
      return;
    }
    if (!final) {
      setState(s => ({
        ...s,
        info: 'start',
        recognizing: false,
      }));
      return;
    }
    setState(s => ({
      ...s,
      info: '',
      recognizing: false,
    }));
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
    if (final || interim) {
      setState(s => ({
        ...s,
        final,
        interim,
      }));
    }
  };

  const toggle = () => {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final = '';
    recognition.lang = lang;
    recognition.start();
    ignore_onend = false;
    setState(s => ({
      ...s,
      final,
      info: 'start',
    }));
    start_timestamp = Date.now();
  };

  return toggle;
};

const useVoiceTextInput = (lang = 'en-US') => {
  // ./images/mic.gif';
  // ./images/mic-animate.gif';

  const [{
    final = '',
    interim = '',
    info = '',
    error = false,
    recognizing = false,
  }, setState] = useState({
    final: '',
    interim: '',
    info: '',
    error: false,
    recognizing: false,
  });

  const toggle = useMemo(setupRecognition, {
    lang,
    setState,
  });

  const ui = <div>
    <img
      src={`./images/mic${ recognizing ? '-animate' : '' }.gif`}
      onClick={toggle}
      alt='click and say something!'
      title='click and say something!'
    />
    { error && <><span style='color: red;'>{ error }</span><br/></> }
    { info && <><span style='color: blue;'>{ info }</span><br/></> }
    <br/>
    { linebreak(interim) }
    <br/>
    { linebreak(final) }
  </div>;

  return [final, ui];
};

export default useVoiceTextInput;
