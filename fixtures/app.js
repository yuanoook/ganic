(() => {
  const { useOrgan } = GanicUseX;
  const {
    Counter,
    LazyUpdate,
    useSuperLongList,
  } = window.studio;

  const App = () => {
    const [count, counterUI] = useOrgan(Counter);
    const list = useSuperLongList(count, 500, 125);
    const lazyUpdateUI = useOrgan(LazyUpdate, count);

    return [
      list,
      counterUI,
      lazyUpdateUI
    ];
  };

  GanicDOM.render(
    { organism: App },
    document.getElementById("app"),
    GanicDomAir,
  );
})();
