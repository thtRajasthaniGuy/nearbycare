"use client";

import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  AlertTriangle,
  Users,
  Shield,
  XCircle,
  Scale,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const CollapsibleSection: React.FC<SectionProps> = ({
  title,
  icon,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mb-4 hover:border-[var(--primary-color)] transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-[var(--primary-color)]">{icon}</div>
          <h3 className="text-lg font-semibold text-[var(--text-dark)] text-left">
            {title}
          </h3>
        </div>
        {isOpen ? (
          <ChevronUp className="text-gray-400 flex-shrink-0" size={20} />
        ) : (
          <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
        )}
      </button>
      {isOpen && (
        <div className="p-6 pt-0 bg-white">
          <div className="text-gray-700 space-y-4">{children}</div>
        </div>
      )}
    </div>
  );
};

const TermsConditionsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-[var(--background-light)] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={40} className="text-[var(--primary-color)]" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-gray-200 text-lg max-w-2xl">
            Please read these terms carefully before using KarunaHub. By
            accessing our platform, you agree to be bound by these terms.
          </p>
          <p className="text-gray-300 text-sm mt-4">
            Last Updated: November 3, 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-[var(--text-dark)] mb-4">
            Agreement to Terms
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to KarunaHub (also known as KarunaHub). These Terms and
            Conditions ("Terms") govern your access to and use of our platform,
            including our website, interactive map, and all related services.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            By accessing or using KarunaHub, you agree to be bound by these
            Terms and our Privacy Policy. If you disagree with any part of these
            Terms, you may not access the platform.
          </p>
          <div className="p-4 bg-orange-50 border border-[var(--primary-color)] rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> KarunaHub is a 100% free platform. We
              do not charge users or NGOs for accessing or using our services.
            </p>
          </div>
        </div>

        {/* Collapsible Sections */}
        <CollapsibleSection
          title="Platform Purpose & Scope"
          icon={<CheckCircle size={24} />}
        >
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            What KarunaHub Offers
          </h4>
          <p className="mb-3">
            KarunaHub is a community-driven platform that provides:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>
              An interactive India map to discover verified NGOs, orphanages,
              and senior centers
            </li>
            <li>
              The ability to browse organizations by location without creating
              an account
            </li>
            <li>
              Anonymous submission of NGO listings to help lesser-known
              organizations get discovered
            </li>
            <li>
              Free account creation for verified NGOs to manage their profiles
            </li>
            <li>A directory of verified social organizations across India</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            What KarunaHub Is Not
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>
              A donation processing platform (we facilitate connections but
              don't handle payments)
            </li>
            <li>A fundraising platform or crowdfunding service</li>
            <li>A legal advisor or consultant for NGO operations</li>
            <li>
              A guarantor of NGO legitimacy (though we verify to the best of our
              ability)
            </li>
            <li>Responsible for outcomes of user interactions with NGOs</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection
          title="User Accounts & Responsibilities"
          icon={<Users size={24} />}
        >
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Anonymous Visitors
          </h4>
          <p className="mb-3 text-gray-600">
            You may browse our map and NGO directory without creating an
            account. You may also submit NGO listings anonymously by providing
            only your email address for status updates.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mt-4 mb-2">
            NGO Account Holders
          </h4>
          <p className="mb-3">To create an NGO account, you must:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>
              Be an authorized representative of a legitimate NGO, orphanage, or
              senior center
            </li>
            <li>
              Provide accurate and complete information during registration
            </li>
            <li>Submit verification documents as requested</li>
            <li>Maintain the security of your account credentials</li>
            <li>Not share your account with unauthorized individuals</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Account Responsibilities
          </h4>
          <p className="mb-3">As an account holder, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>
              Keep your organization's profile information current and accurate
            </li>
            <li>Notify us immediately of any unauthorized account access</li>
            <li>Accept responsibility for all activities under your account</li>
            <li>Not create multiple accounts for the same organization</li>
            <li>Not impersonate another organization or individual</li>
          </ul>

          <div className="mt-4 p-4 bg-purple-50 border border-[var(--secondary-color)] rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Verification Required:</strong> All NGO accounts are
              subject to verification. We reserve the right to suspend or
              terminate accounts that fail verification or violate these Terms.
            </p>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="NGO Listings & Submissions"
          icon={<MessageSquare size={24} />}
        >
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Submission Guidelines
          </h4>
          <p className="mb-3">
            When submitting an NGO listing (anonymously or via account), you
            must:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>Provide truthful and accurate information</li>
            <li>
              Have proper authorization to submit the organization's details
            </li>
            <li>Not submit duplicate listings for the same organization</li>
            <li>Not submit false, misleading, or fraudulent information</li>
            <li>Include valid contact information for verification purposes</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Content Standards
          </h4>
          <p className="mb-3">All content submitted to KarunaHub must:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>Be appropriate for all ages and audiences</li>
            <li>Not contain offensive, hateful, or discriminatory language</li>
            <li>Not include misleading claims about the organization</li>
            <li>Respect intellectual property rights</li>
            <li>
              Not contain spam, advertisements, or promotional content unrelated
              to the NGO
            </li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Review Process
          </h4>
          <p className="text-gray-600">
            All submissions undergo review by our moderation team. We reserve
            the right to reject, edit, or remove listings that don't meet our
            standards or verification requirements. The review process typically
            takes 3-7 business days.
          </p>
        </CollapsibleSection>

        <CollapsibleSection
          title="Verification & Trust"
          icon={<Shield size={24} />}
        >
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Our Verification Efforts
          </h4>
          <p className="mb-3">
            We make reasonable efforts to verify NGO legitimacy through:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>Reviewing registration documents and legal status</li>
            <li>Confirming contact information and physical addresses</li>
            <li>Checking online presence and community reputation</li>
            <li>Validating submitted documents and certificates</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Limitations of Verification
          </h4>
          <p className="mb-3 text-gray-600">
            While we strive for accuracy, verification does not guarantee:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>The ongoing legitimacy of an organization</li>
            <li>The quality of services provided by the NGO</li>
            <li>The financial transparency or management practices</li>
            <li>
              That the organization meets all legal and regulatory requirements
            </li>
          </ul>

          <div className="p-4 bg-yellow-50 border border-yellow-400 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>User Responsibility:</strong> Users should conduct their
              own due diligence before engaging with or supporting any
              organization. KarunaHub is a discovery platform, not a regulatory
              body.
            </p>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Prohibited Activities"
          icon={<XCircle size={24} />}
        >
          <p className="mb-4">You may not use KarunaHub to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>Submit false or fraudulent NGO listings</li>
            <li>Impersonate any person, organization, or entity</li>
            <li>Scrape, harvest, or collect user data from our platform</li>
            <li>Interfere with the platform's functionality or security</li>
            <li>Upload malicious code, viruses, or harmful software</li>
            <li>Spam or harass other users or NGOs</li>
            <li>Violate any applicable laws or regulations</li>
            <li>
              Use the platform for commercial purposes without authorization
            </li>
            <li>Attempt to gain unauthorized access to accounts or systems</li>
            <li>Manipulate map data or location information</li>
            <li>Create fake reviews or engagement</li>
            <li>Use automated tools (bots) without permission</li>
          </ul>

          <p className="mt-4 text-gray-600">
            Violation of these prohibitions may result in immediate account
            suspension or termination and potential legal action.
          </p>
        </CollapsibleSection>

        <CollapsibleSection
          title="Intellectual Property Rights"
          icon={<Scale size={24} />}
        >
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            KarunaHub's Content
          </h4>
          <p className="mb-4 text-gray-600">
            The KarunaHub platform, including its design, code, logos,
            interactive map, and original content, is owned by KarunaHub and
            protected by intellectual property laws. You may not copy, modify,
            distribute, or create derivative works without explicit permission.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            User-Submitted Content
          </h4>
          <p className="mb-3 text-gray-600">
            When you submit content (NGO listings, photos, descriptions), you:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>Retain ownership of your content</li>
            <li>
              Grant KarunaHub a non-exclusive, worldwide, royalty-free license
              to use, display, and distribute your content on our platform
            </li>
            <li>Confirm you have the right to submit the content</li>
            <li>
              Agree that content may remain visible even after account deletion
              (as part of public NGO directory)
            </li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Third-Party Content
          </h4>
          <p className="text-gray-600">
            We respect intellectual property rights. If you believe content on
            our platform infringes your rights, please contact us with details,
            and we will investigate promptly.
          </p>
        </CollapsibleSection>

        <CollapsibleSection
          title="Disclaimers & Limitations of Liability"
          icon={<AlertTriangle size={24} />}
        >
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Platform "As Is"
          </h4>
          <p className="mb-4 text-gray-600">
            KarunaHub is provided "as is" without warranties of any kind,
            express or implied. We do not guarantee the platform will be
            error-free, uninterrupted, or secure.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            NGO Information
          </h4>
          <p className="mb-4 text-gray-600">
            While we verify NGO listings, we do not guarantee the accuracy,
            completeness, or current status of any information. Users interact
            with NGOs at their own risk.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Limitation of Liability
          </h4>
          <p className="mb-3 text-gray-600">
            To the fullest extent permitted by law, KarunaHub and its team
            members shall not be liable for:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>Any indirect, incidental, or consequential damages</li>
            <li>Loss of profits, data, or business opportunities</li>
            <li>Actions or omissions of NGOs listed on our platform</li>
            <li>User interactions with NGOs or other users</li>
            <li>Unauthorized access to your account or data</li>
            <li>Platform downtime or technical issues</li>
          </ul>

          <div className="p-4 bg-red-50 border border-red-400 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Maximum Liability:</strong> Our total liability for any
              claims shall not exceed the amount you paid to use KarunaHub
              (which is zero, as the platform is free).
            </p>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Indemnification" icon={<Shield size={24} />}>
          <p className="mb-4">
            You agree to indemnify, defend, and hold harmless KarunaHub, its
            team members, and affiliates from any claims, damages, losses, or
            expenses (including legal fees) arising from:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>Your use of the platform</li>
            <li>Your violation of these Terms</li>
            <li>Your violation of any third-party rights</li>
            <li>Content you submit to the platform</li>
            <li>Your interactions with NGOs or other users</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Termination" icon={<XCircle size={24} />}>
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">By You</h4>
          <p className="mb-4 text-gray-600">
            NGO account holders may close their accounts at any time by
            contacting us. Anonymous submissions cannot be retracted once
            approved and published.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">By Us</h4>
          <p className="mb-3 text-gray-600">
            We reserve the right to suspend or terminate accounts without prior
            notice if:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>You violate these Terms or our policies</li>
            <li>We cannot verify your NGO's legitimacy</li>
            <li>Your account is inactive for an extended period</li>
            <li>We suspect fraudulent or malicious activity</li>
            <li>Required by law or legal process</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Effect of Termination
          </h4>
          <p className="text-gray-600">
            Upon termination, your access to account features will cease.
            However, publicly visible NGO information may remain in our
            directory for community benefit unless removal is specifically
            requested and approved.
          </p>
        </CollapsibleSection>

        <CollapsibleSection
          title="Changes to Terms"
          icon={<FileText size={24} />}
        >
          <p className="mb-4">
            We may modify these Terms at any time. Changes will be effective
            immediately upon posting to this page with an updated "Last Updated"
            date.
          </p>
          <p className="mb-4 text-gray-600">
            For significant changes, we will notify NGO account holders via
            email and may display a prominent notice on the platform.
          </p>
          <p className="text-gray-600">
            Continued use of KarunaHub after changes constitutes acceptance of
            the modified Terms. If you disagree with changes, you must stop
            using the platform.
          </p>
        </CollapsibleSection>

        <CollapsibleSection
          title="Governing Law & Dispute Resolution"
          icon={<Scale size={24} />}
        >
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Governing Law
          </h4>
          <p className="mb-4 text-gray-600">
            These Terms shall be governed by and construed in accordance with
            the laws of India, without regard to its conflict of law provisions.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Dispute Resolution
          </h4>
          <p className="mb-3 text-gray-600">
            In the event of any dispute, we encourage you to first contact us to
            seek an informal resolution. If informal resolution fails:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>
              Disputes will be subject to the exclusive jurisdiction of courts
              in [Your City], India
            </li>
            <li>
              Both parties agree to attempt mediation before pursuing litigation
            </li>
            <li>
              Any claims must be brought within one year of the cause of action
              arising
            </li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Miscellaneous" icon={<FileText size={24} />}>
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Entire Agreement
          </h4>
          <p className="mb-4 text-gray-600">
            These Terms, together with our Privacy Policy, constitute the entire
            agreement between you and KarunaHub.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Severability
          </h4>
          <p className="mb-4 text-gray-600">
            If any provision of these Terms is found to be unenforceable, the
            remaining provisions will remain in full effect.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">Waiver</h4>
          <p className="mb-4 text-gray-600">
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Assignment
          </h4>
          <p className="text-gray-600">
            You may not assign or transfer these Terms without our written
            consent. We may assign our rights without restriction.
          </p>
        </CollapsibleSection>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[var(--background-light)] to-[var(--secondary-color)] text-white rounded-xl shadow-lg p-8 mt-8">
          <div className="flex items-start gap-4">
            <MessageSquare
              size={32}
              className="text-[var(--primary-color)] flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="text-2xl font-bold mb-3">
                Questions About These Terms?
              </h3>
              <p className="text-gray-100 mb-4 leading-relaxed">
                If you have questions about these Terms & Conditions or need
                clarification on any aspect of our platform, please don't
                hesitate to reach out.
              </p>
              <div className="space-y-2">
                <p className="text-gray-100">
                  <strong>Email:</strong> karunahub@zohomail.in
                </p>

                <p className="text-gray-100">
                  <strong>Response Time:</strong> We typically respond within 48
                  hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Footer */}
        <div className="mt-8 p-6 bg-green-50 border border-green-400 rounded-xl">
          <div className="flex items-start gap-3">
            <CheckCircle
              size={24}
              className="text-green-600 flex-shrink-0 mt-1"
            />
            <div>
              <p className="font-semibold text-gray-800 mb-2">
                Acknowledgment of Agreement
              </p>
              <p className="text-sm text-gray-700">
                By using KarunaHub, you acknowledge that you have read,
                understood, and agree to be bound by these Terms & Conditions
                and our Privacy Policy. If you are representing an NGO, you
                confirm you have the authority to bind the organization to these
                Terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
