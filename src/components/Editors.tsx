import {
  useEffect,
  useMemo,
  useState,
} from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

type MonacoEditorComponent = (
  props: Record<string, unknown>
) => JSX.Element;

type Props = {
  title: string;
  description: string;
  tags?: string[];
  hints: string[];
  referenceSolution?: string;
  code: string;
  showHints: boolean;
  onToggleHints: () => void;
  onChangeCode: (value: string) => void;
  onBackspace: (count: number) => void;
  onPaste: () => void;
};

export default function Editors({
  title,
  description,
  tags,
  hints,
  referenceSolution,
  code,
  showHints,
  onToggleHints,
  onChangeCode,
  onBackspace,
  onPaste,
}: Props) {
  const [
    MonacoEditor,
    setMonacoEditor,
  ] =
    useState<MonacoEditorComponent | null>(
      null
    );
  const [
    monacoFailed,
    setMonacoFailed,
  ] = useState(false);

  useEffect(() => {
    let mounted = true;
    import("@monaco-editor/react")
      .then((module) => {
        if (!mounted) return;
        setMonacoEditor(
          () =>
            module.default as MonacoEditorComponent
        );
      })
      .catch(() => {
        if (!mounted) return;
        setMonacoFailed(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const codeMirrorExtensions = useMemo(
    () => [javascript()],
    []
  );

  return (
    <section className="grid gap-3 lg:grid-cols-2">
      <article
        className={`rounded border border-slate-200 bg-white p-3 ${
          showHints
            ? ""
            : "hidden lg:block"
        }`}
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-800">
            {title}
          </h2>
          <button
            type="button"
            onClick={onToggleHints}
            className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100"
          >
            {showHints
              ? "Hide Hints"
              : "Show Hints"}
          </button>
        </div>
        <p className="text-xs text-slate-700">
          {description}
        </p>
        {tags && tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-300 bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
        <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-700">
          {hints.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
        {showHints &&
        referenceSolution ? (
          <div className="mt-3">
            <p className="mb-1 text-xs font-bold text-slate-800">
              Reference Solution
            </p>
            <pre className="max-h-72 overflow-auto rounded border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">
              <code>
                {referenceSolution}
              </code>
            </pre>
          </div>
        ) : null}
      </article>

      <article
        className="overflow-hidden rounded border border-slate-200 bg-white"
        onKeyDownCapture={(event) => {
          if (
            event.key === "Backspace"
          ) {
            onBackspace(1);
          }
        }}
        onPasteCapture={() => onPaste()}
      >
        {!showHints ? (
          <div className="border-b border-slate-200 p-2 lg:hidden">
            <button
              type="button"
              onClick={onToggleHints}
              className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100"
            >
              Show Hints
            </button>
          </div>
        ) : null}

        {MonacoEditor &&
        !monacoFailed ? (
          <MonacoEditor
            height="520px"
            language="javascript"
            value={code}
            onChange={(
              value: string | undefined
            ) =>
              onChangeCode(value ?? "")
            }
            options={{
              fontSize: 14,
              minimap: {
                enabled: false,
              },
              tabSize: 2,
              insertSpaces: true,
              quickSuggestions: false,
              suggestOnTriggerCharacters:
                false,
              parameterHints: {
                enabled: false,
              },
              wordBasedSuggestions:
                "off",
              inlineSuggest: {
                enabled: false,
              },
            }}
          />
        ) : (
          <div className="min-h-[520px] p-2">
            <CodeMirror
              value={code}
              height="500px"
              extensions={
                codeMirrorExtensions
              }
              onChange={(value) =>
                onChangeCode(value)
              }
              basicSetup={{
                foldGutter: false,
                autocompletion: false,
              }}
            />
            <p className="mt-1 text-xs text-amber-700">
              Monaco unavailable in this
              environment. Using
              CodeMirror fallback.
            </p>
          </div>
        )}
      </article>
    </section>
  );
}
