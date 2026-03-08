"use client";

import { useState } from "react";
import posthog from "posthog-js";
import type { ProductId } from "@/lib/productConfig";

interface ManagedQuoteFormProps {
  productId?: ProductId;
}

export default function ManagedQuoteForm({ productId = "minibus-hire" }: ManagedQuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [journeyType, setJourneyType] = useState("one-way");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value || "";

    const base = {
      type: "managed_quote",
      product: productId,
      name: getValue("name"),
      email: getValue("email"),
      phone: getValue("phone"),
      budget: getValue("budget"),
      message: getValue("message"),
    };

    let data;
    if (productId === "skip-hire") {
      data = {
        ...base,
        details: {
          skipSize: getValue("skipSize"),
          wasteType: getValue("wasteType"),
          address: getValue("address"),
          duration: getValue("duration"),
          placement: getValue("placement"),
        },
      };
    } else if (productId === "van-hire") {
      data = {
        ...base,
        details: {
          vanSize: getValue("vanSize"),
          driveType: getValue("driveType"),
          startDate: getValue("startDate"),
          endDate: getValue("endDate"),
          collectionLocation: getValue("collectionLocation"),
        },
      };
    } else if (productId === "locksmith") {
      data = {
        ...base,
        details: {
          serviceType: getValue("serviceType"),
          urgency: getValue("urgency"),
          propertyType: getValue("propertyType"),
          location: getValue("location"),
        },
      };
    } else if (productId === "removal-companies") {
      data = {
        ...base,
        details: {
          moveType: getValue("moveType"),
          bedrooms: getValue("bedrooms"),
          movingFrom: getValue("movingFrom"),
          movingTo: getValue("movingTo"),
          moveDate: getValue("moveDate"),
          needPacking: getValue("needPacking"),
        },
      };
    } else if (productId === "bouncy-castle-hire") {
      data = {
        ...base,
        details: {
          eventType: getValue("eventType"),
          eventDate: getValue("eventDate"),
          venue: getValue("venue"),
          indoorOutdoor: getValue("indoorOutdoor"),
          ageRange: getValue("ageRange"),
        },
      };
    } else if (productId === "limo-hire") {
      data = {
        ...base,
        details: {
          occasion: getValue("occasion"),
          eventDate: getValue("eventDate"),
          pickupLocation: getValue("pickupLocation"),
          destination: getValue("destination"),
          passengers: getValue("passengers"),
          hours: getValue("hours"),
        },
      };
    } else if (productId === "plant-hire") {
      data = {
        ...base,
        details: {
          equipmentType: getValue("equipmentType"),
          startDate: getValue("startDate"),
          duration: getValue("duration"),
          siteLocation: getValue("siteLocation"),
          operatedOrSelfDrive: getValue("operatedOrSelfDrive"),
        },
      };
    } else if (productId === "driving-lessons") {
      data = {
        ...base,
        details: {
          lessonType: getValue("lessonType"),
          transmission: getValue("transmission"),
          experience: getValue("experience"),
          area: getValue("area"),
        },
      };
    } else {
      data = {
        ...base,
        date: getValue("date"),
        time: getValue("time"),
        passengers: parseInt(getValue("passengers")) || null,
        pickup: getValue("pickup"),
        destination: getValue("destination"),
        journeyType: getValue("journeyType"),
        returnDate: journeyType === "return" ? getValue("returnDate") : undefined,
      };
    }

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-POSTHOG-DISTINCT-ID": posthog.get_distinct_id() ?? "",
          "X-POSTHOG-SESSION-ID": posthog.get_session_id() ?? "",
        },
        body: JSON.stringify(data),
      });
      posthog.capture("managed_quote_requested", {
        product: productId,
        type: "managed_quote",
        budget: base.budget || null,
      });
      setSubmitted(true);
    } catch (err) {
      posthog.captureException(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const productLabel =
      productId === "skip-hire" ? "skip hire" : productId === "van-hire" ? "van hire" : productId === "locksmith" ? "locksmith" : productId === "removal-companies" ? "removal" : productId === "bouncy-castle-hire" ? "bouncy castle" : productId === "limo-hire" ? "limo hire" : productId === "plant-hire" ? "plant hire" : productId === "driving-lessons" ? "driving lesson" : "hire";
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg
          className="w-12 h-12 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          We&apos;re On It!
        </h3>
        <p className="text-green-700 mb-1">
          We&apos;ll contact {productLabel} operators in your area and send you quotes by email.
        </p>
        <p className="text-green-600 text-sm">
          You should start receiving quotes within 24 hours.
        </p>
      </div>
    );
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const inputClass =
    "w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Common: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
            Full Name *
          </label>
          <input type="text" id="name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
            Email Address *
          </label>
          <input type="email" id="email" name="email" required className={inputClass} />
        </div>
      </div>

      {/* Common: Phone + product-specific */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
            Phone Number *
          </label>
          <input type="tel" id="phone" name="phone" required className={inputClass} />
        </div>
        {productId === "skip-hire" && (
          <div>
            <label htmlFor="skipSize" className="block text-sm font-medium text-text mb-1">
              Skip Size *
            </label>
            <select id="skipSize" name="skipSize" required className={inputClass}>
              <option value="">Select size...</option>
              <option value="mini">Mini Skip (2-3 yards)</option>
              <option value="midi">Midi Skip (4-5 yards)</option>
              <option value="builders">Builders Skip (6-8 yards)</option>
              <option value="large">Large Skip (12-16 yards)</option>
              <option value="roro">Roll-On Roll-Off (20-40 yards)</option>
              <option value="not-sure">Not sure — need advice</option>
            </select>
          </div>
        )}
        {productId === "van-hire" && (
          <div>
            <label htmlFor="vanSize" className="block text-sm font-medium text-text mb-1">
              Van Type *
            </label>
            <select id="vanSize" name="vanSize" required className={inputClass}>
              <option value="">Select type...</option>
              <option value="swb">Short Wheelbase Van</option>
              <option value="lwb">Long Wheelbase Van</option>
              <option value="luton">Luton Van</option>
              <option value="tipper">Tipper Van</option>
              <option value="refrigerated">Refrigerated Van</option>
              <option value="pickup">Pickup Truck</option>
              <option value="not-sure">Not sure — need advice</option>
            </select>
          </div>
        )}
        {productId === "locksmith" && (
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-text mb-1">
              Service Needed *
            </label>
            <select id="serviceType" name="serviceType" required className={inputClass}>
              <option value="">Select service...</option>
              <option value="emergency-lockout">Emergency Lockout</option>
              <option value="lock-change">Lock Change</option>
              <option value="lock-repair">Lock Repair</option>
              <option value="key-cutting">Key Cutting</option>
              <option value="auto-locksmith">Auto Locksmith (Vehicle)</option>
              <option value="security-upgrade">Security Upgrade</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
        {productId === "removal-companies" && (
          <div>
            <label htmlFor="moveType" className="block text-sm font-medium text-text mb-1">
              Type of Move *
            </label>
            <select id="moveType" name="moveType" required className={inputClass}>
              <option value="">Select...</option>
              <option value="house">House / Flat Move</option>
              <option value="office">Office / Commercial</option>
              <option value="man-and-van">Man & Van (small move)</option>
              <option value="storage">Moving to Storage</option>
              <option value="international">International Move</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
        {productId === "bouncy-castle-hire" && (
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium text-text mb-1">
              Event Type *
            </label>
            <select id="eventType" name="eventType" required className={inputClass}>
              <option value="">Select...</option>
              <option value="birthday">Birthday Party</option>
              <option value="school-fete">School Fete / Fair</option>
              <option value="corporate">Corporate / Fun Day</option>
              <option value="wedding">Wedding</option>
              <option value="community">Community Event</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
        {productId === "limo-hire" && (
          <div>
            <label htmlFor="occasion" className="block text-sm font-medium text-text mb-1">
              Occasion *
            </label>
            <select id="occasion" name="occasion" required className={inputClass}>
              <option value="">Select...</option>
              <option value="wedding">Wedding</option>
              <option value="prom">Prom</option>
              <option value="hen-stag">Hen / Stag Do</option>
              <option value="birthday">Birthday</option>
              <option value="night-out">Night Out</option>
              <option value="corporate">Corporate / Airport Transfer</option>
              <option value="other">Other</option>
            </select>
          </div>
        )}
        {productId === "plant-hire" && (
          <div>
            <label htmlFor="equipmentType" className="block text-sm font-medium text-text mb-1">
              Equipment Needed *
            </label>
            <select id="equipmentType" name="equipmentType" required className={inputClass}>
              <option value="">Select...</option>
              <option value="mini-digger">Mini Digger</option>
              <option value="excavator">Excavator</option>
              <option value="dumper">Dumper</option>
              <option value="telehandler">Telehandler</option>
              <option value="cherry-picker">Cherry Picker</option>
              <option value="roller">Roller / Compactor</option>
              <option value="other">Other / Multiple</option>
            </select>
          </div>
        )}
        {productId === "driving-lessons" && (
          <div>
            <label htmlFor="lessonType" className="block text-sm font-medium text-text mb-1">
              Lesson Type *
            </label>
            <select id="lessonType" name="lessonType" required className={inputClass}>
              <option value="">Select...</option>
              <option value="weekly">Weekly Lessons</option>
              <option value="intensive">Intensive / Crash Course</option>
              <option value="refresher">Refresher Lessons</option>
              <option value="pass-plus">Pass Plus</option>
              <option value="mock-test">Mock Test Preparation</option>
            </select>
          </div>
        )}
        {productId === "minibus-hire" && (
          <div>
            <label htmlFor="passengers" className="block text-sm font-medium text-text mb-1">
              Number of Passengers *
            </label>
            <input
              type="number"
              id="passengers"
              name="passengers"
              min="1"
              max="72"
              required
              className={inputClass}
            />
          </div>
        )}
      </div>

      {/* Skip hire specific fields */}
      {productId === "skip-hire" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="wasteType" className="block text-sm font-medium text-text mb-1">
                Waste Type *
              </label>
              <select id="wasteType" name="wasteType" required className={inputClass}>
                <option value="">Select type...</option>
                <option value="general">General / Mixed Waste</option>
                <option value="garden">Garden Waste</option>
                <option value="soil-rubble">Soil & Rubble</option>
                <option value="construction">Construction / Demolition</option>
                <option value="household">Household Clearance</option>
                <option value="commercial">Commercial Waste</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-text mb-1">
                How Long Do You Need It? *
              </label>
              <select id="duration" name="duration" required className={inputClass}>
                <option value="">Select duration...</option>
                <option value="1-3-days">1-3 days</option>
                <option value="1-week">1 week</option>
                <option value="2-weeks">2 weeks</option>
                <option value="1-month">1 month</option>
                <option value="ongoing">Ongoing / not sure</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-text mb-1">
                Delivery Address / Postcode *
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="e.g. NE1 4ST or 12 High Street, Newcastle"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="placement" className="block text-sm font-medium text-text mb-1">
                Where Will the Skip Go? *
              </label>
              <select id="placement" name="placement" required className={inputClass}>
                <option value="">Select...</option>
                <option value="driveway">Private driveway / land</option>
                <option value="road">Public road (permit needed)</option>
                <option value="not-sure">Not sure</option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* Van hire specific fields */}
      {productId === "van-hire" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="driveType" className="block text-sm font-medium text-text mb-1">
                Self-Drive or With Driver? *
              </label>
              <select id="driveType" name="driveType" required className={inputClass}>
                <option value="self-drive">Self-Drive</option>
                <option value="with-driver">With Driver</option>
                <option value="either">Either / No Preference</option>
              </select>
            </div>
            <div>
              <label htmlFor="collectionLocation" className="block text-sm font-medium text-text mb-1">
                Collection / Delivery Location *
              </label>
              <input
                type="text"
                id="collectionLocation"
                name="collectionLocation"
                required
                placeholder="e.g. Manchester city centre"
                className={inputClass}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-text mb-1">
                Start Date *
              </label>
              <input type="date" id="startDate" name="startDate" min={minDate} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium text-text mb-1">
                End Date *
              </label>
              <input type="date" id="endDate" name="endDate" min={minDate} required className={inputClass} />
            </div>
          </div>
        </>
      )}

      {/* Locksmith specific fields */}
      {productId === "locksmith" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="urgency" className="block text-sm font-medium text-text mb-1">
                How Urgent? *
              </label>
              <select id="urgency" name="urgency" required className={inputClass}>
                <option value="">Select...</option>
                <option value="emergency">Emergency — right now</option>
                <option value="today">Today</option>
                <option value="within-48h">Within 48 hours</option>
                <option value="planned">Planned / flexible</option>
              </select>
            </div>
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-text mb-1">
                Property Type *
              </label>
              <select id="propertyType" name="propertyType" required className={inputClass}>
                <option value="">Select...</option>
                <option value="house">House</option>
                <option value="flat">Flat / Apartment</option>
                <option value="business">Business / Commercial</option>
                <option value="vehicle">Vehicle</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-text mb-1">
              Location / Postcode *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              required
              placeholder="e.g. NE1 4ST or 12 High Street, Newcastle"
              className={inputClass}
            />
          </div>
        </>
      )}

      {/* Removal companies specific fields */}
      {productId === "removal-companies" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bedrooms" className="block text-sm font-medium text-text mb-1">
                Number of Bedrooms
              </label>
              <select id="bedrooms" name="bedrooms" className={inputClass}>
                <option value="">N/A or not sure</option>
                <option value="studio">Studio / 1 room</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>
            </div>
            <div>
              <label htmlFor="moveDate" className="block text-sm font-medium text-text mb-1">
                Moving Date *
              </label>
              <input type="date" id="moveDate" name="moveDate" min={minDate} required className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="movingFrom" className="block text-sm font-medium text-text mb-1">
                Moving From *
              </label>
              <input
                type="text"
                id="movingFrom"
                name="movingFrom"
                required
                placeholder="e.g. NE1 4ST or 12 High Street, Newcastle"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="movingTo" className="block text-sm font-medium text-text mb-1">
                Moving To *
              </label>
              <input
                type="text"
                id="movingTo"
                name="movingTo"
                required
                placeholder="e.g. LS1 5DL or 24 Park Lane, Leeds"
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="needPacking" className="block text-sm font-medium text-text mb-1">
              Do You Need a Packing Service?
            </label>
            <select id="needPacking" name="needPacking" className={inputClass}>
              <option value="no">No — I&apos;ll pack myself</option>
              <option value="yes">Yes — full packing service</option>
              <option value="partial">Partial — fragile items only</option>
              <option value="not-sure">Not sure yet</option>
            </select>
          </div>
        </>
      )}

      {/* Bouncy castle hire specific fields */}
      {productId === "bouncy-castle-hire" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-text mb-1">
                Event Date *
              </label>
              <input type="date" id="eventDate" name="eventDate" min={minDate} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="indoorOutdoor" className="block text-sm font-medium text-text mb-1">
                Indoor or Outdoor? *
              </label>
              <select id="indoorOutdoor" name="indoorOutdoor" required className={inputClass}>
                <option value="outdoor">Outdoor</option>
                <option value="indoor">Indoor (village hall, etc.)</option>
                <option value="either">Either / Not sure</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="venue" className="block text-sm font-medium text-text mb-1">
                Venue / Postcode *
              </label>
              <input type="text" id="venue" name="venue" required placeholder="e.g. NE1 4ST or back garden" className={inputClass} />
            </div>
            <div>
              <label htmlFor="ageRange" className="block text-sm font-medium text-text mb-1">
                Age Range of Children
              </label>
              <select id="ageRange" name="ageRange" className={inputClass}>
                <option value="">Any / mixed</option>
                <option value="under-5">Under 5</option>
                <option value="5-10">5-10</option>
                <option value="10-16">10-16</option>
                <option value="adults">Adults</option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* Limo hire specific fields */}
      {productId === "limo-hire" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-text mb-1">
                Event Date *
              </label>
              <input type="date" id="eventDate" name="eventDate" min={minDate} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="passengers" className="block text-sm font-medium text-text mb-1">
                Number of Passengers *
              </label>
              <input type="number" id="passengers" name="passengers" min="1" max="30" required className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pickupLocation" className="block text-sm font-medium text-text mb-1">
                Pickup Location *
              </label>
              <input type="text" id="pickupLocation" name="pickupLocation" required placeholder="e.g. Manchester city centre" className={inputClass} />
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-text mb-1">
                Destination
              </label>
              <input type="text" id="destination" name="destination" placeholder="e.g. venue name or address" className={inputClass} />
            </div>
          </div>
          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-text mb-1">
              Hours Required
            </label>
            <select id="hours" name="hours" className={inputClass}>
              <option value="">Not sure</option>
              <option value="1-2">1-2 hours</option>
              <option value="3-4">3-4 hours</option>
              <option value="5-6">5-6 hours</option>
              <option value="full-day">Full day</option>
              <option value="overnight">Overnight</option>
            </select>
          </div>
        </>
      )}

      {/* Plant hire specific fields */}
      {productId === "plant-hire" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-text mb-1">
                Start Date *
              </label>
              <input type="date" id="startDate" name="startDate" min={minDate} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-text mb-1">
                Hire Duration *
              </label>
              <select id="duration" name="duration" required className={inputClass}>
                <option value="">Select...</option>
                <option value="1-day">1 day</option>
                <option value="2-3-days">2-3 days</option>
                <option value="1-week">1 week</option>
                <option value="2-weeks">2 weeks</option>
                <option value="1-month">1 month+</option>
                <option value="not-sure">Not sure</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="siteLocation" className="block text-sm font-medium text-text mb-1">
                Site Location / Postcode *
              </label>
              <input type="text" id="siteLocation" name="siteLocation" required placeholder="e.g. NE1 4ST or site address" className={inputClass} />
            </div>
            <div>
              <label htmlFor="operatedOrSelfDrive" className="block text-sm font-medium text-text mb-1">
                Operated or Self-Drive? *
              </label>
              <select id="operatedOrSelfDrive" name="operatedOrSelfDrive" required className={inputClass}>
                <option value="self-drive">Self-Drive (I have a CPCS card)</option>
                <option value="operated">Operated (with driver)</option>
                <option value="either">Either / Not sure</option>
              </select>
            </div>
          </div>
        </>
      )}

      {/* Driving lessons specific fields */}
      {productId === "driving-lessons" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="transmission" className="block text-sm font-medium text-text mb-1">
                Transmission *
              </label>
              <select id="transmission" name="transmission" required className={inputClass}>
                <option value="">Select...</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
                <option value="no-preference">No Preference</option>
              </select>
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-text mb-1">
                Experience Level *
              </label>
              <select id="experience" name="experience" required className={inputClass}>
                <option value="">Select...</option>
                <option value="complete-beginner">Complete Beginner</option>
                <option value="some-lessons">Had Some Lessons</option>
                <option value="test-ready">Nearly Test Ready</option>
                <option value="full-licence">Full Licence (refresher)</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-text mb-1">
              Pickup Area / Postcode *
            </label>
            <input type="text" id="area" name="area" required placeholder="e.g. NE1 4ST or Jesmond, Newcastle" className={inputClass} />
          </div>
        </>
      )}

      {/* Minibus hire specific fields */}
      {productId === "minibus-hire" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="journeyType" className="block text-sm font-medium text-text mb-1">
                Journey Type *
              </label>
              <select
                id="journeyType"
                name="journeyType"
                required
                value={journeyType}
                onChange={(e) => setJourneyType(e.target.value)}
                className={inputClass}
              >
                <option value="one-way">One Way</option>
                <option value="return">Return</option>
                <option value="multi-stop">Multi-Stop</option>
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-text mb-1">
                Journey Date *
              </label>
              <input type="date" id="date" name="date" min={minDate} required className={inputClass} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-text mb-1">
                Pickup Time *
              </label>
              <input type="time" id="time" name="time" required className={inputClass} />
            </div>
            {journeyType === "return" && (
              <div>
                <label htmlFor="returnDate" className="block text-sm font-medium text-text mb-1">
                  Return Date
                </label>
                <input type="date" id="returnDate" name="returnDate" min={minDate} className={inputClass} />
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="pickup" className="block text-sm font-medium text-text mb-1">
                Pickup Location *
              </label>
              <input
                type="text"
                id="pickup"
                name="pickup"
                required
                placeholder="e.g. Newcastle city centre"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-text mb-1">
                Destination *
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                required
                placeholder="e.g. Newcastle Airport"
                className={inputClass}
              />
            </div>
          </div>
        </>
      )}

      {/* Common: Budget + Message */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-text mb-1">
            Budget Range
          </label>
          <select id="budget" name="budget" className={inputClass}>
            <option value="">No preference</option>
            <option value="under-100">Under &pound;100</option>
            <option value="100-250">&pound;100 - &pound;250</option>
            <option value="250-500">&pound;250 - &pound;500</option>
            <option value="500-1000">&pound;500 - &pound;1,000</option>
            <option value="over-1000">&pound;1,000+</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder={
            productId === "skip-hire"
              ? "Any access issues, heavy items, specific requirements..."
              : productId === "van-hire"
                ? "What you're moving, any special requirements..."
                : productId === "locksmith"
                  ? "Describe the issue, e.g. locked out, broken lock, key snapped..."
                  : productId === "removal-companies"
                    ? "Large or specialist items, access issues, floors/lifts, storage needs..."
                    : productId === "bouncy-castle-hire"
                      ? "Number of children, garden size, power supply available..."
                      : productId === "limo-hire"
                        ? "Any special requests, decorations, drinks packages..."
                        : productId === "plant-hire"
                          ? "Project type, ground conditions, access to site..."
                          : productId === "driving-lessons"
                            ? "Preferred days/times, any specific requirements, test date if booked..."
                            : "Any special requirements, luggage, accessibility needs..."
          }
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-accent hover:bg-accent-dark disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg cursor-pointer"
      >
        {submitting ? "Sending..." : "Get Quotes For Me"}
      </button>

      <p className="text-xs text-text-light text-center">
        We&apos;ll contact operators on your behalf and email you quotes as they come in. Free, no obligation.
      </p>
    </form>
  );
}
