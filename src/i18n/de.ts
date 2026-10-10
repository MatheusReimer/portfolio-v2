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
    workflow: {
      title: 'KI-Workflow',
      lede: 'Den Großteil meiner Entwicklungsarbeit mache ich inzwischen mit KI-Agenten, im Job und in eigenen Projekten. Mit der Zeit habe ich einen Kreislauf um sie herum gebaut. Die meisten Tools darin sind mein eigener Code; die als übernommen markierten sind Open Source.',
      listLabel: 'Workflow-Schritte',
      built: 'eigen',
      adopted: 'übernommen',
      loop: 'zurück zum Gedächtnis. Jede Runde startet mit dem, was die letzte gelernt hat.',
      graphLabel: 'Diagramm des Kreislaufs: Gedächtnis, Planung, Umsetzung, Prüfung, Messung und Lernen, wobei das Lernen zurück ins Gedächtnis fließt. Ich gebe den Plan und die Lektionen frei.',
      me: 'ich',
      approves: 'prüfe + lenke',
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

    workflow: {
      memory: {
        title: 'Ein Gedächtnis, das mitwächst',
        body: 'Ein Agent beginnt jede Sitzung, ohne etwas über das Projekt zu wissen. Deshalb lädt jeder zwei Dateien: meine allgemeinen Vorlieben und die Notizen zu diesem Projekt. Wenn ich einen Fehler korrigiere, wird die Korrektur als Regel festgehalten. Ein Hook warnt mich, wenn ein Projekt keine Gedächtnisdatei hat oder sie so lang geworden ist, dass sie mehr Tokens kostet, als sie spart.',
      },
      plan: {
        title: 'Pläne, die ich anklicken kann',
        body: 'Bevor Code entsteht, schreibt der Agent den Plan auf eine HTML-Seite, die sich direkt in meinem Terminal öffnet. Ich kommentiere Teile davon, zitiere Zeilen zurück und wähle zwischen Optionen. Er liest mein Feedback über eine kleine CLI und überarbeitet. Eine falsche Annahme hier zu finden ist viel günstiger als in einem Pull Request.',
      },
      build: {
        title: 'Drei Worker gleichzeitig',
        body: 'Wenn sich eine Anfrage in unabhängige Teile zerlegen lässt, gibt ein Kommandeur-Agent jeden Teil an einen Worker. Jeder Worker bekommt seinen eigenen Git-Worktree und seinen eigenen Terminalbereich, damit sie sich nicht in die Quere kommen. Bis zu drei laufen gleichzeitig. Ich lese, was sie berichten, statt ihnen beim Tippen zuzusehen.',
      },
      validate: {
        title: 'Nichts wird auf Vertrauen ausgeliefert',
        body: 'Jede Änderung durchläuft ein lokales Gate, bevor sie ein Pull Request wird: Rebase, ein Review durch einen frischen Agenten, der sie zu brechen versucht, Tests, Lint und dann CI. Für Bugs habe ich eine eigene Regel. Erst den Fehler durchgängig reproduzieren, dann die Lösung auf dieselbe Weise bestätigen.',
      },
      measure: {
        title: 'Wissen, was es kostet',
        body: 'Munitorum liest jedes Agenten-Transkript in SQLite ein und berechnet die Tokens so, wie die Rechnung es tut. Teuer ist meistens der Kontext: Eine große Datei, die früh in einer Sitzung gelesen wird, wird in jeder späteren Runde erneut bezahlt. Es ordnet diese Art von Verschwendung, und ein Hook warnt den Agenten mitten in der Sitzung, wenn ein einzelnes Tool-Ergebnis zu groß ist.',
      },
      learn: {
        title: 'Den Kreis schließen',
        body: 'Einmal pro Woche geht der Agent seine eigenen teuersten Sitzungen durch und schlägt Lektionen auf einer War-Table-Seite vor. Einige behalte ich, den Rest verwerfe ich. Die behaltenen fließen zurück ins Gedächtnis, und die nächste Sitzung startet mit ihnen.',
      },
    },

    workflowNotes: {
      terminal: {
        title: 'Alles passiert im Terminal',
        body: [
          'Ich arbeite in Wave Terminal und habe dafür eine Seitenleiste gebaut. Claude-Code-Hooks melden sich bei einem kleinen lokalen Server, sodass ich auf einen Blick sehe, welche Sitzungen arbeiten und welche auf mich warten, was die Warband-Worker gerade tun und wie viele Tokens ich heute im Vergleich zum Wochenschnitt verbraucht habe. Meine Projekte liegen dort auch, mit Aktionen per Klick.',
          'Der Server nimmt nur Verbindungen von meinem eigenen Rechner an, und jeder Aufruf braucht ein Token. Die meisten Prompts diktiere ich, statt sie zu tippen.',
        ],
      },
      crew: {
        title: 'Jedes Modell, eine Truppe',
        body: [
          'Ich binde die Arbeit nicht an ein Modell. Claude Code ist heute mein Hauptwerkzeug, und die Tools, die ich gebaut habe, laufen darauf. Aber GNHF kann dieselbe Aufgabe an Claude, Copilot oder Codex geben, Gemini ist ebenfalls eingerichtet, und die Projektregeln stehen in AGENTS.md, einer einfachen Datei, die die meisten Coding-Agenten ohnehin lesen.',
          'Deshalb sehe ich die Agenten als Truppe, nicht als Lieblingswerkzeug. Jeder wird für die Aufgabe ausgewählt, die gerade ansteht, und kann morgen ersetzt werden. Ich bin der Kommandeur: Ich setze das Ziel, gebe den Plan frei und beurteile, was zurückkommt.',
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
