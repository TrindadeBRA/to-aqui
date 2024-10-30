import Image from 'next/image'

import backgroundImage from '../images/background-faqs.jpg'
import { Container } from './Container'

const faqs = [
  [
    {
      question: 'O "To aqui!" funciona em qualquer estabelecimento?',
      answer:
        'Sim! Nossa plataforma é ideal para restaurantes, bares, cafés, lanchonetes e qualquer estabelecimento que queira uma presença digital profissional.',
    },
    {
      question: 'Como funciona o pagamento da assinatura?',
      answer:
        'Aceitamos diversas formas de pagamento, incluindo cartão de crédito, boleto e PIX.',
    },
    {
      question: 'Como faço para começar a usar o "To aqui!"?',
      answer:
        'É simples! Basta se cadastrar na plataforma, adicionar as informações do seu estabelecimento e em poucos minutos sua página estará no ar.',
    },
  ],
  [
    {
      question: 'O QR Code é gerado automaticamente?',
      answer:
        'Sim! Geramos automaticamente um QR Code exclusivo para seu estabelecimento que pode ser impresso em materiais promocionais.',
    },
    {
      question: 'Posso personalizar as cores e o layout da minha página?',
      answer:
        'Com certeza! Oferecemos várias opções de personalização para que sua página combine perfeitamente com a identidade visual do seu negócio.',
    },
    {
      question: 'Posso atualizar meu cardápio quando quiser?',
      answer:
        'Sim! Você pode atualizar seu cardápio, preços, fotos e informações a qualquer momento através do painel de controle.',
    },
  ],
  [
    {
      question: 'Como funcionam as imagens para redes sociais?',
      answer:
        'Nossa plataforma gera automaticamente imagens profissionais com sua logo e informações de contato, prontas para compartilhar no Instagram, Facebook e WhatsApp.',
    },
    {
      question: 'Vocês oferecem suporte técnico?',
      answer:
        'Sim! Temos uma equipe dedicada para ajudar você com qualquer dúvida ou dificuldade.',
    },
    {
      question: 'Esqueci minha senha, como recupero o acesso?',
      answer:
        'Basta clicar em "Esqueci minha senha" na página de login e seguir as instruções enviadas para seu e-mail cadastrado.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Perguntas Frequentes
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Não encontrou o que procura? Entre em contato com nosso suporte que
            responderemos o mais rápido possível.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
