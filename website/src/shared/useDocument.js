import { useState } from 'ganic-usex';
import useGlobalInterval from './useGlobalInterval';

const getDocumentElementCount = () => document.querySelectorAll('*').length;

const getDocInfo = () => ({
  count: getDocumentElementCount()
});

const initDocInfo = getDocInfo()
const useDocument = () => {
  const [docInfo, setDocInfo] = useState(initDocInfo);
  useGlobalInterval(() => setDocInfo(getDocInfo()), 100);
  return docInfo;
};

export default useDocument;
