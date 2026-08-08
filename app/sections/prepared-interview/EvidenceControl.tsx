import type { EvidenceOutput } from "@/app/types/landing";
import { styles } from "./styles";

function EvidenceIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M6.3 5.1 8 3.4a3 3 0 0 1 4.2 4.2l-2.1 2.1a3 3 0 0 1-4.2 0" />
      <path d="m9.7 10.9-1.7 1.7a3 3 0 0 1-4.2-4.2l2.1-2.1a3 3 0 0 1 4.2 0" />
    </svg>
  );
}

type EvidenceControlProps = {
  output: EvidenceOutput;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function EvidenceControl({
  output,
  open,
  onOpen,
  onClose,
}: EvidenceControlProps) {
  const popoverId = `evidence-${output.id}`;

  return (
    <div
      className={styles.evidenceControl}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className={styles.evidenceButton}
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={`Show evidence for ${output.label}`}
        onClick={(event) => {
          event.stopPropagation();
          if (open) onClose();
          else onOpen();
        }}
        onFocus={onOpen}
      >
        <EvidenceIcon />
        <span>{output.evidenceCount}</span>
      </button>

      <div
        id={popoverId}
        className={`${styles.evidencePopover} ${open ? styles.evidencePopoverOpen : ""}`}
        role="note"
        aria-hidden={!open}
      >
        <div className={styles.artifactTopline}>
          <span>{output.artifactType}</span>
          <span className={styles.artifactVerified}>
            <i aria-hidden="true" />
            Linked
          </span>
        </div>
        <p className={styles.artifactId}>{output.artifactId}</p>
        <p className={styles.artifactTitle}>{output.artifactTitle}</p>
        <p className={styles.artifactDetail}>{output.artifactDetail}</p>
        <p className={styles.artifactMeta}>{output.artifactMeta}</p>
      </div>
    </div>
  );
}
