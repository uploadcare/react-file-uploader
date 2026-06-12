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

const AdapterFileUploaderInline = createComponent({
  react: React,
  tagName: "uc-file-uploader-inline",
  elementClass: UC.FileUploaderMinimal,
});

export const FileUploaderInline: FC<TProps<"Inline">> = ({
  ctxName,
  className,
  classNameUploader,
  configRef,
  apiRef,
  fallback,
  ...props
}) => {
  const CTX_NAME = useMemo(() => ctxName ?? UC.UID.generateRandomUUID(), [ctxName]);

  const { eventHandlers, config } = getCalcPropertyOfProps<"Inline">(props);

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
        <AdapterFileUploaderInline className={classNameUploader} ctx-name={CTX_NAME} />
      </div>
    </ConditionalSuspense>
  );
};
