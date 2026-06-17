import { Link } from 'react-router-dom';
import { usePageSEO } from '../lib/seo';

const stats = [
  { value: '22M+', label: 'Tons of gypsum produced annually (US)' },
  { value: '#1', label: 'World ranking in crude gypsum output' },
  { value: '47', label: 'Companies mining gypsum across 15+ US states' },
  { value: '~850°C', label: 'Heat required to convert limestone into quicklime' },
];

export default function PlasterArticlePage() {
  usePageSEO({
    title: 'The US is the World\'s Largest Plaster Producer — Why That Matters for Your San Antonio Home',
    description: 'America dominates global gypsum and lime plaster production. Learn how this supply advantage shapes stucco quality for San Antonio homes. Expert insights inside.',
    path: '/blog/us-largest-plaster-producer-san-antonio',
    type: 'article',
    rawTitle: true,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'The US is the World\'s Largest Plaster Producer — Why That Matters for Your San Antonio Home',
      description: 'America dominates global gypsum and lime plaster production. Learn how this supply advantage shapes stucco quality for San Antonio homes.',
      datePublished: '2025-05-28',
      dateModified: '2025-05-28',
      author: {
        '@type': 'Organization',
        name: 'San Antonio Stucco',
        url: 'https://sanantoniostucco.com',
      },
      publisher: {
        '@type': 'Organization',
        name: 'San Antonio Stucco',
        url: 'https://sanantoniostucco.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://sanantoniostucco.com/images/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://sanantoniostucco.com/blog/us-largest-plaster-producer-san-antonio',
      },
    },
  });

  return (
    <article className="pt-28 md:pt-36 pb-20 bg-stone-50">
      <div className="max-w-[820px] mx-auto px-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['Stucco', 'Building Materials', 'San Antonio'].map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium uppercase tracking-wide px-3 py-1 rounded-full bg-[#C47A45]/10 text-[#C47A45] border border-[#C47A45]/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="font-sans text-3xl md:text-4xl lg:text-[2.65rem] font-bold text-slate-900 leading-tight mb-4">
          The United States is the World's Largest Plaster Producer — Here's Why That Matters for Your San Antonio Home
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 font-serif italic">
          America's dominance in gypsum and lime plaster production has quietly shaped how homes across the Southwest are built, protected, and finished for over a century.
        </p>

        {/* Byline */}
        <div className="flex items-center justify-between py-4 border-t border-b border-slate-200 mb-12">
          <span className="text-sm text-slate-500 font-sans">San Antonio Stucco</span>
          <span className="text-sm text-slate-500 font-sans">Last updated: June 2025</span>
        </div>

        {/* Intro paragraphs */}
        <div className="article-body">
          <p>
            When you look at the exterior of a San Antonio home finished in stucco, you're looking at the result of a supply chain that starts deep underground in states like Texas, Nevada, Oklahoma, and Kansas — and ends with one of the most durable, breathable, and weather-resistant finishes available to any homeowner in the American Southwest.
          </p>
          <p>
            What most people don't realize is just how dominant the United States is as the world's source for the raw minerals that make plaster and stucco possible. According to the U.S. Geological Survey (USGS), the United States is the world's leading crude gypsum producer, outputting an estimated 22–23 million tons annually. No other country comes close to matching both the volume and the quality consistency of American-mined gypsum — and that supply advantage flows directly into the materials used on homes like yours.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-12">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-stone-100 border border-stone-200 rounded-xl p-5 text-center">
              <p className="text-2xl md:text-3xl font-bold text-slate-800 font-sans mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500 font-sans leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Section: What lime plaster actually is */}
        <div className="article-body">
          <h2>What lime plaster actually is — and why it works</h2>
          <p>
            Lime plaster is one of the oldest building materials on earth. At its most basic, it is a mixture of calcium hydroxide and an aggregate such as sand. The chemistry behind it is elegant: when limestone (calcium carbonate) is heated above approximately 850°C (1,560°F), it produces quicklime (calcium oxide). Water is then added to produce slaked lime — calcium hydroxide — which can be sold as a wet putty or white powder. When this material is applied to a surface and exposed to open air, it slowly absorbs carbon dioxide from the atmosphere, converting back into calcium carbonate. This process is what causes lime plaster to harden and gain strength over time.
          </p>
        </div>

        {/* Pull Quote */}
        <blockquote className="my-10 pl-6 border-l-4 border-[#C47A45]">
          <p className="text-lg md:text-xl font-serif italic text-slate-700 leading-relaxed">
            "The slow carbonation of lime is not a flaw in the material — it is the feature. A wall that continues to strengthen over months is a wall built to last generations."
          </p>
        </blockquote>

        <div className="article-body">
          <p>
            This curing process — known as carbonation — is also why lime plaster is considered a "breathing" wall material. Unlike modern synthetic coatings that form an impermeable film, lime allows moisture vapor to pass in and out of the wall assembly. In a climate like San Antonio's, where summers are brutally hot and humidity can spike dramatically, that breathability is not a luxury — it is structural protection.
          </p>

          {/* Section: Why lime stucco dominates */}
          <h2>Why lime stucco dominates the American Southwest</h2>
          <p>
            San Antonio sits in a climate zone that punishes the wrong exterior finishes. Extreme UV exposure, temperature swings between seasons, and periodic heavy rains create a demanding test for any wall coating. Lime-based stucco has been the answer in this region for over two centuries — long before modern synthetic alternatives existed — because its properties align almost perfectly with what the Southwest demands.
          </p>

          <h3>Thermal performance</h3>
          <p>
            Lime stucco has a low thermal conductivity, meaning it slows heat transfer through the wall. On a 100°F San Antonio afternoon, a properly applied lime stucco exterior measurably reduces the heat load on the interior — a benefit that synthetic acrylic coatings, which are thinner and more heat-conductive, cannot match at the same thickness.
          </p>

          <h3>Crack resistance and self-healing</h3>
          <p>
            One of the most underappreciated properties of lime plaster is its slight flexibility. Unlike rigid cement-based stucco, a properly formulated lime mix can accommodate minor building movement — the natural seasonal expansion and contraction of a wood or steel frame — without cracking. And when hairline cracks do occur, the ongoing carbonation process can partially self-seal them as calcium carbonate crystals form in the gap.
          </p>

          <h3>Antimicrobial surface</h3>
          <p>
            Lime maintains a naturally high pH, which makes its surface inhospitable to mold, mildew, and algae. In San Antonio's humid summers, this means a lime stucco exterior stays cleaner longer and does not develop the black streaking that plagues lower-quality synthetic finishes on neighboring homes.
          </p>

          {/* Section: Texas deposits */}
          <h2>Texas sits on some of America's richest gypsum and limestone deposits</h2>
          <p>
            The USGS consistently lists Texas among the leading gypsum-producing states in the United States, alongside Nevada, Kansas, and Oklahoma. This is no coincidence for San Antonio homeowners — it means that the raw materials going into your home's stucco finish are often sourced from the same geological region your home stands on. Domestic supply chains for lime and gypsum plaster are shorter, more consistent, and less subject to international pricing swings than almost any other construction material category.
          </p>
          <p>
            The majority of domestic gypsum consumption goes toward agriculture, cement production, and the manufacture of wallboard and plaster products — a combined total of approximately 44–45 million tons consumed annually when imports are factored in. The construction sector, including exterior stucco applications, represents one of the most materials-intensive uses of this supply.
          </p>

          {/* Section: Lath and plaster tradition */}
          <h2>The lath and plaster tradition — and what replaced it</h2>
          <p>
            For most of American residential construction history, lime plaster was the default wall finish — applied over a grid of thin wooden strips (lath) nailed to wall studs, a method known as lath and plaster construction. The plaster used in this system was almost entirely lime-based, with a cure time of roughly one month. Small amounts of plaster of Paris were added to stabilize the mix during curing, and chemical retardants were used to slow the fast set time of plaster of Paris enough to allow workers to manage large quantities on the job.
          </p>
          <p>
            Today, interior walls have largely shifted to drywall — sheets of gypsum plaster pressed between paper faces — which is faster to install. But for exterior applications, particularly in the high-UV, high-heat environments of Central and South Texas, lime stucco has not been displaced. The durability gap between a properly applied lime exterior finish and a spray-applied synthetic coating is measured not in years, but in decades.
          </p>

          {/* Section: What this means for hiring */}
          <h2>What this means when you hire a stucco contractor in San Antonio</h2>
          <p>
            Understanding the material is the first step to understanding the trade. A contractor who knows the chemistry of lime — the carbonation process, the importance of proper moisture during curing, the role of aggregate gradation in crack resistance — is a fundamentally different professional than one who is simply applying product from a bag.
          </p>
          <p>
            At San Antonio Stucco, every exterior application begins with a material assessment matched to your specific wall assembly, exposure orientation, and substrate condition. The United States produces the best plaster-grade raw materials in the world. The question is whether those materials are being applied by someone who understands why they work.
          </p>
        </div>

        {/* Sources */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h4 className="text-sm font-sans font-semibold text-slate-500 uppercase tracking-wide mb-3">Sources</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            [1] U.S. Geological Survey, Mineral Commodity Summaries — Gypsum (2021, 2022, 2024, 2025). Available at: pubs.usgs.gov/periodicals/mcs2024/mcs2024-gypsum.pdf<br />
            Production figures: United States estimated at 22–23 million tons of crude gypsum annually. Texas listed as a leading producing state. Domestic consumption approximately 44–45 million tons annually including imports.
          </p>
        </div>

        {/* Subtle CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/quote"
            className="text-sm text-[#C47A45] hover:text-[#a5623a] font-medium transition-colors underline underline-offset-4"
          >
            Get a free stucco inspection in San Antonio
          </Link>
        </div>
      </div>
    </article>
  );
}
