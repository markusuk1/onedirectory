import type { Guide } from "./guides";
import { getGuideRegion, type GuideRegion } from "./guide-regions";

function generate(r: GuideRegion): Guide[] {
  return [
    {
      slug: `plant-hire-guide-${r.slug}`,
      title: `Plant Hire ${r.mainCity}`,
      metaTitle: `Plant Hire ${r.mainCity} | Prices, Tips & Best Companies (2026)`,
      metaDescription: `Need plant hire in ${r.mainCity}? Compare prices for diggers, excavators and construction equipment from local hire companies.`,
      h1: `Plant Hire Guide for ${r.mainCity} & ${r.theName}`,
      intro: `Whether you are a builder, landscaper or homeowner tackling a big project, hiring the right plant equipment saves time and money. This guide covers plant hire options across ${r.theName}, including prices, equipment types and what to look for in a hire company.`,
      sections: [
        {
          heading: `Plant Hire Prices in ${r.theName}`,
          content: `Plant hire prices in ${r.theName} vary by equipment type and hire duration. A micro digger (under 1 tonne) typically costs £80-£120 per day or £300-£450 per week. A mini digger (1.5-3 tonnes) costs £120-£180 per day or £450-£700 per week. Full-size excavators (8-14 tonnes) cost £250-£400 per day. Dumpers range from £60-£150 per day depending on size. Cherry pickers and access platforms cost £100-£250 per day. Most companies in ${r.areas} offer discounted weekly and monthly rates. Delivery and collection charges apply and are typically £50-£150 each way depending on distance.`,
        },
        {
          heading: "Types of Plant Equipment Available",
          content: `The most commonly hired plant in ${r.theName} includes mini and micro diggers for driveways, foundations and garden landscaping. Tracked excavators for larger earthmoving projects. Site dumpers for moving soil, rubble and materials. Telehandlers for lifting and placing materials at height on construction and farm sites. Cherry pickers and scissor lifts for working at height. Road rollers and plate compactors for groundwork and driveways. Concrete mixers and pumps for foundations and floor slabs. Skip loading equipment and grab lorries for waste removal.`,
        },
        {
          heading: "Operated vs Self-Drive Hire",
          content: `Plant hire in ${r.theName} is available as self-drive (you operate the machine) or operated (the hire company provides a trained driver). Self-drive hire is cheaper but you need the appropriate training card, typically a CPCS (Construction Plant Competence Scheme) or NPORS card for construction sites. For homeowners doing garden or driveway work, many hire companies offer a brief induction on smaller machines like micro diggers. Operated hire costs more per day but includes an experienced operator who can work faster and more safely. For larger machines over 3 tonnes, operated hire is strongly recommended if you lack experience.`,
        },
        {
          heading: "What to Check Before Hiring Plant",
          content: `Before hiring plant equipment in ${r.theName}, check that the hire company maintains their equipment regularly and can provide maintenance records. Confirm what insurance is included, as you may be liable for damage to the machine. Check the delivery and collection arrangements, including site access for the delivery vehicle. Make sure you have the right ground conditions for the equipment, as tracked machines can damage soft lawns and tarmac. Ask about fuel requirements and whether fuel is included in the hire price. For road-going plant, check it has a current MOT and road tax. Reputable companies in ${r.areas} will inspect the machine before delivery and provide an operator manual.`,
        },
      ],
      faq: [
        { question: `How much does plant hire cost in ${r.theName}?`, answer: `A mini digger costs £120-£180 per day. Cherry pickers cost £100-£250 per day. Weekly rates offer better value for longer projects.` },
        { question: "Do I need a licence to operate a mini digger?", answer: "On construction sites you need a CPCS or NPORS card. For domestic use, most hire companies offer a brief induction on smaller machines." },
      ],
      relatedLocations: r.locations,
      keywords: [`plant hire ${r.mainCity.toLowerCase()}`, `digger hire ${r.mainCity.toLowerCase()}`, `mini digger hire ${r.mainCity.toLowerCase()}`],
      product: "plant-hire",
    },
    {
      slug: `mini-digger-hire-guide-${r.slug}`,
      title: `Mini Digger Hire ${r.mainCity}`,
      metaTitle: `Mini Digger Hire ${r.mainCity} | Prices & Top Companies (2026)`,
      metaDescription: `Need a mini digger in ${r.mainCity}? Compare hire prices, find local plant hire companies and get the right machine for your project.`,
      h1: `Mini Digger Hire Guide for ${r.mainCity} & ${r.theName}`,
      intro: `Mini diggers are the most popular piece of hired plant equipment in the UK, perfect for everything from garden landscaping to foundation digging. This guide covers mini digger hire options across ${r.theName}.`,
      sections: [
        {
          heading: `Mini Digger Hire Prices in ${r.theName}`,
          content: `Mini digger hire prices in ${r.theName} depend on the size of machine and hire duration. A micro digger (0.8-1 tonne) suitable for tight access garden work costs £80-£120 per day. A 1.5 tonne mini digger, the most popular size for domestic projects, costs £120-£160 per day or £400-£600 per week. A 3 tonne mini digger for larger projects costs £150-£200 per day. Most hire companies in ${r.areas} charge separately for delivery and collection, typically £50-£120 each way. Weekly hire offers the best value if your project will take more than two to three days.`,
        },
        {
          heading: "Choosing the Right Size Mini Digger",
          content: `The right size depends on your project and site access. Micro diggers under 1 tonne can fit through standard garden gates (as narrow as 750mm) and are ideal for small garden landscaping, fence post holes and drainage trenches. 1.5 tonne diggers handle most domestic projects including driveways, extensions and ponds. 3 tonne diggers are more powerful and efficient for larger earthmoving jobs but need wider access. Consider the depth you need to dig: micro diggers reach about 1.5m deep, 1.5 tonne machines reach 2.2m, and 3 tonne machines reach 2.8m or more.`,
        },
        {
          heading: "Tips for Hiring and Using a Mini Digger",
          content: `If you have not used a mini digger before, ask the hire company for a full handover and induction. Practice on open ground before working near walls, pipes or cables. Always check for underground services before digging — you can order plans from the utility companies or use a cable avoidance tool (CAT scanner), which many hire companies also supply. Keep bystanders well clear of the working area. Do not overload the bucket, and always work on stable, level ground. If working on a slope, keep the tracks pointing up and down the slope, never across it. Cover excavations overnight with barriers and warning signs.`,
        },
      ],
      faq: [
        { question: `How much does plant hire cost in ${r.theName}?`, answer: `A mini digger costs £120-£180 per day. Cherry pickers cost £100-£250 per day. Weekly rates offer better value for longer projects.` },
        { question: "Do I need a licence to operate a mini digger?", answer: "On construction sites you need a CPCS or NPORS card. For domestic use, most hire companies offer a brief induction on smaller machines." },
      ],
      relatedLocations: r.locations,
      keywords: [`plant hire ${r.mainCity.toLowerCase()}`, `digger hire ${r.mainCity.toLowerCase()}`, `mini digger hire ${r.mainCity.toLowerCase()}`],
      product: "plant-hire",
    },
    {
      slug: `cherry-picker-hire-guide-${r.slug}`,
      title: `Cherry Picker Hire ${r.mainCity}`,
      metaTitle: `Cherry Picker Hire ${r.mainCity} | Prices & Access Platform Hire (2026)`,
      metaDescription: `Need a cherry picker in ${r.mainCity}? Compare access platform hire prices and find local companies for working at height.`,
      h1: `Cherry Picker & Access Platform Hire in ${r.mainCity} & ${r.theName}`,
      intro: `Cherry pickers and access platforms are essential for safe working at height, whether for tree surgery, building maintenance, painting or installations. This guide covers hire options across ${r.theName}.`,
      sections: [
        {
          heading: `Cherry Picker Hire Prices in ${r.theName}`,
          content: `Cherry picker and access platform hire in ${r.theName} varies by type and working height. A small trailer-mounted cherry picker with 12m working height costs £80-£150 per day. A self-propelled boom lift reaching 15-20m costs £150-£300 per day. Scissor lifts for indoor work cost £80-£180 per day. Truck-mounted cherry pickers with 20-40m reach are available from £250-£600 per day. Most hire companies in ${r.areas} offer weekly rates at three to four times the daily rate. Delivery and collection are charged separately, and operated hire with a trained driver costs extra but is recommended for larger machines.`,
        },
        {
          heading: "Choosing the Right Access Platform",
          content: `Consider the working height you need, the type of ground surface, and whether you need to work indoors or outdoors. Scissor lifts provide a stable, large platform for indoor work like warehouse maintenance and fitting. Articulated boom lifts are best for reaching over obstacles such as trees, walls or building projections. Trailer-mounted cherry pickers are easy to transport and ideal for occasional use on domestic properties. Truck-mounted platforms offer the greatest reach and are commonly used for tree surgery, telecommunications work and building facade maintenance. Always check the ground bearing capacity, as larger machines are heavy and can sink into soft ground.`,
        },
        {
          heading: "Safety and Licensing Requirements",
          content: `Working at height is one of the biggest causes of workplace injury. Anyone operating a cherry picker on a construction site needs an IPAF (International Powered Access Federation) licence. For domestic use, the hire company should provide a full induction. Always wear a harness attached to the platform anchor point. Check the weather conditions, as most cherry pickers should not be used in winds above 28mph. Inspect the machine before use, checking for hydraulic leaks, damaged controls and tyre condition. Set up on firm, level ground and use outriggers where fitted. Never exceed the safe working load of the platform.`,
        },
      ],
      faq: [
        { question: `How much does plant hire cost in ${r.theName}?`, answer: `A mini digger costs £120-£180 per day. Cherry pickers cost £100-£250 per day. Weekly rates offer better value for longer projects.` },
        { question: "Do I need a licence to operate a mini digger?", answer: "On construction sites you need a CPCS or NPORS card. For domestic use, most hire companies offer a brief induction on smaller machines." },
      ],
      relatedLocations: r.locations,
      keywords: [`plant hire ${r.mainCity.toLowerCase()}`, `digger hire ${r.mainCity.toLowerCase()}`, `mini digger hire ${r.mainCity.toLowerCase()}`],
      product: "plant-hire",
    },
  ];
}

export function getPlantGuides(): Guide[] {
  const region = getGuideRegion();
  if (!region) return [];
  return generate(region);
}
