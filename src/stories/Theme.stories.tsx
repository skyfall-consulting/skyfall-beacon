import type { Meta, StoryObj } from '@storybook/react-vite';
import { neutral, brandPrimary, semantic, text, surface, border } from '../tokens/colors';
import { fontFamily } from '../tokens/typography';
import { shadow } from '../tokens/shadows';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontSize: 13, fontWeight: 600, color: text.muted, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 16px', paddingBottom: 8, borderBottom: `1px solid ${border.default}` }}>
    {children}
  </h2>
);

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      background: surface.default,
      border: `1px solid ${border.default}`,
      borderRadius: 10,
      padding: 24,
      boxShadow: shadow.sm,
      ...style,
    }}
  >
    {children}
  </div>
);

const ThemePage = () => (
  <div style={{ maxWidth: 860, fontFamily: fontFamily.sans }}>
    <h1 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 6px', color: text.primary, letterSpacing: '-0.02em' }}>Theme</h1>
    <p style={{ fontSize: 15, color: text.muted, margin: '0 0 36px', lineHeight: '24px' }}>
      Surfaces, elevation, and semantic intent in context. These composites show how Beacon tokens work together to create the visual language of healthcare interfaces.
    </p>

    {/* Surface stack */}
    <SectionTitle>Surface Hierarchy</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 48 }}>
      {Object.entries(surface).map(([name, value]) => (
        <div
          key={name}
          style={{
            height: 100,
            background: value,
            borderRadius: 10,
            border: `1px solid ${border.default}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 4,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 600, color: text.primary }}>{name}</span>
          <span style={{ fontFamily: fontFamily.mono, fontSize: 11, color: text.muted }}>{value}</span>
        </div>
      ))}
    </div>

    {/* Elevation */}
    <SectionTitle>Elevation</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, marginBottom: 48 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((level) => (
        <div key={level} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '100%',
              height: 72,
              background: surface.default,
              borderRadius: 10,
              boxShadow: shadow[level],
              marginBottom: 8,
            }}
          />
          <span style={{ fontFamily: fontFamily.mono, fontSize: 12, color: text.secondary }}>{level}</span>
        </div>
      ))}
    </div>

    {/* Semantic intent */}
    <SectionTitle>Semantic Intent</SectionTitle>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 48 }}>
      {(['success', 'warning', 'error', 'info'] as const).map((status) => (
        <div
          key={status}
          style={{
            background: semantic[status][50],
            border: `1px solid ${semantic[status][500]}`,
            borderRadius: 10,
            padding: 16,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: semantic[status][700], marginBottom: 4, textTransform: 'capitalize' }}>
            {status}
          </div>
          <div style={{ fontFamily: fontFamily.mono, fontSize: 12, color: semantic[status][700] }}>
            {semantic[status][700]} / {semantic[status][50]}
          </div>
        </div>
      ))}
    </div>

    {/* Card composition */}
    <SectionTitle>Card Composition</SectionTitle>
    <div style={{ background: surface.canvas, borderRadius: 14, padding: 24, marginBottom: 48 }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: brandPrimary[500], display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: 16 }}>A</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, color: text.primary }}>Patient Record</div>
            <div style={{ fontSize: 13, color: text.muted }}>Updated today</div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: text.secondary, lineHeight: '20px' }}>
          Beacon cards use the <strong>default</strong> surface with <strong>sm</strong> elevation
          and <strong>md</strong> radius. Text follows the primary → secondary → muted hierarchy.
        </div>
      </Card>
    </div>

    {/* Text hierarchy */}
    <SectionTitle>Text Hierarchy</SectionTitle>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 14, color: text.primary, fontWeight: 600 }}>Primary — {text.primary}</span>
      <span style={{ fontSize: 14, color: text.secondary }}>Secondary — {text.secondary}</span>
      <span style={{ fontSize: 14, color: text.muted }}>Muted — {text.muted}</span>
      <span style={{ fontSize: 14, color: text.inverse, background: neutral[900], padding: '4px 10px', borderRadius: 6, alignSelf: 'flex-start' }}>
        Inverse — {text.inverse}
      </span>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Components/Foundations/Theme',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => <ThemePage />,
};
