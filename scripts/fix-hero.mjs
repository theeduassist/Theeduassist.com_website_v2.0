import { readFileSync, writeFileSync } from 'fs';

let content = readFileSync('src/components/home/HomeHero.astro', 'utf8');

// Find the right side div and replace it
const startMarker = '<div class="w-full lg:w-1/2 flex justify-center items-center">';
const startIndex = content.indexOf(startMarker);

if (startIndex === -1) {
  console.log('❌ Could not find start marker');
  console.log('First 200 chars after line 43:');
  const lines = content.split('\n');
  console.log(lines.slice(43, 50).join('\n'));
  process.exit(1);
}

// Find the end - last </section> 
const endIndex = content.lastIndexOf('</section>');

const newRightSide = `<div class="w-full lg:w-1/2 flex justify-center items-center">
      <div class="bg-white/5 border border-white/10 rounded-3xl p-8 w-full max-w-lg">
        
        <!-- Stats -->
        <div class="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-white/10">
          <div class="text-center">
            <div class="text-3xl font-extrabold text-brand-green mb-1">500+</div>
            <div class="text-sm text-slate-300">Courses Built</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-extrabold text-brand-green mb-1">150+</div>
            <div class="text-sm text-slate-300">Happy Clients</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-extrabold text-brand-green mb-1">15+</div>
            <div class="text-sm text-slate-300">LMS Platforms</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-extrabold text-brand-green mb-1">48hr</div>
            <div class="text-sm text-slate-300">Review Turnaround</div>
          </div>
        </div>

        <!-- Process Steps -->
        <div class="space-y-4">
          <div class="flex items-center gap-4 bg-white/5 rounded-xl p-4">
            <div class="w-8 h-8 bg-brand-green/20 rounded-lg flex items-center justify-center text-brand-green font-bold text-sm shrink-0">1</div>
            <div>
              <div class="font-semibold text-white text-sm">Share Your Content</div>
              <div class="text-xs text-slate-400">SOPs, videos, docs, slides</div>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-white/5 rounded-xl p-4">
            <div class="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">2</div>
            <div>
              <div class="font-semibold text-white text-sm">We Design & Build</div>
              <div class="text-xs text-slate-400">Courses, LMS, Kajabi systems</div>
            </div>
          </div>
          <div class="flex items-center gap-4 bg-white/5 rounded-xl p-4">
            <div class="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm shrink-0">3</div>
            <div>
              <div class="font-semibold text-white text-sm">Launch & Scale</div>
              <div class="text-xs text-slate-400">Live, working, ready to grow</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>`;

content = content.substring(0, startIndex) + newRightSide;
writeFileSync('src/components/home/HomeHero.astro', content, 'utf8');
console.log('✅ Hero updated!');