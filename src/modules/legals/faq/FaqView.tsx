// modules/legals/faqs/FaqsView.tsx
'use client';

import { Container } from '@/shared/components/custom-ui/Container';
import { Heading } from '@/shared/components/custom-ui/Heading';
import { PageBreadcrumb } from '@/shared/components/custom-ui/PageBreadcrumb';
import { RichText } from '@/shared/components/custom-ui/rich-text';
import { Text } from '@/shared/components/custom-ui/Text';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/shadcn-ui/accordion';

interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQContent {
  title?: string;
  description?: string;
  questions?: FAQQuestion[];
}

interface FaqsViewProps {
  faqData?: {
    content?: FAQContent;
  };
}

const FAQ_BREADCRUMBS = [{ label: 'Inicio', href: '/' }, { label: 'Preguntas Frecuentes' }];

export function FaqsView({ faqData }: FaqsViewProps) {
  const title = faqData?.content?.title || 'Preguntas Frecuentes';
  const description =
    faqData?.content?.description ||
    '¿Tienes una pregunta? Mira nuestras preguntas más frecuentes en la parte inferior. No dudes contactarnos si estás buscando algo en específico. Estamos para resolverlo.';
  const questions = faqData?.content?.questions || [];
  const hasQuestions = questions.length > 0;

  return (
    <Container as="main" className="mt-6 mb-14 flex-1 space-y-10">
      <PageBreadcrumb items={FAQ_BREADCRUMBS} />

      <div className="space-y-10">
        <div className="mx-auto max-w-3xl space-y-4 text-center">
          <Heading
            as="h1"
            variant="heading"
            className="font-brand-elephant text-brand-primary text-3xl md:text-4xl"
          >
            {title}
          </Heading>

          <Text
            variant="body"
            className="font-brand-avenir-lt text-brand-secondary balance text-sm leading-relaxed md:text-base"
          >
            {description}
          </Text>
        </div>

        {hasQuestions ? (
          <Accordion
            type="multiple"
            defaultValue={['faq-item-0']}
            className="flex w-full flex-col gap-1.5"
          >
            {questions.map((item, index) => {
              const itemValue = `faq-item-${index}`;

              return (
                <AccordionItem key={index} value={itemValue} className="border-none">
                  <AccordionTrigger className="font-brand-avenir-lt bg-brand-400 text-brand-white data-[state=open]:bg-brand-primary data-[state=open]:text-brand-white w-full rounded-none px-6 py-[9.5px] text-left text-base font-semibold transition-all duration-200 hover:no-underline md:px-9">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-brand-avenir-lt bg-brand-white px-6 pt-5 pb-5 md:px-9">
                    <RichText html={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : (
          <div className="border-brand-200 rounded-md border border-dashed py-12 text-center">
            <Text variant="small" className="text-brand-secondary">
              No hay preguntas disponibles por el momento.
            </Text>
          </div>
        )}
      </div>
    </Container>
  );
}
