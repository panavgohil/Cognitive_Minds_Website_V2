import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: FaInstagram,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: FaLinkedinIn,
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: FaYoutube,
  },
];

const exploreLinks = [
  { label: 'The Council', to: '/council' },
  { label: 'Motion Archive', to: '/archive' },
  { label: 'Competitions', to: '/competitions' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Join the Society', to: '/recruitment' },
];

const Footer = () => {
  return (
    <footer className="relative z-10 overflow-hidden bg-primary text-[#F8F4E8]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(248,244,232,.28) 1px, transparent 1px), linear-gradient(90deg, rgba(248,244,232,.28) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-20 lg:px-12 lg:pt-28">
        <div className="mb-16 grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.34em] text-accent">
              Think. Speak. Challenge.
            </p>
            <h2 className="max-w-2xl text-4xl font-serif leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Ideas deserve a room with some electricity.
            </h2>
            <p className="mt-7 max-w-lg text-sm leading-7 text-[#F8F4E8]/60 sm:text-base">
              Cognitive Minds is the debating and public speaking society of
              Delhi Technological University.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:pl-12">
            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#F8F4E8]/45">
                Explore
              </h3>
              <nav aria-label="Footer navigation" className="flex flex-col items-start gap-3">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group inline-flex items-center gap-2 text-sm text-[#F8F4E8]/75 transition-colors hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      size={14}
                      className="translate-y-0.5 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#F8F4E8]/45">
                Contact Us
              </h3>
              <div className="space-y-4 text-sm text-[#F8F4E8]/70">
                <a
                  href="mailto:cognitiveminds@dtu.ac.in"
                  className="flex items-start gap-3 transition-colors hover:text-accent"
                >
                  <Mail aria-hidden="true" size={17} className="mt-0.5 shrink-0" />
                  <span>cognitiveminds@dtu.ac.in</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden="true" size={17} className="mt-0.5 shrink-0" />
                  <span>
                    Delhi Technological University
                    <br />
                    Shahbad Daulatpur, Delhi 110042
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-y border-[#F8F4E8]/10 py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#F8F4E8]/45">
              Follow Us
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Follow Cognitive Minds on ${label}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-[#F8F4E8]/15 bg-[#F8F4E8]/[0.04] px-4 py-2.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-primary"
                >
                  <Icon aria-hidden="true" size={16} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-[#F8F4E8]/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Cognitive Minds. All Rights Reserved.</p>
          <p className="uppercase tracking-[0.18em]">
            Delhi Technological University
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
