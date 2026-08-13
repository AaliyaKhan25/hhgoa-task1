'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Download, Share2, Sparkles, Plane, Code2, ShieldAlert, Heart, Compass } from 'lucide-react';
import heic2any from 'heic2any';

type ThemeType = 'vscode' | 'boarding_pass' | 'squarepants' | 'barbie_land' | 'bare_bears';

export default function Generator() {
  const [name, setName] = useState<string>('Alex Developer');
  const [role, setRole] = useState<string>('Fullstack Wizard');
  const [stack, setStack] = useState<string>('Next.js, Tailwind, Canvas');
  const [tag, setTag] = useState<string>('#FrameInGoa');
  
  // Theme state supporting 5 options
  const [theme, setTheme] = useState<ThemeType>('vscode');
  
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle Image Upload (HEIC + standard formats)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      let blob: Blob | File = file;
      if (file.name.toLowerCase().endsWith('.heic') || file.type === 'image/heic') {
        const converted = await heic2any({ blob: file, toType: 'image/jpeg' });
        blob = Array.isArray(converted) ? converted[0] : converted;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setLoading(false);
      };
      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Error processing photo:', err);
      alert('Failed to process image.');
      setLoading(false);
    }
  };

  // Main Canvas Render Switcher
  const drawGraphic = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 630;

    switch (theme) {
      case 'vscode':
        drawVSCodeTheme(ctx, canvas.width, canvas.height);
        break;
      case 'boarding_pass':
        drawBoardingPassTheme(ctx, canvas.width, canvas.height);
        break;
      case 'squarepants':
        drawSquarePantsTheme(ctx, canvas.width, canvas.height);
        break;
      case 'barbie_land':
        drawBarbieLandTheme(ctx, canvas.width, canvas.height);
        break;
      case 'bare_bears':
        drawBareBearsTheme(ctx, canvas.width, canvas.height);
        break;
    }
  };

  // Helper: Draw User Photo or Placeholder
  const drawUserPhoto = (
    ctx: CanvasRenderingContext2D,
    photoX: number,
    photoY: number,
    photoSize: number,
    borderColor: string,
    onComplete: () => void
  ) => {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 6;
    ctx.strokeRect(photoX - 4, photoY - 4, photoSize + 8, photoSize + 8);

    if (imageSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
      img.onload = () => {
        const aspect = img.width / img.height;
        let sx, sy, sWidth, sHeight;

        if (aspect > 1) {
          sHeight = img.height;
          sWidth = img.height;
          sx = (img.width - img.height) / 2;
          sy = 0;
        } else {
          sWidth = img.width;
          sHeight = img.width;
          sx = 0;
          sy = (img.height - img.width) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, photoX, photoY, photoSize, photoSize);
        onComplete();
      };
    } else {
      ctx.fillStyle = '#044D29';
      ctx.fillRect(photoX, photoY, photoSize, photoSize);
      ctx.fillStyle = '#FFE600';
      ctx.font = '20px "JetBrains Mono", monospace';
      ctx.fillText('[ PHOTO PREVIEW ]', photoX + 60, photoY + 185);
      onComplete();
    }
  };

  // 1. VS CODE THEME
  const drawVSCodeTheme = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#FFFDEB';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#044D29';
    ctx.lineWidth = 16;
    ctx.strokeRect(8, 8, width - 16, height - 16);

    ctx.fillStyle = '#044D29';
    ctx.fillRect(20, 20, width - 40, 80);

    ctx.fillStyle = '#FFE600';
    ctx.font = '900 42px "Bodoni Moda", serif';
    ctx.fillText('HACKER HOUSE GOA 2026', 40, 75);

    ctx.fillStyle = '#FF007A';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText('VS CODE CARD', 980, 68);

    drawUserPhoto(ctx, 60, 140, 360, '#FF007A', () => {
      const startX = 470;
      let startY = 170;
      const lineHeight = 42;

      ctx.font = 'bold 24px "JetBrains Mono", monospace';

      const renderLine = (tokens: { text: string; color: string }[]) => {
        let currentX = startX;
        tokens.forEach((token) => {
          ctx.fillStyle = token.color;
          ctx.fillText(token.text, currentX, startY);
          currentX += ctx.measureText(token.text).width;
        });
        startY += lineHeight;
      };

      renderLine([{ text: 'const ', color: '#FF007A' }, { text: 'builder', color: '#044D29' }, { text: ' = {', color: '#044D29' }]);
      renderLine([{ text: '  name: ', color: '#044D29' }, { text: `"${name}"`, color: '#FF007A' }, { text: ',', color: '#044D29' }]);
      renderLine([{ text: '  role: ', color: '#044D29' }, { text: `"${role}"`, color: '#FF007A' }, { text: ',', color: '#044D29' }]);
      renderLine([{ text: '  stack: ', color: '#044D29' }, { text: `[${stack.split(',').map((s) => `"${s.trim()}"`).join(', ')}]`, color: '#FF007A' }, { text: ',', color: '#044D29' }]);
      renderLine([{ text: '  location: ', color: '#044D29' }, { text: '"GOA, INDIA"', color: '#FF007A' }, { text: ',', color: '#044D29' }]);
      renderLine([{ text: '  status: ', color: '#044D29' }, { text: '"CONFIRMED_BUILDER"', color: '#044D29' }]);
      renderLine([{ text: '};', color: '#044D29' }]);

      startY += 15;
      renderLine([{ text: `// ${tag}`, color: '#FF007A' }]);

      ctx.fillStyle = '#FFE600';
      ctx.fillRect(20, 550, width - 40, 50);
      ctx.fillStyle = '#044D29';
      ctx.font = 'bold 20px "Bodoni Moda", serif';
      ctx.fillText('GOA, INDIA  •  28 - 31 OCT 2026', 40, 582);
      ctx.fillText('2:47 PM STUDIO', 980, 582);
    });
  };

  // 2. BOARDING PASS THEME
  const drawBoardingPassTheme = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#FFFDEB';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#044D29';
    ctx.lineWidth = 12;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.fillStyle = '#FF007A';
    ctx.fillRect(30, 30, width - 60, 90);

    ctx.fillStyle = '#FFE600';
    ctx.font = '900 38px "Bodoni Moda", serif';
    ctx.fillText('✈ BOARDING PASS', 50, 85);

    ctx.fillStyle = '#FFFDEB';
    ctx.font = 'bold 18px "JetBrains Mono", monospace';
    ctx.fillText('AIRWAYS: HH-GOA-2026', 850, 70);
    ctx.fillText('FLIGHT: GOA-EXPRESS', 850, 95);

    ctx.strokeStyle = '#044D29';
    ctx.lineWidth = 4;
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(820, 120);
    ctx.lineTo(820, 520);
    ctx.stroke();
    ctx.setLineDash([]);

    drawUserPhoto(ctx, 60, 150, 280, '#044D29', () => {
      const detailsX = 370;
      let detailsY = 180;

      const drawField = (label: string, val: string) => {
        ctx.fillStyle = '#FF007A';
        ctx.font = 'bold 14px "JetBrains Mono", monospace';
        ctx.fillText(label.toUpperCase(), detailsX, detailsY);
        
        ctx.fillStyle = '#044D29';
        ctx.font = 'bold 22px "JetBrains Mono", monospace';
        ctx.fillText(val, detailsX, detailsY + 26);
        detailsY += 60;
      };

      drawField('PASSENGER NAME', name);
      drawField('BUILDER ROLE', role);
      drawField('TECH STACK', stack);
      drawField('DESTINATION', 'GOA, INDIA (28-31 OCT)');

      // Right stub
      ctx.fillStyle = '#044D29';
      ctx.font = 'bold 14px "JetBrains Mono", monospace';
      ctx.fillText('PASSENGER:', 840, 160);
      ctx.fillStyle = '#FF007A';
      ctx.font = 'bold 18px "JetBrains Mono", monospace';
      ctx.fillText(name.slice(0, 18), 840, 185);

      ctx.fillStyle = '#044D29';
      ctx.font = 'bold 14px "JetBrains Mono", monospace';
      ctx.fillText('GATE / SEAT:', 840, 230);
      ctx.fillText('N64 / 2A', 840, 255);

      ctx.fillText('HASHTAG:', 840, 300);
      ctx.fillStyle = '#FF007A';
      ctx.fillText(tag, 840, 325);

      ctx.fillStyle = '#044D29';
      for (let i = 0; i < 280; i += 8) {
        const barWidth = (i % 3 === 0) ? 5 : 2;
        ctx.fillRect(840 + i, 380, barWidth, 70);
      }

      ctx.fillStyle = '#FFE600';
      ctx.fillRect(30, 540, width - 60, 50);
      ctx.fillStyle = '#044D29';
      ctx.font = 'bold 20px "Bodoni Moda", serif';
      ctx.fillText('ADVENTURE AWAITS IN GOA  •  OCTOBER 28-31, 2026', 50, 572);
      ctx.fillText('2:47 PM STUDIO', 950, 572);
    });
  };

  // 3. SQUAREPANTS HACKER LICENSE THEME
  const drawSquarePantsTheme = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#FFFDEB';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#044D29';
    ctx.lineWidth = 12;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.fillStyle = '#FFE600';
    ctx.fillRect(25, 25, width - 50, 70);

    ctx.fillStyle = '#044D29';
    ctx.font = 'bold 36px "Bodoni Moda", serif';
    ctx.fillText('SQUAREPANTS HACKER LICENSE', 40, 70);

    ctx.fillStyle = '#FF007A';
    ctx.font = 'bold 20px "VT323", monospace';
    ctx.fillText('CLASS: S-TIER BUILDER', 900, 68);

    drawUserPhoto(ctx, 60, 140, 340, '#044D29', () => {
      const detailsX = 450;
      let detailsY = 170;

      const drawLicField = (lbl: string, val: string) => {
        ctx.fillStyle = '#FF007A';
        ctx.font = 'bold 15px "JetBrains Mono", monospace';
        ctx.fillText(lbl, detailsX, detailsY);
        ctx.fillStyle = '#044D29';
        ctx.font = 'bold 22px "JetBrains Mono", monospace';
        ctx.fillText(val, detailsX + 160, detailsY);
        detailsY += 48;
      };

      drawLicField('HACKER NAME:', name);
      drawLicField('GUILD ROLE:', role);
      drawLicField('WEAPON STACK:', stack);
      drawLicField('EXPIRATION:', 'NEVER (HH GOA 2026)');
      drawLicField('ADDRESS:', '124 CONCH ST, GOA');

      ctx.fillStyle = '#FF007A';
      ctx.font = '36px "Pacifico", cursive';
      ctx.fillText(name, detailsX, detailsY + 25);

      ctx.fillStyle = '#044D29';
      ctx.fillRect(25, 540, width - 50, 50);
      ctx.fillStyle = '#FFE600';
      ctx.font = 'bold 20px "Bodoni Moda", serif';
      ctx.fillText('CERTIFIED CRAZY HACKER  •  #FrameInGoa', 40, 572);
      ctx.fillText('2:47 PM STUDIO', 950, 572);
    });
  };

  // 4. BARBIE LAND THEME
  const drawBarbieLandTheme = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#FFFDEB';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#FF007A';
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.fillStyle = '#FF007A';
    ctx.fillRect(25, 25, width - 50, 95);

    ctx.fillStyle = '#FFFDEB';
    ctx.font = '48px "Pacifico", cursive';
    ctx.fillText('Barbie Land', 50, 85);

    ctx.fillStyle = '#FFE600';
    ctx.font = 'bold 20px "JetBrains Mono", monospace';
    ctx.fillText('OFFICIAL HACKER LICENSE', 850, 80);

    drawUserPhoto(ctx, 60, 150, 320, '#FF007A', () => {
      const detailsX = 420;
      let detailsY = 180;

      const drawBarbieField = (lbl: string, val: string) => {
        ctx.fillStyle = '#FF007A';
        ctx.font = 'bold 15px "JetBrains Mono", monospace';
        ctx.fillText(lbl, detailsX, detailsY);
        ctx.fillStyle = '#044D29';
        ctx.font = 'bold 22px "JetBrains Mono", monospace';
        ctx.fillText(val, detailsX, detailsY + 24);
        detailsY += 60;
      };

      drawBarbieField('NAME', name);
      drawBarbieField('ROLE', role);
      drawBarbieField('STACK', stack);
      drawBarbieField('LOCATION', 'BARBIE LAND (GOA EDITION)');

      ctx.fillStyle = '#FF007A';
      ctx.font = '40px "Pacifico", cursive';
      ctx.fillText(`♥ ${name}`, detailsX + 220, 480);

      ctx.fillStyle = '#044D29';
      ctx.fillRect(25, 540, width - 50, 50);
      ctx.fillStyle = '#FFE600';
      ctx.font = 'bold 20px "Bodoni Moda", serif';
      ctx.fillText('THIS BARBIE IS A CRAZY HACKER  •  HH GOA 2026', 40, 572);
      ctx.fillText('2:47 PM STUDIO', 950, 572);
    });
  };

  // 5. WE BARE BEARS CALIFORNIA LICENSE THEME
  const drawBareBearsTheme = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#FFFDEB';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#044D29';
    ctx.lineWidth = 12;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.fillStyle = '#044D29';
    ctx.font = '900 40px "Bodoni Moda", serif';
    ctx.fillText('CALIFORNIA', 40, 70);

    ctx.fillStyle = '#FF007A';
    ctx.font = 'bold 24px "VT323", monospace';
    ctx.fillText('BEARY CRAZY HACKER LICENSE', 310, 68);

    drawUserPhoto(ctx, 60, 120, 320, '#044D29', () => {
      const detailsX = 420;
      let detailsY = 160;

      const drawBearField = (lbl: string, val: string) => {
        ctx.fillStyle = '#044D29';
        ctx.font = 'bold 15px "JetBrains Mono", monospace';
        ctx.fillText(`${lbl}: `, detailsX, detailsY);
        ctx.fillStyle = '#FF007A';
        ctx.font = 'bold 21px "JetBrains Mono", monospace';
        ctx.fillText(val, detailsX + 110, detailsY);
        detailsY += 48;
      };

      drawBearField('NAME', name);
      drawBearField('ROLE', role);
      drawBearField('STACK', stack);
      drawBearField('GOA-DOB', 'OCT 28, 2026');
      drawBearField('HAIR/EYES', 'COFFEE / SCREEN-GLOW');

      // --- CUSTOM PAW PRINT (HACKER'S MARK) ---
      const pawX = 980;
      const pawY = 260;

      ctx.strokeStyle = '#FF007A';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pawX, pawY, 80, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#FF007A';
      ctx.beginPath();
      ctx.ellipse(pawX, pawY + 15, 30, 22, 0, 0, Math.PI * 2);
      ctx.fill();

      const toeOffsets = [
        { x: -30, y: -22, rx: 9, ry: 13 },
        { x: -10, y: -35, rx: 9, ry: 14 },
        { x: 10, y: -35, rx: 9, ry: 14 },
        { x: 30, y: -22, rx: 9, ry: 13 },
      ];

      toeOffsets.forEach((toe) => {
        ctx.beginPath();
        ctx.ellipse(pawX + toe.x, pawY + toe.y, toe.rx, toe.ry, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = '#044D29';
      ctx.font = 'bold 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText("HACKER'S MARK", pawX, pawY + 115);
      
      ctx.textAlign = 'left';

      ctx.fillStyle = '#044D29';
      ctx.font = '32px "Pacifico", cursive';
      ctx.fillText(name, detailsX, detailsY + 25);

      ctx.fillStyle = '#FFE600';
      ctx.fillRect(25, 540, width - 50, 50);
      ctx.fillStyle = '#044D29';
      ctx.font = 'bold 20px "Bodoni Moda", serif';
      ctx.fillText('WE BARE HACKERS  •  GOA, INDIA 2026', 40, 572);
      ctx.fillText('2:47 PM STUDIO', 950, 572);
    });
  };

  useEffect(() => {
    drawGraphic();
  }, [name, role, stack, tag, imageSrc, theme]);

  const downloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `HH_Goa_2026_${name.toLowerCase().replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const shareToX = () => {
    const caption = `Got my official HH Goa 2026 Hacker Badge! 🌴⚡\n\nBuilding as a ${role}.\nSee you in Goa! ✨\n\n#FrameInGoa @HackerHouseGoa`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToLinkedIn = () => {
    const postUrl = window.location.href;
    const summary = `Excited to be attending Hacker House Goa 2026! 🌴⚡\nBuilding as a ${role}.\n\n#FrameInGoa #HHGoa2026 #HackerHouse`;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(summary)}`;
    window.open(linkedInUrl, '_blank');
  };

  const shareToInstagram = () => {
    downloadPNG();
    const caption = `Ready for Hacker House Goa 2026! 🌴⚡\nRole: ${role}\nTech: ${stack}\n\n#FrameInGoa #HHGoa2026 #HackerHouse #GoaBuilders`;
    navigator.clipboard.writeText(caption);
    alert('📸 Badge downloaded! Caption copied to clipboard. Redirecting to Instagram...');
    window.open('https://www.instagram.com/', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#044D29] text-[#FFFDEB] p-4 md:p-8 flex flex-col items-center">
      <header className="mb-8 text-center space-y-2">
        <div className="font-['VT323'] text-yellow-300 text-2xl tracking-widest">2:47 PM STUDIO</div>
        <h1 className="text-4xl md:text-7xl font-black font-['Bodoni_Moda'] text-[#FFE600] tracking-tight uppercase">
          Hacker <span className="text-[#FF007A] font-sans italic">गोवा</span> House
        </h1>
        <p className="font-mono text-sm md:text-base text-emerald-200 tracking-wider">
          GOA, INDIA &bull; PRESENTED BY TEAM GIT-COMMITTED
        </p>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-5 bg-[#FFFDEB] text-[#044D29] p-6 md:p-8 rounded-2xl shadow-2xl space-y-5 border-4 border-[#044D29]">
          <div className="flex items-center justify-between border-b-2 border-[#044D29] pb-3">
            <h2 className="text-2xl font-black font-['Bodoni_Moda'] uppercase tracking-wide">
              Builder Details
            </h2>
            <span className="bg-[#FF007A] text-white text-xs font-bold font-mono px-2 py-1 rounded">
              TASK #1
            </span>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2">Select ID Frame Theme:</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTheme('vscode')}
                className={`py-2 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 border-2 transition ${
                  theme === 'vscode' ? 'bg-[#044D29] text-[#FFE600] border-[#044D29]' : 'bg-white text-[#044D29]'
                }`}
              >
                <Code2 className="w-3 h-3" /> VS Code
              </button>

              <button
                type="button"
                onClick={() => setTheme('boarding_pass')}
                className={`py-2 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 border-2 transition ${
                  theme === 'boarding_pass' ? 'bg-[#FF007A] text-white border-[#FF007A]' : 'bg-white text-[#044D29]'
                }`}
              >
                <Plane className="w-3 h-3" /> Ticket
              </button>

              <button
                type="button"
                onClick={() => setTheme('squarepants')}
                className={`py-2 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 border-2 transition ${
                  theme === 'squarepants' ? 'bg-[#FFE600] text-[#044D29] border-[#044D29]' : 'bg-white text-[#044D29]'
                }`}
              >
                <ShieldAlert className="w-3 h-3" /> SquarePants
              </button>

              <button
                type="button"
                onClick={() => setTheme('barbie_land')}
                className={`py-2 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 border-2 transition ${
                  theme === 'barbie_land' ? 'bg-[#FF007A] text-white border-[#FF007A]' : 'bg-white text-[#044D29]'
                }`}
              >
                <Heart className="w-3 h-3" /> Barbie
              </button>

              <button
                type="button"
                onClick={() => setTheme('bare_bears')}
                className={`py-2 px-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 border-2 transition ${
                  theme === 'bare_bears' ? 'bg-[#044D29] text-[#FFFDEB] border-[#044D29]' : 'bg-white text-[#044D29]'
                }`}
              >
                <Compass className="w-3 h-3" /> Bare Bears
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1">
              Upload Photo (JPG, PNG, HEIC)
            </label>
            <input
              type="file"
              accept="image/*,.heic"
              onChange={handleImageUpload}
              className="w-full text-xs text-[#044D29] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#FF007A] file:text-white hover:file:bg-[#d60067] cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-bold font-mono uppercase mb-1">name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white border-2 border-[#044D29] rounded-lg px-3 py-2 text-[#044D29] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF007A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold font-mono uppercase mb-1">role / title:</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-white border-2 border-[#044D29] rounded-lg px-3 py-2 text-[#044D29] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF007A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold font-mono uppercase mb-1">stack (comma separated):</label>
            <input
              type="text"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
              className="w-full bg-white border-2 border-[#044D29] rounded-lg px-3 py-2 text-[#044D29] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF007A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold font-mono uppercase mb-1">tag / hashtag:</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full bg-white border-2 border-[#044D29] rounded-lg px-3 py-2 text-[#044D29] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-[#FF007A]"
            />
          </div>

          {/* Download & Social Buttons */}
          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={downloadPNG}
              disabled={loading}
              className="w-full bg-[#FF007A] hover:bg-[#d60067] text-white font-black font-['Bodoni_Moda'] text-lg uppercase tracking-wider py-3 rounded-full shadow-md transition flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" /> Download Badge PNG
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={shareToX}
                className="w-full bg-[#FFE600] hover:bg-[#ebd300] text-[#044D29] font-bold text-xs uppercase py-2.5 px-2 rounded-xl border-2 border-[#044D29] transition flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" /> Share on X
              </button>

              <button
                onClick={shareToLinkedIn}
                className="w-full bg-[#0077B5] hover:bg-[#005885] text-white font-bold text-xs uppercase py-2.5 px-2 rounded-xl border-2 border-[#044D29] transition flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-1.1.7-1.93 1.8-1.93 1.05 0 1.95.83 1.95 1.93v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                LinkedIn
              </button>

              <button
                onClick={shareToInstagram}
                className="w-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-xs uppercase py-2.5 px-2 rounded-xl border-2 border-[#044D29] transition flex items-center justify-center gap-1.5"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram
              </button>
            </div>
          </div>
        </div>

        {/* Right Live Canvas Preview */}
        <div className="lg:col-span-7 flex flex-col items-center w-full">
          <div className="w-full bg-[#FFFDEB] text-[#044D29] p-4 md:p-6 rounded-2xl border-4 border-[#044D29] shadow-2xl">
            <h3 className="text-xs font-bold font-mono uppercase mb-3 text-[#FF007A] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF007A]" /> Live Canvas Card Preview ({theme.toUpperCase()})
            </h3>
            <div className="w-full overflow-x-auto flex justify-center bg-[#044D29] p-3 rounded-xl">
              <canvas
                ref={canvasRef}
                className="max-w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}