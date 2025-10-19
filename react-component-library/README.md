# React Component Library

A comprehensive, modern React component library built with TypeScript, Tailwind CSS, and best practices for building scalable web applications.

## 🌟 Features

- **Modern Stack**: Built with React 18, TypeScript, and Tailwind CSS
- **Comprehensive Components**: 25+ production-ready UI components
- **Type Safety**: Full TypeScript support with proper type definitions
- **Customizable**: Flexible theming and styling with CSS variables
- **Accessible**: WCAG compliant components with proper ARIA attributes
- **Mobile-First**: Responsive design principles throughout
- **Developer Experience**: Hot reload, TypeScript support, and comprehensive documentation

## 📦 Installation

```bash
npm install @your-org/react-component-library
# or
yarn add @your-org/react-component-library
# or
pnpm add @your-org/react-component-library
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { Button, Card, Input, List, StatsCard } from '@your-org/react-component-library';

function App() {
  return (
    <div className="p-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Enter your name" />
          <Button className="mt-4">Submit</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
```

## 📚 Component Categories

### 🎛️ Form & Input Components
- **Button** - Versatile button component with multiple variants
- **Input** - Form input with validation states
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection component
- **Switch** - Toggle switch component
- **Label** - Form label component

### 🎨 Layout & Navigation
- **Card** - Content container with header, content, and footer
- **Badge** - Status indicators and labels
- **Dropdown Menu** - Contextual menu component
- **Sonner** - Toast notification system

### 📊 Data Display & Visualization
- **DataTable** - Sortable, filterable, paginated table
- **Chart** - Line, bar, pie charts (Chart.js/Recharts integration)
- **Timeline** - Event timeline component
- **Calendar** - Date picker and event calendar
- **Heatmap** - Activity/data heatmap visualization
- **Tree** - Hierarchical data display
- **List** - Virtualized lists for large datasets
- **StatsCard** - KPI/metrics display cards

### 🎭 Interactive Components
- **Motion Wrapper** - Animation wrapper with Framer Motion
- **Theme Toggle** - Dark/light mode switcher
- **Language Toggle** - Internationalization support

## 🎨 Theming

The component library supports comprehensive theming through CSS variables:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

## 🔧 Development

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Setup
```bash
git clone <repository-url>
cd react-component-library
npm install
npm run dev
```

### Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run test         # Run tests
```

### Project Structure
```
src/
├── components/          # React components
│   ├── ui/             # Core UI components
│   ├── layout/         # Layout components
│   └── routes/         # Route components for examples
├── lib/                # Utility functions and contexts
├── data/               # Component metadata and configuration
└── styles/             # Global styles and CSS
```

## 🗺️ Roadmap

### ✅ Completed Components
- [x] DataTable - Sortable, filterable, paginated table
- [x] Chart - Line, bar, pie charts (Chart.js/Recharts integration)
- [x] Timeline - Event timeline component
- [x] Calendar - Date picker and event calendar
- [x] Heatmap - Activity/data heatmap
- [x] Tree - Hierarchical data display
- [x] List - Virtualized lists for large datasets
- [x] StatsCard - KPI/metrics display cards

### 🔄 In Progress
- Form validation system
- Advanced animation components
- Mobile-specific components

### 🚀 Upcoming Features
- DatePicker - Advanced date selection
- TimePicker - Time selection component
- ColorPicker - Color selection with palette
- FileUpload - Drag & drop file upload
- RichTextEditor - WYSIWYG editor
- Breadcrumb - Navigation breadcrumbs
- Pagination - Page navigation
- Stepper - Multi-step form navigation
- Accordion - Collapsible content sections
- Carousel - Image/content carousel
- Drawer - Slide-out panel
- CommandPalette - Searchable command interface
- Notification - Toast notifications
- Loading - Loading states and skeletons
- EmptyState - No data states
- ErrorBoundary - Error handling component

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Sull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Class Variance Authority](https://cva.style/) for component variants

---

## Türkçe

# React Component Library

TypeScript, Tailwind CSS ve en iyi uygulamalar kullanılarak ölçeklenebilir web uygulamaları oluşturmak için geliştirilmiş kapsamlı, modern bir React component kütüphanesi.

## 🌟 Özellikler

- **Modern Stack**: React 18, TypeScript ve Tailwind CSS ile geliştirildi
- **Kapsamlı Bileşenler**: 25+ üretim hazır UI bileşeni
- **Tip Güvenliği**: Uygun tip tanımları ile tam TypeScript desteği
- **Özelleştirilebilir**: CSS değişkenleri ile esnek tema ve stil sistemi
- **Erişilebilir**: Uygun ARIA özellikleri ile WCAG uyumlu bileşenler
- **Mobil-First**: Tüm bileşenlerde responsive tasarım prensipleri
- **Geliştirici Deneyimi**: Hot reload, TypeScript desteği ve kapsamlı dokümantasyon

## 📦 Kurulum

```bash
npm install @your-org/react-component-library
# veya
yarn add @your-org/react-component-library
# veya
pnpm add @your-org/react-component-library
```

## 🚀 Hızlı Başlangıç

```tsx
import React from 'react';
import { Button, Card, Input, List, StatsCard } from '@your-org/react-component-library';

function App() {
  return (
    <div className="p-8">
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Hoş Geldiniz</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Adınızı girin" />
          <Button className="mt-4">Gönder</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
```

## 📚 Bileşen Kategorileri

### 🎛️ Form ve Input Bileşenleri
- **Button** - Çoklu varyantları olan çok amaçlı buton bileşeni
- **Input** - Doğrulama durumları olan form input'u
- **Textarea** - Çok satırlı metin girişi
- **Select** - Açılır menü seçim bileşeni
- **Switch** - Açma/kapama anahtarı bileşeni
- **Label** - Form etiketi bileşeni

### 🎨 Layout ve Navigasyon
- **Card** - Başlık, içerik ve alt bilgi ile içerik konteyneri
- **Badge** - Durum göstergeleri ve etiketler
- **Dropdown Menu** - Bağlamsal menü bileşeni
- **Sonner** - Bildirim sistemi

### 📊 Veri Görüntüleme ve Görselleştirme
- **DataTable** - Sıralanabilir, filtrelenebilir, sayfalanmış tablo
- **Chart** - Çizgi, çubuk, pasta grafikleri (Chart.js/Recharts entegrasyonu)
- **Timeline** - Olay zaman çizelgesi bileşeni
- **Calendar** - Tarih seçici ve etkinlik takvimi
- **Heatmap** - Aktivite/veri ısı haritası görselleştirmesi
- **Tree** - Hiyerarşik veri görüntüleme
- **List** - Büyük veri setleri için sanal listeler
- **StatsCard** - KPI/metrik görüntüleme kartları

### 🎭 Etkileşimli Bileşenler
- **Motion Wrapper** - Framer Motion ile animasyon wrapper'ı
- **Theme Toggle** - Karanlık/aydınlık mod değiştirici
- **Language Toggle** - Uluslararasılaştırma desteği

## 🎨 Tema Sistemi

Component kütüphanesi CSS değişkenleri aracılığıyla kapsamlı tema desteği sunar:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 222.2 84% 4.9%;
  --radius: 0.5rem;
}
```

## 🔧 Geliştirme

### Ön Gereksinimler
- Node.js 18+
- npm, yarn, veya pnpm

### Kurulum
```bash
git clone <repository-url>
cd react-component-library
npm install
npm run dev
```

### Scriptler
```bash
npm run dev          # Geliştirme sunucusunu başlat
npm run build        # Üretim için derle
npm run lint         # ESLint çalıştır
npm run type-check   # TypeScript kontrollerini çalıştır
npm run test         # Testleri çalıştır
```

### Proje Yapısı
```
src/
├── components/          # React bileşenleri
│   ├── ui/             # Temel UI bileşenleri
│   ├── layout/         # Layout bileşenleri
│   └── routes/         # Örnekler için route bileşenleri
├── lib/                # Yardımcı fonksiyonlar ve context'ler
├── data/               # Bileşen metadata'sı ve konfigürasyonu
└── styles/             # Global stiller ve CSS
```

## 🗺️ Yol Haritası

### ✅ Tamamlanan Bileşenler
- [x] DataTable - Sıralanabilir, filtrelenebilir, sayfalanmış tablo
- [x] Chart - Çizgi, çubuk, pasta grafikleri (Chart.js/Recharts entegrasyonu)
- [x] Timeline - Olay zaman çizelgesi bileşeni
- [x] Calendar - Tarih seçici ve etkinlik takvimi
- [x] Heatmap - Aktivite/veri ısı haritası
- [x] Tree - Hiyerarşik veri görüntüleme
- [x] List - Büyük veri setleri için sanal listeler
- [x] StatsCard - KPI/metrik görüntüleme kartları

### 🔄 Devam Eden Çalışmalar
- Form doğrulama sistemi
- Gelişmiş animasyon bileşenleri
- Mobil özel bileşenler

### 🚀 Yakında Gelecek Özellikler
- DatePicker - Gelişmiş tarih seçimi
- TimePicker - Zaman seçim bileşeni
- ColorPicker - Palet ile renk seçimi
- FileUpload - Sürükle ve bırak dosya yükleme
- RichTextEditor - WYSIWYG editör
- Breadcrumb - Navigasyon breadcrumb'ları
- Pagination - Sayfa navigasyonu
- Stepper - Çok adımlı form navigasyonu
- Accordion - Katlanabilir içerik bölümleri
- Carousel - Görsel/içerik karuseli
- Drawer - Kaydırmalı panel
- CommandPalette - Aranabilir komut arayüzü
- Notification - Bildirimler
- Loading - Yükleme durumları ve iskeletler
- EmptyState - Veri olmayan durumlar
- ErrorBoundary - Hata yakalama bileşeni

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Detaylar için [Katkıda Bulunma Rehberi](CONTRIBUTING.md)'mizi inceleyin.

1. Repository'yi fork edin
2. Feature branch'inizi oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📄 Lisans

Bu proje MIT Lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- [Tailwind CSS](https://tailwindcss.com/) - utility-first CSS framework'ü için
- [Radix UI](https://www.radix-ui.com/) - erişilebilir component primitive'leri için
- [Lucide React](https://lucide.dev/) - güzel ikonlar için
- [Framer Motion](https://www.framer.com/motion/) - pürüzsüz animasyonlar için
- [Class Variance Authority](https://cva.style/) - component varyantları için