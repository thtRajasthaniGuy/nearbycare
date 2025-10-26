"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Globe,
  Heart,
  Share2,
  ExternalLink,
  Clock,
  Users,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrganizationByCityName } from "@/api/ngo";
import { NGO } from "../../components/SearchNGOContent";
import ImageSlider from "@/components/ImageSlider";

export default function NGODetailPage() {
  const params = useParams();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [ngo, setNgo] = useState<NGO | null | undefined>(undefined);
  const slug = params.slug as string;
  const location = params.location as string;
  const queryClient = useQueryClient();

  const cachedNGOs = queryClient.getQueryData<NGO[]>(["ngos", location]) || [];
  const cachedNGO = cachedNGOs.find((ngo) => ngo.slug === slug);

  useEffect(() => {
    if (cachedNGO) {
      setNgo(cachedNGO);
    }
  }, [cachedNGO, slug]);

  const { isLoading } = useQuery({
    queryKey: ["ngo-detail", slug, location],
    queryFn: async () => {
      const locationParam = "lastLocation";
      const ngos = await getOrganizationByCityName(locationParam);
      const found = ngos.find((n) => n.slug === slug);
      setNgo(found || null);
      return found;
    },
    enabled: !cachedNGO,
    staleTime: 1000 * 60 * 5,
  });

  if (ngo === undefined && isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (ngo === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            NGO Not Found
          </h2>
          <button
            onClick={() => router.push("/")}
            className="text-[var(--primary-color)] hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative h-64 md:h-96 bg-gradient-to-br from-[var(--background-light)] to-[var(--secondary-color)]">
        <div className="absolute inset-0">
          <ImageSlider images={[]} />
        </div>

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute top-8 left-4 right-4 max-w-6xl mx-auto flex justify-between items-center z-30">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white bg-black/40 hover:bg-black/60 px-4 py-2 rounded-xl backdrop-blur-md transition-all shadow-lg"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md flex items-center justify-center text-white transition-all shadow-lg">
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-20 relative z-10 pb-12">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-dark)]">
                      {ngo?.name}
                    </h1>
                    {ngo?.type && (
                      <div className="w-7 h-7 bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 italic mb-4">
                    {ngo?.tagline}
                  </p>
                  <span className="inline-block px-4 py-2 bg-[var(--secondary-color)]/10 text-[var(--secondary-color)] rounded-full text-sm font-medium">
                    {ngo?.type}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-6">
                {/* <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="text-[var(--primary-color)]" size={20} />
                  </div>
                  <div className="text-xl font-bold text-[var(--text-dark)]">
                    {ngo?.established}
                  </div>
                  <div className="text-sm text-gray-600">Established</div>
                </div> */}
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[var(--secondary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users
                      className="text-[var(--secondary-color)]"
                      size={20}
                    />
                  </div>
                  {/* <div className="text-xl font-bold text-[var(--text-dark)]">
                    {ngo?.beneficiaries}
                  </div> */}
                  <div className="text-sm text-gray-600">Beneficiaries</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-[var(--primary-color)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="text-[var(--primary-color)]" size={20} />
                  </div>
                  {/* <div className="text-xl font-bold text-[var(--text-dark)]">
                    {ngo?.volunteers}
                  </div> */}
                  <div className="text-sm text-gray-600">Volunteers</div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">
                  About
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {ngo?.description}
                </p>
                {/* <p className="text-gray-600 leading-relaxed">
                  {ngo?.longDescription}
                </p> */}
              </div>

              {/* <div className="mt-6">
                <h3 className="text-xl font-semibold text-[var(--text-dark)] mb-3">
                  Our Focus Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {ngo?.causes.map((cause: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-sm font-medium"
                    >
                      {cause}
                    </span>
                  ))}
                </div>
              </div> */}
            </div>

            {/* <div className="bg-gradient-to-r from-[var(--primary-color)] to-[var(--secondary-color)] rounded-2xl p-6 md:p-8 text-white">
                <h3 className="text-2xl font-bold mb-3">
                  Make a Difference Today
                </h3>
                <p className="text-white/90 mb-6">
                  Your support can transform lives. Join us in creating positive
                  change.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-white text-[var(--primary-color)] hover:bg-gray-50 py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                    Donate Now
                  </button>
                  <button className="flex-1 bg-transparent border-2 border-white text-white hover:bg-white/10 py-3 px-6 rounded-xl font-semibold transition-all duration-300">
                    Volunteer
                  </button>
                </div>
              </div> */}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-[var(--text-dark)] mb-4">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="text-[var(--primary-color)] flex-shrink-0 mt-1"
                    size={20}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Address
                    </p>
                    <p className="text-sm text-gray-600">{`${ngo?.address?.street},${ngo?.address?.area},${ngo?.address?.city}, ${ngo?.address?.state},${ngo?.address?.pincode}`}</p>
                  </div>
                </div>

                {/* <div className="flex items-center gap-3">
                  <Clock
                    className="text-[var(--primary-color)] flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      Working Hours
                    </p>
                    <p className="text-sm text-gray-600">{ngo?.workingHours}</p>
                  </div>
                </div> */}

                <div className="pt-4 border-t space-y-3">
                  <a
                    href={`tel:${ngo?.phone}`}
                    className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-[var(--primary-color)] text-[var(--primary-color)] hover:text-white rounded-xl transition-all group"
                  >
                    <Phone size={18} className="flex-shrink-0" />
                    <span className="text-sm font-medium">
                      {ngo?.contact?.phone}
                    </span>
                  </a>

                  <a
                    href={`mailto:${ngo?.email}`}
                    className="flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-[var(--primary-color)] text-[var(--primary-color)] hover:text-white rounded-xl transition-all group"
                  >
                    <Mail size={18} className="flex-shrink-0" />
                    <span className="text-sm font-medium break-all">
                      {ngo?.contact?.email}
                    </span>
                  </a>

                  {/* <a
                    href={`https://${ngo?.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 px-4 py-3 bg-gray-50 hover:bg-[var(--primary-color)] hover:text-white rounded-xl transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Globe size={18} className="flex-shrink-0" />
                      <span className="text-sm font-medium">
                        {ngo?.website}
                      </span>
                    </div>
                    <ExternalLink size={16} className="flex-shrink-0" />
                  </a> */}
                </div>
              </div>
            </div>

            {/* <div className="bg-white rounded-2xl shadow-lg p-4">
              <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin size={40} className="mx-auto mb-2" />
                  <p className="text-sm">Map view coming soon</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
