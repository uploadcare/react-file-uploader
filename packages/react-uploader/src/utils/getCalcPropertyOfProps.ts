import type { FileUploaderModesKeys, TProps } from "../Uploader/types";

export const getCalcPropertyOfProps = <T extends FileUploaderModesKeys>(props: TProps<T>) => {
  const eventHandlers: Record<string, unknown> = {};
  const config: Record<string, unknown> = {};
  const uploader: Record<string, unknown> = {};

  for (const [prop, value] of Object.entries(props)) {
    if (prop.startsWith("on")) {
      eventHandlers[prop] = value;
      continue;
    }

    if (prop === "headless") {
      uploader[prop] = value;
      continue;
    }

    config[prop] = value;
  }

  return {
    eventHandlers,
    uploader,
    config,
  };
};
