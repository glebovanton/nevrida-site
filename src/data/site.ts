/** Project contact data transcribed from Figma. Verify owner-provided contact details before going live. */
export const site = {
  name: "Nevrida",
  url: "https://nevrida.by",
  phoneLabel: "+375(29)166-92-34",
  phoneHref: "tel:+375291669234",
  // Figma's email says 'gmal.com'; preserve literally rather than guessing a correction.
  emailLabel: "nevridaland@gmal.com",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/nevridaland/" },
    { label: "YouTube", href: "https://www.youtube.com/nevridaland" },
    { label: "TikTok", href: null },
    { label: "VK", href: "https://vk.com/nevrida" },
  ],
} as const;
