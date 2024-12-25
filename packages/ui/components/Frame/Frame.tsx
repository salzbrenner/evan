import { ReactNode, useState } from "react";
import { Draggable } from "../Draggable/Draggable";
import { getFrameState, toggleFrameOpen } from "../../store/store";

export type FrameProps = {
  SIZE?: string;
  id: string;
  sector?: number;
  children: ReactNode;
  absolute?: boolean;
  disabledClose?: boolean;
};

export function Frame({
  SIZE,
  id,
  sector,
  children,
  absolute,
  disabledClose,
}: FrameProps) {
  return (
    <div>
      <Draggable id={id} sector={sector} absolute={absolute}>
        {({ frameState }) => {
          if (frameState === undefined || frameState.isOpen) {
            return (
              <>
                <div className="w-full border border-b-0 rounded-t-md border-clr-text-primary bg-clr-ui-bg p-1">
                  <CloseButton id={id} disabled={disabledClose} />
                </div>
                <div
                  style={{
                    height: SIZE,
                    width: SIZE,
                  }}
                  className="overflow-hidden rounded-b-md"
                >
                  <div className="w-full h-full bg-clr-ui-bg border border-clr-text-primary rounded-b-md">
                    {children}
                  </div>
                </div>
              </>
            );
          }

          return null;
        }}
      </Draggable>
    </div>
  );
}

function CloseButton(props: { id: string; disabled?: boolean }) {
  const { id, disabled } = props;
  return (
    <button
      className={`w-3 h-3 bg-clr-text-primary rounded-full relative flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disable-animated-cursor`}
      onClick={() => {
        if (disabled) return;
        toggleFrameOpen(id, false);
      }}
      aria-label="Close frame"
      type="button"
      disabled={disabled}
    >
      <div className="w-[60%] h-[1px] bg-clr-ui-bg absolute rotate-45"></div>
      <div className="w-[60%] h-[1px] bg-clr-ui-bg absolute -rotate-45"></div>
    </button>
  );
}
