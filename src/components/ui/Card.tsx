"use client";
import Image from "next/image";
import { useCardSelection } from "@/components/state/CardSelectionContext";

export type CardProps = {
  id: number;
  title: string;
  imageUrl: string;
  description: string[];
  cta: string;
};

export function Card({ id, title, imageUrl, description, cta }: CardProps) {
  const { selectedCardId, setSelectedCardId } = useCardSelection();
  const isActive = selectedCardId === id;

  return (
    <article
      className={`bg-[var(--card)] rounded-xl overflow-hidden border transition-border shadow-card h-full flex flex-col ${isActive ? "border-[3px] border-[var(--ring)]" : "border border-black/10 dark:border-white/10"}`}
      data-testid={`card-${id}`}
    >
      <div className="relative group">
        <Image
          src={imageUrl}
          alt={title}
          width={640}
          height={360}
          className="w-full h-44 md:h-40 lg:h-44 object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-medium">
            {cta}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className="text-sm text-[var(--muted)] space-y-3 flex-1">
          {description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <button
          onClick={() => setSelectedCardId(id)}
          className="w-full mt-4 rounded-full bg-[var(--primary)] hover:bg-[var(--primary-600)] text-white py-2 text-sm font-semibold"
          data-testid={`card-button-${id}`}
        >
          {cta}
        </button>
      </div>
    </article>
  );
}

