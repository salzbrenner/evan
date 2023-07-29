"use client";
import { Text, useCoordinateGraph } from "@evan/ui";
import { HideLeva } from "@evan/ui/lab/HideLeva";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
const Field = dynamic(() => import("@evan/ui/lab/Field/Field"), {
  ssr: false,
});
const Blob = dynamic(() => import("@evan/ui/lab/blob/index"), {
  ssr: false,
});

export function Lab() {
  const [show, setShow] = useState(false);

  const { x, y } = useCoordinateGraph();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 3000);
  }, []);

  return (
    <div className="relative">
      <HideLeva />
      {show && (
        <motion.div
          className="flex"
          animate={{
            opacity: 1,
          }}
          initial={{ opacity: 0 }}
          transition={{
            delay: 1.5,
            duration: 0.5,
          }}
        >
          <div style={{ height: "218px", width: "218px" }}>
            <Blob fov={30} />
            <div className="px-2 py-1  border-t border-clr-ui-accent">
              <Time />
            </div>
          </div>
          <div>
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
            <div className="flex justify-between px-2 py-1 border-l border-t border-clr-ui-accent">
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
        </motion.div>
      )}
    </div>
  );
}

export default Lab;

function Label({ children }: { children: React.ReactNode }) {
  return (
    <Text
      className="relative !text-[10px] text-clr-gray-30 dark:text-clr-gray-40"
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
    const animate = (_) => {
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
