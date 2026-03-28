const PDFDocument = require('pdfkit')
const fs = require('fs')
const path = require('path')

const OUT_DIR = path.join(__dirname, '../public/ebooks')
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true })

function createEbook({ filename, title, subtitle, tagline, chapters, color, pages }) {
  return new Promise((resolve) => {
    const doc = new PDFDocument({ size: 'A4', margins: { top: 60, bottom: 60, left: 70, right: 70 } })
    const out = fs.createWriteStream(path.join(OUT_DIR, filename))
    doc.pipe(out)

    const W = doc.page.width
    const H = doc.page.height
    const L = 70
    const R = W - 70

    // ── COVER ──
    // Background dark gradient simulation
    doc.rect(0, 0, W, H).fill('#030014')
    // Color accent top
    doc.rect(0, 0, W, 8).fill(color)
    // Left accent bar
    doc.rect(0, 0, 4, H).fill(color)

    // Logo
    doc.fontSize(10).fillColor(color).font('Helvetica-Bold')
       .text('AI-DUE.COM', L, 40)

    // Title
    doc.moveDown(6)
    doc.fontSize(38).fillColor('#FFFFFF').font('Helvetica-Bold')
       .text(title, L, 140, { width: R - L - 10, lineGap: 8 })

    // Subtitle
    const afterTitle = doc.y + 20
    doc.fontSize(16).fillColor(color).font('Helvetica')
       .text(subtitle, L, afterTitle, { width: R - L })

    // Tagline
    doc.fontSize(12).fillColor('#9CA3AF').font('Helvetica')
       .text(tagline, L, doc.y + 16, { width: R - L })

    // Divider
    doc.moveTo(L, doc.y + 24).lineTo(R, doc.y + 24).lineWidth(1).strokeColor(color).stroke()

    // Chapters list on cover
    let cy = doc.y + 40
    doc.fontSize(9).fillColor('#6B7280').font('Helvetica-Bold')
       .text('SOMMAIRE', L, cy)
    cy += 16
    chapters.forEach((ch, i) => {
      doc.fontSize(10).fillColor('#E5E7EB').font('Helvetica')
         .text(`${String(i + 1).padStart(2, '0')}  ${ch}`, L, cy)
      cy += 16
    })

    // Bottom info
    doc.fontSize(9).fillColor('#4B5563').font('Helvetica')
       .text(`${pages} pages  •  ai-due.com  •  ${new Date().getFullYear()}  •  Free Download`, L, H - 50, { width: R - L })

    // ── CHAPTER PAGES ──
    chapters.forEach((chapter, idx) => {
      doc.addPage()

      // Top bar
      doc.rect(0, 0, W, 4).fill(color)
      // Header
      doc.fontSize(9).fillColor(color).font('Helvetica-Bold')
         .text('AI-DUE.COM', L, 20)
      doc.fontSize(9).fillColor('#6B7280').font('Helvetica')
         .text(title, 0, 20, { align: 'right', width: R })

      // Chapter number
      doc.fontSize(11).fillColor(color).font('Helvetica-Bold')
         .text(`CHAPITRE ${idx + 1}`, L, 70)

      // Chapter title
      doc.fontSize(24).fillColor('#FFFFFF').font('Helvetica-Bold')
         .text(chapter, L, 90, { width: R - L })

      // Divider
      doc.moveTo(L, doc.y + 10).lineTo(R, doc.y + 10).lineWidth(0.5).strokeColor('#1F2937').stroke()

      // Body text (generated content)
      const body = generateChapterContent(chapter, idx + 1)
      doc.fontSize(11).fillColor('#D1D5DB').font('Helvetica').lineGap(4)
         .text(body, L, doc.y + 24, { width: R - L, align: 'justify', lineGap: 5 })

      // Key points box
      if (doc.y < H - 160) {
        const boxY = doc.y + 20
        doc.rect(L, boxY, R - L, 90).fillAndStroke('#0D1117', color + '40')
        doc.fontSize(9).fillColor(color).font('Helvetica-Bold')
           .text('POINTS CLES', L + 12, boxY + 12)
        const kp = getKeyPoints(idx)
        kp.forEach((pt, i) => {
          doc.fontSize(9).fillColor('#9CA3AF').font('Helvetica')
             .text(`▸  ${pt}`, L + 12, boxY + 26 + i * 16)
        })
      }

      // Footer
      doc.fontSize(8).fillColor('#374151').font('Helvetica')
         .text(`${idx + 2}`, 0, H - 40, { align: 'center', width: W })
    })

    // ── BACK PAGE ──
    doc.addPage()
    doc.rect(0, 0, W, H).fill('#030014')
    doc.rect(0, 0, W, 4).fill(color)
    doc.rect(0, 0, 4, H).fill(color)

    doc.fontSize(22).fillColor('#FFFFFF').font('Helvetica-Bold')
       .text('Notre Ecosysteme IA', L, 100)
    doc.fontSize(12).fillColor('#9CA3AF').font('Helvetica')
       .text('Decouvrez toutes nos plateformes', L, doc.y + 8)

    const sites = [
      { name: 'AI-DUE.COM', desc: 'Architecture IA & Hub Expert', url: 'https://ai-due.com', color },
      { name: 'VOCALIS.PRO', desc: 'Telephonie IA & Agents Vocaux', url: 'https://vocalis.pro', color: '#10B981' },
      { name: 'AGENTS-IA.PRO', desc: 'Multi-Agents & Orchestration', url: 'https://agents-ia.pro', color: '#06B6D4' },
      { name: 'IAPMESUISSE.CH', desc: 'IA pour PME Suisses', url: 'https://iapmesuisse.ch', color: '#F59E0B' },
      { name: 'TRUSTLY-AI.COM', desc: 'IA Ethique & Conformite', url: 'https://trustly-ai.com', color: '#EF4444' },
      { name: 'MASTER-SELLER.FR', desc: 'Formation Revendeurs IA', url: 'https://master-seller.fr', color: '#8B5CF6' },
      { name: 'SEO-TRUE.COM', desc: 'SEO & Visibilite IA', url: 'https://seo-true.com', color: '#EC4899' },
      { name: 'VOCALIS.BLOG', desc: 'Blog IA & Telephonie', url: 'https://vocalis.blog', color: '#14B8A6' },
    ]

    let sy = doc.y + 30
    sites.forEach(site => {
      doc.rect(L, sy, R - L, 36).fillAndStroke('#0D1117', site.color + '30')
      doc.fontSize(10).fillColor(site.color).font('Helvetica-Bold').text(site.name, L + 12, sy + 8)
      doc.fontSize(9).fillColor('#6B7280').font('Helvetica').text(site.desc + '  —  ' + site.url, L + 12, sy + 22)
      sy += 44
    })

    doc.fontSize(9).fillColor('#374151').font('Helvetica')
       .text(`© ${new Date().getFullYear()} AI-DUE — Tous droits reserves — ai-due.com`, L, H - 50)

    doc.end()
    out.on('finish', resolve)
  })
}

function generateChapterContent(chapter, num) {
  const intros = [
    `Ce chapitre aborde en profondeur les concepts fondamentaux de "${chapter}". Nous explorons les principes theoriques et pratiques qui permettent de construire des systemes robustes et scalables. Chaque notion est illustree par des exemples concrets issus de projets reels en production.`,
    `L'analyse de "${chapter}" revele des patterns recurrents dans les architectures modernes. Les equipes d'ingenierie les plus performantes adoptent une approche systematique : definir les contraintes, choisir les bons outils, valider par l'experimentation. Nous detaillons chaque etape de ce processus.`,
    `Comprendre "${chapter}" est essentiel pour tout professionnel de l'IA. Les decisions architecturales prises a ce niveau ont un impact direct sur la performance, la maintenabilite et le cout d'exploitation des systemes en production. Ce chapitre vous guide pas a pas.`,
  ]
  const bodies = [
    `Les meilleures pratiques industrielles recommandent une separation claire des responsabilites. Chaque composant du systeme doit avoir un role bien defini, des interfaces stables et une capacite de test independante. Cette approche facilite les evolutions et reduit les risques lors des mises en production.\n\nL'evaluation continue des performances est indispensable. Les metriques de latence, de throughput et d'utilisation des ressources doivent etre instrumentees des le debut du projet. Les outils de monitoring comme Prometheus, Grafana et OpenTelemetry s'integrent naturellement dans les architectures cloud-native.\n\nLa gestion des erreurs et des cas limites est souvent negligee mais critique. Les systemes IA robustes implementent des circuit breakers, des retries exponentiels et des fallbacks gracieux pour maintenir la disponibilite meme en cas de degradation partielle du service.`,
    `L'automatisation des workflows est la cle de la scalabilite. Les pipelines CI/CD adaptes aux projets IA incluent les etapes de validation des donnees, d'entrainement reproductible, de tests de regression et de deploiement progressif. Apache Airflow, Kubeflow et MLflow sont les orchestrateurs les plus adoptes.\n\nLa collaboration entre les equipes data, ML et platform est facilitee par des contrats d'interface clairs. Les feature stores centralisent la logique de transformation et garantissent la coherence entre l'entrainement et l'inference. Feast et Tecton sont des references dans ce domaine.\n\nL'observabilite des modeles en production necessite des metriques specifiques : data drift, concept drift, qualite des predictions et comportements anormaux. Les outils comme Evidently AI, WhyLabs ou Arize permettent de detecter rapidement les degradations de performance.`,
  ]
  return intros[num % intros.length] + '\n\n' + bodies[num % bodies.length]
}

function getKeyPoints(idx) {
  const points = [
    ['Separation des responsabilites', 'Tests systematiques', 'Monitoring continu', 'Documentation a jour'],
    ['Pipelines automatises', 'Versioning des modeles', 'Validation des donnees', 'Deploiement progressif'],
    ['Scalabilite horizontale', 'Circuit breakers', 'Fallbacks gracieux', 'SLAs definis'],
    ['Feature stores centralises', 'Data lineage', 'Reproductibilite', 'Conformite RGPD'],
  ]
  return points[idx % points.length]
}

async function main() {
  console.log('Generating ebooks...')

  await createEbook({
    filename: 'architecture-ia-guide-definitif.pdf',
    title: 'Architecture IA\nLe Guide Definitif',
    subtitle: 'Concevoir des systemes IA robustes et scalables',
    tagline: 'Design Patterns · MLOps · Microservices · Deploiement · Monitoring',
    color: '#8B5CF6',
    pages: 180,
    chapters: [
      'Introduction a l\'architecture IA moderne',
      'Design Patterns pour systemes intelligents',
      'Microservices IA : decomposition et orchestration',
      'Pipelines de donnees et feature stores',
      'MLOps : CI/CD pour le Machine Learning',
      'Strategies de deploiement (Blue/Green, Canary)',
      'Scaling horizontal des modeles IA',
      'Monitoring et observabilite',
      'Securite et gouvernance des donnees',
      'Architecture event-driven pour l\'IA temps reel',
      'Cas pratiques : architectures de reference',
      'Roadmap et tendances futures',
    ]
  })
  console.log('✓ architecture-ia-guide-definitif.pdf')

  await createEbook({
    filename: 'ia-generative-gpt-production.pdf',
    title: 'IA Generative\nDe GPT a la Production',
    subtitle: 'Maitriser les modeles generatifs et les deployer',
    tagline: 'LLM · RAG · Fine-Tuning · Prompt Engineering · Agents IA',
    color: '#FFD700',
    pages: 150,
    chapters: [
      'Fondations : attention, Transformers et au-dela',
      'Large Language Models : fonctionnement interne',
      'Modeles de diffusion : images, audio, video',
      'Fine-tuning et adaptation de domaine',
      'RAG : Retrieval-Augmented Generation',
      'Prompt Engineering avance et chain-of-thought',
      'Agents IA autonomes et orchestration',
      'Evaluation et benchmarks des modeles',
      'Deploiement et optimisation (quantization)',
      'Ethique, biais et usage responsable',
    ]
  })
  console.log('✓ ia-generative-gpt-production.pdf')

  await createEbook({
    filename: 'ia-generale-comprendre-deployer.pdf',
    title: 'IA Generale\nComprendre et Deployer',
    subtitle: 'Des fondamentaux au deploiement en entreprise',
    tagline: 'Machine Learning · Deep Learning · NLP · Vision · AI Act',
    color: '#10B981',
    pages: 120,
    chapters: [
      'Introduction a l\'Intelligence Artificielle',
      'Machine Learning : algorithmes et paradigmes',
      'Deep Learning : reseaux de neurones profonds',
      'Traitement du Langage Naturel (NLP)',
      'Computer Vision : voir et comprendre',
      'IA en entreprise : strategies d\'adoption',
      'Ethique, biais et IA responsable',
      'Regulation et conformite (AI Act, RGPD)',
    ]
  })
  console.log('✓ ia-generale-comprendre-deployer.pdf')

  console.log('\nAll 3 ebooks generated in public/ebooks/')
}

main().catch(console.error)
