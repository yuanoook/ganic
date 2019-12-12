import {
  useMemo,
  useState,
  useEffect,
} from 'ganic-usex';
import { useCallback } from 'ganic-usex/cjs/ganic-usex.production.min';

const langs = [
  ['English', ['en-US', 'United States']],
  ['中文', ['cmn-Hans-CN', '普通话 (中国大陆)'], ['yue-Hant-HK', '粵語 (香港)']],
];

const showInfo = info => {};
showInfo('info_start');

const linebreak = s => s.replace(/\n\n/g, '<p></p>').replace(/\n/g, '<br>');

const setupRecognition = ({lang, setState}) => {
  let final_transcript = '';
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
    ignore_onend = true;
    if (event.error === 'not-allowed') {
      setState(s => ({
        ...s,
        info: Date.now() - start_timestamp < 100 ? 'blocked' : 'denied',
      }));
    }
    if (event.error === 'no-speech') {
      setState(s => ({
        ...s,
        info: 'no_speech',
      }));
    }
    if (event.error === 'audio-capture') {
      setState(s => ({
        ...s,
        info: 'no_microphone',
      }));
    }
  };

  recognition.onend = function() {
    recognizing = false;
    if (ignore_onend) {
      return;
    }
    if (!final_transcript) {
      setState(s => ({
        ...s,
        info: 'start',
      }));
      return;
    }
    setState(s => ({
      ...s,
      info: '',
    }));
  };
  recognition.onresult = function(event) {
    let interim_transcript = '';
    if (typeof event.results === 'undefined') {
      recognition.onend = null;
      recognition.stop();
      return;
    }
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    if (final_transcript || interim_transcript) {
      setState(s => ({
        ...s,
        final: final_transcript,
        interim: interim_transcript,
      }));
    }
  };

  const toggle = () => {
    if (recognizing) {
      recognition.stop();
      return;
    }
    final_transcript = '';
    recognition.lang = lang;
    recognition.start();
    ignore_onend = false;
    setState(s => ({
      ...s,
      info: 'allow',
    }));
    start_timestamp = Date.now();
  };

  return toggle;
};

const useVoiceTextInput = (lang = 'en-US') => {
  // '/intl/en/chrome/assets/common/images/content/mic.gif';
  // '/intl/en/chrome/assets/common/images/content/mic-animate.gif';

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

  return [final, toggle];
};

export default useVoiceTextInput;
