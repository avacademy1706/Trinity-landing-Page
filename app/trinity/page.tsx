import type { Metadata } from "next";
import "./trinity.css";
import TrinityClient from "./TrinityClient";

export const metadata: Metadata = {
  title: "Trinity — Luxurious 3 & 4 BHK Homes & Penthouses in Gomti Nagar, Lucknow",
  description:
    "Trinity in Gomti Nagar Extension, Lucknow — luxurious 3 & 4 BHK homes & penthouses. Check price & floor plans.",
};

export default function TrinityPage() {
  return (
    <div className="trinity">
      <TrinityClient />
    </div>
  );
}
