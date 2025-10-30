import * as UC from "@uploadcare/file-uploader";
import React, { type FC, useMemo } from "react";
import "@uploadcare/file-uploader/index.css";
import { customElementToReactComponent } from "@uploadcare/react-adapter";
import {
  ConditionalSuspense,
  useIsBrowser,
} from "../../SSR/ConditionalSuspense";
import { getCalcPropertyOfProps } from "../../utils/getCalcPropertyOfProps";
import { getUserAgentIntegration } from "../../utils/getUserAgentIntegration";
import { AdapterConfig } from "../core/AdapterConfig";
import { AdapterUploadCtxProvider } from "../core/AdapterUploadCtxProvider";
import type { TProps } from "../types";

UC.defineComponents(UC);

const AdapterFileUploaderRegular = customElementToReactComponent({
  react: React,
  tag: "uc-file-uploader-regular",
  elClass: UC.FileUploaderRegular,
});

export const FileUploaderRegular: FC<TProps<"Regular">> = ({
  ctxName,
  className,
  classNameUploader,
  apiRef,
  fallback,
  ...props
}) => {
  const CTX_NAME = useMemo(() => ctxName ?? UC.UID.generate(), [ctxName]);

  const { eventHandlers, config, uploader } =
    getCalcPropertyOfProps<"Regular">(props);

  const isBrowser = useIsBrowser();

  return (
    <ConditionalSuspense condition={isBrowser} fallback={fallback}>
      <div className={className}>
        <AdapterConfig
          // @ts-expect-error
          userAgentIntegration={getUserAgentIntegration()}
          ctx-name={CTX_NAME}
          {...config}
        />
        {/* @ts-ignore */}
        <AdapterUploadCtxProvider
          ref={apiRef}
          ctx-name={CTX_NAME}
          {...eventHandlers}
        />
        <AdapterFileUploaderRegular
          // @ts-expect-error
          class={classNameUploader}
          ctx-name={CTX_NAME}
          {...uploader}
        />
      </div>
    </ConditionalSuspense>
  );
};
