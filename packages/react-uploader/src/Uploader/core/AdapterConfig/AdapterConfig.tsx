import * as UC from "@uploadcare/file-uploader";
import { customElementToReactComponent } from "@uploadcare/react-adapter";
import React from "react";

export const AdapterConfig = customElementToReactComponent({
  react: React,
  tag: "uc-config",
  elClass: UC.Config,
});
