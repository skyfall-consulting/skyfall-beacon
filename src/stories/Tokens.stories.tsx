import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  brandPrimary,
  accentTeal,
  neutral,
  semantic,
  text,
  surface,
  border,
  dataVis,
} from '../tokens/colors';
import { fontFamily, fontWeight, fontSize, lineHeight } from '../tokens/typography';
import { space } from '../tokens/spacing';
import { radius } from '../tokens/radius';
import { shadow } from '../tokens/shadows';
import { duration, easing } from '../tokens/motion';
import { focusRing } from '../tokens/focus';

/* ------------------------------------------------------------------ */
/*  Shared layout primitives                                           */
/* ------------------------------------------------------------------ */

const PageShell = ({ title, description, children }: { title: string; description: string; children: React.ReactNode }) => (
  <div style={{ maxWidth: 860, fontFamily: fontFamily.sans }}>
    <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: text.primary, letterSpacing: '-0.02em' }}>{title}</h1>
    <p style={{ fontSize: 15, color: text.muted, margin: '0 0 36px', lineHeight: '24px' }}>{description}</p>
    {children}
  </div>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 13, fontWeight: 600, color: text.muted, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px', paddingBottom: 8, borderBottom: `1px solid ${border.default}` }}>
    {children}
  </h2>
);

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

const ColorSwatch = ({ color, label }: { color: string; label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
    <div
      style={{
        width: '100%',
        aspectRatio: '1.4',
        borderRadius: 8,
        background: color,
        border: `1px solid ${color === '#FFFFFF' || color === neutral[0] ? border.default : 'transparent'}`,
      }}
    />
    <div style={{ fontSize: 12, fontWeight: 500, color: text.primary }}>{label}</div>
    <div style={{ fontFamily: fontFamily.mono, fontSize: 11, color: text.muted }}>{color}</div>
  </div>
);

const PaletteGrid = ({ title, palette }: { title: string; palette: Record<string, string> }) => (
  <div style={{ marginBottom: 40 }}>
    <SectionTitle>{title}</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 16 }}>
      {Object.entries(palette).map(([key, value]) => (
        <ColorSwatch key={key} color={value} label={`${title.toLowerCase().replace(/\s+/g, '-')}.${key}`} />
      ))}
    </div>
  </div>
);

const ColorsPage = () => (
  <PageShell
    title="Color"
    description="The Beacon color system is built for clarity and trust. Brand blue provides the primary identity. Teal supports secondary accents. Neutrals carry the interface. Semantic colors signal status without ambiguity."
  >
    <PaletteGrid title="Brand Primary" palette={brandPrimary} />
    <PaletteGrid title="Accent Teal" palette={accentTeal} />
    <PaletteGrid title="Neutral" palette={neutral} />
    <PaletteGrid title="Success" palette={semantic.success as unknown as Record<string, string>} />
    <PaletteGrid title="Warning" palette={semantic.warning as unknown as Record<string, string>} />
    <PaletteGrid title="Error" palette={semantic.error as unknown as Record<string, string>} />
    <PaletteGrid title="Info" palette={semantic.info as unknown as Record<string, string>} />
    <PaletteGrid title="Text" palette={text} />
    <PaletteGrid title="Surface" palette={surface} />
    <PaletteGrid title="Border" palette={border} />
    <PaletteGrid title="Data Visualization" palette={dataVis as unknown as Record<string, string>} />
  </PageShell>
);

/* ------------------------------------------------------------------ */
/*  Typography                                                         */
/* ------------------------------------------------------------------ */

const TypographyPage = () => (
  <PageShell
    title="Typography"
    description="Beacon uses Inter for UI text and IBM Plex Mono for data and code. The type scale is designed for data-rich healthcare interfaces where readability and scanability are critical."
  >
    <SectionTitle>Font Family</SectionTitle>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
      {Object.entries(fontFamily).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '12px 16px', background: neutral[50], borderRadius: 8 }}>
          <span style={{ fontFamily: value, fontSize: 18, color: text.primary, minWidth: 80 }}>{key}</span>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 12, color: text.muted, wordBreak: 'break-all' }}>{value}</span>
        </div>
      ))}
    </div>

    <SectionTitle>Font Weight</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40 }}>
      {Object.entries(fontWeight).map(([key, value]) => (
        <div key={key} style={{ padding: '16px', background: neutral[50], borderRadius: 8, textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: value, color: text.primary, marginBottom: 8 }}>Aa</div>
          <div style={{ fontSize: 12, fontWeight: 500, color: text.primary }}>{key}</div>
          <div style={{ fontFamily: fontFamily.mono, fontSize: 11, color: text.muted }}>{value}</div>
        </div>
      ))}
    </div>

    <SectionTitle>Type Scale</SectionTitle>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Object.entries(fontSize).map(([key, size]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '8px 0', borderBottom: `1px solid ${neutral[100]}` }}>
          <span style={{ fontSize: size, lineHeight: lineHeight[key as keyof typeof lineHeight], color: text.primary, minWidth: 200, whiteSpace: 'nowrap' }}>
            {key}
          </span>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 11, color: text.muted }}>
            {size} / {lineHeight[key as keyof typeof lineHeight]}
          </span>
        </div>
      ))}
    </div>
  </PageShell>
);

/* ------------------------------------------------------------------ */
/*  Spacing                                                            */
/* ------------------------------------------------------------------ */

const SpacingPage = () => (
  <PageShell
    title="Spacing"
    description="A 4px base unit spacing scale. Consistent spacing creates visual rhythm and predictable density across healthcare interfaces where information density matters."
  >
    <SectionTitle>Space Scale</SectionTitle>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {Object.entries(space).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '6px 0' }}>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 13, color: text.primary, minWidth: 70, fontWeight: 500 }}>space-{key}</span>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                height: 20,
                background: `linear-gradient(135deg, ${brandPrimary[400]}, ${brandPrimary[600]})`,
                borderRadius: 4,
                width: value === '0' ? 2 : parseInt(value),
                minWidth: value === '0' ? 2 : undefined,
                transition: 'width 0.2s ease',
              }}
            />
          </div>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 12, color: text.muted, minWidth: 40, textAlign: 'right' }}>{value}</span>
        </div>
      ))}
    </div>
  </PageShell>
);

/* ------------------------------------------------------------------ */
/*  Radius                                                             */
/* ------------------------------------------------------------------ */

const RadiusPage = () => (
  <PageShell
    title="Radius"
    description="Border radius tokens control the roundness of component corners. Beacon defaults to softer radii for a calm, approachable feel appropriate for healthcare contexts."
  >
    <SectionTitle>Radius Scale</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 20 }}>
      {Object.entries(radius).map(([key, value]) => (
        <div key={key} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 72,
              height: 72,
              border: `2px solid ${brandPrimary[500]}`,
              background: brandPrimary[50],
              borderRadius: value,
              margin: '0 auto 10px',
            }}
          />
          <div style={{ fontSize: 13, fontWeight: 500, color: text.primary }}>{key}</div>
          <div style={{ fontFamily: fontFamily.mono, fontSize: 11, color: text.muted }}>{value}</div>
        </div>
      ))}
    </div>
  </PageShell>
);

/* ------------------------------------------------------------------ */
/*  Shadows                                                            */
/* ------------------------------------------------------------------ */

const ShadowsPage = () => (
  <PageShell
    title="Shadows"
    description="Elevation shadows create visual hierarchy and depth. Beacon uses soft, cool-toned shadows that feel grounded and professional. Focus rings use the brand primary color for clear keyboard navigation indicators."
  >
    <SectionTitle>Elevation</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 24, marginBottom: 48 }}>
      {Object.entries(shadow)
        .filter(([key]) => !key.startsWith('focus') && !key.startsWith('inset'))
        .map(([key, value]) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 72,
                background: surface.default,
                borderRadius: 10,
                boxShadow: value,
                marginBottom: 10,
              }}
            />
            <div style={{ fontSize: 13, fontWeight: 500, color: text.primary }}>{key}</div>
          </div>
        ))}
    </div>

    <SectionTitle>Focus Rings</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 24, marginBottom: 48 }}>
      {Object.entries(shadow)
        .filter(([key]) => key.startsWith('focus'))
        .map(([key, value]) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 72,
                background: surface.default,
                borderRadius: 10,
                boxShadow: value,
                border: `2px solid ${key === 'focusError' ? semantic.error[500] : key === 'focusSuccess' ? semantic.success[500] : brandPrimary[500]}`,
                marginBottom: 10,
              }}
            />
            <div style={{ fontSize: 13, fontWeight: 500, color: text.primary }}>{key}</div>
          </div>
        ))}
    </div>

    <SectionTitle>Inset</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 24 }}>
      {Object.entries(shadow)
        .filter(([key]) => key.startsWith('inset'))
        .map(([key, value]) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 72,
                background: neutral[50],
                borderRadius: 10,
                boxShadow: value,
                marginBottom: 10,
              }}
            />
            <div style={{ fontSize: 13, fontWeight: 500, color: text.primary }}>{key}</div>
          </div>
        ))}
    </div>
  </PageShell>
);

/* ------------------------------------------------------------------ */
/*  Motion                                                             */
/* ------------------------------------------------------------------ */

const MotionPage = () => (
  <PageShell
    title="Motion"
    description="Motion tokens define timing and easing for all transitions and animations. Beacon uses restrained, purposeful motion — fast enough to feel responsive, calm enough to avoid distraction in clinical workflows."
  >
    <SectionTitle>Duration</SectionTitle>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 48 }}>
      {Object.entries(duration).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', background: neutral[50], borderRadius: 8 }}>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 13, fontWeight: 500, color: text.primary, minWidth: 60 }}>{key}</span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                height: 6,
                background: `linear-gradient(90deg, ${brandPrimary[500]}, ${brandPrimary[300]})`,
                borderRadius: 3,
                width: `${(parseInt(value) / 240) * 100}%`,
              }}
            />
          </div>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 12, color: text.muted, minWidth: 50, textAlign: 'right' }}>{value}</span>
        </div>
      ))}
    </div>

    <SectionTitle>Easing</SectionTitle>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {Object.entries(easing).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 16px', background: neutral[50], borderRadius: 8 }}>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 13, fontWeight: 500, color: text.primary, minWidth: 100 }}>{key}</span>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 12, color: text.muted }}>{value}</span>
        </div>
      ))}
    </div>
  </PageShell>
);

/* ------------------------------------------------------------------ */
/*  Focus                                                              */
/* ------------------------------------------------------------------ */

const FocusPage = () => (
  <PageShell
    title="Focus"
    description="Focus indicators ensure keyboard and assistive technology users can navigate the interface. Beacon uses visible, high-contrast focus rings that meet WCAG 2.1 requirements."
  >
    <SectionTitle>Focus Ring Tokens</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 48 }}>
      {Object.entries(focusRing).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', background: neutral[50], borderRadius: 8 }}>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 13, fontWeight: 500, color: text.primary }}>{key}</span>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 12, color: text.muted }}>{value}</span>
        </div>
      ))}
    </div>

    <SectionTitle>Interactive Preview</SectionTitle>
    <p style={{ fontSize: 13, color: text.muted, margin: '0 0 16px' }}>Tab through these elements to see focus indicators in action.</p>
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      {['Button', 'Input', 'Link'].map((label) => (
        <div
          key={label}
          tabIndex={0}
          style={{
            padding: '10px 20px',
            background: surface.default,
            border: `1px solid ${border.default}`,
            borderRadius: 8,
            fontSize: 13,
            fontFamily: fontFamily.sans,
            color: text.primary,
            cursor: 'pointer',
            outline: 'none',
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = shadow.focus;
            e.currentTarget.style.borderColor = focusRing.outlineColor;
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = border.default;
          }}
        >
          {label}
        </div>
      ))}
    </div>
  </PageShell>
);

/* ------------------------------------------------------------------ */
/*  Meta                                                               */
/* ------------------------------------------------------------------ */

const meta: Meta = {
  title: 'Components/Foundations/Tokens',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => <ColorsPage />,
};

export const Typography: Story = {
  name: 'Typography',
  render: () => <TypographyPage />,
};

export const Spacing: Story = {
  render: () => <SpacingPage />,
};

export const Radius: Story = {
  render: () => <RadiusPage />,
};

export const Shadows: Story = {
  render: () => <ShadowsPage />,
};

export const Motion: Story = {
  render: () => <MotionPage />,
};

export const Focus: Story = {
  render: () => <FocusPage />,
};
