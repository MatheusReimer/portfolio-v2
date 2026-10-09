import type { Translation } from './types'

export const de: Translation = {
  ui: {
    months: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    present: 'heute',
    skipToContent: 'Zum Inhalt springen',
    sectionsNav: 'Abschnitte',
    languageNav: 'Sprache',
    hero: { viewWork: 'Projekte ansehen', emailMe: 'E-Mail schreiben', skip: 'überspringen' },
    live: {
      title: 'Live in Produktion',
      lede: 'Websites, die ich gebaut oder mitgebaut habe und die heute laufen. Jede davon lässt sich direkt öffnen.',
      listLabel: 'Live-Websites',
      client: 'Kunde',
      personal: 'privat',
    },
    work: {
      title: 'Kundenprojekte',
      lede: 'Plattformen, die ich bei Thinklogic gebaut und ausgeliefert habe. Jede Zeile unten ist durch meine eigenen Commits im Repository des Kunden belegt.',
      featured: 'ausgewählte Fallstudie',
      internal: 'internes System',
    },
    projects: {
      title: 'Eigene Projekte',
      lede: 'Dinge, die ich in meiner Freizeit baue, meist um einen Stack richtig auszuprobieren, statt nur darüber zu lesen.',
      privateRepo: 'privates Repo',
      source: 'Quellcode',
    },
    experience: { title: 'Berufserfahrung', at: 'bei' },
    stack: { title: 'Stack' },
    about: { title: 'Über mich', languages: 'Sprachen' },
    contact: { title: 'Kontakt' },
    footer: { builtWith: 'Gebaut mit Next.js, React und TypeScript.', source: 'Quellcode' },
    labels: {
      stack: (name) => `Stack von ${name}`,
      sourceCode: (name) => `Quellcode von ${name} auf GitHub`,
      liveSite: (name) => `Live-Website von ${name}`,
    },
  },
  content: {
    profile: {
      role: 'Softwareentwickler',
      location: 'Blumenau, Santa Catarina, Brasilien',
      availability: 'Offen für neue Möglichkeiten',
      tagline: 'Ich baue Full-Stack-Plattformen, die auch unter echter Last schnell bleiben.',
      summary:
        'Softwareentwickler mit sieben Jahren Erfahrung in der IT, der seit 2021 Webplattformen für Unternehmenskunden baut und betreut. Ich arbeite über den gesamten Stack: Nuxt, Vue und Angular im Frontend bei der Arbeit und React in eigenen Projekten, C# und .NET im Backend, Azure und Cloudflare als Infrastruktur. KI setze ich im Arbeitsalltag als Produktionswerkzeug ein, wobei ihre Ergebnisse ein Entwurf bleiben, der noch geprüft wird.',
      metaDescription:
        'Matheus Reimer, Full-Stack-Softwareentwickler. Plattformen mit Nuxt, Vue, React, C# und .NET für Unternehmenskunden, mit über 400.000 Nutzern und über 35 Mio. Anfragen pro Monat.',
      statLabels: ['Nutzer pro Monat', 'Anfragen pro Monat', 'Seiten mit Lighthouse 90+', 'Kundenplattformen'],
      about: [
        'Angefangen habe ich als Praktikant im IT-Support: Server, Netzwerke, Drucker, alles, was kaputtging. Zwei Jahre lang habe ich gelernt, wie Systeme ausfallen, bevor ich gelernt habe, sie zu bauen. Nebenbei habe ich Entwicklungsaufträge übernommen, und das gab mir den Mut, mich auf eine Junior-Stelle zu bewerben.',
        'Danach war ich zwei Jahre bei einem Chatbot-Unternehmen, habe APIs in C# und JavaScript geschrieben, Abläufe automatisiert und Systeme für große Kunden aus Pharma und Handel integriert. In dieser Zeit erhielt ich ein Stipendium, um an der Technischen Hochschule Deggendorf zu studieren und zu arbeiten. Das hat meine Sicht auf Software verändert und mir den Weg zur internationalen Arbeit geöffnet.',
        'Seit 2023 arbeite ich bei Thinklogic, einer US-amerikanischen Beratung, wo ich Webplattformen für Kunden aus Industrie, Recht, globaler Gesundheit und Forschung leite und baue.',
      ],
      principles: [
        {
          title: 'Erst messen, dann optimieren',
          body: 'Performance-Arbeit ohne Daten echter Nutzer ist Raten. Ich mache Benchmarks, bevor ich mich für eine Architektur entscheide, und prüfe sie nach dem Release am echten Produktions-Traffic.',
        },
        {
          title: 'Architektur vor Raffinesse',
          body: 'Ich setze lieber auf schlichte, wartbare Muster, die ein Team auch in zwei Jahren noch versteht, als auf cleveren Code, der nur funktioniert, solange ich mich an das Warum erinnere.',
        },
        {
          title: 'Den ganzen Weg verantworten',
          body: 'Von den Anforderungen bis zum Deployment. Backend und Infrastruktur zu kennen, macht mich zu einem besseren Frontend-Entwickler, nicht zu einem abgelenkten.',
        },
      ],
      languages: [
        { name: 'Portugiesisch', level: 'Muttersprache' },
        { name: 'Englisch', level: 'Muttersprachliches Niveau' },
        { name: 'Deutsch', level: 'Mittelstufe' },
        { name: 'Italienisch', level: 'Grundkenntnisse' },
      ],
    },

    work: {
      chatsworth: {
        product: 'Unternehmenswebsite und Produktkatalog eines Herstellers von Rechenzentrums-Hardware',
        role: 'Lead Developer',
        highlights: [
          'Die vorab geladene Nuxt-Architektur entworfen und gebaut, die eine veraltete SPA ablöste. Sie generiert über 13.000 Routen statisch mit Lighthouse 90+ und nimmt dem Backend die Last gewöhnlicher Seitenaufrufe ab.',
          'Ohne Ausfallzeit migriert, bei über 400.000 Nutzern und über 35 Mio. Anfragen pro Monat. Die alte Plattform lief weiter, bis die letzte Route umgezogen war.',
          'Das Hosting von Azure auf Cloudflare Pages, Workers, KV und R2 umgestellt, mit gestaffeltem Prerendering und einer Datenmigration von Cosmos DB nach KV.',
          'Azure Search durch eine föderierte Algolia-Autovervollständigung ersetzt, angebunden an GTM und GA4, und die Steuerung des Rankings an das Marketing-Team übergeben.',
          'Eine maschinelle Übersetzungspipeline für Spanisch und vereinfachtes Chinesisch gebaut, die DeepL und Google im A/B-Test vergleicht, Übersetzungen zwischenspeichert, damit unveränderter Text nie zweimal bezahlt wird, und Kostenlimits pro Build durchsetzt.',
        ],
      },
      jnd: {
        product: 'Unternehmenswebsite und Informationsseiten zu einzelnen Verfahren für einen Dienstleister in der Verfahrensadministration',
        role: 'Hauptentwickler, vom ersten Commit an',
        highlights: [
          'jndla.com von Grund auf gebaut: Content-Modell, Seitenvorlagen, Vorschau und Bearbeitung per Smart Link, Weiterleitungen sowie Bicep-Infrastruktur mit UAT- und Produktions-Pipelines.',
          'Neue Builds beim Veröffentlichen über einen Azure-Functions-Webhook, mit einer Ruhephase, damit eine Reihe von Änderungen nur einen Build auslöst.',
          'Ein Zweierteam durch ein Redesign mit Migration von 40 Seiten in 21 Tagen geführt, neun Tage vor einer festen Deadline.',
          'Die Informationsseiten mit Security-Headern und einer nonce-basierten Content Security Policy abgesichert.',
        ],
      },
      exemplars: {
        product: 'Forschungsplattform für öffentliche Gesundheit, ein Programm von Gates Ventures',
        role: 'Aktivster Entwickler',
        highlights: [
          'Hauptentwickler beim Umstieg auf Nuxt und Kontent.ai: Narrative, Fallstudien, zentrale Erkenntnisse und datenbasierte Evidenzblöcke.',
          'Die facettierte Suchseite gebaut und die Neuaufbauzeit des Suchindex verkürzt.',
          'Webhook-gesteuerte Cache-Invalidierung, damit Redakteure veröffentlichte Änderungen ohne komplettes Deployment sehen.',
        ],
      },
      manatt: {
        product: 'Website einer landesweit tätigen Kanzlei und Unternehmensberatung',
        role: 'Aktivster Entwickler',
        highlights: [
          'Eine seitenweite unscharfe Suche auf Azure AI Search gebaut, mit Neuaufbau der Indizes und Filtern.',
          'Webhook-gesteuertes Leeren des CDN und Caching von Anfragen.',
          'Eine Normalisierungsschicht nach dem Factory-Muster gebaut, die zwei CMS-Plattformen und zwei Datenbanken in einem typisierten Schema für das Frontend vereint.',
        ],
      },
      addi: {
        product: 'Plattform für Forschungsdaten zur Alzheimer-Krankheit',
        role: 'Entwickler',
        highlights: [
          'Die ersten Seiten der V2-Website gebaut: Team- und Publikationslisten, Fallstudien, Navigation.',
          'Eine technische SEO-Überarbeitung in zwei Phasen geleitet: strukturierte Daten mit JSON-LD und FAQ, Meta-Beschreibungen, responsive Bilder.',
        ],
      },
      'ticket-clinic': {
        product: 'Headlight, ein internes Fallverwaltungssystem für eine Kanzlei für Verkehrsrecht',
        role: 'Full-Stack-Entwickler',
        highlights: [
          'Das Reporting komplett gebaut: ein Dashboard und acht operative Berichte mit PDF-Ausgabe, von den .NET-Berichtsdiensten bis zur Angular-Oberfläche.',
          'Zentrale Funktionen des juristischen Workflows gebaut: den Kalender für Verfahrensabschlüsse, Regeln und Validierung für Ratenzahlungen sowie rollenbasierte Berechtigungen.',
          'Eng mit dem React-Native-Client und den Kiosk-Apps zusammengearbeitet, die dieselben Plattform-APIs nutzen.',
        ],
      },
      'inside-lb': {
        product: 'Lokale Nachrichtenseite für Long Beach',
        role: 'Mitwirkender',
        highlights: ['Strukturierte Daten mit JSON-LD, kanonische URLs und Lighthouse-Korrekturen für bessere Sichtbarkeit in Suchmaschinen ergänzt.'],
      },
    },

    projects: {
      'expense-tracker': {
        summary: 'Ein persönlicher Ausgaben-Tracker mit KI-gestützter Dateneingabe.',
        highlights: [
          'Beleg oder Rechnung hochladen, und das Formular füllt sich selbst aus; eine Beschreibung eintippen, und die Kategorie wird vorgeschlagen.',
          'Monorepo mit typisierter API, Infrastructure as Code und Tests für die CDK-Templates.',
        ],
      },
      'mtg-oracle': {
        summary: 'Ein Sprachassistent, der Regelfragen zu Magic: The Gathering beantwortet.',
        highlights: [
          'Antworten per Retrieval-Augmented Generation, gestützt auf die offiziellen Comprehensive Rules und ausgeführt auf einem lokalen Modell.',
          'Mobile Client in React Native mit Spracheingabe.',
        ],
      },
      rena: {
        summary: 'Ein soziales Netzwerk, um Filme, Serien, Bücher und Spiele zu bewerten und zu diskutieren.',
        highlights: [
          'Eine Identität für alle Medienarten, mit Freunden, Listen, Rezensionen und Diskussionen.',
          'Bezieht Katalogdaten aus mehreren öffentlichen Medien-APIs, mit Fallbacks zwischen ihnen.',
        ],
      },
    },

    experience: {
      thinklogic: {
        role: 'Softwareentwickler',
        location: 'Remote, USA',
        summary:
          'Full-Stack-Entwickler bei einer US-amerikanischen Softwareberatung, wo ich Webplattformen für Unternehmenskunden leite und baue. Die Kundenprojekte stehen oben im Detail.',
        points: [
          'Lead Developer von chatsworth.com: über 400.000 Nutzer und über 35 Mio. Anfragen pro Monat, über 13.000 Seiten mit Lighthouse 90+.',
          'jndla.com vom ersten Commit an gebaut und die Migration der 40 Seiten vor dem Termin abgeschlossen.',
          'Suche, Caching und SEO für sieben Kundenplattformen mit Nuxt, Kontent.ai und Azure umgesetzt.',
          'Full-Stack-Entwicklung mit C#, .NET und Angular an einem internen Fallverwaltungssystem.',
        ],
      },
      'take-blip': {
        role: 'Chatbot-Entwickler',
        location: 'Brasilien',
        summary: 'Chatbots und Backend-APIs für Unternehmenskunden aus Gesundheit, Handel und Finanzen.',
        points: [
          'Teil eines Teams, dessen Chatbots über 3.000 Interaktionen pro Minute verarbeiteten.',
          'APIs in C#, .NET und JavaScript gebaut, die die Backends der Kunden in Echtzeit mit den Gesprächsabläufen verbinden.',
          'Automatisierte Tests, Code-Quality-Gates und Sicherheitsberichte in die CI-Pipeline eingebaut.',
          'Direkt mit den IT-, Marketing- und Vertriebsverantwortlichen der Kunden zusammengearbeitet, um die Umsetzung an den Geschäftszielen auszurichten.',
        ],
      },
      freelance: {
        role: 'Full-Stack-Entwickler',
        location: 'Brasilien',
        summary: 'In sechs Monaten fünf Websites konzipiert, gebaut und veröffentlicht, jeweils komplett.',
        points: [
          'Einziger Entwickler in jedem Projekt, von Anforderungen und Design bis zu Datenbanken und Deployment.',
          'Eine Plattform für eine Immobilienagentur mit React, Python und Django gebaut.',
          'Die Website eines Personal Trainers mit Node.js gebaut.',
        ],
      },
      'grupo-gmaes': {
        role: 'IT-Praktikant',
        location: 'Itajaí, Brasilien',
        summary: 'IT-Support für Linux- und Windows-Server, Netzwerke und interne Systeme.',
        points: [
          'Probleme in E-Mail-Systemen, an Rechnern, in Netzwerken und in der Infrastruktur analysiert und behoben.',
          'Berichte und Monitoring für wiederkehrende Systemprobleme übernommen.',
        ],
      },
    },
  },
}
