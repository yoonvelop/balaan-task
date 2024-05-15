type ScriptLoadCallback = () => void;
export const loadScript = (
  scriptId: string,
  url: string,
  callback: ScriptLoadCallback,
): void => {
  const existingScript = document.getElementById(scriptId) as HTMLScriptElement;
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = url;
    script.id = scriptId;
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  } else if (callback) {
    callback();
  }
};
