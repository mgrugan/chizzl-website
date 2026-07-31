import type { CSSProperties } from 'react';

export interface PhoneMockupProps {
  src: string;
  alt: string;
  /** Rendered width in px. Everything else derives from it. */
  width?: number;
  /** 2D rotation only. The brand book rules out perspective and 3D transforms. */
  rotate?: number;
  /** Animate the rail wash. Reserve for hero devices; secondary cards stay static. */
  live?: boolean;
  float?: 'slow' | 'slower' | false;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function PhoneMockup({
  src,
  alt,
  width = 280,
  rotate = 0,
  live = false,
  float = false,
  priority = false,
  className = '',
  style,
}: PhoneMockupProps) {
  const floatClass = float === 'slow' ? 'float-slow' : float === 'slower' ? 'float-slower' : '';

  return (
    <div className={floatClass} style={{ rotate: `${rotate}deg` }}>
      <div
        className={`device ${live ? 'device--live' : ''} ${className}`}
        style={{ ['--pw' as string]: `${width}px`, ...style }}
      >
        <div className="device__body">
          <span className="device__rim" aria-hidden="true" />
          <span className="device__btn device__btn--l device__btn--action" aria-hidden="true" />
          <span className="device__btn device__btn--l device__btn--volup" aria-hidden="true" />
          <span className="device__btn device__btn--l device__btn--voldn" aria-hidden="true" />
          <span className="device__btn device__btn--r device__btn--power" aria-hidden="true" />
          <div className="device__bezel">
            <div className="device__screen">
              <img
                src={src}
                alt={alt}
                width={900}
                height={1955}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding="async"
              />
              <span className="device__island" aria-hidden="true" />
            </div>
          </div>
          <span className="device__sheen" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
