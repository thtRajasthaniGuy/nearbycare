"use client";

import React, { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  Mail,
  MapPin,
  Database,
  UserCheck,
  AlertCircle,
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

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="bg-[var(--background-light)] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={40} className="text-[var(--primary-color)]" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-gray-200 text-lg max-w-2xl">
            Your privacy matters to us. Learn how we collect, use, and protect
            your information on KarunaHub.
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
            Welcome to KarunaHub
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            KarunaHub (also known as KarunaHub) is committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our platform to discover
            NGOs, submit organization listings, or manage NGO profiles.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using KarunaHub, you agree to the collection and use of
            information in accordance with this policy. If you do not agree with
            our policies and practices, please do not use our platform.
          </p>
        </div>

        {/* Collapsible Sections */}
        <CollapsibleSection
          title="Information We Collect"
          icon={<Database size={24} />}
        >
          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            1. Anonymous Visitors
          </h4>
          <p className="mb-3">
            When you browse our platform without creating an account, we
            collect:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>Location data (if you grant permission) to show nearby NGOs</li>
            <li>Device information and browser type</li>
            <li>IP address and general geographic location</li>
            <li>Pages visited and interaction patterns</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mt-6 mb-2">
            2. Anonymous NGO Submissions
          </h4>
          <p className="mb-3">
            When you submit an NGO listing without an account, we collect:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>Email address (for submission updates only)</li>
            <li>
              NGO details: name, location, contact information, description
            </li>
            <li>
              Supporting documents or verification materials (if provided)
            </li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mt-6 mb-2">
            3. NGO Account Holders
          </h4>
          <p className="mb-3">When you create an NGO account, we collect:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>Personal information: name, email, phone number</li>
            <li>
              Organization details: name, registration number, address, type
            </li>
            <li>Profile content: description, photos, donation needs</li>
            <li>Authentication credentials (securely hashed passwords)</li>
            <li>Verification documents for NGO legitimacy</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mt-6 mb-2">
            4. Automatically Collected Information
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>Cookies and similar tracking technologies</li>
            <li>Usage data and analytics</li>
            <li>Device identifiers</li>
            <li>Log files and error reports</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection
          title="How We Use Your Information"
          icon={<Eye size={24} />}
        >
          <p className="mb-3">
            We use collected information for the following purposes:
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Platform Functionality
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>Display NGOs on our interactive India map based on location</li>
            <li>Enable discovery of nearby organizations</li>
            <li>Process and review anonymous NGO submissions</li>
            <li>Manage NGO account profiles and dashboards</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Communication
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>Send submission status updates to anonymous contributors</li>
            <li>Notify NGOs about profile changes and verification status</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Send important platform updates and announcements</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Verification & Trust
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>Verify NGO legitimacy and authenticity</li>
            <li>Prevent fraud and maintain platform integrity</li>
            <li>Ensure data quality in our directory</li>
          </ul>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Improvement & Analytics
          </h4>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>Analyze platform usage to improve user experience</li>
            <li>Optimize map interface and search functionality</li>
            <li>Understand which NGOs receive the most engagement</li>
            <li>Develop new features based on user needs</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection
          title="Information Sharing & Disclosure"
          icon={<UserCheck size={24} />}
        >
          <p className="mb-4 font-semibold text-[var(--text-dark)]">
            We do not sell, rent, or trade your personal information. We may
            share information in the following limited circumstances:
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Public Information
          </h4>
          <p className="mb-3 text-gray-600">
            NGO listings (name, location, description, contact details) are
            publicly visible on our map and directory. This is essential for our
            mission of connecting communities with NGOs.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Service Providers
          </h4>
          <p className="mb-3 text-gray-600">
            We may share data with trusted third-party service providers who
            assist us in:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600 mb-4">
            <li>Hosting and infrastructure (cloud services)</li>
            <li>Email delivery services</li>
            <li>Analytics and monitoring tools</li>
            <li>Payment processing (if applicable)</li>
          </ul>
          <p className="text-gray-600 mb-4">
            These providers are contractually bound to protect your data and use
            it only for specified purposes.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Legal Requirements
          </h4>
          <p className="mb-3 text-gray-600">
            We may disclose information if required by law, court order, or
            government request, or to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>Comply with legal obligations</li>
            <li>Protect our rights, property, or safety</li>
            <li>Prevent fraud or security issues</li>
            <li>Respond to emergency situations</li>
          </ul>
        </CollapsibleSection>

        <CollapsibleSection title="Data Security" icon={<Lock size={24} />}>
          <p className="mb-4">
            We implement industry-standard security measures to protect your
            information:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 text-gray-600">
            <li>
              <strong>Encryption:</strong> All data transmission uses SSL/TLS
              encryption
            </li>
            <li>
              <strong>Secure Storage:</strong> Passwords are hashed using
              industry-standard algorithms
            </li>
            <li>
              <strong>Access Controls:</strong> Limited employee access to
              personal data
            </li>
            <li>
              <strong>Regular Audits:</strong> Periodic security assessments and
              updates
            </li>
            <li>
              <strong>Monitoring:</strong> Continuous monitoring for suspicious
              activity
            </li>
          </ul>
          <div className="mt-4 p-4 bg-orange-50 border border-[var(--primary-color)] rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Important:</strong> While we strive to protect your
              information, no internet transmission is 100% secure. Please use
              strong passwords and keep your account credentials confidential.
            </p>
          </div>
        </CollapsibleSection>

        <CollapsibleSection
          title="Your Rights & Choices"
          icon={<UserCheck size={24} />}
        >
          <p className="mb-4">
            You have the following rights regarding your data:
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Access & Correction
          </h4>
          <p className="text-gray-600 mb-4">
            NGO account holders can access and update their profile information
            anytime through their dashboard.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Account Deletion
          </h4>
          <p className="text-gray-600 mb-4">
            You may request account deletion at any time. We will remove your
            personal information within 30 days, though we may retain certain
            data for legal compliance.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Submission Withdrawal
          </h4>
          <p className="text-gray-600 mb-4">
            If you submitted an NGO anonymously, contact us using the email you
            provided to request removal.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Location Permissions
          </h4>
          <p className="text-gray-600 mb-4">
            You can enable or disable location access in your browser settings
            at any time. Disabling location will limit nearby NGO discovery
            features.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Marketing Communications
          </h4>
          <p className="text-gray-600">
            You can opt out of promotional emails using the unsubscribe link in
            any message. Note that you'll still receive essential platform
            updates.
          </p>
        </CollapsibleSection>

        <CollapsibleSection
          title="Cookies & Tracking"
          icon={<AlertCircle size={24} />}
        >
          <p className="mb-4">
            We use cookies and similar technologies to enhance your experience:
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Essential Cookies
          </h4>
          <p className="text-gray-600 mb-4">
            Required for platform functionality, authentication, and security.
            These cannot be disabled.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Analytics Cookies
          </h4>
          <p className="text-gray-600 mb-4">
            Help us understand how users interact with our platform to improve
            functionality.
          </p>

          <h4 className="font-semibold text-[var(--text-dark)] mb-2">
            Preference Cookies
          </h4>
          <p className="text-gray-600 mb-4">
            Remember your settings and preferences for a personalized
            experience.
          </p>

          <p className="text-gray-600">
            You can manage cookie preferences through your browser settings.
            Note that disabling cookies may limit platform functionality.
          </p>
        </CollapsibleSection>

        <CollapsibleSection
          title="Children's Privacy"
          icon={<Shield size={24} />}
        >
          <p className="mb-4">
            KarunaHub is not intended for children under 13 years of age. We do
            not knowingly collect personal information from children under 13.
          </p>
          <p className="text-gray-600">
            If you believe we have inadvertently collected information from a
            child under 13, please contact us immediately, and we will take
            prompt action to delete such information.
          </p>
        </CollapsibleSection>

        <CollapsibleSection
          title="Changes to Privacy Policy"
          icon={<AlertCircle size={24} />}
        >
          <p className="mb-4">
            We may update this Privacy Policy periodically to reflect changes in
            our practices or legal requirements. Updates will be posted on this
            page with a revised "Last Updated" date.
          </p>
          <p className="text-gray-600 mb-4">
            For significant changes, we will notify NGO account holders via
            email and may display a prominent notice on our platform.
          </p>
          <p className="text-gray-600">
            Continued use of KarunaHub after changes constitutes acceptance of
            the updated policy.
          </p>
        </CollapsibleSection>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-[var(--background-light)] to-[var(--secondary-color)] text-white rounded-xl shadow-lg p-8 mt-8">
          <div className="flex items-start gap-4">
            <Mail
              size={32}
              className="text-[var(--primary-color)] flex-shrink-0 mt-1"
            />
            <div>
              <h3 className="text-2xl font-bold mb-3">
                Questions About Privacy?
              </h3>
              <p className="text-gray-100 mb-4 leading-relaxed">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, we're here to help.
              </p>
              <div className="space-y-2">
                <p className="text-gray-100">
                  <strong>Email:</strong> karunahub@zohomail.in
                </p>
                <p className="text-gray-100">
                  <strong>Response Time:</strong> We aim to respond within 48
                  hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
          <p className="text-sm text-gray-700 text-center">
            By using KarunaHub, you acknowledge that you have read and
            understood this Privacy Policy and agree to its terms.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
