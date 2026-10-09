import type { Translation } from './types'

/** Brazilian Portuguese. */
export const pt: Translation = {
  ui: {
    months: ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'],
    present: 'atual',
    skipToContent: 'Pular para o conteúdo',
    sectionsNav: 'Seções',
    languageNav: 'Idioma',
    hero: { viewWork: 'Ver trabalhos', emailMe: 'Enviar e-mail', skip: 'pular' },
    live: {
      title: 'Em produção',
      lede: 'Sites que construí ou ajudei a construir e que estão no ar hoje. Abra qualquer um deles.',
      listLabel: 'Sites no ar',
      client: 'cliente',
      personal: 'pessoal',
    },
    work: {
      title: 'Trabalho com clientes',
      lede: 'Plataformas que construí e entreguei na Thinklogic. Cada linha abaixo tem respaldo nos meus próprios commits no repositório do cliente.',
      featured: 'estudo de caso em destaque',
      internal: 'sistema interno',
    },
    projects: {
      title: 'Projetos pessoais',
      lede: 'Coisas que construo no meu tempo livre, quase sempre para experimentar uma stack de verdade em vez de só ler sobre ela.',
      privateRepo: 'repositório privado',
      source: 'código',
    },
    experience: { title: 'Experiência', at: 'na' },
    stack: { title: 'Stack' },
    about: { title: 'Sobre', languages: 'idiomas' },
    contact: { title: 'Contato' },
    footer: { builtWith: 'Feito com Next.js, React e TypeScript.', source: 'Código-fonte' },
    labels: {
      stack: (name) => `Stack de ${name}`,
      sourceCode: (name) => `Código-fonte de ${name} no GitHub`,
      liveSite: (name) => `Site de ${name} no ar`,
    },
  },
  content: {
    profile: {
      role: 'Engenheiro de Software',
      location: 'Blumenau, Santa Catarina, Brasil',
      availability: 'Aberto a novas oportunidades',
      tagline: 'Construo plataformas full-stack que continuam rápidas sob tráfego real.',
      summary:
        'Engenheiro de software com sete anos na área de tecnologia, construindo e mantendo plataformas web para clientes corporativos desde 2021. Trabalho em toda a stack: Nuxt, Vue e Angular no front-end no trabalho e React nos meus projetos, C# e .NET no back-end, Azure e Cloudflare na infraestrutura. Uso IA como ferramenta de produção no dia a dia, tratando o que ela gera como um rascunho que ainda passa por revisão.',
      metaDescription:
        'Matheus Reimer, engenheiro de software full-stack. Plataformas em Nuxt, Vue, React, C# e .NET para clientes corporativos, atendendo mais de 400 mil usuários e 35 milhões de requisições por mês.',
      statLabels: ['usuários por mês', 'requisições por mês', 'páginas com Lighthouse 90+', 'plataformas de clientes'],
      about: [
        'Comecei como estagiário de suporte de TI: servidores, redes, impressoras, qualquer coisa que quebrasse. Foram dois anos aprendendo como os sistemas falham antes de aprender a construí-los. Fui pegando trabalhos de desenvolvimento por fora, e isso me deu confiança para me candidatar a uma vaga júnior.',
        'Passei dois anos em uma empresa de chatbots escrevendo APIs em C# e JavaScript, automatizando fluxos e integrando sistemas para grandes clientes farmacêuticos e do varejo. Nesse período ganhei uma bolsa para estudar e trabalhar no Deggendorf Institute of Technology, na Alemanha, o que mudou a forma como penso sobre software e abriu as portas para o trabalho internacional.',
        'Desde 2023 trabalho na Thinklogic, uma consultoria americana, onde lidero e construo plataformas web para clientes de manufatura, direito, saúde global e pesquisa.',
      ],
      principles: [
        {
          title: 'Medir, depois otimizar',
          body: 'Trabalho de performance sem dados de usuários reais é chute. Faço benchmarks antes de escolher uma arquitetura e confiro com o tráfego de produção depois de publicar.',
        },
        {
          title: 'Arquitetura acima de esperteza',
          body: 'Prefiro padrões simples e fáceis de manter, que um time ainda consiga entender daqui a dois anos, a código esperto que só funciona enquanto eu lembro o porquê.',
        },
        {
          title: 'Cuidar do caminho inteiro',
          body: 'Dos requisitos ao deploy. Conhecer o back-end e a infraestrutura me torna um engenheiro front-end melhor, não um distraído.',
        },
      ],
      languages: [
        { name: 'Português', level: 'Nativo' },
        { name: 'Inglês', level: 'Nativo' },
        { name: 'Alemão', level: 'Intermediário' },
        { name: 'Italiano', level: 'Básico' },
      ],
    },

    work: {
      chatsworth: {
        product: 'Site institucional e catálogo de produtos de uma fabricante de hardware para data centers',
        role: 'Desenvolvedor líder',
        highlights: [
          'Projetei e construí a arquitetura Nuxt pré-carregada que substituiu um SPA legado, gerando estaticamente mais de 13.000 rotas com Lighthouse 90+ e tirando do back-end a carga das requisições de páginas comuns.',
          'Migrei sem nenhum tempo fora do ar, atendendo mais de 400 mil usuários e 35 milhões de requisições por mês, mantendo a plataforma legada viva até a última rota ser migrada.',
          'Mudei a hospedagem da Azure para Cloudflare Pages, Workers, KV e R2, com pré-renderização em lotes e migração de dados do Cosmos DB para o KV.',
          'Substituí o Azure Search por autocomplete federado com Algolia, integrado ao GTM e ao GA4, e passei o controle do ranking para o time de marketing.',
          'Construí um pipeline de tradução automática para espanhol e chinês simplificado que faz testes A/B entre DeepL e Google, guarda as traduções em cache para que um texto inalterado nunca seja pago duas vezes e impõe limites de gasto por build.',
        ],
      },
      jnd: {
        product: 'Site institucional e sites informativos por processo para uma empresa de administração jurídica',
        role: 'Desenvolvedor principal, desde o primeiro commit',
        highlights: [
          'Construí o jndla.com do zero: modelo de conteúdo, templates de página, preview e edição com Smart Link, redirects e infraestrutura em Bicep com pipelines de UAT e produção.',
          'Rebuilds disparados na publicação por um webhook em Azure Functions, com espera por um período sem edições para que uma rajada de alterações gere um único build.',
          'Liderei uma equipe de duas pessoas em um redesign e migração de 40 páginas em 21 dias, nove dias antes de um prazo fixo.',
          'Reforcei a segurança dos sites informativos com headers de segurança e uma Content Security Policy baseada em nonce.',
        ],
      },
      exemplars: {
        product: 'Plataforma de pesquisa em saúde pública para um programa da Gates Ventures',
        role: 'Maior contribuidor',
        highlights: [
          'Principal desenvolvedor na migração para Nuxt e Kontent.ai: narrativas, estudos de caso, principais aprendizados e blocos de evidências com dados.',
          'Construí a página de busca com facetas e reduzi o tempo de reconstrução do índice de busca.',
          'Invalidação de cache por webhook, para que editores vejam as alterações publicadas sem um deploy completo.',
        ],
      },
      manatt: {
        product: 'Site de um escritório nacional de advocacia e consultoria',
        role: 'Maior contribuidor',
        highlights: [
          'Construí a busca aproximada (fuzzy) do site inteiro no Azure AI Search, com reconstrução de índices e filtros.',
          'Limpeza de CDN e cache de requisições disparados por webhook.',
          'Construí uma camada de normalização com o padrão factory que unificou duas plataformas de CMS e dois bancos de dados em um único schema tipado para o front-end.',
        ],
      },
      addi: {
        product: 'Plataforma de dados de pesquisa sobre a doença de Alzheimer',
        role: 'Desenvolvedor',
        highlights: [
          'Construí as primeiras páginas do site V2: listas de equipe e publicações, estudos de caso, navegação.',
          'Liderei uma revisão de SEO técnico em duas fases: dados estruturados JSON-LD e FAQ, meta descriptions, imagens responsivas.',
        ],
      },
      'ticket-clinic': {
        product: 'Headlight, um sistema interno de gestão de processos para um escritório de direito de trânsito',
        role: 'Desenvolvedor full-stack',
        highlights: [
          'Construí o módulo de relatórios de ponta a ponta: um dashboard e oito relatórios operacionais com saída em PDF, dos serviços de relatório em .NET até a interface em Angular.',
          'Construí funcionalidades centrais do fluxo jurídico: o calendário de disposições, as regras e validações de planos de pagamento e as permissões por perfil.',
          'Trabalhei junto ao cliente em React Native e aos apps de quiosque que consomem as mesmas APIs da plataforma.',
        ],
      },
      'inside-lb': {
        product: 'Site de notícias locais de Long Beach',
        role: 'Contribuidor',
        highlights: ['Adicionei dados estruturados JSON-LD, URLs canônicas e correções de Lighthouse para melhorar a visibilidade nas buscas.'],
      },
    },

    projects: {
      'expense-tracker': {
        summary: 'Um controle de gastos pessoal com preenchimento assistido por IA.',
        highlights: [
          'Envie um recibo ou uma nota fiscal e o formulário se preenche sozinho; escreva uma descrição e a categoria é sugerida.',
          'Monorepo com API tipada, infraestrutura como código e testes nos templates do CDK.',
        ],
      },
      'mtg-oracle': {
        summary: 'Um assistente de voz que responde dúvidas sobre as regras de Magic: The Gathering.',
        highlights: [
          'Respostas com geração aumentada por recuperação (RAG), baseadas nas regras oficiais completas e rodando em um modelo local.',
          'Cliente mobile em React Native com entrada por voz.',
        ],
      },
      rena: {
        summary: 'Uma rede social para avaliar e discutir filmes, séries, livros e jogos.',
        highlights: [
          'Uma única identidade para todo tipo de mídia, com amigos, listas, resenhas e discussões.',
          'Busca dados de catálogo em várias APIs públicas de mídia, com fallback entre elas.',
        ],
      },
    },

    experience: {
      thinklogic: {
        role: 'Engenheiro de Software',
        location: 'Remoto, EUA',
        summary:
          'Engenheiro full-stack em uma consultoria de software americana, liderando e construindo plataformas web para clientes corporativos. O trabalho com clientes está detalhado acima.',
        points: [
          'Desenvolvedor líder do chatsworth.com: mais de 400 mil usuários e 35 milhões de requisições por mês, mais de 13.000 páginas com Lighthouse 90+.',
          'Construí o jndla.com desde o primeiro commit e liderei a migração das 40 páginas, entregue antes do prazo.',
          'Entreguei busca, cache e SEO em sete plataformas de clientes com Nuxt, Kontent.ai e Azure.',
          'Entrega full-stack em C#, .NET e Angular em um sistema interno de gestão de processos.',
        ],
      },
      'take-blip': {
        role: 'Desenvolvedor de Chatbots',
        location: 'Brasil',
        summary: 'Chatbots e APIs de back-end para clientes corporativos de saúde, varejo e finanças.',
        points: [
          'Parte de um time que operava chatbots com mais de 3.000 interações por minuto.',
          'Construí APIs em C#, .NET e JavaScript conectando os back-ends dos clientes aos fluxos de conversa em tempo real.',
          'Adicionei testes automatizados, gates de qualidade de código e relatórios de segurança ao pipeline de CI.',
          'Trabalhei diretamente com as lideranças de TI, marketing e vendas dos clientes para alinhar as entregas aos objetivos do negócio.',
        ],
      },
      freelance: {
        role: 'Desenvolvedor Full-Stack',
        location: 'Brasil',
        summary: 'Projetei, construí e publiquei cinco sites de ponta a ponta em seis meses.',
        points: [
          'Único desenvolvedor em todos os projetos, dos requisitos e do design até bancos de dados e deploy.',
          'Construí uma plataforma para uma imobiliária com React, Python e Django.',
          'Construí o site de um personal trainer com Node.js.',
        ],
      },
      'grupo-gmaes': {
        role: 'Estagiário de TI',
        location: 'Itajaí, Brasil',
        summary: 'Suporte de TI para servidores Linux e Windows, redes e sistemas internos.',
        points: [
          'Diagnostiquei e resolvi problemas em sistemas de e-mail, máquinas, redes e infraestrutura.',
          'Cuidei de relatórios e monitoramento de problemas recorrentes nos sistemas.',
        ],
      },
    },
  },
}
