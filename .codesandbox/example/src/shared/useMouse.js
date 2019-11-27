import {
  useCallback,
  useInitialState,
  useEffect,
} from "ganic-usex";

const useMouse = () => {
  const [position, setPosition] = useInitialState({clientX: 0, clientY: 0});
  const mouseTracker = useCallback(
    ({clientX, clientY}) => setPosition({clientX: clientX + 1, clientY: clientY + 1})
  );
  useEffect(() => {
    document.addEventListener('mousemove', mouseTracker);
    document.addEventListener('touchend', mouseTracker, {passive: true});
    return () => {
      document.removeEventListener('mousemove', mouseTracker);
      document.removeEventListener('touchend', mouseTracker);
    }
  });
  return position;
}

export default useMouse;
