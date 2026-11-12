import type * as UC from "@uploadcare/file-uploader";
import React, {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";

type Props = { "ctx-name": string } & Record<string, unknown>;

/**
 * `<uc-config>` with every prop set as a property. Not `@lit/react`: it sets a
 * prop as a property only if `UC.Config.prototype` has it, and plugin keys
 * (`aiEditor*`) are registered at runtime, so objects would reach the element
 * as `"[object Object]"` attributes. The uploader picks up a property set
 * before its plugin registers the key.
 */
export const AdapterConfig = forwardRef<UC.Config, Props>(
  ({ "ctx-name": ctxName, ...config }, ref) => {
    const node = useRef<UC.Config>(null);
    const prev = useRef<Record<string, unknown>>({});
    useImperativeHandle(ref, () => node.current as UC.Config);

    useLayoutEffect(() => {
      const el = node.current as unknown as Record<string, unknown>;
      for (const key in prev.current) if (!(key in config)) el[key] = undefined;
      for (const key in config)
        if (config[key] !== prev.current[key]) el[key] = config[key];
      prev.current = config;
    });

    return React.createElement("uc-config", { "ctx-name": ctxName, ref: node });
  },
);
