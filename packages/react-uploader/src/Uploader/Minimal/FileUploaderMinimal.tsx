import React, { type FC, useMemo } from "react";
import * as UC from "@uploadcare/file-uploader";
import "@uploadcare/file-uploader/web/uc-file-uploader-minimal.min.css";
import { customElementToReactComponent } from "@uploadcare/react-adapter";
import { AdapterConfig } from "../core/AdapterConfig";
import { AdapterUploadCtxProvider } from "../core/AdapterUploadCtxProvider";
import type { TProps } from "../types";
import { getCalcPropertyOfProps } from "../../utils/getCalcPropertyOfProps";
import { getUserAgentIntegration } from "../../utils/getUserAgentIntegration";
import {
  ConditionalSuspense,
  useIsBrowser,
} from "../../SSR/ConditionalSuspense";

UC.defineComponents(UC);

const AdapterFileUploaderMinimal = customElementToReactComponent({
  react: React,
  tag: "uc-file-uploader-minimal",
  elClass: UC.FileUploaderMinimal,
});

export const FileUploaderMinimal: FC<TProps<"Minimal">> = ({
  ctxName,
  className,
  classNameUploader,
  apiRef,
  fallback,
  ...props
}) => {
  const CTX_NAME = useMemo(() => ctxName ?? UC.UID.generate(), [ctxName]);

  const { eventHandlers, config } = useMemo(
    () => getCalcPropertyOfProps<"Minimal">(props),
    [props],
  );

  const isBrowser = useIsBrowser();

  return (
    <ConditionalSuspense condition={isBrowser} fallback={fallback}>
      <div className={className}>
        {/* @ts-ignore */}
        <AdapterConfig userAgentIntegration={getUserAgentIntegration()} ctx-name={CTX_NAME} {...config} />
        {/* @ts-ignore */}
        <AdapterUploadCtxProvider
          ref={apiRef}
          ctx-name={CTX_NAME}
          {...eventHandlers}
        />
        {/* @ts-ignore */}
        <AdapterFileUploaderMinimal class={classNameUploader} ctx-name={CTX_NAME} />
      </div>
    </ConditionalSuspense>
  );
};
