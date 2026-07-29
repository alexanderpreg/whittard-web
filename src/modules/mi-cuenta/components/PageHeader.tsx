import { Marker, MarkerContent } from '@/shared/components/shadcn-ui/marker';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="font-brand-elephant text-brand-primary mb-3 text-center text-2xl">{title}</h1>
      <Marker variant="separator">
        <MarkerContent className="text-brand-secondary text-xs font-medium tracking-wide uppercase">
          {subtitle}
        </MarkerContent>
      </Marker>
    </div>
  );
}
