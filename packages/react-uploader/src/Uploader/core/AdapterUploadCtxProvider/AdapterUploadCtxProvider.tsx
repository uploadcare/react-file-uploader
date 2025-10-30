import * as UC from "@uploadcare/file-uploader";
import { customElementToReactComponent } from "@uploadcare/react-adapter";
import React from "react";

export const AdapterUploadCtxProvider = customElementToReactComponent({
  react: React,
  tag: "uc-upload-ctx-provider",
  elClass: UC.UploadCtxProvider,
  schemaEvents: UC.UploadCtxProvider.EventType,
});
