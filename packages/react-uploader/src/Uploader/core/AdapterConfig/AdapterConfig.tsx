import * as UC from "@uploadcare/file-uploader";
import { createComponent } from "@lit/react";
import React from "react";

export const AdapterConfig = createComponent({
  react: React,
  tagName: "uc-config",
  elementClass: UC.Config,
});
