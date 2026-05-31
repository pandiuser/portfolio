import { useEffect, useState } from "react";

type Options = {
  words: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
};

export function useTyping({ words, typeMs = 80, deleteMs = 40, holdMs = 1500 }: Options) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => {
        setText((s) =>
          deleting ? current.slice(0, s.length - 1) : current.slice(0, s.length + 1),
        );
      },
      deleting ? deleteMs : typeMs,
    );
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs]);

  return text;
}
