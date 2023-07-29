import { useControls } from "leva";
import {
  FolderSettings,
  Schema,
  StoreType,
} from "leva/dist/declarations/src/types";
import { useCallback, useMemo, useState } from "react";
declare type SchemaOrFn<S extends Schema = Schema> = S | (() => S);
declare type HookSettings = {
  store?: StoreType;
};
export function useDevControls<
  S extends Schema,
  F extends SchemaOrFn<S> | string,
  G extends SchemaOrFn<S>
>(
  schemaOrFolderName: F,
  settingsOrDepsOrSchema?: HookSettings | React.DependencyList | G,
  depsOrSettingsOrFolderSettings?:
    | React.DependencyList
    | HookSettings
    | FolderSettings,
  depsOrSettings?: React.DependencyList | HookSettings,
  depsOrUndefined?: React.DependencyList
) {
  if (!process.env.NEXT_PUBLIC_HIDE_LEVA) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useControls(schemaOrFolderName, settingsOrDepsOrSchema);
  }
  // TODO: exclude leva from production build
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useControls(schemaOrFolderName, settingsOrDepsOrSchema);
}
