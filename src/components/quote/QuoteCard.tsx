"use client";

interface QuoteCardProps {
  id: string;
  pricePence: number;
  summary: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  rank: number;
}

export default function QuoteCard({ id, pricePence, summary, isSelected, onSelect, rank }: QuoteCardProps) {
  const price = Math.round(pricePence / 100);

  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`
        w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200
        ${isSelected
          ? "border-green-500 bg-green-50 ring-1 ring-green-500/20"
          : "border-gray-100 bg-white hover:border-primary/30 hover:bg-blue-50/30"
        }
      `}
    >
      {/* Rank badge */}
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
        ${rank === 1 ? "bg-amber-100 text-amber-700" : "bg-gray-100 text-gray-500"}
      `}>
        {rank}
      </div>

      {/* Price */}
      <div className="flex-shrink-0 w-20 text-right">
        <span className="text-2xl font-bold text-gray-900">£{price}</span>
      </div>

      {/* Summary */}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-700 truncate">{summary}</p>
        <p className="text-xs text-gray-400 mt-0.5">Estimated price</p>
      </div>

      {/* Action */}
      <div className="flex-shrink-0">
        {isSelected ? (
          <div className="flex items-center gap-1.5 text-green-600">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold">Selected</span>
          </div>
        ) : (
          <span className="text-sm font-medium text-primary">Select</span>
        )}
      </div>
    </button>
  );
}
