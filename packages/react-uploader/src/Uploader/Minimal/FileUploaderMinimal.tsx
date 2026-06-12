import * as UC from "@uploadcare/file-uploader";
import React, { type FC, useMemo } from "react";
import "@uploadcare/file-uploader/index.css";
import { createComponent } from "@lit/react";
import { ConditionalSuspense, useIsBrowser } from "../../SSR/ConditionalSuspense";
import { getCalcPropertyOfProps } from "../../utils/getCalcPropertyOfProps";
import { getUserAgentIntegration } from "../../utils/getUserAgentIntegration";
import { AdapterConfig } from "../core/AdapterConfig";
import { AdapterUploadCtxProvider } from "../core/AdapterUploadCtxProvider";
import type { TProps } from "../types";

UC.defineComponents(UC);

const AdapterFileUploaderMinimal = createComponent({
  react: React,
  tagName: "uc-file-uploader-minimal",
  elementClass: UC.FileUploaderMinimal,
});

export const FileUploaderMinimal: FC<TProps<"Minimal">> = ({
  ctxName,
  className,
  classNameUploader,
  apiRef,
  configRef,
  fallback,
  ...props
}) => {
  const CTX_NAME = useMemo(() => ctxName ?? UC.UID.generateRandomUUID(), [ctxName]);

  const { eventHandlers, config } = getCalcPropertyOfProps<"Minimal">(props);

  const isBrowser = useIsBrowser();

  return (
    <ConditionalSuspense condition={isBrowser} fallback={fallback}>
      <div className={className}>
        <AdapterConfig
          userAgentIntegration={getUserAgentIntegration()}
          ctx-name={CTX_NAME}
          ref={configRef}
          {...config}
        />
        <AdapterUploadCtxProvider ref={apiRef} ctx-name={CTX_NAME} {...eventHandlers} />
        <AdapterFileUploaderMinimal className={classNameUploader} ctx-name={CTX_NAME} />
      </div>
    </ConditionalSuspense>
  );
};
