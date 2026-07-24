import type { ProductInformationSection } from '@/modules/products/types/productDetail';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/shadcn-ui/accordion';

interface ProductInformationAccordionProps {
  sections: ProductInformationSection[];
}

export function ProductInformationAccordion({ sections }: ProductInformationAccordionProps) {
  if (sections.length === 0) return null;

  return (
    <Accordion type="single" collapsible>
      {sections.map((section) => (
        <AccordionItem
          key={section.id}
          value={section.id}
          className="border-brand-primary/20 border-b"
        >
          <AccordionTrigger className="text-brand-primary cursor-pointer text-base font-normal uppercase hover:no-underline">
            {section.title}
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="text-brand-secondary text-base"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
