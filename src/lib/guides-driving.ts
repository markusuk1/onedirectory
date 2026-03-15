import type { Guide } from "./guides";
import { getGuideRegion, type GuideRegion } from "./guide-regions";

function generate(r: GuideRegion): Guide[] {
  return [
    {
      slug: `driving-lessons-guide-${r.slug}`,
      title: `Driving Lessons ${r.mainCity}`,
      metaTitle: `Driving Lessons ${r.mainCity} | How to Choose an Instructor (2026)`,
      metaDescription: `Looking for driving lessons in ${r.mainCity}? How to choose an instructor, what to expect from your first lesson, and tips for passing in ${r.theName}.`,
      h1: `Driving Lessons in ${r.mainCity} & ${r.theName}`,
      intro: `Learning to drive is a major milestone and choosing the right instructor makes all the difference. Whether you are a complete beginner or looking to switch instructors, this guide covers everything you need to know about driving lessons in ${r.theName}, from what to look for in an instructor to how many lessons you will need.`,
      sections: [
        ...(r.insights?.driving ? [{
          heading: `Driving Lessons in ${r.theName}: Local Market Insights`,
          content: r.insights.driving,
        }] : []),
        {
          heading: "How to Choose a Driving Instructor",
          content: `The most important factor is finding an instructor you feel comfortable with. A good instructor is patient, clear in their explanations, and adapts to your learning pace. Check that they are DVSA-approved (look for the green badge on the windscreen, which means they are a fully qualified Approved Driving Instructor). Trainee instructors display a pink badge and are still learning to teach, though they can be perfectly good. Read Google reviews from past pupils in ${r.theName} and ask for recommendations from friends or family who have recently passed. Most instructors offer a discounted first lesson so you can try before committing to a block booking.`,
        },
        {
          heading: "Manual vs Automatic Lessons",
          content: `This is one of the first decisions you will make. A manual licence allows you to drive both manual and automatic cars, while an automatic licence restricts you to automatics only. Automatic lessons are generally easier and many pupils pass in fewer lessons, saving money overall. The trend is strongly towards automatic, with automatic test passes overtaking manual for the first time in 2024. If you plan to drive company vehicles, older cars, or vehicles abroad, manual may still be worth considering. In ${r.theName}, most instructors offer both options, though automatic lesson availability is growing fast. Automatic lessons typically cost the same as manual or occasionally £1-£2 more per hour.`,
        },
        {
          heading: "How Many Lessons Will I Need?",
          content: `The DVSA says the average learner needs 45 hours of professional lessons plus 22 hours of private practice to pass. However, this varies hugely. Some pupils pass in 25-30 hours, while others need 60+. Your age, confidence, how often you practise between lessons, and whether you have any prior experience all affect the total. In ${r.theName}, most pupils book 1-2 lessons per week and take 6-12 months to become test-ready. More frequent lessons (2-3 per week) can speed things up. Intensive courses condense lessons into 1-2 weeks but are not suitable for everyone as they require sustained concentration and rapid skill development.`,
        },
        {
          heading: "What to Expect from Your First Lesson",
          content: `Your first lesson will start with the basics. Your instructor will cover the cockpit drill (mirrors, seat, steering wheel, seatbelt), the controls (clutch, brake, accelerator, gears for manual), and moving off and stopping on a quiet road. You will not be thrown into traffic on your first lesson. Most instructors start in quiet residential streets or car parks in ${r.mainCity} and gradually build up to busier roads as your confidence grows. Lessons are typically 1-2 hours long. Many pupils find 2-hour lessons more productive as you spend less time warming up and cover more ground per session.`,
        },
        {
          heading: "Tips for Passing Your Driving Test",
          content: `Book your theory test early. You must pass it before you can take the practical test, and it takes time to prepare. Use the official DVSA theory test app or book for practice. For the practical test, your instructor will tell you when you are ready. Trust their judgement as they want you to pass too. In the weeks before your test, practise on the routes around your test centre. Your instructor will know the common routes in ${r.theName}. On test day, drive as you would on a normal lesson. Minor faults are allowed (up to 15), but a single serious or dangerous fault is a fail. The most common reasons for failure are not checking mirrors, poor observation at junctions, and incorrect positioning on roundabouts.`,
        },
      ],
      faq: [
        {
          question: "How old do I need to be to start driving lessons?",
          answer: "You can apply for a provisional driving licence at 15 years and 9 months and start driving on public roads at 17. Some instructors offer pre-17 lessons on private land. You must have your provisional licence before your first lesson on public roads.",
        },
        {
          question: "How long is a driving lesson?",
          answer: "Standard lessons are 1 or 2 hours. Most instructors and pupils find 2-hour lessons more productive because you spend less time on the warm-up and get more continuous practice. Some offer 90-minute lessons as a middle ground.",
        },
        {
          question: "Can I use my own car for lessons?",
          answer: "Technically yes, but it is not recommended. Instructor cars have dual controls for safety, are insured for learner use, and are usually newer vehicles in good condition. Using your own car means your instructor cannot intervene in an emergency and your insurance must specifically cover learner driver tuition.",
        },
        {
          question: "What happens if I fail my driving test?",
          answer: "You can rebook immediately, but the earliest available slot is usually 10 working days later. Your instructor will discuss what went wrong and focus on those areas in your next lessons. There is no limit to the number of attempts. The retest fee is the same as the first test (currently £62 on weekdays, £75 on weekends).",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `driving lessons ${r.mainCity.toLowerCase()}`,
        `driving instructor ${r.mainCity.toLowerCase()}`,
        `learn to drive ${r.name.toLowerCase()}`,
        `driving lessons ${r.name.toLowerCase()}`,
        `driving school ${r.mainCity.toLowerCase()}`,
      ],
      product: "driving-lessons",
    },
    {
      slug: `driving-lessons-costs-${r.slug}`,
      title: `Driving Lesson Costs ${r.mainCity}`,
      metaTitle: `Driving Lesson Prices ${r.mainCity} | How Much Do Lessons Cost? (2026)`,
      metaDescription: `How much do driving lessons cost in ${r.mainCity}? Per-lesson rates, block booking discounts, test fees, and total cost to pass in ${r.theName}.`,
      h1: `Driving Lesson Costs in ${r.mainCity} & ${r.theName}`,
      intro: `The cost of learning to drive adds up, but knowing the typical prices helps you budget and find the best value. This guide breaks down driving lesson costs in ${r.theName}, including per-lesson rates, block booking deals, test fees, and the total cost from first lesson to passing.`,
      sections: [
        {
          heading: `How Much Do Driving Lessons Cost in ${r.theName}?`,
          content: `A standard 1-hour manual driving lesson in ${r.theName} costs £28-£38 with an independent instructor and £30-£42 with a national school (AA, BSM, RED). A 2-hour lesson costs £55-£75. Automatic lessons cost the same or £1-£3 more per hour. Most instructors offer a discounted first lesson at £15-£25 to attract new pupils. Block bookings of 10 hours typically save 10-15%, bringing the per-hour cost down to £25-£34. Intensive or crash course packages (30-40 hours over 1-2 weeks) cost £800-£1,500 including the test fee. Prices vary between areas within ${r.theName}, with urban areas like ${r.mainCity} generally having more competition and slightly lower prices.`,
        },
        {
          heading: "Total Cost to Pass Your Driving Test",
          content: `The total cost of learning to drive from scratch typically ranges from £1,500-£2,500 in ${r.theName}. This breaks down as follows. Professional lessons (40-50 hours at £30-£35 per hour) cost £1,200-£1,750. A provisional licence costs £34 online or £43 by post. The theory test costs £23. The practical driving test costs £62 on weekdays or £75 on evenings and weekends. If you fail and need a retest, add another £62-£75 plus additional lessons. First car insurance for a new driver typically costs £1,000-£2,500 per year. You can reduce the total by practising with family or friends in their car (with learner insurance) to supplement your professional lessons.`,
        },
        {
          heading: "How to Get the Best Value",
          content: `Block book lessons (10 or 20 hours at a time) to save 10-15% per lesson. Choose 2-hour lessons over 1-hour where possible, as you get more productive learning time and most instructors charge slightly less per hour for longer sessions. Independent local instructors in ${r.theName} are usually cheaper than national driving schools and often have better pupil-to-instructor ratios. Supplement professional lessons with private practice. If a friend or family member can take you out in their car (you need a provisional licence, L plates, and the supervising driver must be over 21 with 3+ years' experience), you can build experience between paid lessons and reduce the total number of professional hours needed.`,
        },
        {
          heading: "What Is Included in the Lesson Price?",
          content: `A standard driving lesson price includes the instructor's time, use of their dual-control car, fuel, and insurance for the lesson. You do not need your own car insurance for lessons in the instructor's vehicle. Most instructors collect you from and drop you back to a convenient location (home, school, work) within their operating area. Items not included in the lesson price are the provisional licence application, theory test fee, practical test fee, and any additional test centre costs. If your instructor accompanies you to your test (which most do), they will usually not charge for this, but confirm beforehand. Cancellation policies vary; most instructors charge the full lesson fee for cancellations with less than 24-48 hours' notice.`,
        },
        {
          heading: "Hidden Costs to Watch Out For",
          content: `The biggest hidden cost is needing more lessons than expected. Budget for 40-50 hours as a realistic average, not the minimum. Late cancellation fees can add up if you frequently reschedule. Some intensive course providers advertise headline prices that exclude the test fee, test car hire, or additional lessons if you are not test-ready within the package hours. Always check what happens if you need extra hours. Be cautious of extremely cheap introductory offers (under £10 for a first lesson) that lock you into expensive block bookings. Read the cancellation and refund policy before paying for a large block of lessons. If your instructor leaves or you want to switch, unused lessons may not be refundable with some providers.`,
        },
      ],
      faq: [
        {
          question: "How much does a driving lesson cost per hour?",
          answer: `A 1-hour driving lesson in ${r.theName} costs £28-£42 depending on the instructor and whether you choose manual or automatic. Independent instructors are typically cheaper at £28-£38, while national schools charge £30-£42. Block bookings of 10+ hours reduce the cost by 10-15%.`,
        },
        {
          question: "How much does it cost to learn to drive in total?",
          answer: `The total cost from first lesson to passing is typically £1,500-£2,500 in ${r.theName}. This includes 40-50 hours of lessons (£1,200-£1,750), provisional licence (£34), theory test (£23), and practical test (£62). Additional costs if you fail and need retests or extra lessons.`,
        },
        {
          question: "Are block bookings worth it?",
          answer: "Yes. Block booking 10 or 20 hours at a time typically saves 10-15% compared to paying per lesson. However, check the refund policy first. If you pass earlier than expected or want to change instructor, you should be able to get a refund on unused hours. Avoid very large upfront payments without clear refund terms.",
        },
        {
          question: "Are intensive courses cheaper than weekly lessons?",
          answer: "The per-hour rate is usually similar, but the total cost can be lower if you pass in fewer hours due to the concentrated learning. However, intensive courses are not cheaper by default. They cost £800-£1,500 for 30-40 hours. The main advantage is speed (1-2 weeks vs 6-12 months), not necessarily price.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `driving lesson prices ${r.mainCity.toLowerCase()}`,
        `driving lesson cost ${r.name.toLowerCase()}`,
        `how much driving lessons ${r.mainCity.toLowerCase()}`,
        `learn to drive cost ${r.name.toLowerCase()}`,
        `driving instructor prices ${r.mainCity.toLowerCase()}`,
      ],
      product: "driving-lessons",
    },
    {
      slug: `intensive-driving-courses-${r.slug}`,
      title: `Intensive Driving Courses ${r.mainCity}`,
      metaTitle: `Intensive Driving Courses ${r.mainCity} | Crash Course Guide (2026)`,
      metaDescription: `Considering an intensive driving course in ${r.mainCity}? How they work, pros and cons, costs, and what to expect from a crash course in ${r.theName}.`,
      h1: `Intensive Driving Courses in ${r.mainCity} & ${r.theName}`,
      intro: `An intensive driving course, sometimes called a crash course, condenses your learning into 1-2 weeks of daily lessons with a test at the end. They are popular with people who need to pass quickly for work, university, or personal reasons. This guide explains how intensive courses work in ${r.theName}, their advantages and disadvantages, and what they cost.`,
      sections: [
        {
          heading: "How Intensive Courses Work",
          content: `An intensive course typically involves 4-6 hours of driving per day over 1-2 weeks, with your practical test booked at the end. You usually need to have passed your theory test before starting. The total hours depend on your experience level. Complete beginners usually book 30-40 hours, while those with some experience may need 15-25 hours. The instructor follows a structured syllabus covering all test requirements, building up from basics to test-standard driving within the condensed timeframe. In ${r.theName}, several driving schools and independent instructors offer intensive packages with a test included.`,
        },
        {
          heading: "Pros and Cons of Intensive Courses",
          content: `The main advantage is speed. You can go from complete beginner to qualified driver in 1-2 weeks rather than 6-12 months. This is ideal if you need a licence urgently for a new job, university, or moving to an area without public transport. Consistency is another benefit as daily lessons mean you retain skills between sessions and progress faster. The downsides are significant though. Not everyone learns well under pressure. Six hours of driving per day is mentally and physically exhausting. You have less time to build road experience in different conditions (night, rain, heavy traffic). If you fail the test, you may need to book additional days and a retest, adding cost and time. Intensive courses are not recommended for people with driving anxiety or those who learn best at a slower pace.`,
        },
        {
          heading: `Intensive Course Costs in ${r.theName}`,
          content: `Intensive driving course packages in ${r.theName} typically cost £800-£1,500, which includes 30-40 hours of tuition and the practical test fee. A shorter top-up course for experienced learners (10-20 hours) costs £400-£800. These prices are competitive with the total cost of weekly lessons because the per-hour rate is similar, but the concentrated format means you may pass in fewer total hours. Additional costs to factor in are the theory test (£23, must be passed before you start), provisional licence (£34 if you do not already have one), and potentially extra lessons or a retest if you are not ready within the package hours. Always check what happens if you need more time beyond the package.`,
        },
        {
          heading: "How to Choose an Intensive Course",
          content: `Look for providers with good pass rates and reviews from intensive course pupils specifically, not just general driving lesson reviews. The quality of the instructor matters even more on an intensive course because you will spend 30+ hours with them in a short period. Ask what happens if you are not test-ready at the end of the booked hours. Reputable providers in ${r.theName} will offer additional hours at a fair rate or reschedule your test rather than pushing you into a test you are not ready for. Confirm that the test fee is included and that a test date is pre-booked (test dates in some areas have long waiting lists). Ask about their cancellation and refund policy in case of illness or other unforeseen circumstances.`,
        },
        {
          heading: "Is an Intensive Course Right for You?",
          content: `Intensive courses work best for confident, motivated learners who can commit to full days of driving for 1-2 weeks. They are ideal if you are short on time but can dedicate a solid block to learning. They are not recommended if you have significant driving anxiety, struggle with sustained concentration, or cannot commit consecutive days. A semi-intensive approach (3-4 lessons per week over 3-4 weeks) can be a good compromise, giving you the benefits of frequent practice without the exhaustion of all-day sessions. Your choice also depends on test availability. In busy areas of ${r.theName}, practical test dates can be booked out weeks in advance, so plan accordingly.`,
        },
      ],
      faq: [
        {
          question: "How long does an intensive driving course take?",
          answer: "Most intensive courses take 1-2 weeks with 4-6 hours of lessons per day. Complete beginners typically need 30-40 hours (1.5-2 weeks), while learners with some experience may only need 15-25 hours (1-1.5 weeks). The practical test is usually booked for the final day.",
        },
        {
          question: "What is the pass rate for intensive courses?",
          answer: "Pass rates for intensive courses are broadly similar to conventional lessons, around 45-50% nationally. Good intensive course providers in well-structured programmes report higher rates of 60-70%. The key factor is whether the pupil was genuinely test-ready, not the format of the lessons.",
        },
        {
          question: "Do I need to pass my theory test first?",
          answer: "Yes. You must hold a valid theory test pass certificate before you can take the practical driving test. Most intensive course providers require you to have passed your theory test before the course starts. Some offer a combined package that includes theory test preparation in the first few days.",
        },
        {
          question: "What if I fail the test at the end of the course?",
          answer: "You will need to book a retest and may need additional lessons. Reputable providers offer extra hours at the standard rate and help you rebook the test. The retest fee is £62 (weekdays) or £75 (weekends). Some providers include one free retest in their package, so check before booking.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `intensive driving course ${r.mainCity.toLowerCase()}`,
        `crash course driving ${r.mainCity.toLowerCase()}`,
        `intensive driving lessons ${r.name.toLowerCase()}`,
        `fast pass driving ${r.mainCity.toLowerCase()}`,
        `one week driving course ${r.name.toLowerCase()}`,
      ],
      product: "driving-lessons",
    },
    {
      slug: `driving-test-tips-${r.slug}`,
      title: `Driving Test Tips ${r.mainCity}`,
      metaTitle: `Driving Test Tips ${r.mainCity} | How to Pass First Time (2026)`,
      metaDescription: `Taking your driving test in ${r.mainCity}? Common mistakes, what examiners look for, and practical tips for passing first time in ${r.theName}.`,
      h1: `Driving Test Tips for ${r.mainCity} & ${r.theName}`,
      intro: `The practical driving test lasts around 40 minutes and covers a range of road situations. Knowing what to expect, what examiners are looking for, and the most common reasons for failure gives you the best chance of passing first time. This guide covers practical driving test tips for learners in ${r.theName}.`,
      sections: [
        {
          heading: "What Happens During the Driving Test",
          content: `The test starts with an eyesight check (reading a number plate from 20 metres) and two vehicle safety questions (show me, tell me). You then drive for approximately 40 minutes, following the examiner's directions. Around 20 minutes will be independent driving, where you follow a sat nav or road signs without turn-by-turn instructions. You will be asked to perform one reversing manoeuvre (parallel park, bay park, or pulling up on the right and reversing). You may be asked to do an emergency stop, though not on every test. The examiner marks faults as minor (a driving fault), serious, or dangerous. You can pass with up to 15 minor faults. A single serious or dangerous fault is an automatic fail.`,
        },
        {
          heading: "Most Common Reasons for Failing",
          content: `The DVSA publishes the most common test faults nationally. The top reasons for failure are poor observation at junctions (not looking properly before pulling out), incorrect use of mirrors (especially when changing speed or direction), incorrect positioning on roundabouts, lack of steering control, and not responding appropriately to traffic lights and road signs. In ${r.theName}, roundabouts are a common issue as many test routes include multi-lane roundabouts that require confident lane discipline. Another frequent fault is hesitancy, where learners wait too long at junctions when it is safe to proceed. This can be marked as a serious fault if it causes other drivers to brake or take evasive action.`,
        },
        {
          heading: "Practical Tips for Test Day",
          content: `Book your test for a time when you are normally alert and focused. Avoid early morning if you are not a morning person. Eat a proper meal beforehand and stay hydrated. Arrive at the test centre 10 minutes early. Drive the test routes in ${r.theName} with your instructor in the weeks before the test so the roads feel familiar. On the test itself, take your time. There is no rush. Check mirrors before every signal, speed change, or direction change. Exaggerate your head movements slightly so the examiner can see you are checking mirrors and blind spots. If you make a minor mistake, do not panic. Dwelling on one error leads to more errors. Treat it as a normal drive with your instructor sitting in the back.`,
        },
        {
          heading: "The Show Me, Tell Me Questions",
          content: `At the start of the test, the examiner asks one tell me question (you explain how you would carry out a safety task) and one show me question (you demonstrate it while driving). There are 19 possible questions covering topics like checking tyre pressure, brake fluid, oil level, headlights, windscreen washers, and demisting. A wrong answer counts as one minor fault, which will not fail you on its own. Your instructor will practise these with you. The full list is available on the GOV.UK website. The show me question is asked while driving, so practise doing things like operating the windscreen wipers or demisters while keeping your eyes on the road.`,
        },
        {
          heading: `Test Centres in ${r.theName}`,
          content: `Driving test centres in ${r.theName} include locations across ${r.areas}. Each centre has typical test routes that your instructor will know well. Practise on these routes in the weeks before your test. Test waiting times vary by centre. Popular centres in urban areas like ${r.mainCity} often have longer waiting lists (4-8 weeks), while quieter centres may have slots available sooner. You can check availability and book at GOV.UK. If your preferred centre has a long wait, consider booking at a nearby centre with more availability. Your instructor can advise on which centres have the most straightforward test routes. Cancellations do appear, so check the booking system regularly if you want an earlier date.`,
        },
      ],
      faq: [
        {
          question: "How many minor faults can I get and still pass?",
          answer: "You can get up to 15 minor (driving) faults and still pass. However, if you make the same minor fault repeatedly, the examiner may upgrade it to a serious fault. A single serious or dangerous fault results in a fail regardless of how few minors you have.",
        },
        {
          question: "Can I use my instructor's car for the test?",
          answer: "Yes, and most learners do. Your instructor's car will have dual controls and you will be familiar with it. The instructor usually drives you to the test centre and waits while you take the test. There is no extra charge for this from most instructors. You can also use your own car if it meets DVSA requirements.",
        },
        {
          question: "What should I do if the examiner says something I do not understand?",
          answer: "Ask them to repeat it. Examiners are used to nervous candidates and will happily repeat or clarify an instruction. It is much better to ask than to guess and take a wrong turn. Taking a wrong turn is not a fault in itself, but how you handle it (safely and calmly) is assessed.",
        },
        {
          question: "How soon can I retake the test if I fail?",
          answer: "You can rebook immediately after a fail. The earliest you can retake is 10 working days after the failed test. In busy areas, the wait for a retest slot may be longer. Your examiner will give you a fault sheet showing exactly what went wrong, which helps you focus your practice before the retest.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `driving test tips ${r.mainCity.toLowerCase()}`,
        `driving test ${r.mainCity.toLowerCase()}`,
        `pass driving test ${r.name.toLowerCase()}`,
        `driving test common faults`,
        `driving test advice ${r.name.toLowerCase()}`,
      ],
      product: "driving-lessons",
    },
  ];
}

export function getDrivingGuides(): Guide[] {
  const region = getGuideRegion();
  if (!region) return [];
  return generate(region);
}
