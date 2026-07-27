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

type ProblemPanelProps = {
  title: string;
  description: string;
  tags?: string[];
  hints: string[];
  referenceSolution?: string;
  showHints: boolean;
  onToggleHints: () => void;
};

type CodeEditorPanelProps = {
  code: string;
  showHints: boolean;
  onToggleHints: () => void;
  onChangeCode: (value: string) => void;
  onBackspace: (count: number) => void;
  onPaste: () => void;
};

export function ProblemPanel({
  title,
  description,
  tags,
  hints,
  referenceSolution,
  showHints,
  onToggleHints,
}: ProblemPanelProps) {
  return (
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
      {showHints &&
      referenceSolution ? (
          <div className="mt-3">
            <p className="mb-1 text-xs font-bold text-slate-800">
              Reference Solution
            </p>
            <pre className="overflow-auto rounded border border-slate-200 bg-slate-50 p-2 text-[11px] text-slate-700">
            <code>
              {referenceSolution}
            </code>
          </pre>
          </div>
      ) : null}
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
    </article>
  );
}

export function CodeEditorPanel({
  code,
  showHints,
  onToggleHints,
  onChangeCode,
  onBackspace,
  onPaste,
}: CodeEditorPanelProps) {
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
    <article
      className="flex h-[600px] flex-col overflow-hidden rounded border border-slate-200 bg-white"
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
        <div className="shrink-0 border-b border-slate-200 p-2 lg:hidden">
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
        // 높이는 부모 박스가 정하고, 줄이 넘치면 Monaco 내부 스크롤로 처리한다.
        <div className="min-h-0 flex-1">
          <MonacoEditor
            height="100%"
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
              // 기본값(true)이면 마지막 줄 뒤로 '뷰포트 - 1줄'만큼
              // 빈 스크롤 영역이 붙어 내부 레이어가 부모보다 길어진다.
              scrollBeyondLastLine: false,
              automaticLayout: true,
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
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col p-2">
          <div className="min-h-0 flex-1 overflow-auto">
            <CodeMirror
              value={code}
              height="100%"
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
          </div>
          <p className="mt-1 shrink-0 text-xs text-amber-700">
            Monaco unavailable in this
            environment. Using
            CodeMirror fallback.
          </p>
        </div>
      )}
    </article>
  );
}
