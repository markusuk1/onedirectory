"use client";

import { useState } from "react";
import posthog from "posthog-js";
import type { ProductId } from "@/lib/productConfig";

interface QuoteFormProps {
  productId?: ProductId;
}

export default function QuoteForm({ productId = "minibus-hire" }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value || "";

    const base = {
      type: "quote_request",
      product: productId,
      name: getValue("name"),
      email: getValue("email"),
      phone: getValue("phone"),
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
    } else {
      data = {
        ...base,
        date: getValue("date"),
        passengers: parseInt(getValue("passengers")) || null,
        pickup: getValue("pickup"),
        destination: getValue("destination"),
        journeyType: getValue("journeyType"),
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
      posthog.capture("quote_requested", {
        product: productId,
        type: "quote_request",
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
      productId === "skip-hire" ? "skip hire" : productId === "van-hire" ? "van hire" : productId === "locksmith" ? "locksmith" : productId === "removal-companies" ? "removal" : "hire";
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
          Quote Request Sent!
        </h3>
        <p className="text-green-700">
          We&apos;ll be in touch shortly with {productLabel} quotes from local operators.
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

      {/* Common: Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
            Phone Number *
          </label>
          <input type="tel" id="phone" name="phone" required className={inputClass} />
        </div>

        {/* Product-specific second field in this row */}
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

      {/* Product-specific fields */}
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

      {productId === "minibus-hire" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-text mb-1">
                Journey Date *
              </label>
              <input type="date" id="date" name="date" min={minDate} required className={inputClass} />
            </div>
            <div>
              <label htmlFor="journeyType" className="block text-sm font-medium text-text mb-1">
                Journey Type *
              </label>
              <select id="journeyType" name="journeyType" required className={inputClass}>
                <option value="one-way">One Way</option>
                <option value="return">Return</option>
                <option value="multi-stop">Multi-Stop</option>
              </select>
            </div>
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

      {/* Common: Message */}
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
        {submitting ? "Sending..." : "Get Free Quotes"}
      </button>

      <p className="text-xs text-text-light text-center">
        Your details will be shared with relevant operators to provide quotes. No spam, ever.
      </p>
    </form>
  );
}
