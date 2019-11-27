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
    document.addEventListener('touchstart', mouseTracker);
    return () => {
      document.removeEventListener('mousemove', mouseTracker);
      document.removeEventListener('touchstart', mouseTracker);
    }
  });
  return position;
}

export default useMouse;
