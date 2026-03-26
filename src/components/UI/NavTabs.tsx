import type { ViewKey } from "../../types";

type NavTabsProps = {
  currentView: ViewKey;
  onSelect: (view: ViewKey) => void;
};

const tabs: Array<{ key: ViewKey; label: string }> = [
  { key: "today", label: "Today" },
  { key: "history", label: "History" },
  { key: "summary", label: "Weekly Summary" },
  { key: "breathing", label: "Breathing" },
];

export const NavTabs = ({ currentView, onSelect }: NavTabsProps) => (
  <nav className="nav-tabs" aria-label="Main navigation">
    {tabs.map((tab) => (
      <button
        key={tab.key}
        type="button"
        className={tab.key === currentView ? "nav-tabs__button is-active" : "nav-tabs__button"}
        onClick={() => onSelect(tab.key)}
      >
        {tab.label}
      </button>
    ))}
  </nav>
);
