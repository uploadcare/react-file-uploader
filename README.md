<p align="center">
  <a href="https://uploadcare.com/?ref=react-uploader">
    <picture>
      <source media="(prefers-color-scheme: light)" srcset="https://ucarecdn.com/1b4714cd-53be-447b-bbde-e061f1e5a22f/logosafespacetransparent.svg">
      <source media="(prefers-color-scheme: dark)" srcset="https://ucarecdn.com/3b610a0a-780c-4750-a8b4-3bf4a8c90389/logotransparentinverted.svg">
      <img width=250 alt="Uploadcare logo" src="https://ucarecdn.com/1b4714cd-53be-447b-bbde-e061f1e5a22f/logosafespacetransparent.svg">
    </picture>
  </a>
</p>
<p align="center">
  <a href="https://uploadcare.com/?ref=react-uploader">Website</a> •
  <a href="https://uploadcare.com/docs/file-uploader?ref=react-uploader">Docs</a> • 
  <a href="https://uploadcare.com/blog?ref=react-uploader">Blog</a> • 
  <a href="https://discord.gg/mKWRgRsVz8?ref=react-uploader">Discord</a> •
  <a href="https://twitter.com/Uploadcare?ref=react-uploader">Twitter</a>
</p>

# Uploadcare React Uploader

[![NPM version][npm-img]][npm-url]
[![Build Status][badge-build]][build-url]
[![GitHub release][badge-release-img]][badge-release-url]
[![Uploadcare stack on StackShare][badge-stack-img]][badge-stack-url]

Welcome to the Uploadcare React Uploader documentation!
This documentation provides guidance on how to use the Uploadcare React Uploader in your projects, along with details
about its features, installation process, usage examples, customization options, event handling, and security
considerations.

<img alt="Uploadcare File Uploader examples" src="https://ucarecdn.com/916a1054-ca44-4c4a-9f7b-99fa499043d9/-/preview/">


## Quick start
### From NPM:
1. Install the package: `npm install @uploadcare/react-uploader`
2. Connect React Uploader from your script file:
```jsx
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

<FileUploaderRegular pubkey="YOUR_PUBLIC_KEY"/>;
```

## Props
An easy way to connect React Uploader to your project and utilize the available API props.
We provide a full set of props that are used in File Uploader. For review we suggest you to look at the [documentation][uc-docs-file-uploader-options].

## File Uploader API

For convenience, we provide the ability to access the File Uploader API using `apiRef`.
You can see what methods are available in `apiRef` in the [documentation][uc-docs-file-uploader-api].
It is important to note that you need to use `InstanceType` utility type to define `apiRef` type.

```jsx
import React, {useRef, useEffect} from "react";
import {
    FileUploaderRegular,
    UploadCtxProvider
} from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

const Example = () => {
    const uploaderRef = useRef <InstanceType<UploadCtxProvider> | null>(null);

    <FileUploaderRegular apiRef={uploaderRef} pubkey="YOUR_PUBLIC_KEY"/>;
}
```

## Events
Events in React Uploader are the same as in File Uploader, see the [documentation][uc-docs-events].
The principle of converting events from blocks to React Uploader:

1. All events in React Uploader start with `on`.
2. All events in React Uploader in `camelCase`.

```jsx
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

<FileUploaderRegular
    pubkey="YOUR_PUBLIC_KEY"
    onModalOpen={() => {
        console.log('modal-open')
    }}
/>
```


## Styles
You can customize the appearance of the React Uploader by using the `className` prop, which lets you apply custom CSS classes to the `FileUploader` wrapper, including the `Regular`, `Minimal`, and `Inline` variations.

```jsx
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

<FileUploaderRegular className="fileUploaderWrapper" pubkey="YOUR_PUBLIC_KEY"/>;
```

```css
.fileUploaderWrapper uc-file-uploader-regular {
}
```

## Next.js
File Uploader does not support Server-side Rendering (SSR), we have a special import for nextjs that already has SSR disabled. 
You will need to import with import `@uploadcare/react-uploader/next`

```jsx
'use client'
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";

function App() {
    return <FileUploaderRegular pubkey="YOUR_PUBLIC_KEY" />
};
```

## Security issues

If you think you ran into something in Uploadcare libraries that might have
security implications, please hit us up at
[bugbounty@uploadcare.com][uc-email-bounty] or Hackerone.

We'll contact you personally in a short time to fix an issue through co-op and
prior to any public disclosure.

## Feedback

Issues and PRs are welcome. You can provide your feedback or drop us a support
request at [hello@uploadcare.com][uc-email-hello].

[uc-email-bounty]: mailto:bugbounty@uploadcare.com
[uc-email-hello]: mailto:hello@uploadcare.com
[github-releases]: https://github.com/uploadcare/react-uploader/releases
[github-branch-release]: https://github.com/uploadcare/react-uploader/tree/release
[github-contributors]: https://github.com/uploadcare/react-uploader/graphs/contributors
[badge-stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[badge-stack-url]: https://stackshare.io/uploadcare/stacks/
[badge-release-img]: https://img.shields.io/github/release/uploadcare/react-components.svg
[badge-release-url]: https://github.com/uploadcare/react-uploader/releases
[npm-img]: http://img.shields.io/npm/v/@uploadcare/react-uploader.svg
[npm-url]: https://www.npmjs.com/package/@uploadcare/react-uploader
[badge-build]: https://github.com/uploadcare/react-uploader/actions/workflows/checks.yml/badge.svg
[build-url]: https://github.com/uploadcare/react-uploader/actions/workflows/checks.yml

[uc-docs-events]: https://uploadcare.com/docs/file-uploader/events/
[uc-docs-file-uploader-api]: https://uploadcare.com/docs/file-uploader/api
[uc-docs-file-uploader-options]: https://uploadcare.com/docs/file-uploader/options/