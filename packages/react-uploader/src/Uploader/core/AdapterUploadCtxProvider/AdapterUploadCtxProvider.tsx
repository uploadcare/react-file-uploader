import { createComponent } from "@lit/react";
import * as UC from "@uploadcare/file-uploader";
import React from "react";

type KebabToPascal<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Capitalize<Head>}${KebabToPascal<Tail>}`
  : Capitalize<S>;

type ToOnEvent<S extends string> = `on${KebabToPascal<S>}`;

function toOnEventName<S extends string>(input: S): ToOnEvent<S> {
  return ("on" +
    input
      .split("-")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")) as ToOnEvent<S>;
}

type EventValue = (typeof UC.UploadCtxProvider.EventType)[keyof typeof UC.UploadCtxProvider.EventType];

export const AdapterUploadCtxProvider = createComponent({
  react: React,
  tagName: "uc-upload-ctx-provider",
  elementClass: UC.UploadCtxProvider,
  events: Object.values(UC.UploadCtxProvider.EventType).reduce(
    (acc, eventName) => {
      const name = toOnEventName(eventName);
      acc[name] = eventName;
      return acc;
    },
    {} as Record<ToOnEvent<EventValue>, EventValue>,
  ),
});
