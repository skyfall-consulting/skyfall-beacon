import type { Meta, StoryObj } from '@storybook/react-vite';
import { fontFamily } from '../tokens/typography';
import { text, brandPrimary, semantic, neutral, border } from '../tokens/colors';

const EXAMPLE_ICONS = [
  { name: 'Heart', path: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z' },
  { name: 'User', path: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z' },
  { name: 'Calendar', path: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18' },
  { name: 'Activity', path: 'M22 12h-4l-3 9L9 3l-3 9H2' },
  { name: 'Shield', path: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { name: 'Clipboard', path: 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z' },
  { name: 'Bell', path: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0' },
  { name: 'Check', path: 'M20 6L9 17l-5-5' },
  { name: 'AlertTriangle', path: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01' },
  { name: 'Search', path: 'M11 17.25a6.25 6.25 0 1 1 0-12.5 6.25 6.25 0 0 1 0 12.5zM21 21l-4.35-4.35' },
  { name: 'Settings', path: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' },
  { name: 'Lock', path: 'M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4' },
];

const SvgIcon = ({ path, size = 20, color = 'currentColor', strokeWidth = 1.75 }: { path: string; size?: number; color?: string; strokeWidth?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 13, fontWeight: 600, color: text.muted, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px', paddingBottom: 8, borderBottom: `1px solid ${border.default}` }}>
    {children}
  </h2>
);

const IconCell = ({ name, path, color }: { name: string; path: string; color: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <div
      style={{
        width: 52,
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        background: neutral[50],
        border: `1px solid ${neutral[200]}`,
      }}
    >
      <SvgIcon path={path} color={color} />
    </div>
    <span style={{ fontFamily: fontFamily.mono, fontSize: 11, color: text.muted, textAlign: 'center' }}>{name}</span>
  </div>
);

const IconsPage = () => (
  <div style={{ maxWidth: 860, fontFamily: fontFamily.sans }}>
    <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: text.primary, letterSpacing: '-0.02em' }}>Icons</h1>
    <p style={{ fontSize: 15, color: text.muted, margin: '0 0 36px', lineHeight: '24px' }}>
      Beacon is icon-library-agnostic. Use any SVG icon set — Lucide, Heroicons, Phosphor — and apply Beacon color tokens for visual consistency across your interface.
    </p>

    <SectionTitle>Default (text.primary)</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 16, marginBottom: 48 }}>
      {EXAMPLE_ICONS.map((icon) => (
        <IconCell key={icon.name} {...icon} color={text.primary} />
      ))}
    </div>

    <SectionTitle>Brand (brandPrimary.500)</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))', gap: 16, marginBottom: 48 }}>
      {EXAMPLE_ICONS.slice(0, 6).map((icon) => (
        <IconCell key={icon.name} {...icon} color={brandPrimary[500]} />
      ))}
    </div>

    <SectionTitle>Semantic Colors</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 48 }}>
      <IconCell name="Success" path={EXAMPLE_ICONS[7].path} color={semantic.success[500]} />
      <IconCell name="Warning" path={EXAMPLE_ICONS[8].path} color={semantic.warning[500]} />
      <IconCell name="Error" path={EXAMPLE_ICONS[0].path} color={semantic.error[500]} />
      <IconCell name="Info" path={EXAMPLE_ICONS[4].path} color={semantic.info[500]} />
    </div>

    <SectionTitle>Sizing</SectionTitle>
    <div style={{ display: 'flex', alignItems: 'end', gap: 32, marginBottom: 48 }}>
      {[14, 16, 20, 24, 32].map((size) => (
        <div key={size} style={{ textAlign: 'center' }}>
          <SvgIcon path={EXAMPLE_ICONS[3].path} size={size} color={text.primary} />
          <div style={{ fontFamily: fontFamily.mono, fontSize: 11, color: text.muted, marginTop: 8 }}>{size}px</div>
        </div>
      ))}
    </div>

    <SectionTitle>Usage</SectionTitle>
    <div
      style={{
        background: neutral[50],
        border: `1px solid ${neutral[200]}`,
        borderRadius: 10,
        padding: 20,
        fontFamily: fontFamily.mono,
        fontSize: 13,
        lineHeight: '22px',
        color: text.secondary,
        whiteSpace: 'pre',
      }}
    >
{`import { Heart } from 'lucide-react';
import { brandPrimary } from '@skyfall_ai/beacon';

<Heart size={20} color={brandPrimary[500]} />`}
    </div>
  </div>
);

const meta: Meta = {
  title: 'Components/Foundations/Icons',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <IconsPage />,
};
