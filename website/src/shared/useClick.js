import {
  useCallback,
  useState,
  useEffect,
} from 'ganic-usex';

const useClick = () => {
  const [position, setPosition] = useState({clientX: 0, clientY: 0});
  const mouseTracker = useCallback(
    ({clientX, clientY}) => setPosition({clientX: clientX + 1, clientY: clientY + 1}),
  );
  useEffect(() => {
    document.addEventListener('click', mouseTracker);
    document.addEventListener('touchend', mouseTracker, {passive: true});
    return () => {
      document.removeEventListener('click', mouseTracker);
      document.removeEventListener('touchend', mouseTracker);
    };
  });
  return position;
};

export default useClick;
