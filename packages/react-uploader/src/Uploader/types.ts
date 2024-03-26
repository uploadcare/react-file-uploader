import React from "react";
import {
  type ConfigType,
  EventType,
  UploadCtxProvider,
} from "@uploadcare/blocks";

export type TEvents = typeof EventType;

type TToCamelCase<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Lowercase<Head>}${Capitalize<TToCamelCase<Tail>>}`
  : Lowercase<S>;

type TExtraPrefixOn<S extends string> = `on${Capitalize<S>}`;

type TPrefixOnAndCamelCase<S extends string> = TExtraPrefixOn<TToCamelCase<S>>;

export type TEventsSchema = {
  [K in keyof TEvents as TPrefixOnAndCamelCase<K>]: TEvents[K];
};

type TRefUploadCtxProvider = {
  refUploadCtxProvider?: React.Ref<InstanceType<UploadCtxProvider>>;
};

type TPropsWithEvents = Partial<TEventsSchema>;

type TPropsWithConfig = Partial<ConfigType>;

export type TProps = TRefUploadCtxProvider &
  TPropsWithEvents &
  TPropsWithConfig;
