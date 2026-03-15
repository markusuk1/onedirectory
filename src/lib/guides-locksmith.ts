import type { Guide } from "./guides";
import { getGuideRegion, type GuideRegion } from "./guide-regions";

function generate(r: GuideRegion): Guide[] {
  return [
    {
      slug: `emergency-locksmith-${r.slug}`,
      title: `Emergency Locksmith ${r.mainCity}`,
      metaTitle: `Emergency Locksmith ${r.mainCity} | 24/7 Lockout Help & Advice (2026)`,
      metaDescription: `Locked out in ${r.mainCity}? Find a trusted emergency locksmith in ${r.theName}. What to do, what it costs, and how to avoid rogue locksmiths.`,
      h1: `Emergency Locksmith in ${r.mainCity} & ${r.theName}`,
      intro: `Being locked out of your home, car or business is stressful. Knowing what to do and who to call makes all the difference. This guide covers everything you need to know about emergency locksmith services in ${r.theName}, from what to expect to how much it should cost.`,
      sections: [
        ...(r.insights?.locksmith ? [{
          heading: `Locksmiths in ${r.theName}: Local Market Insights`,
          content: r.insights.locksmith,
        }] : []),
        {
          heading: "What to Do If You Are Locked Out",
          content: `First, stay calm and check all doors and windows in case one is unlocked. Check with neighbours or family members who may have a spare key. If you rent, contact your landlord or letting agent as they usually hold a spare. If none of these options work, you will need an emergency locksmith. In ${r.theName}, most emergency locksmiths can reach you within 30-60 minutes, and many operate around the clock. Avoid trying to force entry yourself as this often causes more expensive damage to the lock or door.`,
        },
        {
          heading: `Emergency Locksmith Costs in ${r.theName}`,
          content: `Emergency locksmith call-out charges in ${r.theName} typically range from £60-£120 during normal working hours (8am-6pm Monday to Friday). Evening and weekend call-outs are more expensive, usually £90-£180. Late night and bank holiday call-outs can cost £120-£250. These prices usually include the call-out fee and a standard lock opening. If the lock needs replacing, the parts cost is extra, typically £40-£80 for a standard cylinder. Always ask for a total price before the locksmith starts work, including any parts that may be needed.`,
        },
        {
          heading: "How to Spot a Rogue Locksmith",
          content: `Unfortunately, the locksmith industry has some operators who overcharge or do substandard work. Warning signs include companies that will not give a price range over the phone, locksmiths who immediately drill out the lock rather than trying to pick it (drilling is sometimes necessary but should not be the first option), those who demand cash only, no company branding on their vehicle or uniform, and prices that suddenly increase once they arrive. Legitimate locksmiths in ${r.theName} will give you an estimated price before attending, carry ID, and arrive in a branded vehicle.`,
        },
        {
          heading: "Choosing a Trusted Emergency Locksmith",
          content: `Look for locksmiths with strong Google reviews and a verified local presence. Check they are a member of a recognised trade body such as the Master Locksmiths Association (MLA) or the NCFE-accredited Auto Locksmith Association. Ask for a price estimate before they attend, and confirm whether there are any additional charges for evenings, weekends or parts. Locksmiths listed in our directory across ${r.areas} have verified contact details and genuine customer reviews to help you choose.`,
        },
        {
          heading: "Preventing Future Lockouts",
          content: `Once you are back inside, take steps to avoid being locked out again. Leave a spare key with a trusted neighbour or family member. Consider fitting a key safe outside your property, secured with a combination code. Smart locks are another option, letting you unlock your door with a phone app or keypad code, removing the risk of losing keys entirely. If your lock is old or stiff, have it serviced or replaced before it fails at the worst possible moment.`,
        },
      ],
      faq: [
        {
          question: "How quickly can an emergency locksmith get to me?",
          answer: `Most emergency locksmiths in ${r.theName} aim to arrive within 30-60 minutes. In busy city centres like ${r.mainCity}, response times can be as fast as 15-20 minutes. Rural areas may take a little longer. When you call, ask for an estimated arrival time.`,
        },
        {
          question: "Will the locksmith damage my door?",
          answer: "A skilled locksmith can open most standard locks without damage using specialist tools. Drilling or replacing the lock is sometimes necessary with high-security or damaged locks, but this should be discussed with you before they start. If the lock is drilled, a replacement lock is fitted at an additional cost.",
        },
        {
          question: "Can a locksmith open my car?",
          answer: `Yes, auto locksmiths specialise in vehicle lockouts. They can open most car makes and models without damage. Some also offer key cutting and transponder key programming. Not all locksmiths cover vehicles, so check when you call. Auto locksmith call-outs in ${r.theName} typically cost £70-£150.`,
        },
        {
          question: "Do I need to prove I live at the property?",
          answer: "A reputable locksmith will ask for proof of residence or ownership before opening a property. This is for your security. Acceptable proof includes a utility bill, council tax bill, tenancy agreement, or photo ID showing the address. If you cannot provide proof, the locksmith may ask a neighbour to confirm your identity.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `emergency locksmith ${r.mainCity.toLowerCase()}`,
        `locksmith ${r.mainCity.toLowerCase()}`,
        `24 hour locksmith ${r.name.toLowerCase()}`,
        `locked out ${r.mainCity.toLowerCase()}`,
        `emergency lockout service ${r.name.toLowerCase()}`,
      ],
      product: "locksmith",
    },
    {
      slug: `lock-change-guide-${r.slug}`,
      title: `Lock Change Guide ${r.name}`,
      metaTitle: `Lock Change & Replacement ${r.name} | When, Why & How Much (2026)`,
      metaDescription: `Need your locks changed in ${r.theName}? Find out when to change locks, how much it costs, and which lock types offer the best security.`,
      h1: `Lock Change & Replacement Guide for ${r.theName}`,
      intro: `Whether you have just moved into a new home, lost your keys, or want to upgrade your security, changing your locks is one of the most important things you can do. This guide covers when you should change your locks, what options are available in ${r.theName}, and how much you should expect to pay.`,
      sections: [
        {
          heading: "When Should You Change Your Locks?",
          content: `There are several situations where changing your locks is strongly recommended. After moving into a new property, as you have no way of knowing how many copies of the old keys exist. After losing your keys or having them stolen, as someone could use them to access your home. After a break-in or attempted break-in. When your locks are old, worn or difficult to operate. After a relationship breakdown where an ex-partner has keys. When your insurance requires a specific lock standard. If any of these apply to you in ${r.theName}, contact a local locksmith sooner rather than later.`,
        },
        {
          heading: `Lock Change Costs in ${r.theName}`,
          content: `The cost of changing a lock depends on the lock type and the door. A standard euro cylinder lock change (the most common type on uPVC and composite doors) costs around £60-£100 including the lock and labour. A mortice deadlock (common on wooden front doors) costs £80-£130 to replace. Changing a full multipoint locking system on a uPVC or composite door costs £120-£250. These prices are typical for a locksmith visit during normal hours in ${r.theName}. If you need multiple locks changed, most locksmiths offer a discount for doing them in one visit.`,
        },
        {
          heading: "Types of Door Locks Explained",
          content: `Euro cylinder locks are the most common on modern uPVC and composite doors. They slot into the door and are operated by a key from outside and a thumb turn or key from inside. Mortice locks are fitted into a pocket cut in the edge of a wooden door. They come in deadlock (key only) and sashlock (with handle) versions. Rim locks (like Yale locks) are mounted on the inside surface of the door and are common as secondary locks. Multipoint locks use a single key to engage bolts at multiple points along the door edge, providing stronger security. A locksmith can advise which type is best for your doors.`,
        },
        {
          heading: "What Lock Should You Choose?",
          content: `For the best security, look for locks that meet British Standard BS3621, as most home insurance policies require this. Anti-snap euro cylinders are essential for uPVC and composite doors, as standard cylinders can be snapped open in seconds. Look for locks rated to SS312 Diamond standard by Sold Secure or TS007 3-star rated. Popular brands include Ultion, ABS, Avocet and Brisant. A good locksmith in ${r.theName} will stock quality locks and can advise on the best option for your door and budget.`,
        },
        {
          heading: "Can You Change Locks Yourself?",
          content: `Changing a euro cylinder lock is relatively straightforward if you are handy. You remove a screw from the door edge, turn the key slightly, and slide the old cylinder out. The new one slides in the same way. However, getting the correct size cylinder is crucial, as an incorrect size leaves the lock vulnerable. Mortice locks are more complex and best left to a professional. If you are in any doubt, a locksmith can do the job quickly and guarantee the work, which is worth the cost for your home security.`,
        },
      ],
      faq: [
        {
          question: "How long does it take to change a lock?",
          answer: "A standard lock change takes 15-30 minutes per lock. A full multipoint lock system replacement may take 45-90 minutes. Most locksmiths can change 2-3 locks in a single visit of about an hour.",
        },
        {
          question: "Do I need to change locks when I move house?",
          answer: "It is strongly recommended. You do not know who has copies of the existing keys. Previous owners, their family, neighbours, tradespeople and estate agents may all have had keys. Changing the locks gives you peace of mind and full control over who can access your home.",
        },
        {
          question: "Will my insurance cover the lock change?",
          answer: "If the lock change is needed due to a break-in, theft of keys, or loss of keys, your home insurance may cover the cost. Check your policy, as many include home emergency cover that pays for a locksmith. Keep all receipts for your claim.",
        },
        {
          question: "Can a landlord change the locks?",
          answer: "If you are a tenant, your landlord should not change the locks without your knowledge and agreement. As a tenant, you should not change the locks without your landlord's permission either, as the lock is part of the property. Always discuss lock changes with your landlord or letting agent first.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `lock change ${r.mainCity.toLowerCase()}`,
        `change locks ${r.name.toLowerCase()}`,
        `lock replacement ${r.mainCity.toLowerCase()}`,
        `new locks fitted ${r.name.toLowerCase()}`,
        `locksmith lock change cost`,
      ],
      product: "locksmith",
    },
    {
      slug: `home-security-guide-${r.slug}`,
      title: `Home Security Guide ${r.name}`,
      metaTitle: `Home Security Guide ${r.name} | Locks, Upgrades & Expert Tips (2026)`,
      metaDescription: `Improve your home security in ${r.theName}. Expert advice on locks, doors, windows, smart security and how to make your home harder to break into.`,
      h1: `Home Security Guide for ${r.theName}`,
      intro: `Good home security starts with good locks, but it does not end there. This guide covers practical steps you can take to protect your home in ${r.theName}, from upgrading your locks to simple habits that make a real difference. Whether you live in a terraced house in ${r.mainCity} or a rural property, these tips apply to you.`,
      sections: [
        {
          heading: "Start with Your Front Door",
          content: `Your front door is the most common entry point for burglars. Make sure it has a lock that meets BS3621, which is the standard required by most insurance policies. If you have a uPVC or composite door with a euro cylinder, upgrade to an anti-snap cylinder. Standard euro cylinders can be broken in under 30 seconds using a technique called lock snapping. Anti-snap cylinders are designed to resist this attack and cost as little as £30-£60 for the lock itself, or £60-£100 fitted by a locksmith in ${r.theName}. This is the single most effective security upgrade for most homes.`,
        },
        {
          heading: "Secure Your Windows",
          content: `Windows are the second most common entry point. Ensure all ground-floor and accessible windows have working locks. Most modern uPVC windows have built-in locks, but older ones may need retrofitting. Wooden windows should have key-operated window locks fitted. Consider fitting window restrictors that allow the window to open for ventilation but not wide enough for entry. Laminated glass is more resistant to breaking than standard double glazing, though it is an expensive upgrade. At minimum, make sure all window locks work and are used, especially at night and when you are out.`,
        },
        {
          heading: "Smart Locks and Keyless Entry",
          content: `Smart locks let you lock and unlock your door with a phone app, keypad code, or fingerprint. They eliminate the risk of lost keys and let you grant temporary access to visitors, tradespeople or cleaners without handing over a physical key. Many smart locks also keep a log of when the door was locked and unlocked. Popular brands available in ${r.theName} include Yale Conexis, Ultion Nuki, and Samsung. Prices range from £150-£350 for the lock, plus fitting. Make sure any smart lock you choose still meets BS3621 or your insurance may not cover you.`,
        },
        {
          heading: "Other Security Measures",
          content: `Beyond locks, there are several other steps that improve home security. Outdoor lighting with motion sensors deters opportunistic burglars. A visible burglar alarm (even a dummy box) acts as a deterrent. Video doorbells like Ring or Google Nest let you see who is at your door remotely. Keep hedges trimmed so the front of your property is visible from the street. Do not leave spare keys under mats, pots or fake rocks. Use timer switches to turn lights on when you are away. Cancel newspaper and milk deliveries when on holiday, and ask a neighbour to move your bins.`,
        },
        {
          heading: "When to Call a Locksmith",
          content: `A professional locksmith can carry out a security survey of your home, identifying weak points and recommending targeted upgrades. This is especially worthwhile after moving into a new property, after a break-in or attempted break-in on your street, or if your locks are more than 10 years old. Locksmiths in ${r.areas} can advise on the best locks and security products for your specific doors and budget, and fit everything in a single visit. It is a relatively small investment for significant peace of mind.`,
        },
      ],
      faq: [
        {
          question: "What is the most important security upgrade?",
          answer: "Upgrading to anti-snap euro cylinders on your uPVC or composite doors is the single most effective and affordable upgrade for most homes. Standard euro cylinders are the most common weak point exploited by burglars. A quality anti-snap cylinder costs £60-£100 fitted and dramatically improves your door security.",
        },
        {
          question: "Are smart locks secure?",
          answer: "Good-quality smart locks from reputable brands are very secure. Look for models that meet BS3621 and have been independently tested. The main risk with smart locks is poor battery management (most run on standard batteries) and weak phone security. Always use a strong PIN and keep the lock firmware updated.",
        },
        {
          question: "Does my insurance require specific locks?",
          answer: "Most home insurance policies require a BS3621-rated lock on all external doors. Some insurers also require window locks on ground-floor windows. Check your policy and upgrade if necessary, as a claim could be rejected if your locks do not meet the required standard. Your locksmith can confirm which of your locks are compliant.",
        },
        {
          question: "How much does a full security upgrade cost?",
          answer: `A basic upgrade covering anti-snap cylinders on 2 doors and window locks typically costs £150-£300 fitted in ${r.theName}. A more comprehensive upgrade including a smart lock, security hinges and letter box restrictor might cost £400-£700. A full security survey with recommendations is often free or low-cost from local locksmiths.`,
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `home security ${r.mainCity.toLowerCase()}`,
        `home security ${r.name.toLowerCase()}`,
        `improve home security`,
        `best locks for home security`,
        `locksmith security advice ${r.name.toLowerCase()}`,
      ],
      product: "locksmith",
    },
    {
      slug: `locksmith-costs-${r.slug}`,
      title: `Locksmith Costs ${r.mainCity}`,
      metaTitle: `Locksmith Prices ${r.mainCity} | How Much Does a Locksmith Cost? (2026)`,
      metaDescription: `How much does a locksmith cost in ${r.mainCity}? Emergency callout fees, lock change prices, and what to expect from locksmiths in ${r.theName}.`,
      h1: `Locksmith Costs in ${r.mainCity} & ${r.theName}`,
      intro: `Locksmith prices vary depending on the time of day, the type of job, and the lock involved. Knowing typical costs helps you avoid being overcharged, especially in an emergency. This guide covers the main locksmith services and their costs in ${r.theName}.`,
      sections: [
        {
          heading: `How Much Does a Locksmith Cost in ${r.theName}?`,
          content: `A standard daytime callout for a lockout in ${r.theName} costs £60-£120 including labour and a basic lock if replacement is needed. An evening or weekend emergency callout costs £80-£180. A lock change on a standard cylinder costs £50-£90 during working hours, including the lock. A full door lock replacement (multipoint mechanism) costs £120-£250 depending on the type. Key cutting for a standard door key costs £5-£15 at a high street shop, or £15-£30 for a specialist or restricted key. UPVC door lock repairs typically cost £60-£120. These prices include the locksmith's time and parts for standard locks.`,
        },
        {
          heading: "What Affects the Price?",
          content: `Time of day is the biggest factor. Emergency callouts after 6pm, at weekends, or on bank holidays cost 50-100% more than a standard daytime appointment. The type of lock makes a difference. Standard euro cylinders are cheap to replace (£20-£40 for the part), while high-security or anti-snap locks cost £40-£80 for the part. Multipoint locking mechanisms on UPVC and composite doors cost significantly more (£80-£200 for the mechanism alone). The difficulty of entry matters for lockouts. A standard lock can often be picked or bypassed non-destructively in minutes, keeping costs low. If the lock needs to be drilled out (destructive entry), you pay for a replacement lock on top. Location within ${r.theName} affects travel time and therefore cost.`,
        },
        {
          heading: "How to Get the Best Price",
          content: `For non-emergency work like lock upgrades, get quotes from at least three local locksmiths in ${r.theName}. Prices vary significantly between operators. Ask for a fixed price rather than an hourly rate, so there are no surprises. For emergencies, agree the total cost before the locksmith starts work, including parts. A reputable locksmith will give you a clear price over the phone or on arrival. Be wary of extremely low advertised prices (under £40 for a lockout) as these are often bait-and-switch operations that add charges once on site. Check Google reviews and look for membership of the Master Locksmiths Association (MLA) or equivalent trade body.`,
        },
        {
          heading: "What Is Included in a Locksmith Callout?",
          content: `A standard lockout callout in ${r.theName} typically includes travel to your property, gaining entry to the lock (non-destructive where possible), and a replacement lock if the original cannot be reused. Most locksmiths carry common lock types in their van and can fit a replacement immediately. The price should cover labour, the callout fee, and a standard replacement lock. Premium or high-security locks cost extra. A good locksmith will show you the old lock, explain why it needed replacing (if applicable), test the new lock with you, and give you all the keys. Some provide a short guarantee on their work, typically 12 months.`,
        },
        {
          heading: "Hidden Costs to Watch Out For",
          content: `Watch for call centre operations that advertise low fixed prices then send a subcontractor who charges more on arrival. Always confirm the company name and that the person attending is their direct employee or named subcontractor. Some locksmiths charge separately for the callout fee, labour, and parts, which can add up to more than a single all-inclusive quote. Ask whether the quote includes VAT. Additional charges can apply for working at height (window locks upstairs), access difficulties, or if multiple locks need attention. If a locksmith tries to significantly increase the price after arriving, you are within your rights to refuse and call another.`,
        },
      ],
      faq: [
        {
          question: "How much does an emergency lockout cost?",
          answer: `A standard daytime lockout in ${r.theName} costs £60-£120. Out-of-hours (evenings, weekends, bank holidays) costs £80-£180. This should include entry and a replacement lock if needed. Always agree the price before work begins.`,
        },
        {
          question: "How much does it cost to change a lock?",
          answer: `A standard cylinder lock change in ${r.theName} costs £50-£90 during working hours, including the lock and fitting. A high-security anti-snap cylinder costs £70-£120 fitted. A full multipoint lock mechanism replacement on a UPVC door costs £120-£250.`,
        },
        {
          question: "Should I get a quote before the locksmith starts?",
          answer: "Always. A reputable locksmith will give you a clear total price before starting work. If they refuse or say they cannot quote until they see the lock, ask for a price range. Never agree to open-ended hourly rates for a lockout, as the job should take 10-30 minutes in most cases.",
        },
        {
          question: "Are locksmith prices higher at night?",
          answer: "Yes. Most locksmiths charge a premium of 50-100% for callouts outside normal working hours (typically after 6pm, weekends, and bank holidays). If your situation is not urgent, booking for the next working day can save you £30-£60 or more.",
        },
      ],
      relatedLocations: r.locations,
      keywords: [
        `locksmith prices ${r.mainCity.toLowerCase()}`,
        `locksmith cost ${r.name.toLowerCase()}`,
        `how much locksmith ${r.mainCity.toLowerCase()}`,
        `emergency locksmith cost ${r.name.toLowerCase()}`,
        `lock change price ${r.mainCity.toLowerCase()}`,
      ],
      product: "locksmith",
    },
  ];
}

export function getLocksmithGuides(): Guide[] {
  const region = getGuideRegion();
  if (!region) return [];
  return generate(region);
}
