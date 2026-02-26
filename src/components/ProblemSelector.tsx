import type { ProblemDefinition } from '../problems';

type Props = {
  problems: ProblemDefinition[];
  selectedKey: string;
  onSelect: (key: string) => void;
};

export default function ProblemSelector({ problems, selectedKey, onSelect }: Props) {
  return (
    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
      Problem
      <select
        value={selectedKey}
        onChange={(event) => onSelect(event.target.value)}
        className="rounded border border-slate-300 bg-white px-2 py-1 text-sm"
      >
        {problems.map((problem) => (
          <option key={problem.key} value={problem.key}>
            {problem.title}
          </option>
        ))}
      </select>
    </label>
  );
}
