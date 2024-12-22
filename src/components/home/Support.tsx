import { Card, CardBody } from '@nextui-org/card';
import { Accordion, AccordionItem, Divider } from '@nextui-org/react';
import { Phone, Mail } from 'lucide-react';
import { Link } from 'wouter';

const faqs = [
  {
    question: 'Hvordan nulstiller jeg min adgangskode?',
    answer:
      "For at nulstille din adgangskode, klik på linket 'Glemt adgangskode' på login-siden. Følg instruktionerne sendt til din e-mail for at oprette en ny adgangskode.",
  },
  {
    question: 'Hvilke betalingsmetoder accepterer I?',
    answer:
      'Vi accepterer Visa, MasterCard, American Express og PayPal. For mere information, besøg venligst vores side om betalingsmetoder.',
  },
  {
    question: 'Hvordan kan jeg spore min ordre?',
    answer:
      'Når din ordre er blevet afsendt, vil du modtage et sporingsnummer via e-mail. Du kan bruge dette nummer på vores side til ordretracking for at se status for din levering.',
  },
  {
    question: 'Hvad er jeres returpolitik?',
    answer:
      'Vi tilbyder en 30-dages returpolitik for de fleste varer. Tjek venligst vores side om returneringer og refusioner for detaljerede oplysninger og undtagelser.',
  },
];

function Support() {
  return (
    <Card shadow='none' className='text-base '>
      <CardBody className='p-6'>
        <div className='flex flex-col gap-4 py-4'>
          <div className='flex items-center'>
            <Phone className='mr-2' />
            <p>
              Telefon: <Link href='tel:+18001234567'>1-800-123-4567</Link>
            </p>
          </div>

          <div className='flex items-center'>
            <Mail className='mr-2' />
            <p>
              Email: <Link href='mailto:support@example.com'>support@example.com</Link>
            </p>
          </div>
        </div>
        <Divider />
        <h3 className='py-4 '>Ofte stillede spørgsmål</h3>
        <Divider />
        <Accordion>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} title={faq.question}>
              <p className='text-sm text-default-700'>{faq.answer}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </CardBody>
    </Card>
  );
}

export default Support;
