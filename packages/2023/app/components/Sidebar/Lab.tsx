"use client";
import { Text, Toggle } from "@evan/ui";
import { HideLeva, useCoordinateGraph } from "@evan/lab";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";

const Field = dynamic(() => import("@evan/lab/src/Field/Field"), {
  ssr: false,
});
const Blob = dynamic(() => import("@evan/lab/src/blob/index"), {
  ssr: false,
});

const ES_BLOB = "es_blob";

const initialChecked = localStorage.getItem(ES_BLOB);

export function Lab() {
  const [show, setShow] = useState(false);

  const { x, y } = useCoordinateGraph();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  const [animation] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      delay: 2000,

      config: {
        duration: 500,
      },
    }),
    []
  );

  const [checked, setChecked] = useState<boolean | undefined>(
    initialChecked ? JSON.parse(initialChecked) : true
  );
  const [showBlob, setShowBlob] = useState(checked);

  if (checked) {
    localStorage.setItem(ES_BLOB, "true");
  } else {
    localStorage.setItem(ES_BLOB, "false");
  }

  const animating = useRef(false);
  const onCheckedChange = useCallback(() => {
    if (animating.current) return;
    animating.current = true;
    setTimeout(() => {
      animating.current = false;
    }, 1000);
    if (checked) {
      setTimeout(() => {
        setShowBlob((hideBlob) => !hideBlob);
      }, 1000);
    } else {
      setShowBlob((hideBlob) => !hideBlob);
    }
    setChecked((checked) => !checked);
  }, [checked]);

  return (
    <div className="relative">
      <HideLeva />
      {show && (
        <animated.div className="flex" style={animation}>
          <div className="flex flex-col">
            <div
              style={{
                height: "218px",
                width: "218px",
                opacity: checked ? 1 : 0,
                transition: "opacity 300ms ease-out",
                transitionDelay: checked ? "300ms" : "0",
              }}
            >
              {showBlob && <Blob fov={30} />}
            </div>
            <div className="flex flex-grow items-center justify-between py-1 px-2 border-t border-clr-ui-accent">
              <Time />
              <Toggle
                label="hello"
                id="blob"
                srOnly
                size={"sm"}
                className="w-auto"
                onCheckedChange={onCheckedChange}
                checked={checked}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="relative"
              style={{ height: "218px", width: "218px" }}
            >
              <div className="flex justify-center absolute left-0 right-0 top-0 bottom-0 border-l border-clr-ui-accent">
                <div className="border-r border-clr-gray-85 dark:border-clr-gray-16"></div>
                <div className="border-r rotate-90 border-clr-gray-85 dark:border-clr-gray-16"></div>
              </div>
              <Field />
            </div>
            <div className="flex justify-between flex-grow items-center py-1 px-2 border-l border-t border-clr-ui-accent">
              <Label>
                {x < 0 ? "" : "+"}
                {x.toFixed(4)}
              </Label>
              <Label>
                {y < 0 ? "" : "+"}
                {y.toFixed(4)}
              </Label>
            </div>
          </div>
        </animated.div>
      )}
    </div>
  );
}

export default Lab;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Text
      size={"xxs"}
      leading={"none"}
      className="relative text-clr-gray-30 dark:text-clr-gray-40"
      accent
    >
      {children}
    </Text>
  );
}

function Time() {
  const [time, setTime] = useState(Date.now());
  const requestRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      // The 'state' will always be the initial value here
      setTime(Date.now());
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (!requestRef.current) return;
      cancelAnimationFrame(requestRef.current);
    };
  }, []);
  return <Label>{formatTime(time)}</Label>;
}

function formatTime(time: number) {
  const date = new Date(time);

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  const milliseconds = String(date.getMilliseconds()).padStart(3, "0");

  const formattedTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;

  return formattedTime;
}
