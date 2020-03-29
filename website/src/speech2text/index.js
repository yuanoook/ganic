// https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API

import Ganic from 'ganic';
import { useState, useMemo } from 'ganic-usex';
import { useStorage } from 'ganic-pandora';
import SpeechRecognition from '../components/SpeechRecognition';

const langs = {
  'en-US': 'English (US)',
  'cmn-Hans-CN': '普通话 (中国大陆)',
  'yue-Hant-HK': '粵語 (香港)',
  'cmn-Hant-TW': '中文 (台灣)',
};

const langOptions = Object.keys(langs).map(key => ({
  value: key,
  text: langs[key],
}));

const Option = ({value, text, select}) => (
  <option
    selected={value === select}
    value={value}>
    { text }
  </option>
);

const useSelect = options => {
  const [select, setSelect] = useStorage('ganic_codesandbox__speech2text_lang_select', options[0].value);
  const optionsUI = useMemo(opts => opts.map(
    option => <Option value={option.value} text={option.text} key={option.value} select={select} />,
  ), options);

  const selectUI = useMemo(set => (
    <select
      style={{fontSize: '20px', marginTop: '-40px'}}
      onChange={e => set(e.target.value)}
    >
      { optionsUI }
    </select>
  ), setSelect);
  return [select, selectUI];
};

const Speech2Text = () => {
  const [lang, langSelectUI] = useSelect(langOptions);
  const [on, setOn] = useState(false);
  const [final, onFinal] = useState('');
  const [interim, onInterim] = useState('');
  const [error, onError] = useState('');
  const SRProps = {
    lang,
    on,
    onClick: () => setOn(o => !o),
    style: {
      margin: '100px',
      maxWidth: '100px',
    },
    onFinal: onFinal,
    onInterim: onInterim,
    onError: onError,
  };

  return <>
    {langSelectUI}
    <SpeechRecognition {...SRProps}/>
    <br/>
    { final } { interim }
    <br/>
    <span style={{
      color: 'red',
    }}>{ error }</span>
  </>;
};

export default Speech2Text;
