import React from 'react';
import { motion } from 'framer-motion';
import { Download, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const APP_IMAGE_URL = "https://media.base44.com/images/public/69f421629a32baa29433f382/4d95934ce_image.png";

export default function KumaGO() {
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = APP_IMAGE_URL;
    a.download = 'kumaGO_app.png';
    a.target = '_blank';
    a.click();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold text-foreground mb-1">
          kuma<span className="text-amber-500">GO</span>{' '}
          <span className="font-jp text-3xl">くまごー</span>
        </h1>
        <p className="text-muted-foreground text-sm mt-2">by LIGHTHOUSE 橋</p>
        <p className="text-muted-foreground mt-3 max-w-md mx-auto">
          Scan the QR code with your phone camera to open the app, or download the image below.
        </p>
      </motion.div>

      {/* App preview + QR image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="rounded-2xl overflow-hidden shadow-2xl border border-border/40 max-w-2xl w-full"
      >
        <img
          src={APP_IMAGE_URL}
          alt="kumaGO app preview and QR code"
          className="w-full h-auto object-contain bg-black"
        />
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-3 mt-8"
      >
        <Button
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold gap-2 px-8"
          onClick={handleDownload}
        >
          <Download className="w-5 h-5" />
          Download Image
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="gap-2 border-border/60"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'kumaGO', text: 'Check out kumaGO by LIGHTHOUSE 橋', url: window.location.href });
            }
          }}
        >
          <Smartphone className="w-5 h-5" />
          Share / Open on Phone
        </Button>
      </motion.div>

      <p className="text-xs text-muted-foreground mt-6 text-center">
        Open your camera app → point at the QR code → tap the link that appears
      </p>
    </div>
  );
}