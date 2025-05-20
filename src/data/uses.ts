export type UseItem =
  | UseItemText
  | UseItemLink
  | UseItemWithImage
  | UseItemBulleted
  | UseItemStructured;

export interface UseItemText {
  type: "text";
  content: string;
}

export interface UseItemLink {
  type: "link";
  content: string;
  url: string;
}

export interface UseItemWithImage {
  type: "image";
  content: string;
  imageUrl: string;
  imageAlt?: string;
  url?: string;
}

export interface UseItemStructured {
  type: "structured";
  title: string;
  body: string;
  additionalInfo?: string;
  url?: string;
}

export interface UseItemBulleted {
  type: "bulleted";
  title: string;
  body?: string;
  bullets: string[];
}

export interface UseSection {
  title: string;
  items: UseItem[];
}

export const lastUpdated = new Date("2025-05-20").toLocaleDateString("es-ES", {
  month: "long",
  year: "numeric",
});

export const usesData: UseSection[] = [
  {
    title: "Espacio de trabajo",
    items: [
      {
        type: "structured",
        title: "Escritorio ajustable en altura",
        body: "Escritorio de pie ajustable en altura, ideal para alternar entre estar sentado y de pie mientras trabajo.",
        additionalInfo:
          "Originalmente es manual, pero le añadí un motor para hacerlo eléctrico.",
      },
      {
        type: "link",
        content: "Silla gamer Corsair T3 Rush",
        url: "https://www.corsair.com/es/es/p/gaming-chairs/cf-9010057-ww/t3-rush-fabric-gaming-chair-2023-charcoal-cf-9010057-ww",
      },
      {
        type: "text",
        content: 'Monitor Dell 27" (principal)',
      },
      {
        type: "text",
        content: "Monitor portátil ASUS (secundario)",
      },
      {
        type: "text",
        content: "Barra de luz para monitor Xiaomi",
      },
      {
        type: "text",
        content: "Teclado Logitech POP",
      },
      {
        type: "text",
        content: "Mouse Logitech POP",
      },
      {
        type: "structured",
        title: "Mate eléctrico",
        url: "https://mateelectrico.com/",
        body: "Mate que mantiene la temperatura del agua constante. Ideal para disfrutar de un buen mate mientras trabajo.",
        additionalInfo:
          "Lo compré en la tienda oficial de Mate Eléctrico. Tuve uno con cable y ahora tengo el inalámbrico.",
      },
    ],
  },
  {
    title: "Ordenadores y dispositivos",
    items: [
      {
        type: "text",
        content: 'Trabajo: MacBook Pro M2 14" (2024)',
      },
      {
        type: "bulleted",
        title: 'Personal: MacBook Pro Intel 13" (2020)',
        bullets: [
          "Procesador: 2,3 GHz Intel Core i7 de cuatro núcleos",
          "Memoria: 16GB",
          "Touch Bar",
          "Touch ID",
        ],
      },
      {
        type: "text",
        content: "Móvil: Motorola Edge 40",
      },
      {
        type: "text",
        content: "Smartwatch: Mi Watch Lite 2",
      },
    ],
  },
  {
    title: "Audio",
    items: [
      {
        type: "link",
        content: "Auriculares inalámbricos con noise cancelling WH-1000XM5",
        url: "https://store.sony.com.ar/wh-1000xm5/p",
      },
      {
        type: "text",
        content: "Samsung Galaxy Buds Live",
      },
    ],
  },
  {
    title: "Software y desarrollo",
    items: [
      { type: "text", content: "Visual Studio Code como editor principal" },
      { type: "text", content: "Next.js para desarrollo web" },
      { type: "text", content: "Tailwind CSS para estilos" },
      { type: "text", content: "Git para control de versiones" },
      { type: "text", content: "Vercel para despliegues" },
    ],
  },
  {
    title: "Productividad",
    items: [
      { type: "text", content: "Notion para notas y documentación" },
      { type: "text", content: "Spotify para música mientras trabajo" },
      {
        type: "text",
        content: "Youtube Music para música mientras trabajo y entretenimiento",
      },
      { type: "text", content: "Slack y Discord para comunicación" },
    ],
  },
  {
    title: "Plataformas y servicios",
    items: [
      {
        type: "text",
        content: "GitHub para control de versiones y colaboración",
      },
      { type: "text", content: "Figma para diseño y prototipado" },
      { type: "text", content: "Google Drive para almacenamiento en la nube" },
      { type: "text", content: "Netlify para despliegues de sitios estáticos" },
      { type: "text", content: "Netflix para entretenimiento" },
      { type: "text", content: "YouTube para aprendizaje y entretenimiento" },
      { type: "text", content: "HBO Max para series y películas" },
      { type: "text", content: "Amazon Prime Video para series y películas" },
      { type: "text", content: "Disney+ para series y películas" },
    ],
  },
];
