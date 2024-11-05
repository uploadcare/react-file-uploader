import React, { type FC, useMemo } from "react";
import * as UC from "@uploadcare/file-uploader";
import "@uploadcare/file-uploader/web/uc-file-uploader-regular.min.css";
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

  const { eventHandlers, config, uploader } = useMemo(
    () => getCalcPropertyOfProps<"Regular">(props),
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
        <AdapterFileUploaderRegular class={classNameUploader} ctx-name={CTX_NAME} {...uploader} />
      </div>
    </ConditionalSuspense>
  );
};
