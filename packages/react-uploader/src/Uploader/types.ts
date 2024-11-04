import type { Ref } from "react";
import type {
  ConfigType,
  UploadCtxProvider,
  EventMap,
} from "@uploadcare/file-uploader";
import type { TProps as TPropsConditionalSuspense } from "../SSR/ConditionalSuspense";

type TToCamelCase<S extends string> = S extends `${infer Head}-${infer Tail}`
  ? `${Lowercase<Head>}${Capitalize<TToCamelCase<Tail>>}`
  : Lowercase<S>;

type TExtraPrefixOn<S extends string> = `on${Capitalize<S>}`;

type TPrefixOnAndCamelCase<S extends string> = TExtraPrefixOn<TToCamelCase<S>>;


export type FileUploaderModes = 'Regular' | 'Minimal' | 'Inline'

type CommonProps = {
  /**
   * The class name for wrapper over uploader
   */
  className?: string;

  /**
   * The class name for uploader
   */
  classNameUploader?: string;

  /**
   * The unique ID
   */
  ctxName?: string;
};

type FileUploaderRegularProps = {
  /**
   * The prop controls the button's visibility in regular mode.
   */
  headless?: boolean;
};

type FileUploaderMinimalProps = {};

type FileUploaderInlineProps = {};

type UploadCtxPropviderProps = {
  apiRef?: Ref<InstanceType<UploadCtxProvider>>;
};

export type EventProps = Partial<TEventsSchema>;

export type ConfigProps = Partial<Omit<ConfigType, "pubkey">> & {
  pubkey: ConfigType["pubkey"];
};

export type TProps<T extends FileUploaderModes> = CommonProps &
  ConfigProps &
  EventProps &
  UploadCtxPropviderProps &
  Pick<TPropsConditionalSuspense, "fallback"> &
  (T extends "Regular"
    ? FileUploaderRegularProps
    : T extends "Minimal"
    ? FileUploaderMinimalProps
    : T extends "Inline"
    ? FileUploaderInlineProps
    : never);

export { UploadCtxProvider } from "@uploadcare/file-uploader";

export type TEventsSchema = {
  [K in keyof EventMap as TPrefixOnAndCamelCase<K>]: (
    event: EventMap[K]["detail"],
  ) => void;
};
